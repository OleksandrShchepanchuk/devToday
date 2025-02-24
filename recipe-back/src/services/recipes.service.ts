import "dotenv/config";
import axios from "axios";

const THEMEALDB_BASE_URL = process.env.RECIPE_API_BASE_URL;

export async function searchRecipesByName(search: string): Promise<any> {
  const url = `${THEMEALDB_BASE_URL}/search.php?s=${encodeURIComponent(
    search
  )}`;
  const { data } = await axios.get(url);
  return data;
}

export async function filterRecipesByCategory(category: string): Promise<any> {
  const url = `${THEMEALDB_BASE_URL}/filter.php?c=${encodeURIComponent(
    category
  )}`;
  const { data } = await axios.get(url);
  return data;
}

export async function filterRecipesByCountry(country: string): Promise<any> {
  const url = `${THEMEALDB_BASE_URL}/filter.php?a=${encodeURIComponent(
    country
  )}`;
  const { data } = await axios.get(url);
  return data;
}

export async function getAllRecipes(): Promise<any> {
  const LETTERS = "abcdefghijklmnopqrstuvwxyz";

  let allMeals: any[] = [];

  for (const letter of LETTERS) {
    const url = `${THEMEALDB_BASE_URL}/search.php?f=${letter}`;
    const { data } = await axios.get(url);
    if (data?.meals) {
      allMeals = allMeals.concat(data.meals);
    }
  }

  const seenIds = new Set<string>();
  const uniqueMeals = [];
  for (const meal of allMeals) {
    if (!seenIds.has(meal.idMeal)) {
      seenIds.add(meal.idMeal);
      uniqueMeals.push(meal);
    }
  }

  return uniqueMeals;
}

export async function getRecipeById(id: string): Promise<any> {
  const url = `${THEMEALDB_BASE_URL}/lookup.php?i=${id}`;
  const { data } = await axios.get(url);
  return data;
}

export async function filterRecipesByIngredient(
  ingredient: string
): Promise<any> {
  const url = `${THEMEALDB_BASE_URL}/filter.php?i=${encodeURIComponent(
    ingredient
  )}`;
  const { data } = await axios.get(url);
  return data;
}

export async function getAllCategories(): Promise<any> {
  const url = `${THEMEALDB_BASE_URL}/list.php?c=list`;
  const { data } = await axios.get(url);
  return data;
}

export async function getTenRandomMeals(): Promise<any[]> {
  const results: any[] = [];
  const loadedIds = new Set<string>();

  let attempts = 0;
  while (results.length < 10 && attempts < 50) {
    const response = await axios.get(`${THEMEALDB_BASE_URL}/random.php`);
    const data = response.data;
    if (data?.meals?.length) {
      const meal = data.meals[0];
      if (!loadedIds.has(meal.idMeal)) {
        loadedIds.add(meal.idMeal);
        results.push(meal);
      }
    }
    attempts++;
  }

  return results; // up to 10 unique meals
}
