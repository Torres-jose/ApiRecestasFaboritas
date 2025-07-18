const {validartoken} = require("../utils/jwt.utils");

const verificarToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
 

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token no enviado o formato inválido' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = validartoken(token);
  
    req.user = {
      userId: decoded.id,
      username: decoded.username,
      name: decoded.name,
      email: decoded.email
    };
    next()
  } catch (error) {
    console.error("Error al verificar token:", error.message);
    return res.status(401).json({ message: 'Token inválido o expirado' });
  }
};

module.exports = verificarToken;