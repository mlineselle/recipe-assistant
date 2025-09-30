import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  useMediaQuery,
} from "@mui/material";
import AuthDialog from "../Dialogs/AuthDialog";
import { useAuth } from "../../hooks/useAuth";
import AccountDialog from "../Dialogs/AccountDialog";
import { useNavigate } from "react-router-dom";
import { onOpenDialog } from "../../redux/ApplicationSlice";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../redux/Store";
import { DIALOGS } from "../../utils/constants";
import theme from "../../theme";

interface MainDrawerProps {
  open: boolean;
  handleMenuClick: () => void;
}

const MainDrawer = ({ open, handleMenuClick }: MainDrawerProps) => {
  const dispatch = useDispatch();
  const { openDialog } = useSelector((state: RootState) => state.application);
  const isSmallScreen = useMediaQuery((theme.breakpoints.down("sm")));

  const navigate = useNavigate();
  const { user } = useAuth();

  const handleAuthOpen = () => {
    dispatch(onOpenDialog(DIALOGS.AUTH));
  };

  const handleCloseAuth = () => {
    dispatch(onOpenDialog(null));
  };

  const handleAccountOpen = () => {
    dispatch(onOpenDialog(DIALOGS.ACCOUNT));
  };

  const handleAccountClose = () => {
    dispatch(onOpenDialog(null));
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
        <Box sx={{ width: isSmallScreen ? "100vw" : 250 }}>
          <Toolbar />
          <List>
            <ListItem>
              <ListItemButton onClick={handleHomeClick}>
                <ListItemText primary="Home" />
              </ListItemButton>
            </ListItem>
            <Divider />
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
            <Divider />
            <ListItem>
              <ListItemButton onClick={handleRecipesClick}>
                <ListItemText primary="Recipes" />
              </ListItemButton>
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemButton>
                <ListItemText primary="Shopping List" />
              </ListItemButton>
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemButton>
                <ListItemText primary="Settings" />
              </ListItemButton>
            </ListItem>
            <Divider />
          </List>
        </Box>
      </Drawer>
      {openDialog === DIALOGS.AUTH && <AuthDialog open onClose={handleCloseAuth} />}
      {openDialog === DIALOGS.ACCOUNT && <AccountDialog open onClose={handleAccountClose} />}
    </>
  );
};

export default MainDrawer;
