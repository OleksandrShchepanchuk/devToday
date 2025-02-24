import "./globals.scss";
import type { Metadata } from "next";
import Link from "next/link";
import styles from "./layout.module.scss";

export const metadata: Metadata = {
  title: "My Recipe App",
  description: "A Next.js 13 + SCSS Example",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header className={styles.header}>
          <div className={styles.headerContent}>
            <Link href="/recipes" className={styles.logo}>
              MyRecipeApp
            </Link>
          </div>
        </header>
        <div className={styles.pageContainer}>{children}</div>
      </body>
    </html>
  );
}
