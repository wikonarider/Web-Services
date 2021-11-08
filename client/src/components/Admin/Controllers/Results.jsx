import React, { useState } from "react";
import TextInput from "./TextInput";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
// import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
// import CheckBoxIcon from "@mui/icons-material/CheckBox";
import parse from "autosuggest-highlight/parse";
import match from "autosuggest-highlight/match";
import List from "@mui/material/List";
// import ListItem from "@mui/material/ListItem";
// import ListItemButton from "@mui/material/ListItemButton";
// import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
// import InboxIcon from "@mui/icons-material/Inbox";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";

// const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
// const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function Results({
  search,
  options,
  open,
  setOpen,
  selected,
  setSelected,
}) {
  let [checked, setChecked] = useState({});
  let [edit, setEdit] = useState({});

  const handleCheck = (event, option) => {
    let newSelected = [];
    if (checked[option.id]) {
      newSelected = selected.filter((user) => user.id !== option.id);
      setChecked((checked) => {
        return { ...checked, [option.id]: false };
      });
    } else {
      if (selected.length > 0) {
        newSelected = [...selected, option];
      } else {
        newSelected = [option];
      }
      setChecked((checked) => {
        return { ...checked, [option.id]: true };
      });
    }

    setSelected(newSelected);
  };

  const handleEdit = (event, option) => {
    if (edit[option.id]) {
      setEdit((edit) => {
        return { ...edit, [option.id]: false };
      });
    } else {
      setEdit((edit) => {
        return { ...edit, [option.id]: true };
      });
    }
  };

  const styleObj = {
    listItem: {
      text: {
        pl: "10px",
        m: "auto auto auto 0px",
        textAlign: "start",
      },
    },
  };

  return (
    <>
      <List sx={{ display: open ? "block" : "none" }}>
        {options &&
          options.map((o) => {
            const fullName = parse(
              `${o.name} ${o.lastname}`,
              match(`${o.name} ${o.lastname}`, search)
            );
            const userName = parse(`${o.username}`, match(o.username, search));

            return (
              <Box
                display="grid"
                gridTemplateColumns="auto repeat(3, 1fr) auto auto auto"
                gap={0}
                p={0}
              >
                <Box gridColumn="span 1" display="flex">
                  <Checkbox
                    checked={checked[o.id] || false}
                    onChange={(event) => handleCheck(event, o)}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                  <Avatar alt={`${o.name}-avatar`} src={o.userImg} />
                </Box>

                <Box gridColumn="span 1" display="flex">
                  {edit[o.id] ? (
                    <>
                      <TextInput defaultValue={o.name} />{" "}
                      <TextInput defaultValue={o.lastname} />
                    </>
                  ) : (
                    <ListItemText sx={styleObj.listItem.text}>
                      {fullName.map((part, index) => (
                        <span
                          style={{
                            fontWeight: part.highlight ? 700 : 400,
                            //   color: part.highlight ? "green" : "black",
                          }}
                        >
                          {part.text}
                        </span>
                      ))}
                    </ListItemText>
                  )}
                </Box>

                <Box gridColumn="span 1" display="flex">
                  {edit[o.id] ? (
                    <TextInput defaultValue={o.username} />
                  ) : (
                    <ListItemText sx={styleObj.listItem.text}>
                      {userName.map((part, index) => (
                        <span
                          style={{
                            fontWeight: part.highlight ? 700 : 400,
                            //   color: part.highlight ? "green" : "black",
                          }}
                        >
                          {part.text}
                        </span>
                      ))}
                    </ListItemText>
                  )}
                </Box>

                <Box gridColumn="span 1" display="flex">
                  {edit[o.id] ? (
                    <TextInput defaultValue={o.email} />
                  ) : (
                    <ListItemText sx={styleObj.listItem.text}>
                      {o.email}
                    </ListItemText>
                  )}
                </Box>

                <Box gridColumn="span 1" display="flex">
                  {edit[o.id] ? (
                    <TextInput defaultValue={o.ban ? "Banned" : "Active"} />
                  ) : (
                    <ListItemText
                      sx={{
                        ...styleObj.listItem.text,
                        color: o.ban ? "red" : "green",
                      }}
                    >
                      {o.ban ? "Banned" : "Active"}
                    </ListItemText>
                  )}
                </Box>
                <Box gridColumn="span 1" display="flex">
                  <ListItemText sx={styleObj.listItem.text}>
                    {o.admin ? "Admin" : "User"}
                  </ListItemText>
                </Box>

                <Box gridColumn="span 1" display="flex">
                  <IconButton>
                    <EditIcon onClick={(e) => handleEdit(e, o)} />
                  </IconButton>
                </Box>
              </Box>
            );
          })}
      </List>
    </>
  );
}
