import "./globals.css";
import { LanguageProvider } from "./i18n/LanguageContext";
import Navbar from "./components/Navbar";

export const metadata = {
  title: "GridWage",
  icons: {
    icon: "/fav.svg",
    shortcut: "/fav.svg",
    apple: "/fav.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html suppressHydrationWarning>
      <body>
        <LanguageProvider>
          <Navbar />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}