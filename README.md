# React Native Firebase App Template

Thanks for your purchase.

In case of any questions or problems, please contact me at:
hello@reactnativemarket.com

## Demo

https://react-native-app-template.web.app/

## How to use?

1. Download or clone this repo.

2. Install dependencies.

```js
npm install
// or
yarn install
```

3. Go to `src/core/config.js` and replace `FIREBASE_CONFIG` with your own firebase config.

```js
export const FIREBASE_CONFIG = {
  apiKey: 'xxx-yyy-zzz', // etc.
  // rest of your firebase config
}
```

4. Turn on **Google and Facebook Providers** inside your Firebase Project:
   ![providers](https://storage.googleapis.com/nativeforms-labs.appspot.com/providers.png)

5. **Google Sign In** configuration:

   1. Follow official Expo docs on Google Sign In: https://docs.expo.io/versions/latest/sdk/google/#using-it-inside-of-the-expo-app
   2. Go to `src/core/config.js` and replace `ANDROID_GOOGLE_CLIENT_ID` and `IOS_GOOGLE_CLIENT_ID` with your own generated IDs.
   3. Before submitting your app to Google Play, make sure to follow these docs: https://docs.expo.io/versions/latest/sdk/google/#deploying-to-a-standalone-app-on-android
   4. Before submitting your app to App Store, make sure to follow these docs: https://docs.expo.io/versions/latest/sdk/google/#deploying-to-a-standalone-app-on-ios

6. **Facebook Login** configuration:

   1. Follow official Expo docs on Facebook Login: https://docs.expo.io/versions/latest/sdk/facebook/#registering-your-app-with-facebook
   2. Go to `app.json` and replace `facebookScheme`, `facebookAppId` and `facebookDisplayName` with your own generated IDs/names.

7. Run project on iOS / Android.

```js
 npm run ios // npm run android
 // or
 yarn ios // yarn android
```

## Preview

![start](https://raw.githubusercontent.com/venits/react-native-market/master/assets/firebase-app-template/start.png)
![login](https://raw.githubusercontent.com/venits/react-native-market/master/assets/firebase-app-template/login.png)
![register](https://raw.githubusercontent.com/venits/react-native-market/master/assets/firebase-app-template/register.png)
![forgot](https://raw.githubusercontent.com/venits/react-native-market/master/assets/firebase-app-template/forgot-password.png)
![home](https://raw.githubusercontent.com/venits/react-native-market/master/assets/firebase-app-template/home.png)
![drawer](https://raw.githubusercontent.com/venits/react-native-market/master/assets/firebase-app-template/drawer.png)
![profile](https://raw.githubusercontent.com/venits/react-native-market/master/assets/firebase-app-template/profile.png)

## Support

In case of any questions or problems, please contact me at:
[hello@reactnativemarket.com](mailto:hello@reactnativemarket.com)

### Happy Coding 🚀

### [ReactNativeMarket.com](http://reactnativemarket.com/)
