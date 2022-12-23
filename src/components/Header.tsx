import React, { useContext, useEffect, useState } from "react";
import logo from "../../src/Logo.png";
import { Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

interface Props {
  title: string;
}
const Header:React.FC<Props> = ({title}) => {
  const [avatarURL, setAvatarURL] = useState("")

  const getAvatarUrl = () =>{
    const localStorageUrl = localStorage.getItem("user")

    if(localStorageUrl){
      setAvatarURL(localStorageUrl ? JSON.parse(localStorageUrl) : "")

    }else{
      fetch("https://randomuser.me/api/")
      .then((res) => res.json())
      .then((data) => {
        localStorage.setItem(
          "user",
          JSON.stringify(data.results[0].picture.thumbnail)
        );
        setAvatarURL(data.results[0].picture.thumbnail)
      });
    }
  }

  useEffect(()=>{
    getAvatarUrl()
   
  },[])




  return (
    <div className="header">
      <img className="logo-header" src={logo} />
      <h3>{title}</h3>
      <Avatar src={avatarURL || ""} alt="" />
    </div>
  );
};

export default Header;
