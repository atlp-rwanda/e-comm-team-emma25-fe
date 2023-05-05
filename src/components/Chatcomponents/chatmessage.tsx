import React, { useState, useEffect, useRef, MouseEventHandler } from "react";
import io from "socket.io-client";
import "../../assets/styles/chat.css";
import ChatMessage from "./Message";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import Cookies from "js-cookie";
import { Typography } from "@mui/material";
interface Message {
  sender: string;
  message: string;
}
interface chatMessage {
  person: string;
  message: string;
}
type user = {
  id: number | null;
  role: string;
  phone: string | null;
  name: string;
  email: string;
};
function scrollToBottom(ref: React.RefObject<HTMLDivElement>) {
  if (ref.current) {
    ref.current.scrollTop = ref.current.scrollHeight;
  }
}
function getCookie(name: string): string | undefined {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  const gettoken: string | undefined = Cookies.get(name);
  return gettoken;
}
const token: string | undefined = getCookie("token");
const socket = token
  ? io(process.env.BACKEND_LINK as string, { query: { token: token } })
  : undefined;

const Chatscreen: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<user>({
    id: null,
    role: "",
    name: "",
    phone: null,
    email: "",
  });
  const MessageDiv = useRef<HTMLDivElement>(null);
  const handleScroll: MouseEventHandler<HTMLButtonElement> = () => {
    scrollToBottom(MessageDiv);
  };

  useEffect(() => {
    if (socket == undefined) {
      return;
    }
    socket.on("new-user", (user: user) => {
      setUserData(user);
      socket?.emit("connected", user.name);
      toast(`welcome ${user.name} `, {
        type: "info",
      });
    });
    socket?.on("failure_connection", (message: { error: string }) => {
      toast(`${message.error}`, {
        type: "error",
      });
    });
    socket?.on("chat-message", (data: chatMessage) => {
      displayMessage(data.person, data.message);
    });
    socket?.on("recents", (chats: []) => {
      const allmessages: Message[] = [];
      chats.forEach((chat: Message[]) => {
        allmessages.push({ sender: chat[0].sender, message: chat[0].message });
      });
      setMessages(allmessages);
      setLoading(false);
      scrollToBottom(MessageDiv);
    });
    socket?.on("bye", (data: chatMessage) => {
      toast(`${data.person} : ${data.message} `, {
        type: "info",
      });
    });
  }, []);

  if (token == undefined) {
    toast(`Please login first`, {
      type: "error",
    });
    return (
      <div>
        <ToastContainer theme="light" />
      </div>
    );
  }
  const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputValue.trim()) {
      toast("Please provide a message", {
        type: "error",
      });
      return;
    }
    if (!socket) {
      toast("Please login", {
        type: "error",
      });
      return;
    }
    if (userData.id) {
      socket.emit("chat", {
        senderId: userData.id,
        person: userData.name,
        message: inputValue,
      });
    } else {
      toast("Loading please wait", {
        type: "error",
      });
    }

    displayMessage(userData.name, inputValue);
    setInputValue("");
    setErrorMessage("");
  };
  const displayMessage = (person: string, message: string) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: person, message },
    ]);
  };

  return (
    <div>
      <ToastContainer theme="light" />
      <div className="container">
        <IconButton size="large" color="primary" onClick={handleScroll}>
          <ArrowCircleDownIcon />
        </IconButton>
        <div className="title">
          <h2>Chats</h2>
        </div>
        <div className="messages" ref={MessageDiv}>
          {loading ? (
            <Box
              sx={{
                width: "100%",
                height: "100%",
                left: "unset",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Box
                sx={{ width: "100%", display: "flex", alignItems: "center" }}
              >
                <CircularProgress
                  color="primary"
                  sx={{ zIndex: "100", margin: "auto" }}
                />
              </Box>
            </Box>
          ) : (
            <></>
          )}
          {messages.map(({ sender, message }, index) => (
            <div
              className={`message ${sender === userData.name ? "mine" : ""}`}
              key={index}
            >
              <ChatMessage sender={sender} message={message} />
            </div>
          ))}
        </div>
        <div className="formBox">
          <form onSubmit={sendMessage}>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              required
              name="txt"
              placeholder="Type a message"
              autoComplete="off"
            />
            <Button
              size="small"
              color="primary"
              variant="contained"
              type="submit"
              endIcon={<SendIcon />}
            >
              <Typography sx={{ display: { xs: "none", sm: "block" } }}>
                {" "}
                Send
              </Typography>
            </Button>
          </form>
          {errorMessage && <span className="error">{errorMessage}</span>}
        </div>
      </div>
    </div>
  );
};

export default Chatscreen;
