import fetch from "node-fetch";

export const obtenerRecetaPorId = async (idMeal) => {
  try {
    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`
    );
    const data = await res.json();
    return data.meals?.[0] || null;
  } catch (error) {
    console.error("Error al consultar TheMealDB:", error);
    return null;
  }
};
