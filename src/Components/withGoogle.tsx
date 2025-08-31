import { GoogleLogin, GoogleOAuthProvider,} from "@react-oauth/google";
import type{ CredentialResponse } from "@react-oauth/google";
export function google(){
    return (
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <div className="google">
            <button>Continue with Google</button>
        </div>
        </GoogleOAuthProvider>
    )
}