import React, { useState, ChangeEvent, FormEvent } from "react";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import "../assets/styles/mobilesearch.css";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
export default function SearchBar(): JSX.Element {
  const navigate = useNavigate();

  const [inputValue, setInputValue] = useState("");

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setInputValue(event.target.value);
  }
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log("Input value:", inputValue);
    const seacrhurlform = inputValue.split(" ").join("+");
    navigate(`/result?searchproduct=${seacrhurlform}`);
  }

  return (
    <form className="mobilesearch" onSubmit={handleSubmit}>
      <SearchIcon />

      <div className="textdiv">
        <InputBase
          id="searchinput"
          fullWidth
          placeholder="search........"
          onChange={handleChange}
        />
      </div>
      <Button
        size="small"
        variant="contained"
        sx={{ borderRadius: "0 20px 20px 0", height: "32px", fontSize: "15" }}
        color="primary"
        className="search_button"
        type="submit"
      >
        search
      </Button>
    </form>
  );
}
