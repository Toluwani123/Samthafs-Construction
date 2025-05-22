import React from 'react';
import { FaTimes } from 'react-icons/fa';

export default function QuoteModal({
  isOpen,
  onClose,
  formData,
  onChange,
  onSubmit
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-2xl w-full mx-4 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          aria-label="Close quote form"
        >
          <FaTimes className="text-xl" />
        </button>
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Request a Quote</h2>
        <form onSubmit={onSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { id: 'quote-name',        name: 'name',        label: 'Name',        type: 'text' },
              { id: 'quote-email',       name: 'email',       label: 'Email',       type: 'email' },
              { id: 'quote-phone',       name: 'phone',       label: 'Phone',       type: 'tel' },
              {
                id: 'quote-project-type',
                name: 'projectType',
                label: 'Project Type',
                type: 'select',
                options: ['commercial', 'residential', 'industrial', 'exterior', 'interior'],
              },
              { id: 'quote-location',    name: 'location',    label: 'Project Location', type: 'text' },
              { id: 'quote-budget',      name: 'budget',      label: 'Estimated Budget Range', type: 'text' },
            ].map(field => (
              <div key={field.name}>
                <label htmlFor={field.id} className="block text-sm font-medium text-gray-700 mb-2">
                  {field.label}
                </label>
                {field.type === 'select' ? (
                  <select
                    id={field.id}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={onChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {field.options.map(opt => (
                      <option key={opt} value={opt}>
                        {opt.charAt(0).toUpperCase() + opt.slice(1)}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    id={field.id}
                    type={field.type}
                    name={field.name}
                    required
                    value={formData[field.name]}
                    onChange={onChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                )}
              </div>
            ))}
          </div>

          <div>
            <label htmlFor="quote-description" className="block text-sm font-medium text-gray-700 mb-2">
              Project Description
            </label>
            <textarea
              id="quote-description"
              name="description"
              required
              value={formData.description}
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
              Submit Quote Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
