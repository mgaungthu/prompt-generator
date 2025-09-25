'use client';

import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';


import Footer from "@/components/Footer";

export default function Home() {
  const [activeTab, setActiveTab] = useState<'image' | 'text'>('image');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [base64Image, setBase64Image] = useState<string | null>(null);
  const [textInput, setTextInput] = useState('');
  const [language, setLanguage] = useState('English');
  const [negativePrompts, setNegativePrompts] = useState('Lowres, watermark, blurry');
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({ latitude: pos.coords.latitude, longitude: pos.coords.longitude });
      },
      (err) => {
        console.warn('Geolocation error:', err);
        setLocation(null);
      }
    );
  }, []);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      const base64 = await toBase64(file);
      setSelectedImage(imageUrl);
      setBase64Image(base64);
    }
  };

  const toBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
    });
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const generatePrompt = async () => {
    setIsLoading(true);
    setGeneratedPrompt('');

    try {
      const endpoint =
        activeTab === 'image' ? '/api/generate-from-image' : '/api/generate-from-text';
      const body =
        activeTab === 'image'
          ? { imageUrl: base64Image, language, negativePrompts, location }
          : { text: textInput, language, negativePrompts, location };

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();
      if (data.error) {
        alert(data.error);
      } else {
        setGeneratedPrompt(data.prompt);
      }
    } catch (error) {
      console.error('Error generating prompt:', error);
      alert('Failed to generate prompt. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setSelectedImage(null);
    setTextInput('');
    setGeneratedPrompt('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const copyPrompt = () => {
    navigator.clipboard.writeText(generatedPrompt);
    alert('Prompt copied to clipboard!');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
     

      {/* MAIN CONTENT */}
      <main className="flex-grow max-w-2xl mx-auto px-4 py-6">
        {/* Top Section */}
        <div className="text-center mb-8">
          <div className="flex justify-center space-x-4 text-sm mb-4">
            <span>Image → Prompt</span>
            <span>Write → Prompt</span>
            <span>Docs</span>
          </div>

          <h2 className="text-xl font-semibold mb-4">Fast, Modern Prompt Builder</h2>
          <p className="text-gray-400 text-sm mb-6">
            Upload an image to extract style and generate prompts, or type your idea and auto-compose a generator-ready prompt.
            Built mobile-first with a clean, focused UI.
          </p>

          <div className="flex justify-center gap-3 mb-6">
            <span className="bg-gray-800 px-3 py-1 rounded text-xs">Mobile-first</span>
            <span className="bg-gray-800 px-3 py-1 rounded text-xs">Dark UI</span>
            <span className="bg-gray-800 px-3 py-1 rounded text-xs">Copy-friendly</span>
          </div>

          <div className="flex border-b border-gray-700">
            <button
              className={`flex-1 py-3 ${activeTab === 'image' ? 'border-b-2 border-white font-medium' : 'text-gray-400'}`}
              onClick={() => setActiveTab('image')}
            >
              Image → Prompt
            </button>
            <button
              className={`flex-1 py-3 ${activeTab === 'text' ? 'border-b-2 border-white font-medium' : 'text-gray-400'}`}
              onClick={() => setActiveTab('text')}
            >
              Write → Prompt
            </button>
          </div>
        </div>

        {/* Content */}
        {activeTab === 'image' ? (
          <div>
            <h2 className="text-xl font-semibold mb-4">Image → Prompt</h2>
            <p className="text-gray-400 text-sm mb-6">
              Upload an image and prepare prompts for Midjourney / SDXL / DALLE
            </p>

            <div className="mb-6">
              <h3 className="font-medium mb-2">Choose Image</h3>
              <div
                className="block border-2 border-dashed border-gray-700 rounded-lg p-8 text-center cursor-pointer hover:border-gray-600 transition-colors"
                onClick={triggerFileInput}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleImageUpload}
                />
                <div className="text-3xl mb-2">+</div>
                <p className="text-sm">Tap to select a photo</p>
                <p className="text-xs text-gray-500 mt-1">JPG / PNG / WebP • up to 15MB</p>
              </div>

              {selectedImage && (
                <div className="mt-4">
                  <Image
                    height={100}
                    width={100}
                    src={selectedImage}
                    alt="Preview"
                    className="w-full h-40 object-contain rounded-lg border border-gray-700"
                  />
                </div>
              )}
            </div>
          </div>
        ) : (
          <div>
            <h2 className="text-xl font-semibold mb-4">Write → Prompt</h2>
            <p className="text-gray-400 text-sm mb-6">
              Type your idea and auto-compose a generator-ready prompt
            </p>

            <div className="mb-6">
              <textarea
                className="w-full h-40 p-4 bg-gray-800 rounded-lg border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Describe your idea here..."
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
              />
            </div>
          </div>
        )}

        <div className="h-px bg-gray-800 my-6"></div>

        {/* Settings */}
        <div className="mb-6">
          <h3 className="font-medium mb-2">Output language</h3>
          <select
            className="w-full p-3 bg-gray-800 rounded-lg border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="English">English</option>
            <option value="Spanish">Spanish</option>
            <option value="French">French</option>
            <option value="German">German</option>
            <option value="Japanese">Japanese</option>
          </select>
        </div>

        <div className="mb-6">
          <h3 className="font-medium mb-2">Extra negative prompts (optional)</h3>
          <input
            type="text"
            className="w-full p-3 bg-gray-800 rounded-lg border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={negativePrompts}
            onChange={(e) => setNegativePrompts(e.target.value)}
            placeholder="Lowres, watermark, blurry"
          />
        </div>

        <p className="text-xs text-gray-500 mb-6">
          ▲ Policy: Avoid exact celebrity likenesses, brand replicas, or private-person lookalikes.
        </p>

        <div className="flex space-x-4 mb-8">
          <button
            className="flex-1 bg-blue-600 py-3 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors"
            onClick={generatePrompt}
            disabled={
              isLoading || (activeTab === 'image' && !selectedImage) || (activeTab === 'text' && !textInput.trim())
            }
          >
            {isLoading ? 'Generating...' : 'Generate Prompt'}
          </button>
          <button
            className="flex-1 bg-gray-800 py-3 rounded-lg border border-gray-700 hover:bg-gray-700 transition-colors"
            onClick={resetForm}
          >
            Reset
          </button>
        </div>

        {/* Generated Prompt */}
        {generatedPrompt && (
          <div className="bg-gray-800 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold mb-4">Generated Prompt</h3>
            <div className="bg-gray-700 p-4 rounded-lg whitespace-pre-wrap mb-4">{generatedPrompt}</div>
            <button
              className="w-full bg-blue-600 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              onClick={copyPrompt}
            >
              Copy Prompt
            </button>
          </div>
        )}
      </main>

     
    </div>
  );
}