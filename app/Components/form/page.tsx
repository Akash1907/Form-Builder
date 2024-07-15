/* eslint-disable react-hooks/rules-of-hooks */
"use client"
import React from 'react';
import { useState } from 'react';


const Page = ({ isVisible, onClose}:{isVisible:any, onClose:any}) => {
    if(!isVisible) return null;

    const handelClose = (e: any) => {
        if(e.target.id === 'wrapper') onClose();
    }
    interface FormData{
        widgetName : string;
        visualType: string;
        dataSource: string;
        tags: string;
        description : string;
    }
    const initialFormData: FormData = {
        widgetName: '',
        visualType: '',
        dataSource: '',
        tags: '',
        description: ''
};
    const visualTypes = ['Bar Chart', 'Line Chart', 'Pie Chart', 'Table'];
    const dataSource = ['ICCS', 'ICCS Latest']
 const [formData, setFormData] = useState<FormData>(initialFormData);

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  return (
    <div className='fixed inset-0
          bg-black bg-opacity-25 
         backdrop-blur-sm flex
          justify-center items-center' id='wrapper' onClick={(handelClose)}>
        <div className='w-[600px] flex flex-col'>
            <button className='text-white text-xl place-self-end' onClick={() => onClose()}>X</button>
            <div className='bg-white p-2 rounded text-black'>
                <form>
                    <div>
                        <label>Widget Name:</label>
                        <input type="text" />
                    </div>
                    <div>
                        <label htmlFor="visualType">Visual Type:</label>
                        <select name="" id="">
                        <option value="">Select Visual Type</option>
                        {visualTypes.map(type =>(
                            <option key={type} value={type}>{type}</option>
                        ))}
                        </select>
                    </div>
                <div className="mb-4">
                 <label htmlFor="dataSource" className="block text-sm font-medium text-gray-700">Data Source:</label>
                 <select id="dataSource" name="dataSource" value={formData.dataSource} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full">
                  <option value="">Select Data Source</option>
            {dataSource.map(source => (
            <option key={source} value={source}>{source}</option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="tags" className="block text-sm font-medium text-gray-700">Tags:</label>
        <input type="text" id="tags" name="tags" value={formData.tags} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
      </div>
              <div className="mb-4">
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description:</label>
        <textarea id="description" name="description" value={formData.description} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full"></textarea>
      </div>
                </form>

            </div>
        </div>
    </div>
  )
}

export default Page
