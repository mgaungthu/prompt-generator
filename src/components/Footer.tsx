'use client';

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-gray-950 border-t border-gray-800">
      <div className="max-w-5xl mx-auto px-4 py-6 text-center text-gray-500 text-xs">
        <p>© {new Date().getFullYear()} Bagan AI</p>
        <div className="flex justify-center flex-wrap gap-4 mt-2">
          <Link href="/blogs" className="hover:text-white">Blogs</Link>
          <Link href="/about" className="hover:text-white">About Us</Link>
          <Link href="/terms" className="hover:text-white">Terms & Conditions</Link>
          <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
          <Link href="/contact" className="hover:text-white">Contact Us</Link>
        </div>
      </div>
    </footer>
  );
}