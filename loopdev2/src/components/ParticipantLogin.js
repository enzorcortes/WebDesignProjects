import React from "react";
import Button from "../UI/Button";
import cookies from "../../js/cookieFunctions";
import { useState } from "react";
const ParticipantLoginForm = (props) => {
  const baseURL = cookies.baseURL;
  const [isShown, setIsSHown] = useState(false);
  const togglePassword = () => {
    setIsSHown((isShown) => !isShown);
  };
  function signUp() {
    props.setDisplaySignUp(true);
    props.setDisplayPR(false);
  }
  function jumpToReset() {
    props.setDisplayPR(false);
    props.setDisplayReset(true);
  }
  async function login() {
    // get references
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const invalid = document.getElementById("invalid");
    if (email === "" || password === "") {
      invalid.style.display = "block";
      let classes = invalid.className;
      if (classes.includes("shake-animation")) {
        invalid.className = invalid.className.replace(
          /\bshake-animation\b/g,
          ""
        );
        setTimeout(function () {
          invalid.className += " shake-animation";
        }, 100);
      } else {
        invalid.className += " shake-animation";
      }
    } else {
      // send data
      const response = await fetch(baseURL + "/auth/login", {
        method: "POST",
        body: JSON.stringify({ email: email, password: password }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json().catch(function () {
        invalid.style.display = "block";
        let classes = invalid.className;
        if (classes.includes("shake-animation")) {
          invalid.className = invalid.className.replace(
            /\bshake-animation\b/g,
            ""
          );
          setTimeout(function () {
            invalid.className += " shake-animation";
          }, 100);
        } else {
          invalid.className += " shake-animation";
        }
      });
      if (data) {
        if (data.message === "This User does not exist, check your details") {
          invalid.style.display = "block";
          let classes = invalid.className;
          if (classes.includes("shake-animation")) {
            invalid.className = invalid.className.replace(
              /\bshake-animation\b/g,
              ""
            );
            setTimeout(function () {
              invalid.className += " shake-animation";
            }, 100);
          } else {
            invalid.className += " shake-animation";
          }
        } else {
          cookies.setCookie("token", data.access_token, 0, 1, 0, 0);
          cookies.setCookie("name", data.user.screenname, 0, 1, 0, 0);
          cookies.setCookie("userType", data.user.role, 0, 1, 0, 0);
          cookies.setCookie("photo", data.user.profile_photo_path, 0, 1, 0, 0);
          //log(gCodes.LOGIN_TIME, "login", Date.now());
          if (data.user.status === 2) {
            this.handlerecruitShow();
          } else {
            let dash;
            if (
              cookies.getCookie("userType") === "researcher" ||
              cookies.getCookie("userType") === "admin" ||
              cookies.getCookie("userType") === "proctor"
            ) {
              dash = "gamecenter";
            } else {
              dash = "gamecenter";
            }
            window.location.href = dash;
          }
        }
      }
    }
  }
  if (props.displayPR) {
    return (
      <div className="pr-login box">
        <b className="box-title access-code-title-login">Login</b>
        <b id="invalid">
          The credentials you entered do not match our records. Please try again.
        </b>
        <b className = "header-username">Username</b>
        <b className = "header-password">Password</b>
        <form>
          <input
            className="pr-login-input-1 inputField_padding"
            type="email"
            id="email"
            placeholder="Username"
            autoFocus={true}
          ></input>
          <input
            className="pr-login-input-2 inputField_padding"
            type={isShown ? "text" : "password"}
            id="password"
            placeholder="Password"
          ></input>
        </form>
        <div className="checkbox-container-1">
          <label htmlFor="checkbox">Show password?</label>
          <input
            id="checkbox"
            type="checkbox"
            checked={isShown}
            onChange={togglePassword}
          />
        </div>
        <Button text="Login" className={"pr-btn " + props.PR} onClick={login} />
        <div className="login-note">
          <div className="login-note-1">
            Do not have an account? <u onClick={signUp}>Sign up</u>
          </div>
          <div className="login-note-2">
            Forgot your password? <u onClick={jumpToReset}>Reset password</u>
          </div>
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
};
export default ParticipantLoginForm;