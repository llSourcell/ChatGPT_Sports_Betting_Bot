// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDfwQZrrtDNoMpDoBQltOE1u97rOgug3Nw",
  authDomain: "sporting-bets-bot.firebaseapp.com",
  databaseURL: "https://sporting-bets-bot-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "sporting-bets-bot",
  storageBucket: "sporting-bets-bot.appspot.com",
  messagingSenderId: "647182549855",
  appId: "1:647182549855:web:39ae38c4d6a57c3f4cacea",
  measurementId: "G-DLJWNTP6YN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Replace with your own IDs! follow the guides here:
// https://docs.expo.io/versions/latest/sdk/google/#using-it-inside-of-the-expo-app
export const ANDROID_GOOGLE_CLIENT_ID =
  '878215484396-4pbcf3tghqe9sa0pvq3fifb5etnn4q6s.apps.googleusercontent.com'
export const IOS_GOOGLE_CLIENT_ID =
  '878215484396-5hiqfjetgvbdck03l0jepdgku6u64erm.apps.googleusercontent.com'

// Replace with your own facebook app ID.
// You can find more information how to generate one here:
// https://docs.expo.io/versions/latest/sdk/facebook/#registering-your-app-with-facebook
export const FACEBOOK_APP_ID = '8203704e5209413'
