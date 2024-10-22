import React, { useState } from 'react';

export default function QuickNote() {
  const [formData, setFormData] = useState({
    Course: '',
    Date: '',
    Title: '',
    Language: '',
    Content: '',
    Important: ''
  });
  const [successMessage, setSuccessMessage] = useState('');  // State to handle the success message

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:3000/api/create/createNote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      console.log('Note saved successfully:', data);
      setSuccessMessage('Note created successfully!');  // Set the success message
      setFormData({  // Clear the form fields
        Course: '',
        Date: '',
        Title: '',
        Language: '',
        Content: '',
        Important: ''
      });
    } catch (error) {
      console.error('Error:', error.message);
      setSuccessMessage('Error creating note, please try again.');  // Set an error message
    }
  };

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold p-3'>Quick Note</h1>
      <form onSubmit={handleSave} className='flex flex-col gap-4 p-5'>
        
        <label htmlFor='Course' className='text-lg font-medium'>Course:</label>
        <input 
          type="text" 
          placeholder='Type your course' 
          id='Course' 
          className='bg-slate-200 p-3 rounded-lg' 
          value={formData.Course}
          onChange={handleChange} 
        />
        
        <label htmlFor='Date' className='text-lg font-medium'>Date:</label>
        <input 
          type="date" 
          id='Date' 
          className='bg-slate-200 p-3 rounded-lg' 
          value={formData.Date}
          onChange={handleChange} 
        />
        
        <label htmlFor='Title' className='text-lg font-medium'>Title:</label>
        <input 
          type="text" 
          placeholder='Type title' 
          id='Title' 
          className='bg-slate-200 p-3 rounded-lg' 
          value={formData.Title}
          onChange={handleChange} 
        />
        
        <label htmlFor='Language' className='text-lg font-medium'>Language:</label>
        <select 
          id='Language' 
          className='bg-slate-200 p-3 rounded-lg'
          value={formData.Language}
          onChange={handleChange}
        >
          <option value="">Select Language</option>
          <option value="PYTHON">Python</option>
          <option value="C++">C++</option>
          <option value="JAVA">Java</option>
        </select>
        
        <label htmlFor='Content' className='text-lg font-medium'>Content:</label>
        <textarea 
          id='Content' 
          placeholder='Content' 
          className='bg-slate-200 p-3 rounded-lg' 
          maxLength={5000} 
          rows={10} 
          value={formData.Content}
          onChange={handleChange}
        ></textarea>

        <label htmlFor='Important' className='text-lg font-medium'>Important:</label>
        <textarea 
          id='Important' 
          placeholder='Important points' 
          className='bg-slate-200 p-3 rounded-lg' 
          maxLength={3000} 
          rows={7}
          value={formData.Important}
          onChange={handleChange}
        ></textarea>

        <button 
          type='submit'
          className='bg-green-700 text-xl text-center text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 font-semibold'
        >
          Save
        </button>
      </form>

      {successMessage && (  // Conditionally render the success message
        <div className='mt-4 p-3 text-center bg-green-100 text-green-700 rounded-lg'>
          {successMessage}
        </div>
      )}
    </div>
  );
}
