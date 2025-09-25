import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/next';


import { Inter } from 'next/font/google';
import '../globals.css'
import Footer from '@/components/Footer';


const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Bagan AI - Generate AI Prompts',
  description: 'Upload images or write text to generate AI prompts for Midjourney, DALL-E, and Stable Diffusion',
  openGraph: {
    title: 'Bagan AI - Generate AI Prompts',
    description: 'Create perfect AI art prompts from your images or ideas',
    images: [
      {
        url: '/og-image.jpeg',
        width: 1200,
        height: 630,
        alt: 'Bagan AI - AI Prompt Generator',
      },
    ],
  },
};

export default function Frontlayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}