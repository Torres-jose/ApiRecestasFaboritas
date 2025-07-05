const mongoose = require('mongoose');
const Schema = mongoose.Schema

const userSchema = new Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    lasname:{
        type: String,
        required: true,
        trim: true
    },
    identificacion:{
        type: String,
        require: true,
        uniqued: true,
        trim: true,
    },
    tipoIndentificacion:{
        type: String,
        required: true,
        enum:['cedula','pasaporte','cedula_extrajera'],
        default: 'cedula'

    },
    email:{
        type: String,
        required: true,
        uniqued: true,
        trim: true,
        lowercase: true,
        match: [/.+\@.+\..+/, 'Por favor ingrese un email válido']
    },
    password:{
        type: String,
        required: true,
        minlength: 6
    },
    fechaNacimiento:{
        type: Date,
        required: true
    },
    rol:{
        type: String,
        required: true,
        enum: ['usuario', 'medico','admin'],
        default: 'usuario'
    },
    numeroLicenciaMedica:{
        type: String,
        required: function(){return this.rol === 'medico';},
        trim: true
    },
    especialidad:{
        type: String,
        required: function(){return this.rol === 'medico';},
        trim: true
    },
    instituto:{
        type: String,
        trim: true
    },
    fechaRegistro:{
        type: Date,
        default: Date.now
    }
});

userSchema.index({identificacion: 1});
userSchema.index({email:1});
userSchema.index({rol: 1});

module.exports = mongoose.model('users', userSchema);
