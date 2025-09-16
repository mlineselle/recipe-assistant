import { Button } from "@mui/material";

interface SubmitRecipeButtonProps {
  onClick: () => void;
}

const SubmitRecipeButton = ({ onClick }: SubmitRecipeButtonProps) => {
  return (
  <Button variant="contained" color="primary" onClick={onClick} sx={{ mt: 2, width: 'fit-content', alignSelf: 'center' }}>
      Submit Recipe
    </Button>
  );
};

export default SubmitRecipeButton;
