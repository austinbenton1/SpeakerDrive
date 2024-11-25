import React, { useState } from 'react';
import { Search, Link2, ArrowRight } from 'lucide-react';

export default function ContactFinder() {
  const [searchMethod, setSearchMethod] = useState<'manual' | 'linkedin'>('manual');
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    linkedinUrl: ''
  });
  const [isSearching, setIsSearching] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    // Simulate API call
    setTimeout(() => {
      setIsSearching(false);
    }, 2000);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Contact Finder</h1>
        <p className="text-gray-600">Find contact information for potential speaking opportunities</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6">
          {/* Search Method Selector */}
          <div className="flex space-x-4 mb-8">
            <button
              onClick={() => setSearchMethod('manual')}
              className={`flex-1 py-3 px-4 rounded-lg border-2 transition-colors ${
                searchMethod === 'manual'
                  ? 'border-blue-600 bg-blue-50 text-blue-700'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center justify-center">
                <Search className="w-5 h-5 mr-2" />
                <span className="font-medium">Search by Name & Company</span>
              </div>
            </button>
            <button
              onClick={() => setSearchMethod('linkedin')}
              className={`flex-1 py-3 px-4 rounded-lg border-2 transition-colors ${
                searchMethod === 'linkedin'
                  ? 'border-blue-600 bg-blue-50 text-blue-700'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center justify-center">
                <Link2 className="w-5 h-5 mr-2" />
                <span className="font-medium">Search by LinkedIn URL</span>
              </div>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {searchMethod === 'manual' ? (
              <>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter full name..."
                      required={searchMethod === 'manual'}
                    />
                  </div>
                  <div>
                    <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">
                      Company Name
                    </label>
                    <input
                      type="text"
                      id="companyName"
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter company name..."
                      required={searchMethod === 'manual'}
                    />
                  </div>
                </div>
              </>
            ) : (
              <div>
                <label htmlFor="linkedinUrl" className="block text-sm font-medium text-gray-700 mb-1">
                  LinkedIn Profile URL
                </label>
                <input
                  type="url"
                  id="linkedinUrl"
                  value={formData.linkedinUrl}
                  onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="https://www.linkedin.com/in/username"
                  required={searchMethod === 'linkedin'}
                />
              </div>
            )}

            <button
              type="submit"
              disabled={isSearching}
              className="w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isSearching ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                  Searching...
                </div>
              ) : (
                <div className="flex items-center">
                  Find Contact Info
                  <ArrowRight className="ml-2 w-5 h-5" />
                </div>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}