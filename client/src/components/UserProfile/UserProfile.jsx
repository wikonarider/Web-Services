import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo } from "../../redux/actions";
import Avatar from "@mui/material/Avatar";
import Nav from "../Nav/Nav";
import ShareIcon from "@mui/icons-material/Share";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

import CardService from "../CardService/CardService";

import s from "./UserProfile.module.css";

export default function UserProfile({ id }) {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user);

  useEffect(() => {
    (async () => {
      dispatch(await getUserInfo());
    })();
  }, []);

  return (
    <div>
      <Nav />
    </div>
  );
}
