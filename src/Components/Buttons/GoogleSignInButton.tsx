import { IconButton } from "@mui/material";
import { signInWithGoogle } from "../../firebase";
import GoogleSignIn from "../../Icons/GoogleSignIn";

export default function GoogleSignInButton({
  handleClose,
}: {
  handleClose: () => void;
}) {
  const handleSignIn = async () => {
    try {
      const user = await signInWithGoogle();
      console.log("User signed in:", user.displayName);
      handleClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <IconButton onClick={handleSignIn} sx={{ mt: 2, textTransform: "none"}}>
      <GoogleSignIn />
    </IconButton>
  );
}
