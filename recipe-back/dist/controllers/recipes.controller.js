"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRecipes = getRecipes;
exports.getRecipe = getRecipe;
exports.listCategories = listCategories;
exports.getTenRandomMealsController = getTenRandomMealsController;
const recipes_service_1 = require("../services/recipes.service");
function getRecipes(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { search, category, country, ingredient } = req.query;
            let data;
            if (ingredient) {
                data = yield (0, recipes_service_1.filterRecipesByIngredient)(ingredient);
            }
            else if (search) {
                data = yield (0, recipes_service_1.searchRecipesByName)(search);
            }
            else if (category) {
                data = yield (0, recipes_service_1.filterRecipesByCategory)(category);
            }
            else if (country) {
                data = yield (0, recipes_service_1.filterRecipesByCountry)(country);
            }
            else {
                data = yield (0, recipes_service_1.getAllRecipes)();
            }
            res.json(data);
        }
        catch (error) {
            console.error("Error fetching recipes:", error);
            res.status(500).json({ message: "Internal Server Error", error });
        }
    });
}
function getRecipe(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const data = yield (0, recipes_service_1.getRecipeById)(id);
            res.json(data);
        }
        catch (error) {
            console.error("Error fetching recipe info:", error);
            res.status(500).json({ message: "Internal Server Error", error });
        }
    });
}
function listCategories(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield (0, recipes_service_1.getAllCategories)();
            // data should look like { meals: [ { strCategory: 'Beef' }, { strCategory: 'Chicken' }, ... ] }
            res.json(data);
        }
        catch (error) {
            console.error("Error fetching categories:", error);
            res.status(500).json({ message: "Internal Server Error", error });
        }
    });
}
function getTenRandomMealsController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const meals = yield (0, recipes_service_1.getTenRandomMeals)();
            res.json({ meals });
        }
        catch (error) {
            console.error("Error fetching 10 random meals:", error);
            res
                .status(500)
                .json({ message: "Internal Server Error", error: error.message });
        }
    });
}
