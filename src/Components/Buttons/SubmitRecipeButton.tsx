import { Button } from "@mui/material";

interface SubmitRecipeButtonProps {
  disabled: boolean;
  onClick: () => void;
}

const SubmitRecipeButton = ({ disabled, onClick }: SubmitRecipeButtonProps) => {
  return (
    <Button
      disabled={disabled}
      variant="contained"
      color="primary"
      onClick={onClick}
      sx={{ mt: 2, width: 'fit-content', alignSelf: 'center' }}
    >
      Submit Recipe
    </Button>
  );
};

export default SubmitRecipeButton;
