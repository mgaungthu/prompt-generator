"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase-client";
import Link from "next/link";
import DOMPurify from "isomorphic-dompurify";

interface Blog {
  id: string;
  slug: string;
  title: string;
  content: string;
  created_at: string;
}

export default function FrontBlogListPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlogs() {
      const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data) {
        setBlogs(data);
      }
      setLoading(false);
    }
    fetchBlogs();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-500 mt-10">Loading blogs...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-white mb-6">Latest Blogs</h1>

      {blogs.length === 0 ? (
        <p className="text-gray-500">No blogs found.</p>
      ) : (
        <div className="space-y-6">
          {blogs.map((blog) => (
            <article
              key={blog.id}
              className="p-6 bg-white shadow-md rounded-lg border border-gray-200 hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                <Link href={`/blogs/${blog.slug}`}>{blog.title}</Link>
              </h2>
              <p className="text-gray-600 mb-3">

                  <div
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(blog.content.length > 150
                  ? blog.content.slice(0, 150) + "..."
                  : blog.content),
                  }}
                />
              </p>
              <p className="text-sm text-gray-400">
                {new Date(blog.created_at).toLocaleString()}
              </p>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}