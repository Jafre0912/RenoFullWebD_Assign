// File: pages/showSchools.jsx

import { useEffect, useState } from 'react';
import Image from 'next/image'; // We use the optimized Next.js Image component

// This is the component for a single school "product card"
const SchoolCard = ({ school }) => (
  <div className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden transform hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
    
    {/* --- THIS IS THE IMAGE SECTION --- */}
    <div className="relative w-full h-48 bg-gray-200">
      <Image
        // It uses the 'image' path from your database.
        // If that path is missing, it uses a default image.
        src={school.image || '/schoolImages/default.jpg'} 
        alt={`Image of ${school.name}`}
        layout="fill"
        objectFit="cover"
      />
    </div>
    
    {/* School Details */}
    <div className="p-4">
      <h3 className="text-lg font-bold text-gray-800 truncate" title={school.name}>
        {school.name}
      </h3>
      <p className="text-sm text-gray-600 mt-1 truncate">
        <span className="font-semibold">Address:</span> {school.address}
      </p>
      <p className="text-sm text-gray-600">
        <span className="font-semibold">City:</span> {school.city}
      </p>
    </div>
  </div>
);

// This is the main page component that displays the grid of cards
export default function ShowSchoolsPage() {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchSchools() {
      try {
        const response = await fetch('/api/getSchools');
        if (!response.ok) throw new Error('Data could not be fetched.');
        const data = await response.json();
        setSchools(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchSchools();
  }, []);

  if (loading) return <p className="text-center text-gray-500 mt-10">Loading schools...</p>;
  if (error) return <p className="text-center mt-10 text-red-600">Error: {error}</p>;
  if (schools.length === 0) return <p className="text-center mt-10 text-gray-700">No schools found.</p>;

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Available Schools</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {schools.map((school) => (
            <SchoolCard key={school.id} school={school} />
          ))}
        </div>
      </div>
    </div>
  );
}