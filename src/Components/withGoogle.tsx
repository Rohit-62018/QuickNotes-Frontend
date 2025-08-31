import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

export  function Google() {
  const navigate = useNavigate();
  return (
    <div className="google">
    <GoogleLogin
      onSuccess={(credentialResponse) => {
        const gtoken = credentialResponse.credential; 

        fetch("http://localhost:3000/auth/google", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include", 
          body: JSON.stringify({ gtoken }),
        })
          .then((res) => res.json())
          .then(() => {
            navigate('/home');
          })
          .catch((err) => console.error("Login error", err));
      }}
      onError={() => {
        console.log("Login Failed");
      }}
    />
    </div>
  );
}