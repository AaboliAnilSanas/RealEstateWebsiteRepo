import React from 'react'

const UploadFile = ({ value, onChange, isRequired, error, isMobile = false }) => {
  const handleFileChange = (e) => {
    const files = e.target.files;
    
    // Convert FileList to Array and store it
    if (onChange && files) {
      const filesArray = Array.from(files);
      onChange(filesArray);
    }
  };

  // Check if we have files - handle both Array and FileList
  const hasFiles = value && (
    (Array.isArray(value) && value.length > 0) || 
    (value instanceof FileList && value.length > 0)
  );

  // Get file count
  const fileCount = value ? (Array.isArray(value) ? value.length : value.length) : 0;

  return (
    <div className="w-full">
      <input
        type="file"
        multiple
        onChange={handleFileChange}
        className={`block w-full text-sm text-gray-500 border rounded-lg cursor-pointer bg-white focus:outline-none transition-all file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-[var(--primary-color)] file:text-white hover:file:bg-[var(--primary-color-light)] ${
          error
            ? "border-red-500 ring-2 ring-red-200 bg-red-50"
            : "border-gray-300 focus:ring-2 focus:ring-[var(--primary-color-light)]"
        }`}
      />
      
      {/* Show uploaded files count */}
      {hasFiles && (
        <div className="mt-2 text-sm text-green-600 bg-green-50 px-3 py-2 rounded-lg">
          ✅ {fileCount} file(s) uploaded successfully
        </div>
      )}
      
      {/* Debug info */}
      <div className="mt-1 text-xs text-gray-500">
        Debug: {hasFiles ? `${fileCount} files (${Array.isArray(value) ? 'Array' : 'FileList'})` : 'No files'} | Required: {isRequired ? 'Yes' : 'No'}
      </div>
    </div>
  )
}

export default UploadFile