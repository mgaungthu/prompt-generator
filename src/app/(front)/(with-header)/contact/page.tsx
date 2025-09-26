"use client";


import { FaFacebook, FaTwitter, FaLinkedin, FaWhatsapp } from "react-icons/fa";

export default function ContactPage() {
  const websiteUrl = "https://bagan.ai"; // change to your domain

  return (
    <>
      <main className="max-w-2xl mx-auto px-4 py-10 flex-grow">
        <div className="d-flex items-center text-center space-y-6">
          <h1 className="text-2xl font-bold">Contact Us</h1>
          <p className="text-gray-400 text-sm">
            Thank you for visiting our website.  
            If you’d like to collaborate, have questions, or just want to say hello,  
            feel free to reach out anytime at the email below:
          </p>
          <a
            href="mailto:mr.mgaungthu@gmail.com"
            className="text-lg font-medium text-blue-400 hover:underline"
          >
            mr.mgaungthu@gmail.com
          </a>

          {/* Share Website */}
          <div className="pt-10">
            <h2 className="text-lg font-semibold mb-4">Share this Website</h2>
            <div className="flex justify-center space-x-6 text-2xl">
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${websiteUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-400"
              >
                <FaFacebook />
              </a>
              <a
                href={`https://twitter.com/intent/tweet?url=${websiteUrl}&text=Check%20this%20out!`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-400 hover:text-sky-300"
              >
                <FaTwitter />
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${websiteUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-500"
              >
                <FaLinkedin />
              </a>
              <a
                href={`https://api.whatsapp.com/send?text=Check%20this%20out:%20${websiteUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-400 hover:text-green-300"
              >
                <FaWhatsapp />
              </a>
            </div>
          </div>
        </div>
      </main>
 </>
  );
}