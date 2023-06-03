import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { Suspense } from "react";
import Routing from "./routes";
import Loading from "./components/loading/Loading";
import { onForegroundMessage } from "./firebase";
import Swal from "sweetalert2";
import '../node_modules/react-quill/dist/quill.snow.css';

const App = () => {
  // const handleGetFirebaseToken = () => {
  //   getFirebaseToken()
  //     .then((firebaseToken) => {
  //       localStorage.setItem("fireBaseUserToken", firebaseToken);
  //
  //       if (firebaseToken) {
  //         // setShowNotificationBanner(false);
  //       }
  //     })
  //     .catch((err) =>
  //       console.error("An error occured while retrieving firebase token. ", err)
  //     );
  // };




  useEffect(() => {
    // handleGetFirebaseToken();
    //=========>Testing <==================

    // Swal.fire({
    //      title: 'Auto close alert!',
    //     text: 'I will close in 2 seconds.',
    //      timer: 2000
    //     })
    //
    onForegroundMessage()
      .then((payload) => {
        localStorage.setItem("notifications", JSON.stringify(payload));

        // alert(payload.notification.title);
        // Swal.fire({
        //   title: payload?.notification.title,
        //   text: payload.notification.body,
        //   timer: 2000,
        // });
      })
      .catch((err) =>
        console.log("An error occured while retrieving firebase token. ", err)
      );
  });

  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routing />
      </Suspense>
    </BrowserRouter>

  );
};

export default App;
