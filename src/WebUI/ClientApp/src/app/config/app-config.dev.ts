import { AppConfig } from "./app-config.interface";

export const appConfig: AppConfig = {
    applicationName: "Sharko.WebUI",
    apiBaseUrl: "https://localhost:5001",
    stsUri: "https://localhost:5001",
    baseUrl: window.location.origin,
    identityRegisterPath: "/Identity/Account/Register"
};
