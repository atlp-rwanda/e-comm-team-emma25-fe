/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises*/

import * as React from "react";
// import { DataGrid, GridColDef } from "@mui/x-data-grid";
import axios from "axios";
import { useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
// import Box from '@mui/material/Box';
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { Alert, Button, Collapse, IconButton } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
import Cookies from "js-cookie";
import toast, { Toaster } from "react-hot-toast";

function getCookie(name: string): string | undefined {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  const gettoken: string | undefined = Cookies.get(name);
  return gettoken;
}
const token: string | undefined = getCookie("token");
const roles = [
  {
    value: "admin",
    label: "Admin",
  },
  {
    value: "user",
    label: "User",
  },
  {
    value: "seller",
    label: "Seller",
  },
];

export default function RolePermission() {
  const [usersData, setUsersData] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [role, setRole] = React.useState("");
  const [emailError, setEmailError] = React.useState("");
  const [roleError, setRoleError] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [openMessage, setOpenMessage] = React.useState(true);
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    toast.loading("Please wait ....");
    setLoading(true);
    if (email == "") {
      setEmailError("Email is required");
    } else if (role == "") {
      setRoleError("Role is required");
    } else {
      setEmailError("");
      setRoleError("");

      console.log("Token requ", token);
      await axios
        .patch("https://e-comm-team-emma25-bn.onrender.com/authorize", {
          email: email,
          roleName: role,
        })

        .then((response) => {
          toast.remove();
          toast.success(response.data.message);
          console.log(response.data.message);
          setMessage(response.data.message);
        })
        .catch((error) => {
          toast.remove();
          setLoading(false);
          console.log(error);
        });
    }
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setOpenMessage(false);
  };

  useEffect(() => {
    async function fetchData() {
      await axios

        .get("https://e-comm-team-emma25-bn.onrender.com/users")
        .then(function (response) {
          setUsersData(response.data.users);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    fetchData();
  });

  // console.log("response data:", usersData);
  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Set user Role"}</DialogTitle>
        <DialogContent>
          {!message ? null : (
            <Collapse in={openMessage}>
              <Alert
                severity="success"
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={handleClose}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
                sx={{ mb: 0.2 }}
              >
                {message}
              </Alert>
            </Collapse>
          )}
          <DialogContentText id="alert-dialog-description">
            <TextField
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              helperText={emailError ? emailError : ""}
              id="outlined-select-currency"
              label="Email"
            ></TextField>
            <br />
            <TextField
              value={role}
              onChange={(e) => setRole(e.target.value)}
              helperText={roleError ? roleError : "Please select your role"}
              id="outlined-select-currency"
              select
              label="Select"
              defaultValue="SELLER"
              variant="standard"
            >
              {roles.map((option: any) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          {/* <Button onClick={handleClose} autoFocus> */}
          <Button disabled={loading} onClick={(e) => handleSubmit(e)}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      <div style={{ height: 200, width: "100%", backgroundColor: "white" }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">First name</TableCell>
                <TableCell align="center">Last name</TableCell>
                <TableCell align="center">Email</TableCell>
                <TableCell align="center">Phone_number</TableCell>
                <TableCell align="center">Set Role</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {usersData.map((row: any) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row" align="center">
                    {row.firstName}
                  </TableCell>
                  <TableCell component="th" scope="row" align="center">
                    {row.lastName}
                  </TableCell>
                  <TableCell component="th" scope="row" align="center">
                    {row.email}
                  </TableCell>
                  <TableCell component="th" scope="row" align="center">
                    {row.phone_number}
                  </TableCell>
                  <Button
                    onClick={() => {
                      handleClickOpen(), setEmail(row.email);
                    }}
                  >
                    Update Role
                  </Button>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Toaster />
        </TableContainer>
      </div>
    </>
  );
}
