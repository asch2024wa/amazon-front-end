import React, { useContext, useState } from "react";
import Layout from "../../components/Layout/Layout";
import classes from "./auth.module.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../Utility/firebase";
import { DataContext } from "../../components/DataProvider/DataProvider";
import { TYPE } from "../../Utility/action.type";
import { ClipLoader } from "react-spinners";

function Auth() {
  const navStaateData = useLocation();
  const [{ user }, dispatch] = useContext(DataContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState({
    signin: false,
    signup: false,
  });
  const authHandler = async (e) => {
    e.preventDefault();
    console.log(e.target.name);
    if (e.target.name == "signin") {
      setLoading({ ...loading, signin: true });
      signInWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          dispatch({
            type: TYPE.SET_USER,
            user: userInfo.user,
          });
          setLoading({ ...loading, signin: false });
          navigate(navStaateData?.state?.redirect || "/");
        })
        .catch((err) => {
          setError(err.message);
          setLoading({ ...loading, signin: false });
        });
    } else {
      setLoading({ ...loading, signup: true });
      createUserWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          dispatch({
            type: TYPE.SET_USER,
            user: userInfo.user,
          });
          setLoading({ ...loading, signup: false });
          navigate(navStaateData?.state?.redirect || "/");
        })
        .catch((err) => {
          setError(err.message);
          setLoading({ ...loading, signup: false });
        });
    }
  };
  console.log(email, password);
  return (
    <Layout>
      <section className={classes.login}>
        <Link to="/">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
            alt=""
          />
        </Link>
        <div className={classes.login_container}>
          <h1>Sign-in</h1>
          {navStaateData?.state?.msg && (
            <small
              style={{
                padding: "5px",
                textAlign: "center",
                color: "red",
                fontWeight: "bold",
              }}
            >
              {navStaateData.state.msg}
            </small>
          )}
          <form action="">
            <div>
              <label htmlFor="email">Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                id="email"
              />
            </div>
            <div>
              <label htmlFor="password" id="password">
                Password
              </label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                id="password"
              />
            </div>
            <button
              name="signin"
              type="submit"
              onClick={authHandler}
              className={classes.login_SignInButton}
            >
              {loading.signin ? <ClipLoader size={15} /> : "sign In"}
            </button>
          </form>
          <p>
            By signing-in you agree to the AMAZON FAKE CLONE Conditions of use &
            Sale.Please see Our Privacy Notice,Our Cookies Notice and our
            Interest-Based Ads Notice.
          </p>
          <button
            name="signup"
            type="submit"
            onClick={authHandler}
            className={classes.login_registerButton}
          >
            {loading.signup ? (
              <ClipLoader size={15} />
            ) : (
              "Create your Amazon Account"
            )}
          </button>
          {error && (
            <small style={{ paddingTop: "5px", color: "red" }}>{error}</small>
          )}
        </div>
      </section>
    </Layout>
  );
}

export default Auth;
