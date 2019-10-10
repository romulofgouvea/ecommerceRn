import Constants from "expo-constants";
import * as Google from "expo-google-app-auth";

const scopes = ["profile", "email"];

const loginAsync = async () => {
  try {
    const result = await Google.logInAsync({
      androidClientId: Constants.manifest.extra.googleAppId.android,
      iosClientId: Constants.manifest.extra.googleAppId.ios,
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
