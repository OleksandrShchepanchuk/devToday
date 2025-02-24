"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const recipes_controller_1 = require("../controllers/recipes.controller");
const router = (0, express_1.Router)();
// GET /recipes?search=...&category=...&country=...
router.get("/", recipes_controller_1.getRecipes);
router.get("/random-ten", recipes_controller_1.getTenRandomMealsController);
// GET /recipes/:id
router.get("/:id", recipes_controller_1.getRecipe);
router.get("/categories/all", recipes_controller_1.listCategories);
exports.default = router;
