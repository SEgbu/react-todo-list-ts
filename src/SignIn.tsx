import { signInWithPopup, GoogleAuthProvider } from "firebase/auth"
import { auth } from "./Firebase"

export const SignIn = () => {
    const signIn = () => {
        const provider = new GoogleAuthProvider
        signInWithPopup(auth, provider);
    } 

    return (
        <button onClick={() => signIn()}>
            SignIn
        </button>
    )
}