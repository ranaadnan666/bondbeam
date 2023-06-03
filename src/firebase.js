import { initializeApp } from "firebase/app";
import { getToken, getMessaging, onMessage } from "firebase/messaging";

// const firebaseConfig = {
//   apiKey: "AIzaSyCFDph2zmXWwl8xzP3CPBidjsrLFgs8W-U",
//   authDomain: "notf-95fe1.firebaseapp.com",
//   projectId: "notf-95fe1",
//   storageBucket: "notf-95fe1.appspot.com",
//   messagingSenderId: "574259269085",
//   appId: "1:574259269085:web:5b1d17480140663ca2fa34",
// };

var firebaseConfig = {
  apiKey: "AIzaSyDQ37fTJQA3EIdqZIh7Toj8WFttQdm9lYU",
  authDomain: "bondbeam-27717.firebaseapp.com",
  databaseURL: "https://bondbeam-27717-default-rtdb.firebaseio.com",
  projectId: "bondbeam-27717",
  storageBucket: "bondbeam-27717.appspot.com",
  messagingSenderId: "158485698981",
  appId: "1:158485698981:web:3010b21e0b03c09af9f04c",
  measurementId: "G-HK62J9ZFBF"
};


//
//

const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

export const getOrRegisterServiceWorker = async () => {
  if ("serviceWorker" in navigator) {
    return window.navigator.serviceWorker
      .getRegistration("/firebase-push-notification-scope")
      .then((serviceWorker) => {
        if (serviceWorker) return serviceWorker;
        return window.navigator.serviceWorker.register(
          "/firebase-messaging-sw.js",
          {
            scope: "/firebase-push-notification-scope",
          }
        );
      });
  }
  throw new Error("The browser doesn`t support service worker.");
};

export const getFirebaseToken = () =>
  getOrRegisterServiceWorker().then((serviceWorkerRegistration) =>
    getToken(messaging, {
      vapidKey:
        // "BPzYZlksGmZeAoCG7YjfVf4b-e2gW90Az9ai-l6tpQYMiLkdtNHPY-ArHQVJje5vNrF6SSKLy-TR7EQEpYUoLI8",
        'BAJ40IWmU3nYzohifZpcvM3w782GB8-keJ72TkdjgatBnxG9_ErCyo2z6V28Y0IBfmMzN34u3q3OV5RYGRtqXGk',
      serviceWorkerRegistration,
    })
  );

export const onForegroundMessage = () =>
  new Promise((resolve) => onMessage(messaging, (payload) => resolve(payload)));
