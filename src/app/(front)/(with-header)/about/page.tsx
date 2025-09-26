export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">About Us</h1>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">What is Bagan AI</h2>
        <p className="text-gray-200 leading-relaxed">
          Bagan AI is a cutting-edge platform dedicated to harnessing the power of artificial intelligence to provide innovative solutions and insights. Our mission is to empower individuals and businesses by making AI accessible, understandable, and practical for everyday use.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Our Story</h2>
        <p className="text-gray-200 leading-relaxed">
          Founded by a team of passionate AI enthusiasts and industry experts, Bagan AI was born out of the desire to bridge the gap between complex AI technologies and real-world applications. Over the years, we have grown into a trusted source for AI tools, research, and education, committed to fostering a community that embraces the future of technology.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Our Promise</h2>
        <ul className="list-disc list-inside text-gray-200 leading-relaxed space-y-1">
          <li>Deliver reliable and accurate AI-powered solutions.</li>
          <li>Maintain transparency and integrity in all our operations.</li>
          <li>Continuously innovate to meet the evolving needs of our users.</li>
          <li>Provide exceptional support and resources to our community.</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Editorial Guidelines</h2>
        <ul className="list-disc list-inside text-gray-200 leading-relaxed space-y-1">
          <li>Content is thoroughly researched and fact-checked.</li>
          <li>We prioritize clarity and accessibility for all audiences.</li>
          <li>Opinions are clearly distinguished from factual information.</li>
          <li>We welcome feedback and corrections to maintain quality.</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Contact Us</h2>
        <p className="text-gray-200 leading-relaxed">
          We’d love to hear from you! Whether you have questions, feedback, or partnership inquiries, please reach out to us at <a href="mailto:contact@baganai.com" className="text-blue-600 hover:underline">contact@baganai.com</a>.
        </p>
      </section>
    </div>
  );
}