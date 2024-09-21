import type { Metadata } from "next";
import 'bootstrap/dist/css/bootstrap.min.css';
import localFont from "next/font/local";
import Link from "next/link";


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Weather App",
  description: "App for weather forecast",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container">
            <Link href="/" className="navbar-brand">WeatherApp</Link>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link href="/" className="nav-link">Search Weather</Link>
                </li>
                <li className="nav-item">
                  <Link href="/favorites" className="nav-link">Favorites</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        {children} 
      </body>
    </html>
  );
}
