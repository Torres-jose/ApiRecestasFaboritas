const express = require("express");
const { verifyToken } = require("../utils/jwt.utils");
const {
  agregarFavorito,
  listarFavorito,
  eliminarFavorito,
} = require("../controllers/favoritos.controller");
const FavoritoRouter = express.Router();

FavoritoRouter.use(verifyToken);
FavoritoRouter.post("/api", agregarFavorito);
FavoritoRouter.get("/api", listarFavorito);
FavoritoRouter.delete("/:idMeal", eliminarFavorito);

module.exports = FavoritoRouter;
