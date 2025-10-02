"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase-client";
import DOMPurify from "isomorphic-dompurify";
import { Metadata } from "next";

interface Blog {
  id: string;
  title: string;
  content: string;
  created_at: string;
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const { data: blog } = await supabase
    .from("blogs")
    .select("title, content")
    .eq("id", params.id)
    .single();

  if (!blog) {
    return {
      title: "Blog not found",
      description: "This blog post could not be found.",
    };
  }

  // ✅ get base url from env
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  return {
    title: blog.title,
    description: blog.content.slice(0, 150),
    openGraph: {
      title: blog.title,
      description: blog.content.slice(0, 150),
      url: `${baseUrl}/blogs/${params.id}`,
      siteName: "Prompt Studio",
      images: [
        {
          url: `${baseUrl}/api/og?title=${encodeURIComponent(blog.title)}`,
          width: 1200,
          height: 630,
          alt: blog.title,
        },
      ],
      locale: "en_US",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.content.slice(0, 150),
      images: [`${baseUrl}/api/og?title=${encodeURIComponent(blog.title)}`],
    },
  };
}

export default function BlogDetailPage() {
  const params = useParams();
  const blogId = params?.id as string;
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlog() {
      if (!blogId) return;
      const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .eq("id", blogId)
        .single();

      if (!error && data) {
        setBlog(data);
      }
      setLoading(false);
    }

    fetchBlog();
  }, [blogId]);

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
