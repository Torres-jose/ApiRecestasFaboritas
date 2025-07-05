const User = require('../models/users.models');
const { hashPassword, comparePassword } = require('../utils/hash.utils');
const { generateToken } = require('../utils/jwt.utils');


const register = async (req, res) =>{
    const {
        name,
        lasname,
        identificacion,
        tipoIndentificacion,
        email,
        password,
        fechaNacimiento,
        rol,
        numeroLicenciaMedica,
        especialidad,
        instituto
    } = req.body;

    try {
        //verificar si existe el usuario
      const existe = await User.findOne({email});
      if(existe) return res.status(409).json({message:'El usuario ya existe'});
      
      const hashed = await hashPassword(password);

      const nuevoUsuario = new User({
        name,
        lasname,
        identificacion,
        tipoIndentificacion,
        email,
        password: hashed,
        fechaNacimiento,
        rol,
        numeroLicenciaMedica,
        especialidad,
        instituto

      });
      await nuevoUsuario.save();
      res.status(201).json({message:'Usuario registrado correctamente'})
    } catch (error) {
        
    }
}

const login = async (req, res)=>{
  const {email, password} = req.body

  try { 
    const usuario = await User.findOne({email});
    if(!usuario){
      return res.status(404).json({message: 'Usuario no encontrado'});
    }

    const match = await comparePassword(password, usuario.password);
    if(!match){
      return res.status(401).json({message: "contraseña incorrecta"});
    }
    const token = generateToken({
      id: usuario._id,
      rol: usuario.rol,
      name: usuario.name,
      email: usuario.email
    });
    res.json({
      token, 
      usuario:{
        id: usuario._id,
        rol: usuario.rol,
        name: usuario.name, 
        emeal: usuario.email
      }
    });

  } catch (error) {
    res.status(500).json({message: 'Error del servidor', error});
  }
};

module.exports ={
  register,
  login
}


