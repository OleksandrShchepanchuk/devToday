import { Router } from "express";
import {
  getRecipes,
  getRecipe,
  listCategories,
  getTenRandomMealsController,
} from "../controllers/recipes.controller";

const router = Router();

// GET /recipes?search=...&category=...&country=...
router.get("/", getRecipes);

router.get("/random-ten", getTenRandomMealsController);
// GET /recipes/:id
router.get("/:id", getRecipe);

router.get("/categories/all", listCategories);

export default router;
