import BlogClient from "@/components/blog/BlogClient";
import { supabase } from "@/lib/supabase-client";
import { Metadata } from "next";


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
      type: "article",
    },
  };
}

export default function BlogDetailPage({ params }: { params: { id: string } }) {
  return <BlogClient id={params.id} />;
}