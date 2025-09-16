import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
} from "@mui/material";
import { useAuth } from "../../hooks/useAuth";
import { logout } from "../../utils/authService";

interface AccountDialogProps {
  open: boolean;
  onClose: () => void;
}

const AccountDialog = ({ open, onClose }: AccountDialogProps) => {
  const { user } = useAuth();

  const handleLogout = async () => {
    await logout();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Account Settings</DialogTitle>
      <DialogContent>
        <DialogContentText>{`Email: ${user?.email}`}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Stack flexGrow={1} direction={"row"} justifyContent={"space-between"}>
          <Button onClick={handleLogout}>Log Out</Button>
          <Button onClick={onClose}>Close</Button>
        </Stack>
      </DialogActions>
    </Dialog>
  );
};

export default AccountDialog;
