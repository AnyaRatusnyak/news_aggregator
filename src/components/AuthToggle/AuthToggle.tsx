import classNames from "classnames";
import './AuthToggle.scss';
import React, { useState } from "react";
import { ProfileForm } from "../ProfileForm/ProfileForm";

interface AuthToggleProps {
  onChange: (userId: string, email: string) => void;
}

export const AuthToggle: React.FC<AuthToggleProps> =({onChange}) =>{
  const [isSignUp, setIsSignUp] = useState(true);
   return (
     <div>
       <div className="buttons">
         <button
           className={classNames("button", { "is-link": isSignUp })}
           onClick={() => setIsSignUp(true)}
         >
           Sign Up
         </button>
         <button
           className={classNames("button", { "is-link": !isSignUp })}
           onClick={() => setIsSignUp(false)}
         >
           Sign In
         </button>
       </div>
       {isSignUp ? (
         <ProfileForm isSignUp={true} onChange={onChange} />
       ) : (
         <ProfileForm isSignUp={false} onChange={onChange} />
       )}
     </div>
   );
};


