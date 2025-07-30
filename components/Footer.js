import React from 'react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-gray-700 py-6 mt-12">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <p className="text-gray-400 text-sm">
          © {new Date().getFullYear()} Justin Yun. All rights reserved.
        </p>
      </div>
    </footer>
  );
}