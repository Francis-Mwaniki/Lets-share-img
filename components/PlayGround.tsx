import { Delete, Edit, EditIcon, Share, TrashIcon, ZoomIn } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Input } from './ui/input';
import { Badge } from "@/components/ui/badge"

type ImageInfo = {
  src: string;
  name: string;
  time: string;
  length: number;
};

const PlayGround = () => {
  const [isRecentlyAdded, setIsRecentlyAdded] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);
  const [images, setImages] = useState<ImageInfo[]>([]);
   const [isZoom, setZoom]= useState(false)
   const [zoomedIndex, setZoomedIndex] = useState<number | null>(null);
 /* highlight recently 1 min ago */
 const highlightRecent = (time: string, index: number | string ) => {
   if (index === highlightedIndex) {
    return true;
  }
  const currentTime = new Date().toLocaleString();
  const timeDiff = new Date(currentTime).getTime() - new Date(time).getTime();
  const minDiff = Math.round(timeDiff / 60000);
  if (minDiff <= 1) {
    setIsRecentlyAdded(true);

    return true;
  }
  if (minDiff > 1) {
    setIsRecentlyAdded(false);
    return false;
  }
}
useEffect(() => {
  if (isRecentlyAdded) {
    setTimeout(() => {
      setIsRecentlyAdded(false);
    }, 1000);
  }

}
, [isRecentlyAdded]);
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
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
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageDataUrl = reader.result as string;
        const currentTime = new Date().toLocaleString(); // Get the current time
        const imageName = selectedFile.name; // Get the file name
        const currentIndex = images.length;
        setHighlightedIndex(currentIndex);
         highlightRecent(currentTime, currentIndex);
        setImages((prevImages) => [
          ...prevImages,
          { src: imageDataUrl, name: imageName, time: currentTime, length: images.length },
        ]);
         
      };
      reader.readAsDataURL(selectedFile);
    }
  };
  const handleDelete = (index: number) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
    toast.success('Image deleted...', {
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
  const handleUpdate = (index: number) => {
    const updatedImages = [...images];
    updatedImages[index].name = "Updated";
    setImages(updatedImages);
  }

  const grabIndex = (index: number) => {
    const currentIndex = index;
    return currentIndex;
  }
 

  const handleZoom = (index: number) => {
    toast.success('click anywhere to zoom out..', {
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
    /* zoom */
    if (index === zoomedIndex) {
      setZoomedIndex(null);
    } else {
      setZoomedIndex(index);
    }
     const zoom = document.createElement("div");
      zoom.classList.add("zoom");
      document.body.appendChild(zoom);
      const img = document.createElement("img");
      img.src = images[index].src;
      img.className=`fixed top-[0px] object-contain bottom-[10px] right-0 left-0 mx-auto z-20 w-[100%] h-[100%]`
      zoom.appendChild(img);
      /* styles  */

      zoom.addEventListener("click", () => {
        zoom.remove();
      });
      /* zoom */

  }

  const handleShare = (index: number) => {
    // toast.success('Sharing...', {
    //   style: {
    //     border: '1px solid #713200',
    //     padding: '16px',
    //     color: '#713200',
    //   },
    //   iconTheme: {
    //     primary: '#713200',
    //     secondary: '#FFFAEE',
    //   },
    // });
    const shareData = {
      title: 'Image',
      text: 'Image',
      url: images[index].src,
    };
    /* share as blob */
    const blob = new Blob([images[index].src], { type: 'image/*' });
    const filesArray = [
      new File([blob], images[index].name, { type: 'image/*' }),
    ];
    if (navigator.canShare && navigator.canShare({ files: filesArray })) {
      navigator
        .share({
          files: filesArray,
          title: 'Image',
          text: 'Image',
        })
        .then(() => {
          toast.success('Image shared successfully', {
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
        })
        .catch((error) => {
          toast.error('Sharing failed', {
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
        });
    } else {
      
       toast.error('Your browser does not support sharing files....', {
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
  }
  useEffect(() => {
    const zoomedImg = document.querySelector('.zoomed-img');

    if (zoomedImg) {
      if (zoomedIndex !== null) {
        zoomedImg.classList.add('cursor-zoom-out');
      } else {
        zoomedImg.classList.remove('cursor-zoom-out');
      }
    }
  }, [zoomedIndex]);
  return (
    <div className="flex flex-col gap-2 justify-center items-center sm:mx-auto">
     <label htmlFor="fileInput" className=" flex smooth justify-center items-center mx-auto gap-x-1 bg-neutral-900 dark:bg-neutral-100 dark:text-black text-white text-center py-3 px-5 hover:bg-neutral-700 rounded cursor-pointer mb-4">
        Upload Image
        <Edit />
      </label>
      <Input id="fileInput" type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
      <div className=" sm:mx-auto mx-2 sm:w-full  "> 
        {images.map((image, index) => (
          /* highlight recently added image */
          
          <div key={index} className={`flex justify-between items-center p-2 border mx-3 rounded-lg relative group shadow-lg  shadow-black  min-w-[70%] sm:w-[500px] w-[350px] gap-y-4 ${isRecentlyAdded ? 'animate-pulse border border-blue-700' : ''}`}  >
             {
                index === highlightedIndex && (
                  <div className="absolute top-0 left-0 w-full h-full bg-blue-700 bg-opacity-20 rounded-lg border border-blue-800"></div>
                )
              }
           <div key={index} className="relative" onClick={() => handleZoom(index)}>
            <img
               onInput={() => grabIndex(index)}
              src={image.src}
              alt={`Uploaded ${index}`}
              className={`w-20 h-20 object-cover rounded-md shadow-md cursor-pointer ${
                index === zoomedIndex ? 'zoomed-img' : ''
              }`}
            />
            </div>
            <div className="flex flex-col gap-1 group-hover:hidden px-4">
              <p className="text-sm font-semibold">{image.name}</p>
              <p className="text-xs text-gray-500">{image.time}</p>
              {
                index === highlightedIndex && (
                  <Badge className="absolute top-0 right-0 rounded  bg-blue-700 text-white text-xs p-2">New</Badge>
                )
              }
            </div>
            <div className="hidden group-hover:flex gap-2 transition-all  duration-700 smooth  justify-center items-center  mr-7">
              {/* Update, Delete, Zoom controllers */}
              <button onClick={() => handleUpdate(index)}>
                  <EditIcon />
              </button>
              <button onClick={() => handleDelete(index)}>
                <TrashIcon />
              </button>
              <button onClick={() => handleZoom(index)}>
                <ZoomIn />
              </button>
              {/* if mobile enable sharing */}
              <button className="flex" onClick={() => handleShare(index)}>
                <Share />
              </button>
            </div>
          </div>
        ))}
      </div>
      {
        images.length === 0 && (
          <div className="flex flex-col justify-center items-center gap-y-2">
            <p className="text-2xl font-bold">No Images Found</p>
            <p className="text-lg font-semibold">Upload your images to get started</p>
          </div>
        )
      }
    </div>
  );
};

export default PlayGround;
