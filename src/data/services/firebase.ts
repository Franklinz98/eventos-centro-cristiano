import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { Auth, getAuth } from "firebase/auth";

export default class Firebase {
  private static readonly firebaseConfig = {
    apiKey: "AIzaSyAsLrxGVyRad0FRrCbGG3q75whxB3F3zt0",
    authDomain: "eventos-5d8d7.firebaseapp.com",
    projectId: "eventos-5d8d7",
    storageBucket: "eventos-5d8d7.appspot.com",
    messagingSenderId: "375434296215",
    appId: "1:375434296215:web:cfd206fd441fbc0cbaa2d2",
    measurementId: "G-06MNW8JJW5",
  };

  static initialize(): void {
    const app = initializeApp(this.firebaseConfig);
    getAnalytics(app);
  }

  static get authInstance(): Auth {
    return getAuth();
  }
}
