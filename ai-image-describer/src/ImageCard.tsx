import React, { useState, useEffect } from 'react';

interface ImageCardProps {
  imagePath: string;
}

const ImageCard: React.FC<ImageCardProps> = ({ imagePath }) => {
  const [description, setDescription] = useState('');
  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    fetchImage();
  }, [imagePath]);

  const fetchImage = async () => {
    const image = await window.electronAPI.getImage(imagePath);
    setDescription(image.description || '');
  };

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newDescription = event.target.value;
    setDescription(newDescription);

    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    const timeout = setTimeout(() => {
      window.electronAPI.updateImageDescription(imagePath, newDescription);
    }, 500); // 500ms debounce

    setDebounceTimeout(timeout);
  };

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden">
      <img src={`file://${imagePath}`} alt={imagePath} className="w-full h-auto" />
      <div className="p-2">
        <textarea
          value={description}
          onChange={handleDescriptionChange}
          className="bg-gray-700 text-white p-2 rounded w-full text-sm"
          placeholder="Enter description..."
        />
      </div>
    </div>
  );
};

export default ImageCard;
