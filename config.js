
import firebase from "@react-native-firebase/app";
import { Platform } from "react-native";

/*const firebaseConfig = {
    apiKey: "AIzaSyAdsb6zin5ML0FO6FUvJcDZcHO3MqcQrbY",
    authDomain: "health-monitoring-system-5cb16.firebaseapp.com",
    databaseURL: "https://health-monitoring-system-5cb16.firebaseio.com",
    projectId: "health-monitoring-system-5cb16",
    storageBucket: "health-monitoring-system-5cb16.appspot.com",
    messagingSenderId: "311096852390",
    appId: "1:311096852390:web:e064091b39be5391625967",
    measurementId: "G-8YHLLR5564"
  };*/

  //export default firebaseConfig;

// Your secondary Firebase project credentials for Android...
const androidCredentials = {
  clientId: "311096852390-1k58l2svqvpm2ps21bp4g5u6ujr4t9h4.apps.googleusercontent.com",
  appId: "1:311096852390:android:78a1ddece4942db4625967",
  apiKey: "AIzaSyCsh4UMn--jb0OllZj8OO7W_6p1u9GAXT8",
  databaseURL: "https://health-monitoring-system-5cb16.firebaseio.com",
  storageBucket: "health-monitoring-system-5cb16.appspot.com",
  messagingSenderId: "311096852390",
  projectId: "health-monitoring-system-5cb16",
};

export default androidCredentials;
/*
// Your secondary Firebase project credentials for web...
const webCredentials = {
  apiKey: "AIzaSyAdsb6zin5ML0FO6FUvJcDZcHO3MqcQrbY",
    authDomain: "health-monitoring-system-5cb16.firebaseapp.com",
    databaseURL: "https://health-monitoring-system-5cb16.firebaseio.com",
    projectId: "health-monitoring-system-5cb16",
    storageBucket: "health-monitoring-system-5cb16.appspot.com",
    messagingSenderId: "311096852390",
    appId: "1:311096852390:web:e064091b39be5391625967",
    measurementId: "G-8YHLLR5564"
};

// Select the relevant credentials
const credentials = Platform.select({
  android: androidCredentials,
  web: webCredentials,
});

const config = {
  name: "SECONDARY_APP",
};

await firebase.initializeApp(credentials, config);*/