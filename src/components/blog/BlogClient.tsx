"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase-client";
import DOMPurify from "isomorphic-dompurify";
import { useParams } from "next/navigation";

interface Blog {
  id: string;
  title: string;
  content: string;
  created_at: string;
}

export default function BlogDetailPage({ slug }: { slug: string }) {
  const params = useParams();
  const blogSlug = params?.slug as string;
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlog() {
      if (!blogSlug) return;
      const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .eq("slug", blogSlug)
        .single();

      if (!error && data) {
        setBlog(data);
      }
      setLoading(false);
    }

    fetchBlog();
  }, [blogSlug]);

  if (loading) {
    return <p className="text-center text-gray-500 mt-10">Loading blog...</p>;
  }

  if (!blog) {
    return <p className="text-center text-gray-500 mt-10">Blog not found.</p>;
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 ">
      <div className="p-6 bg-white shadow-md rounded-lg border border-gray-200 hover:shadow-lg transition">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">{blog.title}</h1>
        <p className="text-sm text-gray-400 mb-6">
          {new Date(blog.created_at).toLocaleString()}
        </p>
        <div className="prose max-w-none text-gray-700">
          {
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(blog.content),
              }}
            />
          }
        </div>
      </div>
    </div>
  );
}