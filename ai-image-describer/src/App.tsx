import React, { useState, useEffect } from 'react';
import FolderManagerModal from './FolderManagerModal';
import ImageCard from './ImageCard';

const App: React.FC = () => {
  const [isFolderModalOpen, setIsFolderModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    const fetchedImages = await window.electronAPI.getImages();
    setImages(fetchedImages);
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <div className="flex h-screen">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-800 p-4 flex flex-col">
          <h1 className="text-xl font-bold mb-4">AI Image Describer</h1>
          <div className="flex-grow">
            {/* Collections will go here */}
          </div>
          <button
            onClick={() => setIsFolderModalOpen(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Manage Folders
          </button>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4">
          <FolderManagerModal isOpen={isFolderModalOpen} onClose={async () => {
            setIsFolderModalOpen(false);
            await fetchImages();
          }} />
          {/* Top bar with search and filters will go here */}
          <div className="mb-4 flex items-center">
            <input
              type="text"
              placeholder="Search..."
              className="bg-gray-700 p-2 rounded w-full mr-2"
            />
            <button onClick={fetchImages} className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded">
              Refresh
            </button>
          </div>

          {/* Image Grid */}
          <div className="grid grid-cols-5 gap-4">
            {images.map((image) => (
              <ImageCard key={image} imagePath={image} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
