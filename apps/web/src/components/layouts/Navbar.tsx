/**
 * Navbar – top navigation bar.
 * Placeholder — will be expanded with auth state, workspace selector, etc.
 */
export default function Navbar() {
  return (
    <nav
      style={{
        padding: "1rem 2rem",
        borderBottom: "1px solid #e5e7eb",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <strong>CortexIQ</strong>
    </nav>
  );
}
