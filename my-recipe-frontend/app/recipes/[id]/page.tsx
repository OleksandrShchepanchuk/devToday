import { notFound } from "next/navigation";
import Link from "next/link";
import Sidebar from "../../../components/Sidebar/Sidebar";
import styles from "./page.module.scss";

async function getRecipeById(id: string) {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const res = await fetch(`${baseUrl}/recipes/${id}`, { cache: "no-store" });
  if (!res.ok) return null;
  const data = await res.json();
  return data.meals && data.meals.length > 0 ? data.meals[0] : null;
}

async function getRecipesByCategory(category: string) {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const url = `${baseUrl}/recipes?category=${encodeURIComponent(category)}`;
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) return [];
  const data = await res.json();
  return data.meals || [];
}

export default async function RecipeDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const meal = await getRecipeById(params.id);
  if (!meal) {
    return notFound();
  }

  const {
    idMeal,
    strMeal,
    strMealThumb,
    strArea,
    strCategory,
    strInstructions,
  } = meal;
  if (!idMeal || !strMeal) {
    return notFound();
  }

  let categoryRecipes: any[] = [];
  if (strCategory) {
    categoryRecipes = await getRecipesByCategory(strCategory);
    categoryRecipes = categoryRecipes.filter((r) => r.idMeal !== idMeal);
  }

  const imageUrl =
    strMealThumb ||
    "https://www.dirtyapronrecipes.com/wp-content/uploads/2015/10/food-placeholder.png";

  const ingredients: { name: string; measure: string }[] = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient && ingredient.trim().length > 0) {
      ingredients.push({
        name: ingredient.trim(),
        measure: measure ? measure.trim() : "",
      });
    }
  }

  return (
    <div className={styles.container}>
      <Sidebar />

      <main className={styles.main}>
        <div className={styles.topSection}>
          <div className={styles.imageWrapper}>
            <img src={imageUrl} alt={strMeal} className={styles.mealImage} />
          </div>
          <div className={styles.infoWrapper}>
            <h1 className={styles.mealTitle}>{strMeal}</h1>
            {strArea && (
              <p className={styles.country}>
                <strong>Country (Area): </strong>
                <Link href={`/recipes?country=${encodeURIComponent(strArea)}`}>
                  {strArea}
                </Link>
              </p>
            )}
          </div>
        </div>

        {strInstructions && (
          <div className={styles.section}>
            <h2>Instructions</h2>
            <p>{strInstructions}</p>
          </div>
        )}

        {ingredients.length > 0 && (
          <div className={styles.section}>
            <h2>Ingredients</h2>
            <ul>
              {ingredients.map((item, idx) => (
                <li key={idx}>
                  <Link
                    href={`/recipes?ingredient=${encodeURIComponent(
                      item.name
                    )}`}
                  >
                    {item.name}
                  </Link>
                  {item.measure ? ` - ${item.measure}` : ""}
                </li>
              ))}
            </ul>
          </div>
        )}
      </main>

      {strCategory && (
        <aside className={styles.rightSidebar}>
          <h3>{strCategory} Recipes</h3>
          <ul>
            {categoryRecipes.map((catMeal) => (
              <li key={catMeal.idMeal}>
                <Link href={`/recipes/${catMeal.idMeal}`}>
                  {catMeal.strMeal}
                </Link>
              </li>
            ))}
          </ul>
          <p>
            <Link href={`/recipes?category=${encodeURIComponent(strCategory)}`}>
              View all in {strCategory}
            </Link>
          </p>
        </aside>
      )}
    </div>
  );
}
