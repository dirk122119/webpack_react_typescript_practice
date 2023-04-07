import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../lib/firestore";
import {useAppDispatch } from "../../app/hooks"
import {statusUser} from "./userSlice"

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
export const fetchUser = async (q:any) =>{
  const querySnapshot = await getDocs(q);
  return querySnapshot
}
interface Props {
  open: boolean;
  close: ()=>void;
}
export default function LoginDialog(props:Props) {
  const [UserName, setUserName] = React.useState("admin");
  const [Password, setPassword] = React.useState("admin");
  const [showPassword, setShowPassword] = React.useState(false);
  const [SnackbarOpen, setSnackbarOpen] = React.useState(false);
  const [SnackbarSeverity, setSnackbarSeverity] = React.useState<"success"|"error">("success");
  const [SnackbarText, setSnackbarText] = React.useState("SnackbarText");
  const dispatch = useAppDispatch();
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClose = () => {
    props.close();
  };
  const handleSnackClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarOpen(false);
  };
  const handleSubmitClick = async () => {
    if (UserName && Password) {
      const q = query(
        collection(db, "users"),
        where("username", "==", UserName)
      );
      const querySnapshot:any = await fetchUser(q);
      if (querySnapshot.docs.length > 0 && querySnapshot.docs[0].data().password===Password)
      {
        dispatch(statusUser(UserName))
        setUserName("admin");
        setPassword("admin");
        setSnackbarSeverity("success");
        setSnackbarText("登入成功");
        setSnackbarOpen(true);
        handleClose()
      }
      else if (querySnapshot.docs.length > 0){
        setSnackbarSeverity("error");
        setSnackbarText("密碼錯誤");
        setSnackbarOpen(true);
      }
    }
  };

  return (
    <>
      <Dialog
        open={props.open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">使用者登入</DialogTitle>
        <DialogContent dividers>
          <TextField
            id="name"
            label="UserName"
            required
            fullWidth
            onChange={(event) => {
              setUserName(event.target.value);
            }}
            value={UserName}
          />
          <FormControl
            sx={{ marginTop: "10px" }}
            variant="outlined"
            required
            fullWidth
          >
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
              value={Password}
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleSubmitClick}>
            登入
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={SnackbarOpen}
        autoHideDuration={1000}
        onClose={handleSnackClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackClose}
          severity={SnackbarSeverity}
          sx={{ width: "100%" }}
        >
          {SnackbarText}
        </Alert>
      </Snackbar>
    </>
  );
}
