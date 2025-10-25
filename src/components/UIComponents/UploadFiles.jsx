import React from 'react'

const UploadFile = ({ value, onChange, isRequired, error }) => {
  return (
    <input
      type="file"
      multiple
      onChange={(e) => onChange && onChange(e.target.files)}
      className={`block w-full text-[var(--small-text)] border rounded-lg cursor-pointer bg-white focus:outline-none transition-all file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-[var(--primary-color)] file:text-white hover:file:bg-[var(--primary-color-light)] ${
        error
          ? "border-red-500 ring-2 ring-red-200"
          : "border-gray-300 focus:ring-2 focus:ring-[var(--primary-color-light)]"
      }`}
    />
  )
}

export default UploadFile