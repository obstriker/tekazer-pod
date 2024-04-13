"use client"
import React, { useState } from 'react';
import PodPopup from './PodPopup';

const Moda = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {/* Modal toggle button */}
      <button onClick={toggleModal} className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
        Toggle modal
      </button>

      {/* Modal */}
      {isOpen && <PodPopup toggle={toggleModal}/>}
            </div>)
};

export default Moda;