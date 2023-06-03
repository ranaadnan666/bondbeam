import { Routes, Route } from "react-router-dom";
import { useAppContext } from "../context/app-context";
import Header from "../components/header/Header";
import { privateRoutes, publicRoutes } from "./routesData";

const Routing = () => {
  const { setBlur, blur } = useAppContext();
  const lsUser = JSON.parse(localStorage.getItem("userLoggedIn"));
  const token = lsUser?.token?.access;
  return (
    <>
      {token ? <Header /> : null}
      <div onClick={() => setBlur(false)} className={blur ? "blur" : ""}></div>

      <Routes>
        {token
          ? privateRoutes.map((route, index) => (
              <Route key={index} path={route.path} element={route.element}>
                {route.children?.map((child, index) => (
                  <Route
                    key={index}
                    path={child.path}
                    element={child.element}
                  />
                ))}
              </Route>
            ))
          : publicRoutes.map((route, index) => (
              <Route key={index} path={route.path} element={route.element} />
            ))}
      </Routes>
    </>
  );
};

export default Routing;
