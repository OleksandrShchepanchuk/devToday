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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchRecipesByName = searchRecipesByName;
exports.filterRecipesByCategory = filterRecipesByCategory;
exports.filterRecipesByCountry = filterRecipesByCountry;
exports.getAllRecipes = getAllRecipes;
exports.getRecipeById = getRecipeById;
exports.filterRecipesByIngredient = filterRecipesByIngredient;
exports.getAllCategories = getAllCategories;
exports.getTenRandomMeals = getTenRandomMeals;
require("dotenv/config");
const axios_1 = __importDefault(require("axios"));
const THEMEALDB_BASE_URL = process.env.RECIPE_API_BASE_URL;
function searchRecipesByName(search) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = `${THEMEALDB_BASE_URL}/search.php?s=${encodeURIComponent(search)}`;
        const { data } = yield axios_1.default.get(url);
        return data;
    });
}
function filterRecipesByCategory(category) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = `${THEMEALDB_BASE_URL}/filter.php?c=${encodeURIComponent(category)}`;
        const { data } = yield axios_1.default.get(url);
        return data;
    });
}
function filterRecipesByCountry(country) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = `${THEMEALDB_BASE_URL}/filter.php?a=${encodeURIComponent(country)}`;
        const { data } = yield axios_1.default.get(url);
        return data;
    });
}
function getAllRecipes() {
    return __awaiter(this, void 0, void 0, function* () {
        const LETTERS = "abcdefghijklmnopqrstuvwxyz";
        let allMeals = [];
        for (const letter of LETTERS) {
            const url = `${THEMEALDB_BASE_URL}/search.php?f=${letter}`;
            const { data } = yield axios_1.default.get(url);
            if (data === null || data === void 0 ? void 0 : data.meals) {
                allMeals = allMeals.concat(data.meals);
            }
        }
        // Optionally deduplicate by idMeal
        const seenIds = new Set();
        const uniqueMeals = [];
        for (const meal of allMeals) {
            if (!seenIds.has(meal.idMeal)) {
                seenIds.add(meal.idMeal);
                uniqueMeals.push(meal);
            }
        }
        return uniqueMeals;
    });
}
function getRecipeById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = `${THEMEALDB_BASE_URL}/lookup.php?i=${id}`;
        const { data } = yield axios_1.default.get(url);
        return data;
    });
}
function filterRecipesByIngredient(ingredient) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = `${THEMEALDB_BASE_URL}/filter.php?i=${encodeURIComponent(ingredient)}`;
        const { data } = yield axios_1.default.get(url);
        return data;
    });
}
function getAllCategories() {
    return __awaiter(this, void 0, void 0, function* () {
        const url = `${THEMEALDB_BASE_URL}/list.php?c=list`;
        const { data } = yield axios_1.default.get(url);
        return data;
    });
}
function getTenRandomMeals() {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const results = [];
        const loadedIds = new Set();
        let attempts = 0;
        while (results.length < 10 && attempts < 50) {
            const response = yield axios_1.default.get(`${THEMEALDB_BASE_URL}/random.php`);
            const data = response.data;
            if ((_a = data === null || data === void 0 ? void 0 : data.meals) === null || _a === void 0 ? void 0 : _a.length) {
                const meal = data.meals[0];
                if (!loadedIds.has(meal.idMeal)) {
                    loadedIds.add(meal.idMeal);
                    results.push(meal);
                }
            }
            attempts++;
        }
        return results; // up to 10 unique meals
    });
}
