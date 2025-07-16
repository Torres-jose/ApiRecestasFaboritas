const Favorito = require('../models/favoritos.models')
const { obtenerRecetaPorId } = require("../services/mealdb.service");

export const agregarFavorito = async (req, res) => {
  try {
    const { idMeal } = req.body;
    const userId = req.user.userId;

    const exitente = await Favorito.findOne({ userId, idMeal });
    if (exitente)
      return res.status(409).json({ error: "Ya existe en favorito" });

    const receta = await obtenerRecetaPorId(idMeal);
    if (!receta) return res.status(404).json({ error: "Receta no encontrada" });

    const nuevo = new Favorito({
      userId,
      idMeal: receta.idMeal,
      nombre: receta.strMeal,
      categoria: receta.strCategory,
      area: receta.strArea,
      instrucciones: receta.strInstructions,
      imagen: receta.strMealThumb,
    });

    await nuevo.save();
    res
      .status(201)
      .json({ mensaje: "Recetas guardada en favorito", receta: nuevo });
  } catch (error) {
    console.error("Error al agregar favorito:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const listarFavorito = async (req, res) => {
  try {
    const userId = req.user.userId;
    const favorito = await Favorito.find({ userId });
    res.json(favorito);
  } catch (error) {
    console.error("Error a listar favoritos:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const eliminarFavorito = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { idMeal } = req.params;

    const eliminado = await Favorito.findOneAndDelete({ userId, idMeal });
    if (!eliminado)
      return res.status(404).json({ error: "Favorito no encontrado" });
    res.json({ mensaje: "Favorito eliminado" });
  } catch (error) {
    console.error("Error al eliminar favoito", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};
