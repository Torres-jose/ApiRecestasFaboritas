const User = require("../models/users.models");
const { hashPassword, comparePassword } = require("../utils/hash.utils");
const { generateToken } = require("../utils/jwt.utils");

const register = async (req, res) => {
  const { username, name, lasname, email, password } = req.body;

  try {
    //verificar si existe el usuario
    const existe = await User.findOne({ username });
    if (existe)
      return res.status(409).json({ message: "El usuario ya existe" });

    const hashed = await hashPassword(password);

    const nuevoUsuario = new User({
      username,
      name,
      lasname,
      email,
      password: hashed,
    });
    await nuevoUsuario.save();
    res.status(201).json({ message: "Usuario registrado correctamente" });
  } catch (error) {}
};

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const usuario = await User.findOne({ username });
    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const match = await comparePassword(password, usuario.password);
    if (!match) {
      return res.status(401).json({ message: "contraseña incorrecta" });
    }
    const token = generateToken({
      id: usuario._id,
      username: usuario.username,
      name: usuario.name,
      email: usuario.email,
    });
    res.json({
      token,
      usuario: {
        id: usuario._id,
        username: usuario.username,
        name: usuario.name,
        emeal: usuario.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Error del servidor", error });
  }
};

module.exports = {
  register,
  login,
};
