import "./globals.css";
import PersonSchema from './PersonSchema'
import { AuthProvider } from "@/lib/AuthContext";

export const metadata = {
  title: "Ahmed Ragab | Investigative Reporter & TV Producer",
  description: "Award-winning investigative journalist, reporter, and TV producer.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,900;1,400;1,700&family=Source+Sans+3:ital,wght@0,300;0,400;0,600;1,400&family=DM+Sans:wght@300;400;500;600&family=Noto+Sans+Arabic:wght@300;400;600;700;900&display=swap"
          rel="stylesheet"
        />
         <PersonSchema />
      </head>
      <body className="bg-paper text-ink antialiased">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
