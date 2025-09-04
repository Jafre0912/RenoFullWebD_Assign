// File: pages/index.js

import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center text-center p-4">
      <div className="bg-white p-10 rounded-lg shadow-md">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Reno Platforms Assignment
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Project by Jafre
        </p>
        <div className="space-x-4">
          <Link href="/addSchool" legacyBehavior>
            <a className="bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-300">
              Add a School
            </a>
          </Link>
          <Link href="/showSchools" legacyBehavior>
            <a className="bg-green-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-green-700 transition duration-300">
              Show All Schools
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}