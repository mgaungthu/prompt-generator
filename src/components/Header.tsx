'use client';

import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <header className="w-full bg-gray-950 border-b border-gray-800">
      <div className="max-w-5xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between">
        <Link href="/">
          <Image src="/logo.png" alt="Bagan AI Logo" width={150} height={40} />
        </Link>
        <nav className="flex flex-wrap justify-center gap-4 text-sm text-gray-300">
          <Link href="/blogs" className="hover:text-white">Blogs</Link>
          <Link href="/about" className="hover:text-white">About Us</Link>
          <Link href="/contact" className="hover:text-white">Contact Us</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;