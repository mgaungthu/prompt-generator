"use client"
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase-client";

const SideBar = () => {
  const router = useRouter();

  const handleLogout = async () => {
    if (confirm("Are you sure you want to logout?")) {
      await supabase.auth.signOut();
      router.push("/login");
    }
  };

  return (
    <>
      <aside className="w-64 bg-white shadow-md hidden md:block">
        <nav className="p-4 space-y-2">
          <Link href="/dashboard">
            <span className="text-black block px-3 py-2 rounded-md hover:bg-gray-100">
              Overview
            </span>
          </Link>
           <Link href="/dashboard/reports">
            <span className="text-black block px-3 py-2 rounded-md hover:bg-gray-100">
              Reports
            </span>
          </Link>

          <Link href="/dashboard/blogs">
            <span className="text-black block px-3 py-2 rounded-md hover:bg-gray-100">
              Blogs
            </span>
          </Link>

         
          <button
            className="block px-3 py-2 rounded-md hover:bg-gray-100 text-red-600"
            onClick={handleLogout}
            type="button"
          >
            Logout
          </button>
        </nav>
      </aside>
    </>
  );
};

export default SideBar;
