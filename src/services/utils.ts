import Folder from '../model/folder';

export const searchFolder = (rootFolder: Folder, folderId: string = ''): Folder | undefined => {
    if (rootFolder?.id === folderId) {
        return rootFolder;
    }

    for (const folder of rootFolder.folders) {
        const foundFolder =  searchFolder(folder, folderId);

        if (foundFolder) {
            return foundFolder;
        }
    }
};
