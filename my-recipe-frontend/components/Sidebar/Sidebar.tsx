"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./Sidebar.module.scss";

export default function Sidebar() {
  const [categories, setCategories] = useState<string[]>([]);
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch(`${baseUrl}/recipes/categories/all`, {
          cache: "no-store",
        });
        if (!res.ok) {
          throw new Error("Error fetching categories");
        }
        const data = await res.json();
        const allCategories = data.meals || [];

        const catStrings = allCategories.map((item: any) => item.strCategory);
        setCategories(catStrings);
      } catch (error) {
        console.error(error);
      }
    }

    fetchCategories();
  }, [baseUrl]);

  if (!categories.length) {
    return <aside className={styles.sidebar}>Loading categories...</aside>;
  }

  return (
    <aside className={styles.sidebar}>
      <h3>Categories</h3>
      <ul>
        {categories.map((cat) => (
          <li key={cat}>
            <Link href={`/recipes?category=${encodeURIComponent(cat)}`}>
              {cat}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
