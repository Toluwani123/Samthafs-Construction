import React from 'react';

function Footer({ setActivePage, setIsContactModalOpen }) {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          {/* column 1 */}
          <div>
            <h3 className="text-2xl font-bold mb-6">Samthafs</h3>
            <p className="text-gray-400 mb-6">
              Excellence in construction with precision, innovation, and integrity since 2005.
            </p>
            <div className="flex space-x-4">
              {['facebook-f', 'twitter', 'linkedin-in', 'instagram'].map(icon => (
                <a key={icon} href="#" className="text-gray-400 hover:text-white transition-colors">
                  <i className={`fab fa-${icon} text-lg`} />
                </a>
              ))}
            </div>
          </div>

          {/* column 2 – quick links */}
          <div>
            <h4 className="text-lg font-bold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {['home', 'projects', 'services', 'about'].map(link => (
                <li key={link}>
                  <a
                    href={`#${link}`}
                    onClick={() => setActivePage(link)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.charAt(0).toUpperCase() + link.slice(1)}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#contact"
                  onClick={() => setIsContactModalOpen(true)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* column 3 – contact info */}
          <div>
            <h4 className="text-lg font-bold mb-6">Contact Info</h4>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-start">
                <i className="fas fa-map-marker-alt mt-1 mr-3" />
                <span>
                  23b Jaiye Oyedotun Street
                  <br />
                  Lagos, NG
                </span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-phone-alt mr-3" />
                <span>(+234) 803-703-9664</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-envelope mr-3" />
                <span>samthafs@gmail.com</span>
              </li>
            </ul>
          </div>

          {/* column 4 – newsletter */}
          <div>
            <h4 className="text-lg font-bold mb-6">Newsletter</h4>
            <p className="text-gray-400 mb-4">
              Subscribe to our newsletter for the latest updates and insights.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email address"
                className="px-4 py-2 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-l w-full text-sm"
              />
              <button className="!rounded-button whitespace-nowrap bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-r text-sm font-medium">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* copyright */}
        <div className="pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Samthafs Construction. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
