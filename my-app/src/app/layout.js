import "./globals.css";

export const metadata = {
  title: "My Awesome App",
  description: "Explore posts, recipes, and user information in one place.",
  openGraph: {
    title: "My Awesome App",
    description: "Discover interesting posts, delicious recipes, and user profiles."
  }
}


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}














