import "./globals.css";
import { LanguageProvider } from "./i18n/LanguageContext";
import Navbar from "./components/Navbar";
import LocaleStripper from "./LocaleStripper";

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
          <LocaleStripper>
            <Navbar />
            {children}
          </LocaleStripper>
        </LanguageProvider>
      </body>
    </html>
  );
}