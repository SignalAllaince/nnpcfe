
import { LogLevel } from "@azure/msal-browser";

const url = "https://login.microsoftonline.com/c9bfec4a-5ccc-4996-bf58-9401877a9892"
const encoded_url = encodeURIComponent(url)

console.log(encoded_url);

export const msalConfig = {
    auth: {
        // clientId: "8465be54-2d9c-4821-806e-346d52b612ce",
        clientId: "739aa5f6-9354-4daa-8509-f56f1974f582",
        authority: "https://login.microsoftonline.com/c9bfec4a-5ccc-4996-bf58-9401877a9892",
        redirectUri: '/',
        postLogoutRedirectUri: '/',
        navigateToLoginRequestUri: false,
    },

    cache:{
        cacheLocation: 'sessionStorage',
        storeAuthStateInCookie:false,
    },

    system: {
        loggerOptions:{
            loggerCallback: (level, message,containsPii) => {
                if (containsPii) {
                    return;
                }
                switch (level) {
                    case LogLevel.Error:
                        console.error(message);
                        return;
                    case LogLevel.Info:
                        console.info(message);
                        return;
                    case LogLevel.Verbose:
                        console.debug(message);
                        return;
                    case LogLevel.Warning:
                        console.warn(message);
                        return;
                    default:
                        return;
                }
            },
        },
    },
};

export const loginRequest = {
    scopes: ['user.read'],
};