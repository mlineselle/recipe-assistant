import {
  Button,
  Card,
  CardContent,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import type { Recipe } from "../Pages/RecipeParserPage";
import CloseIcon from "@mui/icons-material/Close";
import CircleIcon from "@mui/icons-material/Circle";
import { addRecipe, deleteRecipe, updateRecipe } from "../utils/dbHelpers";
import { useAuth } from "../hooks/useAuth";
import theme from "../theme";
import { useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';

interface RecipeDisplayProps {
  savedRecipes?: Recipe[];
  recipe: Recipe;
  handleClose: () => void;
}

const RecipeDisplay = ({ recipe, handleClose, savedRecipes }: RecipeDisplayProps) => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editedRecipe, setEditedRecipe] = useState<Recipe>(recipe);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleSaveRecipe = () => {
    if (!user) return;
    addRecipe(user, recipe);
  };

  const handleDeleteRecipe = () => {
    if (!user) return;
    deleteRecipe(user, recipe.id);
    handleClose();
  };

  const handleEditingSave = () => {
    if (user) updateRecipe(user, editedRecipe);
    setIsEditing(false);
  }

  return (
    <Card
      sx={{ position: "relative", p: 4, width: "100%", maxWidth: 850, m: 4 }}
    >
      <CardContent>
        <Stack
          flexGrow={1}
          spacing={2}
          direction={"row"}
          justifyContent="flex-start"
          mb={3}
        >
          {savedRecipes?.find((r) => r.id === recipe.id) ? (
            <Button variant="outlined" onClick={handleDeleteRecipe}>
              Delete Recipe
            </Button>
          ) : (
            <Button variant="outlined" onClick={handleSaveRecipe}>
              Save Recipe
            </Button>
          )}
          <Button variant="outlined" onClick={() => { if (isEditing) { handleEditingSave() } else { setIsEditing(true) } }}>
            {isEditing ? "Save Editing" : "Edit Recipe"}
          </Button>
        </Stack>
        <Stack alignItems="flex-start">
          {isEditing ? (
            <TextField
              fullWidth
              variant="outlined"
              label="Title"
              value={editedRecipe.title}
              onChange={(e) =>
                setEditedRecipe({ ...editedRecipe, title: e.target.value })
              }
            />
          ) : (
            <Typography variant="h3" color="primary" gutterBottom>
              {recipe.title}
            </Typography>
          )}
          {isEditing ? (
            <Stack direction="row" spacing={2} sx={{ my: 2 }}>
              {(["prep", "cook", "total"] as const).map((key) => (
                <TextField
                  key={key}
                  label={`${key.charAt(0).toUpperCase() + key.slice(1)} (mins)`}
                  type="number"
                  value={editedRecipe.times?.[key] ?? ""}
                  onChange={(e) => {
                    const val = e.target.value;
                    setEditedRecipe({
                      ...editedRecipe,
                      times: {
                        ...editedRecipe.times,
                        [key]: val === "" ? undefined : val,
                      },
                    });
                  }}
                />

              ))}
            </Stack>
          ) : (
            <Stack direction="row" spacing={3} sx={{ mb: 2 }}>
              {Boolean(editedRecipe.times?.prep && editedRecipe.times.prep !== "0") && (
                <Typography variant="body1" color="text.secondary">
                  <strong>Prep:</strong> {editedRecipe.times.prep} mins
                </Typography>
              )}
              {Boolean(editedRecipe.times?.cook && editedRecipe.times.cook !== "0") && (
                <Typography variant="body1" color="text.secondary">
                  <strong>Cook:</strong> {editedRecipe.times.cook} mins
                </Typography>
              )}
              {editedRecipe.times.total && (
                <Typography variant="body1" color="text.secondary">
                  <strong>Total:</strong> {editedRecipe.times.total} mins
                </Typography>
              )}
            </Stack>
          )}

          <Typography variant="h4" color="primary" textAlign="left">
            Ingredients
          </Typography>
          <List sx={{ width: "75%", minWidth: isSmallScreen ? "100%" : 300 }}>
            {editedRecipe.ingredients.map((ingredient, i) => (
              <ListItem key={i}>
                {isEditing ? (
                  <>
                    <TextField
                      fullWidth
                      value={ingredient}
                      onChange={(e) => {
                        const newIngredients = [...editedRecipe.ingredients];
                        newIngredients[i] = e.target.value;
                        setEditedRecipe({ ...editedRecipe, ingredients: newIngredients });
                      }}
                    />
                    <IconButton
                      onClick={() => {
                        const newIngredients = editedRecipe.ingredients.filter(
                          (_, idx) => idx !== i
                        );
                        setEditedRecipe({ ...editedRecipe, ingredients: newIngredients });
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </>
                ) : (
                  <>
                    <ListItemIcon>
                      <CircleIcon color="primary" fontSize={isSmallScreen? "small" : "medium"} />
                    </ListItemIcon>
                    <ListItemText primary={ingredient} />
                  </>
                )}
              </ListItem>
            ))}
            {isEditing && (
              <Button
                variant="outlined"
                onClick={() =>
                  setEditedRecipe({
                    ...editedRecipe,
                    ingredients: [...editedRecipe.ingredients, ""],
                  })
                }
              >
                + Add Ingredient
              </Button>
            )}
          </List>
        </Stack>
        <Stack spacing={1} alignItems="flex-start" sx={{ mt: 2 }}>
          <Typography variant="h4" color="primary">
            Instructions
          </Typography>
          <List sx={{ width: "100%" }}>
            {editedRecipe.instructions.map((step, i) => (
              <ListItem key={i}>
                {isEditing ? (
                  <>
                    <TextField
                      fullWidth
                      value={step}
                      onChange={(e) => {
                        const newInstructions = [...editedRecipe.instructions];
                        newInstructions[i] = e.target.value;
                        setEditedRecipe({ ...editedRecipe, instructions: newInstructions });
                      }}
                    />
                    <IconButton
                      onClick={() => {
                        const newInstructions = editedRecipe.instructions.filter(
                          (_, idx) => idx !== i
                        );
                        setEditedRecipe({ ...editedRecipe, instructions: newInstructions });
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </>
                ) : (
                  <ListItemText primary={`${i + 1}. ${step}`} />
                )}
              </ListItem>
            ))}
            {isEditing && (
              <Button
                variant="outlined"
                onClick={() =>
                  setEditedRecipe({
                    ...editedRecipe,
                    instructions: [...editedRecipe.instructions, ""],
                  })
                }
              >
                + Add Step
              </Button>
            )}
          </List>

        </Stack>
      </CardContent>
      <IconButton
        sx={{ position: "absolute", top: 8, right: 8 }}
        onClick={handleClose}
      >
        <CloseIcon />
      </IconButton>
    </Card>
  );
};

export default RecipeDisplay;
