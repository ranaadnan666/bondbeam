importScripts(
  "https://www.gstatic.com/firebasejs/9.10.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.10.0/firebase-messaging-compat.js"
);

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



firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.notification.title;
  const notificationOptions = { body: payload.notification.body };
  self.registration.showNotification(notificationTitle, notificationOptions);
});

// importScripts('https://www.gstatic.com/firebasejs/9.10.0/firebase-app-compat.js');
// importScripts('https://www.gstatic.com/firebasejs/9.10.0/firebase-messaging-compat.js');

// const firebaseConfig = {
//     apiKey: "AIzaSyCFDph2zmXWwl8xzP3CPBidjsrLFgs8W-U",
//     authDomain: "notf-95fe1.firebaseapp.com",
//     projectId: "notf-95fe1",
//     storageBucket: "notf-95fe1.appspot.com",
//     messagingSenderId: "574259269085",
//     appId: "1:574259269085:web:5b1d17480140663ca2fa34"
//   };

// firebase.initializeApp(firebaseConfig);

// const messaging = firebase.messaging();

// messaging.onBackgroundMessage((payload) => {
//

//   const notificationTitle = payload.notification.title;
//   const notificationOptions = { body: payload.notification.body };

//   self.registration.showNotification(notificationTitle, notificationOptions);
// });
