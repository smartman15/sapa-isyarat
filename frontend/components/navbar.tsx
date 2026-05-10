import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex gap-4 p-4 bg-gray-200">
      <Link href="/">Home</Link>
      <Link href="/dictionary">Dictionary</Link>
      <Link href="/profile">Profile</Link>
    </nav>
  );
}