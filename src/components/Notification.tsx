import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { Notifications } from "../interfaces/Notification";
import CircularProgress from "@mui/material/CircularProgress";
import Cookies from "js-cookie";
import { Typography, Box, Divider } from "@mui/material";
import { Stack } from "@mui/system";

function getCookie(name: string): string | undefined {
  const gettoken: string | undefined = Cookies.get(name) as string | undefined;
  return gettoken;
}
const Notification = () => {
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState<Notifications[] | null>([
    {
      id: 0,
      subject: "",
      message: "",
      createdAt: "",
      status: "",
      userId: 0,
    },
  ]);
  const token: string | undefined = getCookie("token");
  const socket = token
    ? io(process.env.BACKEND_LINK as string, { query: { token: token } })
    : undefined;
  useEffect(() => {
    if (token == undefined) {
      return;
    }
    socket?.on("allnotifications", (nots: Notifications[]) => {
      setLoading(false);
      setNotifications(nots);
    });
  }, [socket, token]);
  if (token == undefined) {
    return <>Please Login</>;
  }
  return (
    <>
      <Box component="div">
        {loading && (
          <>
            <CircularProgress />{" "}
            <Typography paragraph sx={{ fontWeight: 700 }}>
              Getting notifications ...
            </Typography>{" "}
          </>
        )}
        <Stack direction="column" gap="5px">
          {notifications
            ? notifications.length <= 0 && "You have no notifications"
            : ""}
          {notifications
            ? notifications.map((noti, indx) => {
                return (
                  <div key={indx}>
                    <Typography sx={{ fontWeight: 600 }}>
                      {noti.subject}
                    </Typography>
                    <Typography paragraph>{noti.message}</Typography>
                    <Typography sx={{ mt: -8 }} align="right" component="small">
                      {noti.createdAt.split("T")[0]}{" "}
                      {noti.createdAt.split("T")[1]}
                    </Typography>
                    <Divider />
                  </div>
                );
              })
            : " You have no notifications. "}
        </Stack>
      </Box>
    </>
  );
};
export default Notification;
