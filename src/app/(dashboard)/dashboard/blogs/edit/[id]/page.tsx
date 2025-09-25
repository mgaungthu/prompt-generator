"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import { supabase } from "@/lib/supabase-client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import RTEmenu from "@/components/RTEmenu";


// Toolbar component for editor controls


export default function EditBlogPage() {
  const router = useRouter();
  const params = useParams();
  const blogId = params?.id as string;

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      // Placeholder.configure({
      //   placeholder: 'Write your blog content here...',
      // }),
    ],
    immediatelyRender: false,
    content: content,
    editable:true,
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-lg focus:outline-none p-4 min-h-[300px]',
      },
    },
  });

  useEffect(() => {
    async function fetchBlog() {
      if (!blogId) return;
      
      try {
        const { data, error } = await supabase
          .from("blogs")
          .select("*")
          .eq("id", blogId)
          .single();

        if (error) {
          throw error;
        }

        if (data) {
          setTitle(data.title);
          setContent(data.content);
          // Set editor content after data is loaded
          if (editor && !editor.isDestroyed) {
            editor.commands.setContent(data.content || "");
          }
        }
      } catch (error) {
        alert("Error fetching blog: " + error);
      } finally {
        setLoading(false);
      }
    }

    fetchBlog();
  }, [blogId, editor]);

  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    
    try {
      const { error } = await supabase
        .from("blogs")
        .update({ title, content, updated_at: new Date().toISOString() })
        .eq("id", blogId);

      if (error) {
        throw error;
      }
      
      alert("Blog updated successfully!");
      router.push("/dashboard/blogs");
    } catch (error) {
      alert("Error updating blog: " + error);
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto bg-white p-6 shadow rounded-lg">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
          <div className="h-10 bg-gray-200 rounded mb-4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 shadow rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Edit Blog</h1>
      <form onSubmit={handleUpdate} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            id="title"
            placeholder="Enter blog title"
            className="w-full border border-gray-300 px-4 py-3 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
            Content
          </label>
          <div className="border border-gray-300 rounded-lg overflow-hidden">
            <RTEmenu editor={editor} />
            <EditorContent 
              editor={editor} 
              className="text-black min-h-[300px] overflow-y-auto"
            />
          </div>
        </div>
        
        <div className="flex justify-end space-x-4 pt-4">
          <button
            type="button"
            onClick={() => router.push("/dashboard/blogs")}
            className="px-5 py-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition"
            disabled={saving}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-indigo-600 text-white px-5 py-2.5 rounded-lg hover:bg-indigo-700 transition flex items-center justify-center"
            disabled={saving}
          >
            {saving ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Updating...
              </>
            ) : "Update Blog"}
          </button>
        </div>
      </form>
    </div>
  );
}