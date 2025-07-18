const Favorito = require('../models/favoritos.models');
const { obtenerRecetaPorId } = require("../services/mealdb.service");

// Agregar a favoritos
const agregarFavorito = async (req, res) => {
  try {
    const { idMeal } = req.body;
    const userId = req.user.userId;

    // Verificar si ya existe
    const existente = await Favorito.findOne({ userId, idMeal });
    if (existente)
      return res.status(409).json({ error: "Ya existe en favorito" });

    // Obtener receta desde la API externa
    const receta = await obtenerRecetaPorId(idMeal);
    if (!receta) return res.status(404).json({ error: "Receta no encontrada" });

    // Extraer ingredientes y medidas
    const ingredientes = [];
    const medidas = [];

    for (let i = 1; i <= 20; i++) {
      const ingrediente = receta[`strIngredient${i}`];
      const medida = receta[`strMeasure${i}`];
      if (ingrediente && ingrediente.trim() !== "") {
        ingredientes.push(ingrediente);
        medidas.push(medida || "");
      }
    }

    // Crear nuevo favorito
    const nuevo = new Favorito({
      userId,
      idMeal: receta.idMeal,
      nombre: receta.strMeal,
      categoria: receta.strCategory,
      area: receta.strArea,
      instrucciones: receta.strInstructions,
      imagen: receta.strMealThumb,
      video: receta.strYoutube,
      ingredientes,
      medidas
    });

    await nuevo.save();
    res.status(201).json({ mensaje: "Receta guardada en favoritos", receta: nuevo });
  } catch (error) {
    console.error("Error al agregar favorito:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

// Listar favoritos
const listarFavorito = async (req, res) => {
  try {
    const userId = req.user.userId; // según cómo lo guardaste al crear el token
    const favoritos = await Favorito.find({ userId });

    if (!favoritos || favoritos.length === 0) {
      return res.status(200).json({ message: "No tienes recetas en favoritos." });
    }

    res.status(200).json(favoritos);
  } catch (error) {
    console.error("Error al listar favoritos:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};


// Eliminar favorito
const eliminarFavorito = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { idMeal } = req.params;

    const eliminado = await Favorito.findOneAndDelete({ userId, idMeal });
    if (!eliminado)
      return res.status(404).json({ error: "Favorito no encontrado" });

    res.json({ mensaje: "Favorito eliminado" });
  } catch (error) {
    console.error("Error al eliminar favorito:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

module.exports = {
  agregarFavorito,
  listarFavorito,
  eliminarFavorito
};
