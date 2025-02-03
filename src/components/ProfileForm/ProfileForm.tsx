import React, { useState } from "react";
import './ProfileForm.scss';
import classNames from "classnames";
import { registerUser, signInUser } from "../../services/userService"; 


interface ProfileFormProps {
  isSignUp: boolean;
  onChange: (userId: string, email: string) => void;
}

export const ProfileForm: React.FC<ProfileFormProps> = ({ isSignUp, onChange }) => {
  const [userName, setUserName] = useState("");
  const [hasUserNameError, setHasUserNameError] = useState(false);

  const [lastName, setLastName] = useState("");
  const [hasLastNameError, setHasLastNameError] = useState(false);

  const [email, setEmail] = useState("");
  const [hasEmailError, setHasEmailError] = useState(false);

  const [password, setPassword] = useState("");
  const [hasPasswordError, setHasPasswordError] = useState(false);

  const [repeatPassword, setRepeatPassword] = useState("");
  const [hasRepeatPasswordError, setHasRepeatPasswordError] = useState(false);

   const handleSubmit = async (event: React.FormEvent) => {
     event.preventDefault();
     setHasUserNameError(false);
     setHasLastNameError(false);
     setHasEmailError(false);
     setHasPasswordError(false);
     setHasRepeatPasswordError(false);
     if (isSignUp) {
       let hasValidationError = false;

       if (!userName) {
         setHasUserNameError(true);
         hasValidationError = true;
       }
       if (!lastName) {
         setHasLastNameError(true);
         hasValidationError = true;
       }
       if (!email || !/\S+@\S+\.\S+/.test(email)) {
         setHasEmailError(true);
         hasValidationError = true;
       }
       if (!password || password.length < 8) {
         setHasPasswordError(true);
         hasValidationError = true;
       }
       if (password !== repeatPassword) {
         setHasRepeatPasswordError(true);
         hasValidationError = true;
       }

       if (hasValidationError) {
         return; 
       }

       try {
         const userData = {
           firstName: userName,
           lastName,
           email,
           password,
           repeatPassword,
         };
         const data = await registerUser(userData);
         onChange(data.id, data.email);
         setUserName("");
         setLastName("");
         setEmail("");
         setPassword("");
         setRepeatPassword("");
       } catch (error) {
         console.error("Error sending user data:", error);
       }
     } else {
       if (!email || !/\S+@\S+\.\S+/.test(email)) {
         setHasEmailError(true);
         return; 
       }
       if (!password || password.length < 8) {
         setHasPasswordError(true);
         return; 
       }

       try {
         const data = await signInUser({ email, password });
         onChange(data.id, data.email);
         setEmail("");
         setPassword("");
       } catch (error) {
         console.error("Error sending user data:", error);
       }
     }
   };
  const handleUserNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
    setHasUserNameError(false);
  };

  const handleLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(event.target.value);
    setHasLastNameError(false);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    setHasEmailError(false);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    setHasPasswordError(false);
  };

  const handleRepeatPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRepeatPassword(event.target.value);
    setHasRepeatPasswordError(false);
  };

  return (
    <div className="profile-form">
      <form onSubmit={handleSubmit} method="POST" className="box">
        {isSignUp && (
          <div>
            {" "}
            <div className="field">
              <label
                className={classNames("label", "is-small")}
                htmlFor="profile-name"
              >
                Name
              </label>
              <div className="control has-icons-left has-icons-right">
                <input
                  id="profile-name"
                  value={userName}
                  className={classNames("input", "is-small", {
                    "is-danger": hasUserNameError,
                  })}
                  type="text"
                  placeholder="Text input"
                  onChange={handleUserNameChange}
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-user"></i>
                </span>
              </div>
              {hasUserNameError && (
                <p className="help is-danger">Name is required</p>
              )}
            </div>
            <div className="field">
              <label
                className={classNames("label", "is-small")}
                htmlFor="profile-lastName"
              >
                Last name
              </label>
              <div className="control has-icons-left has-icons-right">
                <input
                  id="profile-lastName"
                  value={lastName}
                  className={classNames("input", "is-small", {
                    "is-danger": hasLastNameError,
                  })}
                  type="text"
                  placeholder="Text input"
                  onChange={handleLastNameChange}
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-user"></i>
                </span>
              </div>
              {hasLastNameError && (
                <p className="help is-danger">Last name is required</p>
              )}
            </div>
          </div>
        )}
        <div className="field">
          <label className={classNames("label", "is-small")} htmlFor="email">
            Email
          </label>
          <div className="control has-icons-left has-icons-right">
            <input
              id="email"
              value={email}
              className={classNames("input", "is-small", {
                "is-danger": hasEmailError,
              })}
              type="email"
              placeholder="Email input"
              onChange={handleEmailChange}
            />
            <span className="icon is-small is-left">
              <i className="fas fa-envelope"></i>
            </span>
            {hasEmailError && (
              <span className="icon is-small is-right">
                <i className="fas fa-exclamation-triangle"></i>
              </span>
            )}
          </div>
          {hasEmailError && (
            <p className="help is-danger">This email is invalid</p>
          )}
        </div>

        <div className="field">
          <label className={classNames("label", "is-small")}>Password</label>
          <div className="control has-icons-right">
            <input
              value={password}
              className={classNames("input", "is-small", {
                "is-danger": hasPasswordError,
              })}
              type="password"
              placeholder="Password input"
              onChange={handlePasswordChange}
            />
            {hasPasswordError && (
              <span className="icon is-small is-right">
                <i className="fas fa-exclamation-triangle"></i>
              </span>
            )}
          </div>
          {hasPasswordError && (
            <p className="help is-danger">
              The password length must be at least 8
            </p>
          )}
        </div>
        {isSignUp && (
          <div className="field">
            <label className={classNames("label", "is-small")}>
              Repeat password
            </label>
            <div className="control has-icons-right">
              <input
                value={repeatPassword}
                className={classNames("input", "is-small", {
                  "is-danger": hasRepeatPasswordError,
                })}
                type="password"
                placeholder="Repeat Password input"
                onChange={handleRepeatPasswordChange}
              />
              {hasRepeatPasswordError && (
                <span className="icon is-small is-right">
                  <i className="fas fa-exclamation-triangle"></i>
                </span>
              )}
            </div>
            {hasRepeatPasswordError && (
              <p className="help is-danger">Passwords do not match </p>
            )}
          </div>
        )}
        <div className="buttons">
          <button type="submit" className="button is-link is-small">
            {isSignUp ? "Sign Up" : "Sign In"}
          </button>
        </div>
      </form>
    </div>
  );
};
