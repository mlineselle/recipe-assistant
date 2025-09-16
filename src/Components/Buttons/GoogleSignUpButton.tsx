import { IconButton } from "@mui/material";
import { signInWithGoogle } from "../../firebase";
import GoogleSignUp from "../../Icons/GoogleSignUp";

export default function GoogleSignUpButton({
  handleClose,
}: {
  handleClose: () => void;
}) {
  const handleSignUp = async () => {
    try {
      const user = await signInWithGoogle();
      console.log("User signed up:", user.displayName);
      handleClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <IconButton onClick={handleSignUp} sx={{ mt: 2, textTransform: "none" }}>
      <GoogleSignUp />
    </IconButton>
  );
}
