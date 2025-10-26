export interface IElectronAPI {
  openFolderDialog: () => Promise<string | undefined>;
  addFolder: (folderPath: string) => Promise<void>;
  getFolders: () => Promise<{ id: number; path: string }[]>;
  removeFolder: (folderId: number) => Promise<void>;
  getImages: () => Promise<string[]>;
  getImage: (imagePath: string) => Promise<{ id: number; path: string; description: string }>;
  updateImageDescription: (imagePath: string, description: string) => Promise<void>;
}

declare global {
  interface Window {
    electronAPI: IElectronAPI;
  }
}
