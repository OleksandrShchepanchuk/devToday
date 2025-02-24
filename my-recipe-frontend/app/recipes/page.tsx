import Link from "next/link";
import Sidebar from "../../components/Sidebar/Sidebar";
import styles from "./page.module.scss";
import { notFound } from "next/navigation";

async function getRecipes(
  search?: string,
  category?: string,
  country?: string,
  ingredient?: string
) {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  let url = `${baseUrl}/recipes`;

  const params = new URLSearchParams();
  if (search) params.set("search", search);
  if (category) params.set("category", category);
  if (country) params.set("country", country);
  if (ingredient) params.set("ingredient", ingredient);

  if ([...params].length > 0) {
    url += `?${params.toString()}`;
  }

  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) {
    return null;
  }
  const data = await res.json();
  if ([...params].length > 0) {
    return data.meals || [];
  }
  return data || [];
}

export default async function RecipesPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string };
}) {
  const { search, category, country, ingredient } = searchParams || {};

  const meals = await getRecipes(search, category, country, ingredient);

  if (!meals) {
    return notFound();
  }

  let filterTitle = "All Recipes";
  if (search) filterTitle = `Recipes with "${search}"`;
  else if (category) filterTitle = `Recipes in Category: ${category}`;
  else if (country) filterTitle = `Recipes from ${country}`;
  else if (ingredient) filterTitle = `Recipes with ingredient "${ingredient}"`;

  return (
    <div className={styles.container}>
      <Sidebar />

      <main className={styles.main}>
        <h1 className={styles.title}>{filterTitle}</h1>

        <form style={{ margin: "1rem 0" }} action="/recipes" method="get">
          <label htmlFor="ingredient" style={{ marginRight: "8px" }}>
            Filter by Ingredient:
          </label>
          <input
            type="text"
            name="ingredient"
            id="ingredient"
            placeholder="e.g. chicken"
            defaultValue={ingredient || ""}
            style={{
              padding: "4px 8px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              marginRight: "8px",
            }}
          />
          <button
            type="submit"
            style={{
              padding: "4px 8px",
              borderRadius: "4px",
              backgroundColor: "#0070f3",
              color: "#fff",
              border: "none",
              cursor: "pointer",
            }}
          >
            Apply
          </button>
          {ingredient && (
            <Link
              href="/recipes"
              style={{
                marginLeft: "10px",
                color: "#333",
                textDecoration: "underline",
              }}
            >
              Clear Ingredient
            </Link>
          )}
        </form>

        {meals.length > 0 ? (
          <div className={styles.grid}>
            {meals.map((meal: any) => {
              const { idMeal, strMeal, strMealThumb } = meal;
              if (!idMeal || !strMeal) return null;

              const imageUrl =
                strMealThumb ||
                "https://www.dirtyapronrecipes.com/wp-content/uploads/2015/10/food-placeholder.png";

              return (
                <Link key={idMeal} href={`/recipes/${idMeal}`}>
                  <div className={styles.card}>
                    <img
                      src={imageUrl}
                      alt={strMeal}
                      className={styles.cardImage}
                    />
                    <h3 className={styles.cardTitle}>{strMeal}</h3>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <p>No recipes found.</p>
        )}
      </main>
    </div>
  );
}
