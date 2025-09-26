import {
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

export interface Recipe {
  id: string;
  title: string;
  ingredients: string[];
  instructions: string[];
  createdAt?: Timestamp;
}

const RecipeParserPage = () => {
  const [recipeUrl, setRecipeUrl] = useState("");
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    setRecipe(null);

    try {
      const response = await fetch("https://api-2booc4avkq-uc.a.run.app/extract", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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

  return (
    <Stack justifyContent={"center"} alignItems={"center"} sx={{ p: 2 }}>
      <Toolbar />
      {recipe && (
        <RecipeDisplay recipe={recipe} handleClose={handleCloseRecipe} />
      )}

      {!recipe && (
        // Main Card
        <Card
          sx={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
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
              <SubmitRecipeButton onClick={handleSubmit} />
            </Stack>
            {error && <Typography color="error">{error}</Typography>}
            {loading && <CircularProgress />}
          </CardContent>
        </Card>
      )}
    </Stack>
  );
};

export default RecipeParserPage;
