import BlogClient from "@/components/blog/BlogClient";
import { supabase } from "@/lib/supabase-client";
import { Metadata } from "next";

// helper to strip HTML tags
function stripHtmlTags(str: string) {
  return str.replace(/<[^>]*>?/gm, "");
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { data: blog } = await supabase
    .from("blogs")
    .select("title, content, slug")
    .eq("slug", params.slug)
    .single();

  if (!blog) {
    return {
      title: "Blog not found",
      description: "This blog post could not be found.",
    };
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const plainDescription = stripHtmlTags(blog.content).slice(0, 150);

  return {
    title: blog.title,
    description: plainDescription,
    openGraph: {
      title: blog.title,
      description: plainDescription,
      url: `${baseUrl}/blogs/${blog.slug}`,  // ✅ pretty URL
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
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: plainDescription,
      images: [`${baseUrl}/api/og?title=${encodeURIComponent(blog.title)}`],
    },
  };
}

export default function BlogDetailPage({ params }: { params: { slug: string } }) {
  return <BlogClient slug={params.slug} />;
}