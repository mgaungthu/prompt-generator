
"use client"
import Link from "next/link";


import { useState, useEffect } from "react";
import DOMPurify from "isomorphic-dompurify";
import { supabase } from "@/lib/supabase-client";

export default function BlogsPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [blogs, setBlogs] = useState<any[]>([]);

  useEffect(() => {
    async function loadBlogs() {
      const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .order("created_at", { ascending: false });
      if (!error && data) {
        setBlogs(data);
      }
    }
    loadBlogs();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("You must be logged in to create a blog.");
      return;
    }

    const { error } = await supabase.from("blogs").insert([
      {
        user_id: user.id,
        title,
        content,
      },
    ]);

    if (error) {
      alert(error.message);
    } else {
      alert("Blog created successfully!");
      setTitle("");
      setContent("");
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this blog?")) {
      return;
    }
    const { error } = await supabase.from("blogs").delete().eq("id", id);
    if (error) {
      alert(error.message);
    } else {
      setBlogs(blogs.filter((b) => b.id !== id));
    }
  }

  return (
    <div className="w-full mx-auto bg-white p-6 shadow rounded-lg">
      <section className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-gray-800 text-xl font-semibold">Blogs</h2>
          <Link
            href="/dashboard/blogs/create"
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
          >
            Create Blog
          </Link>
        </div>
        <div className="overflow-x-auto shadow-lg rounded-lg">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-purple-700 text-white font-bold uppercase">
                <th className="px-6 py-3 text-left">Title</th>
                <th className="px-6 py-3 text-left">Content</th>
                <th className="px-6 py-3 text-left">Created At</th>
                <th className="px-6 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((blog) => (
                <tr
                  key={blog.id}
                  className="odd:bg-white even:bg-gray-50 hover:bg-gray-100 border-b"
                >
                  <td className="px-6 py-4 text-gray-700">{blog.title}</td>
                  <td className="px-6 py-4 text-gray-700">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(blog.content.slice(0, 50)),
                    }}
                  />
                  </td>
                  <td className="px-6 py-4 text-gray-700">
                    {new Date(blog.created_at).toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <Link
                      href={`/dashboard/blogs/edit/${blog.id}`}
                      className="bg-blue-500 text-white px-3 py-1 rounded mr-2 hover:bg-blue-600"
                    >
                      Edit
                    </Link>
                    <a
                      href="#"
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      onClick={() => handleDelete(blog.id)}
                    >
                      Delete
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
