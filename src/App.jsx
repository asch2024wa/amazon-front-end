import { useContext, useEffect } from "react";
import "./App.css";
import LandingPage from "./Pages/LandingPage.jsx";
import Router from "./Router.jsx";
import CarouselEffect from "./components/Carousel/CarouselEffect.jsx";
import Category from "./components/Category/Category.jsx";
import { DataContext } from "./components/DataProvider/DataProvider.jsx";
import { auth } from "./Utility/firebase.jsx";
import { onAuthStateChanged } from "firebase/auth";
import { TYPE } from "./Utility/action.type.jsx";

function App() {
  const [{ user }, dispatch] = useContext(DataContext);

  useEffect(() => {
    auth.onAuthStateChanged((authuser) => {
      if (authuser) {
        dispatch({
          type: TYPE.SET_USER,
          user: authuser,
        });
      } else {
        dispatch({
          type: TYPE.SET_USER,
          user: null,
        });
      }
    });
  }, []);

  return (
    <>
      <Router />
    </>
  );
}
export default App;
