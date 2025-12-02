import "./globals.css";
import Navbar from "../app/components/Navbar";
import { LanguageProvider } from "../app/i18n/LanguageContext";

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
    <html>
      <body>
        <LanguageProvider>
          <Navbar />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
