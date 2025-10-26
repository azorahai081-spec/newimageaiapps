import React, { useState, useEffect } from 'react';
import FolderManagerModal from './FolderManagerModal';
import ImageCard from './ImageCard';
import './index.css'; // Ensure index.css is imported

const App: React.FC = () => {
  const [isFolderModalOpen, setIsFolderModalOpen] = useState(false); // Correct variable name
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
            onClick={() => setIsFolderModalOpen(true)} // Use correct setter
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Manage Folders
          </button>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 overflow-y-auto"> {/* Added overflow-y-auto */}
          <FolderManagerModal
            isOpen={isFolderModalOpen} // Use correct state variable
            onClose={async () => {
              setIsFolderModalOpen(false); // Use correct setter
              await fetchImages(); // Refetch images after closing modal
            }}
          />
          {/* Top bar with search and filters will go here */}
          <div className="mb-4 flex items-center sticky top-0 bg-gray-900 py-2 z-10"> {/* Made top bar sticky */}
            <input
              type="text"
              placeholder="Search..."
              className="bg-gray-700 p-2 rounded w-full mr-2 text-white placeholder-gray-400" // Adjusted input style
            />
            <button
              onClick={fetchImages}
              className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded whitespace-nowrap" // Prevent wrapping
            >
              Refresh
            </button>
            {/* Add Settings button if needed */}
            {/* <button onClick={() => setIsSettingsModalOpen(true)} className="...">Settings</button> */}
          </div>

          {/* Image Grid */}
          {/* Adjusted grid columns for responsiveness */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {images.map((imagePath) => (
              <ImageCard key={imagePath} imagePath={imagePath} />
            ))}
          </div>
        </main>
      </div>
       {/* Render Settings Modal if needed */}
       {/* <SettingsModal isOpen={isSettingsModalOpen} onClose={() => setIsSettingsModalOpen(false)} /> */}
    </div>
  );
};

export default App;
