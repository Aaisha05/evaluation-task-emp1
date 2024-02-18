import React, { useState, useEffect, useRef } from 'react';
import { FaTrash } from 'react-icons/fa';
import axios from 'axios';
import { Link } from 'react-router-dom';

//style={{ backgroundColor: 'rgb(226, 239, 250)' }} light blue

const Dashboard = () => {
  const [values, setValues] = useState({
    name: '',
    gender: '',
    dob: '',
    age: '',
    department: '',
    phone: ''
  });

  const [slotDetails, setSlotDetails] = useState([]);
  const [showDetailsTable, setShowDetailsTable] = useState(false);
  const showDetailsTableRef = useRef(null);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://192.168.1.11:5000/slots', values)
      .then(res => {
        console.log(res);
        if (res.data.data === 'okay') {
          alert('Submitted');
        } else {
          alert(`${res.data.sqlMessage}`);
        }
      })
      .catch(err => console.log(err));
  };

  const handleViewDetails = () => {
    axios.get('http://192.168.1.11:5000/slots')
      .then(res => {
        setSlotDetails(res.data);
        setShowDetailsTable(true);
      })
      .catch(err => console.log(err));
  };

  const handleHideDetails = () => {
    setShowDetailsTable(false);
  };

  const handleDelete = (slotId) => {
    axios.delete(`http://192.168.1.11:5000/slots/${slotId}`)
      .then(res => {
        console.log(res);
        setSlotDetails(prevDetails => prevDetails.filter(slot => slot.slot_id !== slotId));
        alert('Slot deleted successfully');
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    // Scroll to the showDetailsTable when it becomes visible
    if (showDetailsTable) {
      showDetailsTableRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [showDetailsTable]);

  return (
    <div className="relative">
      <div className='flex items-center justify-between bg-gray-100 p-4'>
        <h1 className='text-3xl font-bold  lg:text-5xl lg:font-semibold text-black'>co<span style={{ color: 'rgb(7, 90, 158)' }}>V</span>ac</h1>
        <Link to="/" className='text-white bg-black px-4 py-2 rounded'>Logout</Link>
      </div>

      <h1 className='lg:text-3xl md:text-2xl sm:text-2xl text-2xl font-semibold text-black mb-2 lg:mb-4 mt-6 pl-4 md:pl-8 lg:pl-12 sm:pl-4'>
        Welcome <span style={{ color: 'rgb(7, 90, 158)' }}>Admin!</span>
      </h1>

      <p className='text-base sm:text-base lg:text-lg text-black ml-4 mb-14 pl-2  md:pl-8 lg:pl-10 sm:pl-2'>
        Enter the slot details by filling in the required fields.
      </p>
<div className='flex flex-col md:flex-row md:gap-x-4'>
  
        <form onSubmit={handleSubmit} className="lg:ml-15 max-w-md mx-auto sm:max-w-lg lg:max-w-3xl bg-white p-8 border border-gray-300 rounded mb-4 md:mb-0">
          <div className='mb-4 flex flex-wrap'>
            <div className='w-full lg:w-1/2 lg:pr-2'>
              <label className='text-gray-700'>Name:</label>
              <input
                className='input1 border border-gray-300 p-2 rounded w-full'
                type="text"
                name="name"
                onChange={handleChange}
              />
            </div>
            <div className='w-full lg:w-1/2 lg:pl-2'>
  <label className='text-gray-700'>Gender:</label>
  <select
    className='input1 border border-gray-300 p-2 rounded w-full'
    name="gender"
    onChange={handleChange}
  >
    <option value="">Select Gender</option>
    <option value="female">Female</option>
    <option value="male">Male</option>
    <option value="others">Others</option>
  </select>
</div>

          </div>
  
          <div className='mb-4 flex flex-wrap'>
            <div className='w-full lg:w-1/2 lg:pr-2'>
              <label className='text-gray-700'>Date of Birth:</label>
              <input
                className='input1 border border-gray-300 p-2 rounded w-full'
                type="date"
                name="dob"
                onChange={handleChange}
              />
            </div>
            <div className='w-full lg:w-1/2 lg:pl-2'>
              <label className='text-gray-700'>Age:</label>
              <input
                className='input1 border border-gray-300 p-2 rounded w-full'
                type="text"
                name="age"
                onChange={handleChange}
              />
            </div>
          </div>
  
          <div className='w-full lg:w-1/2 lg:pl-2'>
  <label className='text-gray-700'>Department:</label>
  <select
    className='input1 border border-gray-300 p-2 rounded w-full'
    name="gender"
    onChange={handleChange}
  >
    <option value="">Select Department</option>
    <option value="female">IT</option>
    <option value="male">CSE</option>
    <option value="others">CSBS</option>
    <option value="others">ECE</option>
    <option value="others">EEE</option>
  </select>
</div>

  
          <div className='mb-4'>
            <label className='text-gray-700'>Phone:</label>
            <input
              className='input1 border border-gray-300 p-2 rounded w-full'
              type="text"
              name="phone"
              onChange={handleChange}
            />
          </div>
  
          <div className=' flex justify-center'>
            <button className='sub bg-black text-white py-2 px-4 rounded w-80 mt-4' type='submit'>Submit</button>
          </div>
        </form>
  
        {/* Right side box */}
        <div className="right_box lg:mr-60 p-8  rounded mb-4 md:ml-0 md:mt-4">
          <div className="mb-2">
          <h1 className='font-semibold text-2xl lg:text-4xl text-black mb-2 lg:mb-4' >View other details</h1>
          <p className="text-gray-700 text-normal lg:text-lg mb-4">Click this to view and edit all the previous details.</p>
          <button className='text-white bg-black px-4 py-2 rounded mt-4'style={{ backgroundColor: 'rgb(7, 90, 158)' }} onClick={handleViewDetails}>View all Slot Details</button>
          </div>
        </div>
</div>


{/* Slot details table */}
<div className="lg:mx-60 lg:mt-32">
  <div ref={showDetailsTableRef} className={` ${showDetailsTable ? 'view' : 'view hidden'}`}>
    {showDetailsTable && (
      <div>
        <h2 className='text-center text-2xl lg:text-3xl font-semibold mb-8 lg:mb-12 mt-6' >Previous Details:</h2>
        <div className="overflow-x-auto">
          <table className='w-full mb-4 table-auto border-collapse'>
            <thead>
            <tr className="bg-black text-white">
                <th className="border font-normal border-gray-300 px-4 py-4">Name</th>
                <th className="border font-normal border-gray-300 px-4 py-4">Gender</th>
                <th className="border font-normal border-gray-300 px-4 py-4">DOB</th>
                <th className="border font-normal border-gray-300 px-4 py-4">Age</th>
                <th className="border font-normal border-gray-300 px-4 py-4">Department</th>
                <th className="border font-normal border-gray-300 px-4 py-4">Phone</th>
                
              </tr>
            </thead>
            <tbody>
            {slotDetails.map((slot, index) => (
                <tr key={index} className="bg-white">
                  <td className="border border-gray-300 px-4 py-2">{slot.name}</td>
                  <td className="border border-gray-300 px-4 py-2">{slot.gender}</td>
                  <td className="border border-gray-300 px-4 py-2">{slot.dob}</td>
                  <td className="border border-gray-300 px-4 py-2">{slot.age}</td>
                  <td className="border border-gray-300 px-4 py-2">{slot.department}</td>
                  <td className="border border-gray-300 px-4 py-2">{slot.phone}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button className="delete-button" onClick={() => handleDelete(slot.slot_id)}>
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {showDetailsTable && (
          <div className="flex justify-center">
            <button className='text-white bg-black px-4 py-2 rounded mt-8 lg:mt-4 mb-40' onClick={handleHideDetails}>Hide details</button>
          </div>
        )}
      </div>
    )}
  </div>
</div>
    </div>
  );
};

export default Dashboard;






