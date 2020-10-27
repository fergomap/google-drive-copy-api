interface AppConfig {
    API_KEY_FIELD: string;
    API_KEY: string;
    PORT: number;
    ENDPOINTS: {
        LOG_IN: string;
        SIGN_UP: string;
        USER_INFO: string;
        DOCUMENTS: string;
        DOCUMENT_INFO: string;
        DOCUMENTS_TRASH: string;
        DOCUMENTS_TRASH_INFO: string;
        FOLDERS: string;
        FOLDER_INFO: string;
        MOVE_FOLDER: string;
        MOVE_DOCUMENT: string;
        ADD_EDITOR: string;
        REMOVE_EDITOR: string;
        ADD_VIEWER: string;
        REMOVE_VIEWER: string;
        RENAME_FILE: string;
    }
}

export const APP_CONSTANTS: AppConfig = {
    API_KEY_FIELD: 'api-key',
    API_KEY: 'secret-api-key',
    PORT: 8080,
    ENDPOINTS: {
        LOG_IN: '/log-in',
        SIGN_UP: '/sign-up',
        USER_INFO: '/user-info',
        DOCUMENTS: '/documents',
        DOCUMENT_INFO: '/documents/:id',
        DOCUMENTS_TRASH: '/trash',
        DOCUMENTS_TRASH_INFO: '/trash/:id',
        FOLDERS: '/folders',
        FOLDER_INFO: '/folders/:id',
        MOVE_FOLDER: '/move-folder',
        MOVE_DOCUMENT: '/move-document',
        ADD_EDITOR: '/documents/add-editor/:documentId/:userId',
        REMOVE_EDITOR: '/documents/remove-editor/:documentId/:userId',
        ADD_VIEWER: '/documents/add-viewer/:documentId/:userId',
        REMOVE_VIEWER: '/documents/remove-viewer/:documentId/:userId',
        RENAME_FILE: '/documents/rename/:id'
    }
};
