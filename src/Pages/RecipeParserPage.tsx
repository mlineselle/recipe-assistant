import {
  Button,
  Card,
  CardContent,
  CircularProgress,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { useState } from "react";
import type { Timestamp } from "firebase/firestore";
import RecipeDisplay from "../Components/RecipeDisplay";
import SubmitRecipeButton from "../Components/Buttons/SubmitRecipeButton";
import { getAuth } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { onOpenDialog } from "../redux/ApplicationSlice";
import { DIALOGS } from "../utils/constants";
import AuthDialog from "../Components/Dialogs/AuthDialog";
import type { RootState } from "../redux/Store";

export interface Recipe {
  id: string;
  title: string;
  times: {prep?: string; cook?: string; total: string;};
  ingredients: string[];
  instructions: string[];
  createdAt?: Timestamp;
}

const RecipeParserPage = () => {
  const [recipeUrl, setRecipeUrl] = useState("");
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { openDialog } = useSelector((state: RootState) => state.application);
  const dispatch = useDispatch();
  const auth = getAuth();

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    setRecipe(null);

    const idToken = await auth.currentUser?.getIdToken();
    if (!idToken) throw new Error("User not authenticated");

    try {
      const response = await fetch("https://api-2booc4avkq-uc.a.run.app/extract", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${idToken}`,
        },
        body: JSON.stringify({ url: recipeUrl }),
      });

      if (!response.ok) {
        throw new Error("Failed to extract recipe");
      }

      const data = await response.json();
      setRecipe(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCloseRecipe = () => {
    setRecipe(null);
  };

  const handleAuthOpen = () => {
    dispatch(onOpenDialog("auth"));
  };

  const handleCloseAuth = () => {
    dispatch(onOpenDialog(null));
  };

  const getMainCard = () => {
    if (!auth.currentUser) {
      return (<Card
        sx={{
          p: 4,
          width: "100%",
          maxWidth: 600,
          m: 2,
        }}
      >
        <CardContent sx={{ textAlign: "center" }}>
          <Typography
            variant="h2"
            component="h1"
            color="primary"
            gutterBottom
          >
            Recipe Assistant
          </Typography>
          <Typography variant="body2" fontSize={20}>
            Welcome to the Recipe Assistant, your AI-powered cooking companion!
            Give it a recipe URL, and it will extract the ingredients and instructions for you,
            then help you save and organize your favorite recipes.
          </Typography>
          <Typography variant="body2" fontSize={20} sx={{ mt: 4 }}>
            Please log in to start!
          </Typography>
          <Button
            onClick={handleAuthOpen}
          >
            Log In / Sign Up
          </Button>
        </CardContent>
      </Card>)
    } else {
      return (<Card
        sx={{
          p: 4,
          width: "100%",
          maxWidth: 600,
          m: 2,
        }}
      >
        <CardContent sx={{ textAlign: "center" }}>
          <Typography
            variant="h2"
            component="h1"
            color="primary"
            gutterBottom
          >
            Recipe Assistant
          </Typography>
          <Typography variant="body2" fontSize={20}>
            Welcome to the Recipe Assistant!
          </Typography>
          <Typography variant="body2" fontSize={20} sx={{ mb: 4 }}>
            Enter a recipe URL below to extract the ingredients and
            instructions.
          </Typography>
          <Stack spacing={2} sx={{ mb: 4 }}>
            <TextField
              label="Recipe URL"
              variant="outlined"
              value={recipeUrl}
              onChange={(e) => setRecipeUrl(e.target.value)}
              sx={{ input: { color: "white" } }}
            />
            <SubmitRecipeButton disabled = {loading} onClick={handleSubmit} />
          </Stack>
          {error && <Typography color="error">{error}</Typography>}
          {loading && <CircularProgress />}
        </CardContent>
      </Card>)
    }
  }

  return (
    <Stack justifyContent={"center"} alignItems={"center"} sx={{ p: 2 }}>
      <Toolbar />
      {recipe && (
        <RecipeDisplay recipe={recipe} handleClose={handleCloseRecipe} />
      )}

      {!recipe && getMainCard()}
      {openDialog === DIALOGS.AUTH && <AuthDialog open onClose={handleCloseAuth} />}
    </Stack>
  );
};

export default RecipeParserPage;
