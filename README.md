# ChatGPT Sports Betting Bot

This is the code for the "ChatGPT Sports Betting Bot" Video by Siraj Raval on Youtube. This repository is a starter template for you to build your own sports betting bot.

## Setup Instructions (easy mode)

If you just want to run a sports betting bot in the cloud without having to install any dependencies or deploy your own version, run either of the
two colab notebooks below.

1. [Version 1: Arbitrage Bot](https://colab.research.google.com/drive/1asMXW_1wcL0G0mcgttF955qrDah9HubF?usp=sharing)
2. [Version 2: Deep Learning Bot](https://colab.research.google.com/drive/1DbPgAVf0D_Q_bmYM20R5zxgKsqftWjgt?usp=sharing)

And get API keys from
- [OpenAI](https://openai.com/api/)
- [Twitter](https://developer.twitter.com/en/docs/twitter-api)
- [The Odds](https://the-odds-api.com/)

Make Bets with Predictions here:

- [DexSport](https://dexsport.io/)
- [Get Metamask](https://metamask.io/)


## Setup Instructions (hard mode)

If you want to deploy your own sports betting bot and have it make predictions consistently, follow the setup instructions below to initialize your firebase app template for vercel deployment. The app still needs to fetch predictions from the python back-end and display it on the react front end, I just did it manually for the video. It also doesn't yet make bets programmatically, I have to do that manually. It was difficult for me to find a programmatic betting API.  

## Credits

Ryankrumenacker, kyleskom, React Native Market, OpenAI, Twitter

## How to use

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
