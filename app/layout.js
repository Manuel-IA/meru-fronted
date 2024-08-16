import { Inter } from "next/font/google";
import Header from './components/Header';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Meru Products",
  description: "Application for Business Case",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CssBaseline />
        <Header /> {/* Include Header */}
        <main>
          <Container sx={{ mt: 10, mb: 5 }}> {/* Adjust margin-top and margin-bottom to avoid overlap */}
            {children}
          </Container>
        </main>
      </body>
    </html>
  );
}
