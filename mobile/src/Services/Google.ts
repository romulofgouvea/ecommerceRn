import Constants from 'expo-constants';
import * as Google from 'expo-google-app-auth';

const scopes = ['profile', 'email'];

const loginAsync = async () => {
    try {
        const { type, accessToken, user } = await Google.logInAsync({
            clientId: "",
            androidClientId: Constants.manifest.extra.googleAppId.android,
            iosClientId: Constants.manifest.extra.googleAppId.ios,
            scopes,
        });

        if (type === 'success') {
            return Promise.resolve({ token: accessToken, user });
        }

        return Promise.reject({});
    } catch (error) {
        return Promise.reject(error);
    }
};

export const GoogleApi = {
    loginAsync,
};