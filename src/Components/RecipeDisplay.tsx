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
  Typography,
} from "@mui/material";
import type { Recipe } from "../Pages/RecipeParserPage";
import CloseIcon from "@mui/icons-material/Close";
import CircleIcon from "@mui/icons-material/Circle";
import { addRecipe, deleteRecipe } from "../utils/dbHelpers";
import { useAuth } from "../hooks/useAuth";

interface RecipeDisplayProps {
  savedRecipes?: Recipe[];
  recipe: Recipe;
  handleClose: () => void;
}

const RecipeDisplay = ({ recipe, handleClose, savedRecipes }: RecipeDisplayProps) => {
  const { user } = useAuth();

  const handleSaveRecipe = () => {
    if (!user) return;
    addRecipe(user, recipe);
  };

  const handleDeleteRecipe = () => {
    if (!user) return;
    deleteRecipe(user, recipe.id);
    handleClose();
  };

  return (
    <Card
      sx={{ position: "relative", p: 4, width: "100%", maxWidth: "50vw", m: 4 }}
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
        </Stack>
        <Stack alignItems="flex-start">
          <Typography
            variant="h3"
            color="primary"
            textAlign="center"
            gutterBottom
          >
            {recipe.title}
          </Typography>
          <Typography variant="h4" color="primary" textAlign="left">
            Ingredients
          </Typography>
          <List sx={{ width: "auto", alignSelf: "flex-start" }}>
            {recipe.ingredients.map((ingredient, index) => (
              <ListItem key={index}>
                <ListItemIcon>
                  <CircleIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary={ingredient} />
              </ListItem>
            ))}
          </List>
        </Stack>
        <Stack spacing={1} alignItems="flex-start" sx={{ mt: 2 }}>
          <Typography variant="h4" color="primary">
            Instructions
          </Typography>
          <List sx={{ width: "auto", alignSelf: "flex-start", px: 2, py: 1 }}>
            {recipe.instructions.map((instruction, index) => (
              <ListItem key={index}>
                <ListItemText primary={`${index + 1}. ${instruction}`} />
              </ListItem>
            ))}
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
