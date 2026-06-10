"use client";

// Lenis removed — native smooth scroll via CSS is used instead.
// This wrapper is kept for future use.
export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
