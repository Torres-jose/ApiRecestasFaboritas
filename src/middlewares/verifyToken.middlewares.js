const { verifyToken } = require("../utils/jwt.utils");



const verificarToken = (req, res, next) =>{
    const token = req.headers.authorization?.split(' ')[1];

    if(!token){
        return res.status(401).json({message: 'Token no enviado'});
    }

    try {
        const decoded = verifyToken(token);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({message: 'Token invalido o expirado'})
    }
};

module.exports = verificarToken;