const express = require("express");
const { verifyToken } = require("../utils/jwt.utils");
const {
  agregarFavorito,
  listarFavorito,
  eliminarFavorito,
} = require("../controllers/favoritos.controller");
const FavoritoRouter = express.Router();

FavoritoRouter.use(verifyToken);
FavoritoRouter.post("/", agregarFavorito);
FavoritoRouter.get("/", listarFavorito);
FavoritoRouter.delete("/:idMeal", eliminarFavorito);

module.exports = FavoritoRouter;
