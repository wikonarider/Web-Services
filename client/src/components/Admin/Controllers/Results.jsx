import React, { useState } from "react";
import axios from "axios";
import TextInput from "./TextInput";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
// import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
// import CheckBoxIcon from "@mui/icons-material/CheckBox";
import parse from "autosuggest-highlight/parse";
import match from "autosuggest-highlight/match";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";
import SaveIcon from "@mui/icons-material/Save";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

// const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
// const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function Results({
  search,
  options,
  open,
  setOpen,
  selected,
  setSelected,
  setOptions,
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
    if (edit[option.id] && edit[option.id].editing) {
      setEdit((edit) => {
        return { ...edit, [option.id]: { editing: false } };
      });
    } else {
      setEdit((edit) => {
        return {
          ...edit,
          [option.id]: { ...edit[option.id], editing: true, ban: option.ban },
        };
      });
    }
  };

  const handleSave = async (event, option) => {
    let { name, lastname, username, email, password, ban } = edit[option.id];

    await axios.put(`/users?id=${option.id}`, {
      name,
      lastname,
      username,
      email,
      password,
      ban,
    });

    if (search === "") {
      setOptions([]);
    } else {
      await axios
        .get(`/users/search?search=${search}`)
        .then((response) => setOptions(response.data));
    }

    setEdit(event, option);
  };

  const handleStatusChange = (event, id) => {
    let value = event.target.value;
    setEdit((edit) => {
      return { ...edit, [id]: { ...edit[id], ban: value } };
    });
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
                gridTemplateColumns="auto repeat(13, 1fr) auto"
                gap={0}
                p={0}
                key={`option-${o.id}`}
              >
                <Box gridColumn="span 1" display="flex">
                  <Checkbox
                    checked={checked[o.id] || false}
                    onChange={(event) => handleCheck(event, o)}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                  <Avatar alt={`${o.name}-avatar`} src={o.userImg} />
                </Box>

                <Box gridColumn="span 4" display="flex">
                  {edit[o.id] && edit[o.id].editing ? (
                    <>
                      <TextInput
                        defaultValue={o.name}
                        setEdit={setEdit}
                        edit={edit}
                        optionId={o.id}
                        optionProp="name"
                      />{" "}
                      <TextInput
                        defaultValue={o.lastname}
                        setEdit={setEdit}
                        edit={edit}
                        optionId={o.id}
                        optionProp="lastname"
                      />
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

                <Box gridColumn="span 2" display="flex">
                  {edit[o.id] && edit[o.id].editing ? (
                    <TextInput
                      defaultValue={o.username}
                      setEdit={setEdit}
                      edit={edit}
                      optionId={o.id}
                      optionProp="username"
                    />
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

                <Box gridColumn="span 4" display="flex">
                  {edit[o.id] && edit[o.id].editing ? (
                    <TextInput
                      defaultValue={o.email}
                      setEdit={setEdit}
                      edit={edit}
                      optionId={o.id}
                      optionProp="email"
                    />
                  ) : (
                    <ListItemText sx={styleObj.listItem.text}>
                      {o.email}
                    </ListItemText>
                  )}
                </Box>

                <Box gridColumn="span 1" display="flex">
                  {edit[o.id] && edit[o.id].editing ? (
                    <>
                      {/* <TextInput
                        defaultValue={o.ban ? "Banned" : "Active"}
                        setEdit={setEdit}
                        edit={edit}
                        optionId={o.id}
                        optionProp="ban"
                      /> */}
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        defaultValue={edit[o.id].ban}
                        value={edit[o.id].ban}
                        sx={{ width: "100px", color: "black" }}
                        onChange={(e) => handleStatusChange(e, o.id)}
                      >
                        <MenuItem value={false}>Active</MenuItem>
                        <MenuItem value={true}>Banned</MenuItem>
                      </Select>
                    </>
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
                  {edit[o.id] && edit[o.id].editing && (
                    <TextInput
                      defaultValue={"password"}
                      setEdit={setEdit}
                      edit={edit}
                      optionId={o.id}
                      optionProp="password"
                    />
                  )}
                </Box>

                <Box gridColumn="span 1" display="flex">
                  {edit[o.id] && edit[o.id].editing ? (
                    <>
                      <IconButton onClick={(e) => handleEdit(e, o)}>
                        <ClearIcon />
                      </IconButton>
                      <IconButton>
                        <SaveIcon onClick={(e) => handleSave(e, o)} />
                      </IconButton>
                    </>
                  ) : (
                    <IconButton onClick={(e) => handleEdit(e, o)}>
                      <EditIcon />
                    </IconButton>
                  )}
                </Box>
              </Box>
            );
          })}
      </List>
    </>
  );
}
