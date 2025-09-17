'use client';

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-gray-950 border-t border-gray-800">
      <div className="max-w-5xl mx-auto px-4 py-6 text-center text-gray-500 text-xs">
        <p>© 2025 Bagan AI</p>
        <div className="flex justify-center flex-wrap gap-4 mt-2">
          <Link href="/blog" className="hover:text-white">Blog</Link>
          <Link href="/about" className="hover:text-white">About Us</Link>
          <Link href="/contact" className="hover:text-white">Contact Us</Link>
          <Link href="/terms" className="hover:text-white">Terms</Link>
          <Link href="/privacy" className="hover:text-white">Privacy</Link>
          <Link href="/disclaimer" className="hover:text-white">Disclaimer</Link>
        </div>
      </div>
    </footer>
  );
}