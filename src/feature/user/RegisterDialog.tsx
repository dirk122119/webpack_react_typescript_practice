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
import MuiAlert , { AlertProps } from "@mui/material/Alert";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import { db } from "../../lib/firestore";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
interface Props {
  open: boolean;
  close: ()=>void;
}
export default function RegisterDialog(props:Props) {
  const [UserName, setUserName] = React.useState("");
  const [Password, setPassword] = React.useState("");
  const [PasswordCheck, setPasswordCheck] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [showPasswordCheck, setShowPasswordCheck] = React.useState(false);
  const [SnackbarOpen, setSnackbarOpen] = React.useState(false);
  const [SnackbarSeverity, setSnackbarSeverity] = React.useState<"success"|"error">("success");
  const [SnackbarText, setSnackbarText] = React.useState("SnackbarText");
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowPasswordCheck = () =>
    setShowPasswordCheck((show) => !show);
  const handleClose = () => {
    props.close();
  };
  const handleSubmitClick = async () => {
    if (Password === PasswordCheck && Password.length > 0) {
      const q = query(
        collection(db, "users"),
        where("username", "==", UserName)
      );
      const querySnapshot = await getDocs(q);
      if (querySnapshot.docs.length === 0) {
        const docRef = await addDoc(collection(db, "users"), {
          username: UserName,
          password: Password,
        });
        setUserName("");
        setPassword("");
        setPasswordCheck("");
        setSnackbarSeverity("success");
        setSnackbarText("註冊成功");
        setSnackbarOpen(true);
        props.close();
      }
      else{
        setSnackbarSeverity("error");
        setSnackbarText("重複的username");
        setSnackbarOpen(true);
      }
    }
    else{
      setSnackbarSeverity("error");
        setSnackbarText("請確認密碼是否相同");
        setSnackbarOpen(true);
    }
  };
  const handleSnackClose = (vent?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarOpen(false);
  };
  return (
    <>
      <Dialog
        open={props.open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">註冊使用者</DialogTitle>
        <DialogContent dividers>
          <TextField
            id="name"
            label="UserName"
            required
            fullWidth
            onChange={(event) => {
              setUserName(event.target.value);
            }}
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
            />
          </FormControl>
          <FormControl
            sx={{ marginTop: "10px" }}
            variant="outlined"
            required
            fullWidth
          >
            <InputLabel htmlFor="outlined-adornment-password">
              Password Check
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password-check"
              type={showPasswordCheck ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPasswordCheck}
                    edge="end"
                  >
                    {showPasswordCheck ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password Check"
              onChange={(event) => {
                setPasswordCheck(event.target.value);
              }}
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleSubmitClick}>
            註冊
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
