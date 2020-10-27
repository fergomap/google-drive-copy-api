import Folder from './folder';

export default interface User {
    id: string;
    name: string;
    email: string;
    avatar: string;
    rootFolderId: string;
    password: string;
    rootFolder: Folder;
}
