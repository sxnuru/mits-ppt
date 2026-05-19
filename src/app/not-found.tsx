export default function NotFound() {
  return (
    <div style={{ display: "grid", placeItems: "center", minHeight: "100vh", backgroundColor: "#060b12", color: "#ffffff", fontFamily: "sans-serif" }}>
      <div style={{ textAlign: "center" }}>
        <h2 style={{ fontSize: "2rem", marginBottom: "1rem" }}>404 - Not Found</h2>
        <p style={{ color: "rgba(255,255,255,0.6)" }}>The requested presentation slide deck could not be loaded.</p>
      </div>
    </div>
  );
}
