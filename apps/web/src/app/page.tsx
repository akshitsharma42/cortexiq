import MainLayout from "@/components/layouts/MainLayout";

export default function Home() {
  return (
    <MainLayout>
      <div style={{ textAlign: "center", marginTop: "4rem" }}>
        <h1 style={{ fontSize: "2.5rem", fontWeight: 700, margin: 0 }}>
          CortexIQ
        </h1>
        <p style={{ fontSize: "1.125rem", color: "#6b7280", marginTop: "0.5rem" }}>
          AI Operating System for Organizational Knowledge
        </p>
      </div>
    </MainLayout>
  );
}
