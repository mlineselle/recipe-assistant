import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
} from "@mui/material";
import AuthDialog from "../Dialogs/AuthDialog";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import AccountDialog from "../Dialogs/AccountDialog";
import { useNavigate } from "react-router-dom";

interface MainDrawerProps {
  open: boolean;
  handleMenuClick: () => void;
}

const MainDrawer = ({ open, handleMenuClick }: MainDrawerProps) => {
  const [openAuth, setOpenAuth] = useState(false);
  const [openAccount, setOpenAccount] = useState(false);

  const navigate = useNavigate();
  const { user } = useAuth();

  const handleAuthOpen = () => {
    setOpenAuth(true);
  };

  const handleCloseAuth = () => {
    setOpenAuth(false);
  };

  const handleAccountOpen = () => {
    setOpenAccount(true);
  };

  const handleAccountClose = () => {
    setOpenAccount(false);
  };

  const handleRecipesClick = () => {
    // TODO: Add Snackbar or Toast notification for unauthenticated user
    if (!user) return;
    navigate(`/recipes/${user.uid}`);
    handleMenuClick();
  };

  const handleHomeClick = () => {
    navigate(`/`);
    handleMenuClick();
  };

  return (
    <>
      <Drawer open={open} onClose={handleMenuClick}>
        <Box sx={{ width: 250 }}>
          <Toolbar />
          <List>
            <ListItem>
              <ListItemButton onClick={handleHomeClick}>
                <ListItemText primary="Home" />
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton
                onClick={!user ? handleAuthOpen : handleAccountOpen}
              >
                {!user ? (
                  <ListItemText primary="Log In / Sign Up" />
                ) : (
                  <ListItemText primary="Account" />
                )}
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton onClick={handleRecipesClick}>
                <ListItemText primary="Recipes" />
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton>
                <ListItemText primary="Shopping List" />
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton>
                <ListItemText primary="Settings" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
      <AuthDialog open={openAuth} onClose={handleCloseAuth} />
      <AccountDialog open={openAccount} onClose={handleAccountClose} />
    </>
  );
};

export default MainDrawer;
