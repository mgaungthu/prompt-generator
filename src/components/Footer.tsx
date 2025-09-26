'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  return (
    <footer className="w-full bg-gray-950 border-t border-gray-800">
      <div className="max-w-5xl mx-auto px-4 py-6 text-center text-gray-500 text-xs">
        <p>© {new Date().getFullYear()} Bagan AI</p>
        <div className="flex justify-center flex-wrap gap-4 mt-2">
          <Link
            href="/blogs"
            className={pathname === "/blogs" ? "text-white font-semibold" : "hover:text-white"}
          >
            Blogs
          </Link>
          <Link
            href="/about"
            className={pathname === "/about" ? "text-white font-semibold" : "hover:text-white"}
          >
            About Us
          </Link>
          <Link
            href="/disclaimer"
            className={pathname === "/disclaimer" ? "text-white font-semibold" : "hover:text-white"}
          >
            Disclaimer
          </Link>
          <Link
            href="/terms"
            className={pathname === "/terms" ? "text-white font-semibold" : "hover:text-white"}
          >
            Terms & Conditions
          </Link>
          <Link
            href="/privacy"
            className={pathname === "/privacy" ? "text-white font-semibold" : "hover:text-white"}
          >
            Privacy Policy
          </Link>
          <Link
            href="/contact"
            className={pathname === "/contact" ? "text-white font-semibold" : "hover:text-white"}
          >
            Contact Us
          </Link>
        </div>
      </div>
    </footer>
  );
}