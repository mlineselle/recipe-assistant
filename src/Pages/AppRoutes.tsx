import { Route, Routes } from "react-router-dom";
import RecipeParserPage from "./RecipeParserPage";
import SavedRecipesPage from "./SavedRecipesPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" index element={<RecipeParserPage />} />
      <Route path="/recipes/:id" element={<SavedRecipesPage />} />
    </Routes>
  );
};

export default AppRoutes;
