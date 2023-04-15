import React, { useState, ChangeEvent, FormEvent } from "react";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import "../assets/styles/mobilesearch.css";

export default function SearchBar(): JSX.Element {
  const [inputValue, setInputValue] = useState("");

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setInputValue(event.target.value);
  }
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log("Input value:", inputValue);
    const seacrhurlform = inputValue.split(" ").join("+");
    window.location.href = `/result?searchproduct=${seacrhurlform}`;
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
      <button className="search_button" type="submit">
        search
      </button>
    </form>
  );
}
