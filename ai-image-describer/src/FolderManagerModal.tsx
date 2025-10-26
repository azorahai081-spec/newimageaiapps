import React, { useState, useEffect } from 'react';

interface FolderManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FolderManagerModal: React.FC<FolderManagerModalProps> = ({ isOpen, onClose }) => {
  const [folders, setFolders] = useState<{ id: number; path: string }[]>([]);

  useEffect(() => {
    if (isOpen) {
      fetchFolders();
    }
  }, [isOpen]);

  const fetchFolders = async () => {
    const fetchedFolders = await window.electronAPI.getFolders();
    setFolders(fetchedFolders);
  };

  const handleAddFolder = async () => {
    const folderPath = await window.electronAPI.openFolderDialog();
    if (folderPath) {
      await window.electronAPI.addFolder(folderPath);
      fetchFolders();
    }
  };

  const handleRemoveFolder = async (folderId: number) => {
    await window.electronAPI.removeFolder(folderId);
    fetchFolders();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-gray-800 p-6 rounded-lg w-1/2">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Manage Folders</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">&times;</button>
        </div>
        <div>
          <div className="mb-4">
            {folders.map((folder) => (
              <div key={folder.id} className="flex items-center justify-between bg-gray-700 p-2 rounded mb-2">
                <span>{folder.path}</span>
                <button onClick={() => handleRemoveFolder(folder.id)} className="text-red-500 hover:text-red-400">Remove</button>
              </div>
            ))}
          </div>
          <div className="flex justify-end">
            <button
              onClick={handleAddFolder}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
            >
              Add Folder
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FolderManagerModal;
