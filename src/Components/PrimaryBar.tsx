import { AppBar, IconButton, Stack, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

interface PrimaryBarProps {
  handleMenuClick: () => void;
}

const PrimaryBar = ({ handleMenuClick }: PrimaryBarProps) => {
  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar>
        <Stack direction={"row"} alignItems={"center"} spacing={4}>
          <IconButton onClick={handleMenuClick}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h5" color="primary">
            Recipe Assistant
          </Typography>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default PrimaryBar;
