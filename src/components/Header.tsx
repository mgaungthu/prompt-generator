'use client';

import Link from "next/link";

const Header = () => {
  return (
    <header className="w-full bg-gray-950 border-b border-gray-800">
      <div className="max-w-5xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between">
        <h1 className="text-2xl font-bold mb-2 md:mb-0 text-white">
          <Link href="/">Bagan AI</Link>
        </h1>
        <nav className="flex flex-wrap justify-center gap-4 text-sm text-gray-300">
          <Link href="/blogs" className="hover:text-white">Blogs</Link>
          <Link href="/about" className="hover:text-white">About Us</Link>
          <Link href="/terms" className="hover:text-white">Terms & Conditions</Link>
          <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
          <Link href="/contact" className="hover:text-white">Contact Us</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;