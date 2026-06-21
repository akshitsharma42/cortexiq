/**
 * Footer – site footer.
 * Placeholder — will be expanded with links, socials, etc.
 */
export default function Footer() {
  return (
    <footer
      style={{
        padding: "1rem 2rem",
        borderTop: "1px solid #e5e7eb",
        textAlign: "center",
        fontSize: "0.875rem",
        color: "#6b7280",
      }}
    >
      © {new Date().getFullYear()} CortexIQ. All rights reserved.
    </footer>
  );
}
