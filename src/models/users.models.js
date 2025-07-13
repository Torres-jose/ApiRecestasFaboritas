const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  lasname: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [/.+\@.+\..+/, "Por favor ingrese un email válido"],
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },

  fechaRegistro: {
    type: Date,
    default: Date.now,
  },
});



module.exports = mongoose.model("users", userSchema);
