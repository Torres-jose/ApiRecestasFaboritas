import mongoose from "mongoose";
const {Shema, model} = mongoose;


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
    image: String

},{
    timesTamps: true
});

FavoritoShema.index({userId: 1, idMeal: 1}, {unique: true});
export default model('favoritos', FavoritoShema);