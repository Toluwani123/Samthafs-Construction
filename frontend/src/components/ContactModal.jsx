import React from 'react';
import { FaTimes, FaCheckCircle } from 'react-icons/fa';

export default function ContactModal({
  isOpen,
  onClose,
  formData,
  onChange,
  onSubmit,
  isMessageSent
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-2xl w-full mx-4 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          aria-label="Close contact form"
        >
          <FaTimes className="text-xl" />
        </button>
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Contact Us</h2>
        {isMessageSent ? (
          <div className="text-center py-8">
            <FaCheckCircle className="text-green-500 text-5xl mb-4" />
            <p className="text-xl text-gray-800">Thank you for your message!</p>
            <p className="text-gray-600">We'll get back to you soon.</p>
          </div>
        ) : (
          <form id="contact-form" onSubmit={onSubmit} className="space-y-6">
            {/* name + email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { id: 'contact-name', name: 'name', label: 'Name', type: 'text' },
                { id: 'contact-email', name: 'email', label: 'Email', type: 'email' },
              ].map(({ id, name, label, type }) => (
                <div key={name}>
                  <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-2">
                    {label}
                  </label>
                  <input
                    id={id}
                    type={type}
                    name={name}
                    required
                    value={formData[name]}
                    onChange={onChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              ))}
            </div>

            {/* phone + subject */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { id: 'contact-phone',   name: 'phone',   label: 'Phone',   type: 'tel' },
                { id: 'contact-subject', name: 'subject', label: 'Subject', type: 'text' },
              ].map(({ id, name, label, type }) => (
                <div key={name}>
                  <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-2">
                    {label}
                  </label>
                  <input
                    id={id}
                    type={type}
                    name={name}
                    required
                    value={formData[name]}
                    onChange={onChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              ))}
            </div>

            {/* message */}
            <div>
              <label htmlFor="contact-message" className="block text-sm font-medium text-gray-700 mb-2">
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                required
                value={formData.message}
                onChange={onChange}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="!rounded-button whitespace-nowrap bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 font-medium transition-colors"
              >
                Send Message
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
