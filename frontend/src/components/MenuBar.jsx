import React from 'react';

function MenuBar({
  isScrolled,
  activePage,
  setActivePage,
  setIsQuoteModalOpen,
  setIsContactModalOpen,
}) {
  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md text-gray-800' : 'bg-transparent text-white'
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* brand */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold">Samthafs</h1>
          </div>

          {/* desktop nav */}
          <nav className="hidden md:flex items-center space-x-8">
            {['home', 'projects', 'services', 'about'].map(link => (
              <a
                key={link}
                href={`#${link}`}
                onClick={() => setActivePage(link)}
                className={`
                  hover:text-blue-500 transition-colors font-medium cursor-pointer
                  ${activePage === link ? 'text-blue-500' : ''}
                `}
              >
                {link.charAt(0).toUpperCase() + link.slice(1)}
              </a>
            ))}

            <a
              href="#contact"
              onClick={() => setIsContactModalOpen(true)}
              className="hover:text-blue-500 transition-colors font-medium cursor-pointer"
            >
              Contact
            </a>

            <button
              onClick={() => setIsQuoteModalOpen(true)}
              className={`!rounded-button whitespace-nowrap px-6 py-2 font-medium cursor-pointer ${
                isScrolled ? 'bg-blue-600 text-white' : 'bg-white text-blue-600'
              }`}
            >
              Get&nbsp;a&nbsp;Quote
            </button>
          </nav>

          {/* mobile icon (wired later) */}
          <div className="md:hidden">
            <i className={`fas fa-bars text-2xl ${isScrolled ? 'text-gray-800' : 'text-white'}`} />
          </div>
        </div>
      </div>
    </header>
  );
}

export default MenuBar;
