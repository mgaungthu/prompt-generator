'use client';

const Header = () => {
    return (
          <header className="w-full bg-gray-950 border-b border-gray-800">
            <div className="max-w-5xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between">
              <h1 className="text-2xl font-bold mb-2 md:mb-0">Bagan AI</h1>
              <nav className="flex flex-wrap justify-center gap-4 text-sm text-gray-300">
    s             <a href="#" className="hover:text-white">About Us</a>
                <a href="#" className="hover:text-white">Contact Us</a>
                <a href="#" className="hover:text-white">Terms</a>
                <a href="#" className="hover:text-white">Privacy</a>
                <a href="#" className="hover:text-white">Disclaimer</a>
              </nav>
            </div>
          </header>
      )
}

export default Header

