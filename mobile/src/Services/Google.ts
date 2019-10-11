import { Platform } from "react-native";
export const isAndroid = () => Platform.OS === "android";

import Constants from "expo-constants";
import * as Google from "expo-google-app-auth";

const scopes = ["profile", "email"];

const loginAsync = async () => {
    try {
        const result = await Google.logInAsync({
            clientId: isAndroid()
                ? Constants.manifest.extra.googleAppId.android
                : Constants.manifest.extra.googleAppId.ios,
            scopes
        });

        if (result.type === "success") {
            return Promise.resolve(result.accessToken);
        }

        return Promise.reject({});
    } catch (error) {
        return Promise.reject(error);
    }
};

export const GoogleApi = {
    loginAsync
};
