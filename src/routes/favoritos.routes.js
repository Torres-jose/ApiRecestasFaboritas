const express = require("express");
const verificarToken = require("../middlewares/verifyToken.middlewares")
const {
  agregarFavorito,
  listarFavorito,
  eliminarFavorito,
} = require("../controllers/favoritos.controller");
const FavoritoRouter = express.Router();

FavoritoRouter.use(verificarToken);
FavoritoRouter.get("/", listarFavorito);
FavoritoRouter.post("/", agregarFavorito);
FavoritoRouter.delete("/:idMeal", eliminarFavorito);

module.exports = FavoritoRouter;
