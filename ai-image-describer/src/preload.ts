const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  openFolderDialog: () => ipcRenderer.invoke('dialog:openFolder'),
  addFolder: (folderPath: string) => ipcRenderer.invoke('db:addFolder', folderPath),
  getFolders: () => ipcRenderer.invoke('db:getFolders'),
  removeFolder: (folderId: number) => ipcRenderer.invoke('db:removeFolder', folderId),
  getImages: () => ipcRenderer.invoke('db:getImages'),
  getImage: (imagePath: string) => ipcRenderer.invoke('db:getImage', imagePath),
  updateImageDescription: (imagePath: string, description: string) =>
    ipcRenderer.invoke('db:updateImageDescription', imagePath, description),
});
