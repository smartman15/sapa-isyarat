/**
 * App shell layout — wraps all screens in the 380px mobile phone frame
 * that matches the design system. Applied to every route under /onboarding,
 * /home, /dictionary, etc. via Next.js nested layouts.
 */
export default function AppShellLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="min-h-dvh w-screen flex items-center justify-center"
      style={{
        background: "linear-gradient(160deg, #f3f4f8 0%, #ece9e3 100%)",
      }}
    >
      <div
        className="w-full relative overflow-hidden"
        style={{
          maxWidth: "380px",
          height: "100dvh",
          maxHeight: "812px",
          background: "#FAF9F6",
          borderRadius: "38px",
          border: "1px solid #dad6cf",
          boxShadow: "0 24px 80px rgba(27, 31, 59, 0.22), 0 4px 16px rgba(27, 31, 59, 0.10)",
        }}
      >
        {children}
      </div>
    </div>
  );
}
