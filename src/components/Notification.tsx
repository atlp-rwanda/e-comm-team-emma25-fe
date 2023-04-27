import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { Notifications } from "../interfaces/Notification";
import CircularProgress from "@mui/material/CircularProgress";
import Cookies from "js-cookie";
import { Typography, Box, Divider } from "@mui/material";
import { Stack } from "@mui/system";
function getCookie(name: string): string | undefined {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  const gettoken: string | undefined = Cookies.get(name);
  return gettoken;
}
const Notification = () => {
  const token: string | undefined = getCookie("token");
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

  useEffect(() => {
    const socket = token
      ? io("https://e-comm-team-emma25-bn.onrender.com/", {
          query: { token: token },
        })
      : undefined;
    if (token == undefined) {
      return;
    }
    socket?.on("allnotifications", (nots: Notifications[]) => {
      setNotifications(nots);
      setLoading(false);
    });
  }, []);
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
            .
          </>
        )}
        <Stack direction="column" gap="5px">
          {notifications
            ? notifications.map((noti, indx) => {
                return (
                  <div key={indx}>
                    <Typography sx={{ fontWeight: 600 }}>
                      {noti.subject}
                    </Typography>
                    <Typography paragraph>{noti.message}</Typography>
                    <Typography sx={{ mt: -5 }} align="right" component="small">
                      {noti.createdAt.split("T")[0]}{" "}
                      {noti.createdAt.split("T")[1]}
                    </Typography>
                    <Divider />
                  </div>
                );
              })
            : ""}
        </Stack>
      </Box>
    </>
  );
};
export default Notification;
