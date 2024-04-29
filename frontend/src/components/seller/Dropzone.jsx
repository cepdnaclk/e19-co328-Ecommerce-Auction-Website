import { AiFillCloseCircle } from "react-icons/ai"; 

import { useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { ArrowUpTrayIcon, XMarkIcon } from '@heroicons/react/24/solid'
import { Box } from "@mui/material";


const Dropzone = ({ onDrop, files, rejected, removeRejected, removeFile }) => {
   

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': []
    },
    maxSize: 1024 * 1000,
    onDrop
  })

  useEffect(() => {
    // Revoke the data uris to avoid memory leaks
    return () => files.forEach(file => URL.revokeObjectURL(file.preview))
  }, [files])

  

  


  const handleSubmit = async e => {
    e.preventDefault()

    if (!files?.length) return

    const formData = new FormData()
    files.forEach(file => formData.append('file', file))
    formData.append('upload_preset', 'friendsbook')

    const URL = process.env.NEXT_PUBLIC_CLOUDINARY_URL
    const data = await fetch(URL, {
      method: 'POST',
      body: formData
    }).then(res => res.json())

    console.log(data)
  }

  return (
    <Box sx={{ gridColumn: "span 4"}}>
      <Box sx={{ border: '1px dashed grey', padding:'20px',backgroundColor:'#eeeeee' }}
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <div className='flex flex-col items-center justify-center gap-4'>
          <ArrowUpTrayIcon className='w-5 h-5 fill-current' />
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <p>Drag & drop files here, or click to select files</p>
          )}
        </div>
      </Box>

      {/* Preview */}
      <section className='mt-10'>

        {/* accepted files preview */}
        <ul className='mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-10'>
          {files.map(file => (
            <li key={file.name} className='relative h-32 rounded-md shadow-lg'>
              <img
                src={file.preview}
                alt={file.name}
                width="500px"
                height="100px"
                onLoad={() => {
                  URL.revokeObjectURL(file.preview)
                }}
                className='h-full w-full object-contain rounded-md'
              />
              <button
                type='button'
                className='w-7 h-7 border border-secondary-400 bg-secondary-400 rounded-full flex justify-center items-center absolute -top-3 -right-3 hover:bg-white transition-colors'
                onClick={() => removeFile(file.name)}
              >
                <AiFillCloseCircle size={100} color="red" className='hover:fill-secondary-400 transition-colors'/>
              </button>
              <p className='mt-2 text-neutral-500 text-[12px] font-medium'>
                {file.name}
              </p>
            </li>
          ))}
        </ul>

        {/* Rejected Files */}
        
      </section>
    </Box>
  )
}

export default Dropzone