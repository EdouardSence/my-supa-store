export default function FrontTemplate({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        animation: "fade-in 0.5s ease both",
      }}
    >
      {children}
    </div>
  );
}
