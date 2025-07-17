const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const favoritoSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  idMeal: {
    type: String,
    required: true
  },
  nombre: String, // strMeal
  categoria: String, // strCategory
  area: String, // strArea
  instrucciones: String, // strInstructions
  imagen: String, // strMealThumb
  video: String, // strYoutube
  ingredientes: [String],
  medidas: [String]
}, {
  timestamps: true
});

favoritoSchema.index({ userId: 1, idMeal: 1 }, { unique: true });

module.exports = mongoose.model("favoritos", favoritoSchema);
