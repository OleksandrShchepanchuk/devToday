import { Request, Response } from "express";
import {
  searchRecipesByName,
  filterRecipesByCategory,
  filterRecipesByIngredient,
  filterRecipesByCountry,
  getAllRecipes,
  getRecipeById,
  getAllCategories,
  getTenRandomMeals,
} from "../services/recipes.service";

export async function getRecipes(req: Request, res: Response): Promise<void> {
  try {
    const { search, category, country, ingredient } = req.query;
    let data;

    if (ingredient) {
      data = await filterRecipesByIngredient(ingredient as string);
    } else if (search) {
      data = await searchRecipesByName(search as string);
    } else if (category) {
      data = await filterRecipesByCategory(category as string);
    } else if (country) {
      data = await filterRecipesByCountry(country as string);
    } else {
      data = await getAllRecipes();
    }

    res.json(data);
  } catch (error) {
    console.error("Error fetching recipes:", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
}

export async function getRecipe(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const data = await getRecipeById(id);
    res.json(data);
  } catch (error) {
    console.error("Error fetching recipe info:", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
}

export async function listCategories(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const data = await getAllCategories();
    // data should look like { meals: [ { strCategory: 'Beef' }, { strCategory: 'Chicken' }, ... ] }
    res.json(data);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
}

export async function getTenRandomMealsController(req: Request, res: Response) {
  try {
    const meals = await getTenRandomMeals();

    res.json({ meals });
  } catch (error: any) {
    console.error("Error fetching 10 random meals:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
}
