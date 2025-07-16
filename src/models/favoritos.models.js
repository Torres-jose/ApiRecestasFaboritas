import mongoose from "mongoose";
const {Schema, model} = mongoose;


const FavoritoShema = new Shema({
    userId:{
        type: Shema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    idMeal:{
        type: String,
        required: true
    },
    nombre: String,
    categoira: String,
    area: String,
    instrucciones: String,
    imagen: String

},{
    timestamps: true
});

FavoritoShema.index({userId: 1, idMeal: 1}, {unique: true});
export default model('favoritos', FavoritoShema);