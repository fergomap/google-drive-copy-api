interface AppConfig {
    API_KEY_FIELD: string;
    API_KEY: string;
    PORT: number;
}

export const APP_CONSTANTS: AppConfig = {
    API_KEY_FIELD: 'api-key',
    API_KEY: 'secret-api-key',
    PORT: 8080
};
