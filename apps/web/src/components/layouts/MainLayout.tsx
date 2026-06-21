import Navbar from "./Navbar";
import Footer from "./Footer";

/**
 * MainLayout – wraps every page with Navbar and Footer.
 * Ensures consistent chrome across the application.
 */
export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Navbar />
      <main style={{ flex: 1, padding: "2rem" }}>{children}</main>
      <Footer />
    </div>
  );
}
