import {
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import type { Recipe } from "./RecipeParserPage";
import RecipeDisplay from "../Components/RecipeDisplay";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";

const SavedRecipesPage = () => {
  const [savedRecipes, setSavedRecipes] = useState<Recipe[]>([]); // Placeholder for saved recipes
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const recipesRef = collection(db, "users", user.uid, "recipes");
    const q = query(recipesRef, orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setSavedRecipes(
        snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Recipe))
      );
    });

    return () => unsubscribe(); // cleanup listener
  }, [user]);

  const handleRecipeClick = (recipeId: string) => {
    setSelectedRecipe(savedRecipes.find((r) => r.id === recipeId) || null);
  };

  return (
    <Stack justifyContent={"center"} alignItems={"center"} sx={{ p: 2 }}>
      <Toolbar />
      {savedRecipes.length === 0 && (
        <Card sx={{ p: 4, mt: 4 }}>
          <CardContent>
            <Typography variant="h6">No saved recipes found</Typography>
          </CardContent>
        </Card>
      )}
      {!selectedRecipe && (
        <Grid container spacing={2}>
          {savedRecipes.map((recipe) => (
            <Grid key={recipe.id} sx={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <Card>
                <CardActionArea onClick={() => handleRecipeClick(recipe.id)}>
                  <CardContent sx={{ textAlign: "center" }}>
                    <Typography variant="h6"> {recipe.title}</Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
      {selectedRecipe && (
        <RecipeDisplay
          savedRecipes={savedRecipes}
          recipe={selectedRecipe}
          handleClose={() => setSelectedRecipe(null)}
        />
      )}
    </Stack>
  );
};

export default SavedRecipesPage;
