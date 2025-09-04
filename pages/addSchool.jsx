// File: pages/addSchool.jsx

import { useForm } from 'react-hook-form';
import { useState } from 'react';

export default function AddSchoolPage() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [status, setStatus] = useState(null);
  const [fileName, setFileName] = useState('');

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
    } else {
      setFileName('');
    }
  };

 const onSubmit = async (data) => {
  setStatus({ message: 'Submitting...', type: 'info' });

  // FormData is essential for file uploads
  const formData = new FormData();

  // Append text fields (except the image)
  Object.keys(data).forEach((key) => {
    if (key !== 'image') {
      formData.append(key, data[key]);
    }
  });

  // Attach the actual file to the request (if selected)
  if (data.image && data.image[0]) {
    formData.append('image', data.image[0]);
  }

  try {
    const response = await fetch('/api/addSchool', {
      method: 'POST',
      body: formData, // Send formData, NOT JSON
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.message);

    setStatus({ message: 'School added successfully!', type: 'success' });
    reset();        // Clear form inputs
    setFileName(''); // Clear the file name display
  } catch (error) {
    setStatus({ message: `Failed to add school: ${error.message}`, type: 'error' });
  }
};


  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-lg w-full bg-white p-6 md:p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Add a New School</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          
          {/* Text inputs remain the same */}
          <input {...register("name", { required: "Name is required" })} placeholder="School Name" className="w-full p-2 border border-gray-300 rounded" />
          {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
          <input {...register("address", { required: "Address is required" })} placeholder="Address" className="w-full p-2 border border-gray-300 rounded" />
          {errors.address && <p className="text-sm text-red-500">{errors.address.message}</p>}
          <input {...register("city", { required: "City is required" })} placeholder="City" className="w-full p-2 border border-gray-300 rounded" />
          {errors.city && <p className="text-sm text-red-500">{errors.city.message}</p>}
          <input {...register("state", { required: "State is required" })} placeholder="State" className="w-full p-2 border border-gray-300 rounded" />
          {errors.state && <p className="text-sm text-red-500">{errors.state.message}</p>}
          <input {...register("contact", { required: "Contact number is required" })} placeholder="Contact Number" type="tel" className="w-full p-2 border border-gray-300 rounded" />
          {errors.contact && <p className="text-sm text-red-500">{errors.contact.message}</p>}
          <input {...register("email_id", { required: "Email is required", pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" } })} placeholder="Email ID" className="w-full p-2 border border-gray-300 rounded" />
          {errors.email_id && <p className="text-sm text-red-500">{errors.email_id.message}</p>}

          {/* New File Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">School Image</label>
            <div className="mt-1 flex items-center">
              <label htmlFor="file-upload" className="cursor-pointer bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50">
                <span>Upload a file</span>
                <input id="file-upload" {...register("image")} type="file" className="sr-only" onChange={handleFileChange} />
              </label>
              {fileName && <span className="ml-3 text-sm text-gray-500">{fileName}</span>}
            </div>
          </div>

          <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">Add School</button>
        </form>
        {status && (
          <p className={`mt-4 text-center p-2 rounded-md text-sm ${status.type === 'success' ? 'bg-green-100 text-green-800' : status.type === 'error' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'}`}>
            {status.message}
          </p>
        )}
      </div>
    </div>
  );
}