import { auth } from "./Firebase";

export const SignOut = () => {
    return (
        <button onClick={() => auth.signOut()}>
            SignOut 
        </button>
    );
}