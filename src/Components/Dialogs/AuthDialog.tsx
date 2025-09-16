import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  Button,
  TextField,
  Typography,
  Stack,
  IconButton,
} from "@mui/material";
import { signup, login } from "../../utils/authService";
import GoogleSignInButton from "../Buttons/GoogleSignInButton";
import GoogleSignUpButton from "../Buttons/GoogleSignUpButton";
import { FirebaseError } from "firebase/app";
import CloseIcon from "@mui/icons-material/Close";

interface AuthDialogProps {
  open: boolean;
  onClose: () => void;
}

const AuthDialog: React.FC<AuthDialogProps> = ({ open, onClose }) => {
  const [isLogin, setIsLogin] = useState(true); // toggle between login/signup
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (isLogin) {
        await login(email, password);
        alert("Logged in successfully!");
      } else {
        await signup(email, password);
        alert("Signed up successfully!");
      }
      onClose();
    } catch (err: unknown) {
      if (err instanceof FirebaseError) setError(generateErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const generateErrorMessage = (error: FirebaseError) => {
    switch (error.code) {
      case "auth/invalid-credential":
        return "Invalid credentials.";
      case "auth/email-already-in-use":
        return "Email already in use.";
      default:
        return "An unknown error occurred.";
    }
  };

  useEffect(() => {
    if (!open) {
      setEmail("");
      setPassword("");
      setError(null);
    }
  }, [open]);

  useEffect(() => {
    setError(null);
  }, [email, password]);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent sx={{ minWidth: 450, position: "relative" }}>
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", top: 8, right: 8 }}
        >
          <CloseIcon />
        </IconButton>
        <Stack alignItems="center" mb={2} width={"100%"} mt={2}>
          <form onSubmit={handleSubmit} style={{ width: "100%" }}>
            <Stack>
              <TextField
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                required
                error={!!error}
                margin="normal"
              />
              <TextField
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                required
                error={!!error}
                helperText={error}
                margin="normal"
              />
              <Button
                type="submit"
                variant="contained"
                disabled={loading}
                sx={{ mb: 1 }}
              >
                {loading
                  ? isLogin
                    ? "Logging in..."
                    : "Signing up..."
                  : isLogin
                  ? "Login"
                  : "Sign Up"}
              </Button>
            </Stack>
          </form>
          <Typography align="center" sx={{ mt: 2 }}>
            Or
          </Typography>
          {isLogin ? (
            <GoogleSignInButton handleClose={onClose} />
          ) : (
            <GoogleSignUpButton handleClose={onClose} />
          )}
        </Stack>
        <Typography
          variant="body1"
          sx={{ mt: 1, cursor: "pointer", color: "primary.main" }}
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin
            ? "Don't have an account? Sign Up"
            : "Already have an account? Login"}
        </Typography>
      </DialogContent>
    </Dialog>
  );
};

export default AuthDialog;
