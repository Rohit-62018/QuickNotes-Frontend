import React, { useState } from "react";
import type { FormEvent, ChangeEvent } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Google } from "../../Components/withGoogle";
import OtpInput from "./OtpInput";
import "./Login.css";

const Login: React.FC = () => {
  const [signState, setSignState] = useState<"Sign In" | "Sign Up">("Sign In");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [viewOtp, setViewOtp] = useState<boolean>(false);
  const navigate = useNavigate();

  const user_auth = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if( name && name.trim()==="" ){
      toast.error(`name is required`);
      return;
    }else if( email.trim()===""){
      toast.error(`email is required`);
      return;
    }else if(password.trim()===""){
      toast.error(`password is required`);
      return;
    }
    setLoading(true);
    try {
      if (signState === "Sign In") {
            const res = await fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
            credentials: "include",
            });

            const data = await res.json();
            const { success, message} = data;
            if(success){
                navigate('/home')
            }else{
                toast.error(message)
            }
        } else {
            const res = await fetch("http://localhost:3000/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await res.json();
            const { success, message } = data;
            if (success) {
                // setSignState("Sign In");
                setPassword("");
                setViewOtp(true);
            } else {
                toast.error(message);
            }
        }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    viewOtp?<OtpInput email={email} />:<div className="login">
      <div className="login-form">
        <h1>{signState}</h1>
        <form onSubmit={user_auth}>
          {signState === "Sign Up" && (
            <input
              type="text"
              placeholder="Your name"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setName(e.target.value)
              }
              value={name}
            />
          )}
          <input
            type="text"
            placeholder="Email"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
            value={email}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
            value={password}
          />
          {/* <button type="submit">{signState}</button> */}
          <button type="submit" disabled={loading}>
          {loading ? "Sending..." : signState}
        </button>
          <Google></Google>
          <div className="form-help">
            <div className="remember">
              <input type="checkbox" id="rememberMe" />
              <label htmlFor="rememberMe">Remember Me</label>
            </div>
            <p>Need Help?</p>
          </div>
        </form>
        <div className="form-switch">
          {signState === "Sign In" ? (
            <p>
              New to QuickNotes?{" "}
              <span onClick={() => setSignState("Sign Up")}>Sign Up Now</span>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <span onClick={() => setSignState("Sign In")}>Sign In Now</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;