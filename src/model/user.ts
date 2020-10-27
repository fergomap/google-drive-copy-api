import Folder from './folder';

export default interface User {
    id: string;
    name: string;
    email: string;
    avatar: string;
    password: string;
    rootFolder: Folder;
}
