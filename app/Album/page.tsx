"use client"
import { Button } from '@/components/ui/button';
import { ArrowUpRight, EditIcon, X } from 'lucide-react';
import Link from 'next/link';
import React, { useState, useRef, ChangeEvent } from 'react';
import toast from 'react-hot-toast';

interface AlbumImage {
  src: string;
  name: string;
  time: string;
}

interface Album {
  name: string;
  images: AlbumImage[];
}

const Album = () => {
    const [albums, setAlbums] = useState<Album[]>([]);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  
    const addImageToAlbum = (albumIndex: number, image: AlbumImage) => {

      setAlbums((prevAlbums) => {
        const updatedAlbums = [...prevAlbums];
        const existingImages = updatedAlbums[albumIndex].images.map(
          (existingImage) => existingImage.src
        );
  
        if (
          updatedAlbums[albumIndex]?.images.length < 20 &&
          !existingImages.includes(image.src)
        ) {
          updatedAlbums[albumIndex].images = [
            ...updatedAlbums[albumIndex].images,
            image,
          ];
        } else if (existingImages.includes(image.src)) {

           return updatedAlbums;
        } else {
            toast.error('You can only add up to 20 per album', {
                style: {
                  border: '1px solid #713200',
                  padding: '16px',
                  color: '#713200',
                },
                iconTheme: {
                  primary: '#713200',
                  secondary: '#FFFAEE',
                },
              });
        }
        return updatedAlbums;
      });
    };
  
    const addAlbum = () => {

      setAlbums((prevAlbums) => [
        ...prevAlbums,
        { name: `Album ${prevAlbums.length + 1}`, images: [] },
      ]);
      toast.success('Album added...', {
        style: {
          border: '1px solid #713200',
          padding: '16px',
          color: '#713200',
        },
        iconTheme: {
          primary: '#713200',
          secondary: '#FFFAEE',
        },
      });
    };

  
    const handleImageUpload = (
      event: ChangeEvent<HTMLInputElement>,
      albumIndex: number
    ) => {
      const selectedFile = event.target.files?.[0];
      if (selectedFile) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const imageDataUrl = reader.result as string;
          const currentTime = new Date().toLocaleString();
          const imageName = selectedFile.name;
          const newImage = { src: imageDataUrl, name: imageName, time: currentTime };
          addImageToAlbum(albumIndex, newImage);
        };
        toast.success('Added to album list..', {
            style: {
              border: '1px solid #713200',
              padding: '16px',
              color: '#713200',
            },
            iconTheme: {
              primary: '#713200',
              secondary: '#FFFAEE',
            },
          });
        reader.readAsDataURL(selectedFile);
      }
    };

  return (
    <div className="sm:max-w-2xl max-w-xl sm:mx-auto mx-3 p-4 flex justify-center items-center  flex-col">
      {/* Render albums and associated images */}
      <Button onClick={addAlbum} className='flex smooth justify-center items-center mx-auto gap-x-1 bg-neutral-900 dark:bg-neutral-100 dark:text-black text-white text-center py-4 px-5 hover:bg-neutral-700 rounded cursor-pointer my-4'>Add Album
       <EditIcon size={24} />
      </Button>
       <h4 className="text-center text-2xl font-bold my-4 smooth">Albums</h4>
        <p className="text-center text-sm font-bold my-4 smooth">
            Add upto 20 images per album
        </p>
      <div className="my-4 relative" />
      
      {albums.map((album, albumIndex) => (
        <div key={albumIndex} className="flex justify-center flex-row flex-wrap items-center p-2 border mx-3 rounded-lg relative group shadow-lg  shadow-black  min-w-[70%] sm:w-[500px] w-[100%] gap-y-4 gap-x-3">
              {/* remove album */}
          <span className="top-0 right-0 rounded   m-1 dark:text-white text-black text-xs p-2 absolute cursor-pointer"
              onClick={() => {
                setAlbums((prevAlbums) =>
                  prevAlbums.filter((_, index) => index !== albumIndex)
                );
              }}
            >
                <X size={24} />
            </span>
          <h2>{album.name}</h2>
          <div className="flex justify-center flex-row flex-wrap items-center p-2 border mx-3 rounded-lg relative group shadow-lg  shadow-black  min-w-[70%] sm:w-[500px] w-[100%] gap-y-4">
        
            {/* Add button to upload image to this album */}
            <input
              ref={(el) => (inputRefs.current[albumIndex] = el)}
              key={`fileInput-${albumIndex}`} // Unique key for each file input
              type="file"
              accept="image/*"
              className='flex justify-center items-center mx-auto gap-x-1 bg-neutral-900 dark:bg-neutral-100 dark:text-black text-white text-center py-3 px-5 hover:bg-neutral-700 rounded cursor-pointer mb-4'
              onChange={(event) => handleImageUpload(event, albumIndex)}
            />
            
          </div>
          {album.images.map((image, imageIndex) => (
              <div key={imageIndex} className="relative">
                <img
                  src={image.src}
                  alt={image.name}
                  className="w-20 h-20 object-cover rounded-md shadow-md cursor-pointer"
                />
                {/* Additional overlay or details */}
              </div>
            ))}
        </div>
      ))}
      
      <div className="my-4 relative" />
            {/* go home */}
        <Link href="/" className="flex justify-center items-center mx-auto gap-x-1 bg-neutral-900 dark:bg-neutral-100 dark:text-black text-white text-center py-3 px-5 hover:bg-neutral-700 rounded cursor-pointer mb-4 fixed bottom-1 right-1 smooth">
            Go Home
                <ArrowUpRight size={24} />
        </Link>
   
    </div>
  );
};

export default Album;
