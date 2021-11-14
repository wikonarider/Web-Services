import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setObjGlobal } from "../../../redux/actions/index";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import Box from "@mui/system/Box";

export default function SideBarFilterLocaltion({ text, index }) {
  const dispatch = useDispatch();
  const objGlobal = useSelector((state) => state.objGlobal);
  const provinces = useSelector((state) => state.provinces);
  const [indexProv, setIndexProv] = useState(null);
  const [inputs, setInputs] = useState({ province: "", city: "" });
  const [show, setShow] = useState(false);
  const [start, setStart] = useState(false);

  // Cargo los valores que habia en el global
  // Si habia provincia, habialito el boton de cities
  // Seteo el index para mostrar las cities
  useEffect(() => {
    setInputs({
      province: objGlobal.province,
      city: objGlobal.city,
    });
    if (objGlobal.province) {
      setShow(true);
      setIndexProv(() => {
        const index = provinces.findIndex((p) => p.name === objGlobal.province);
        return index;
      });
    }
    // eslint-disable-next-line
  }, []);

  // Dispatch cuando hay un cambio en el input
  useEffect(() => {
    if (start) {
      const obj = {
        ...objGlobal,
        province: inputs.province,
        city: inputs.city,
      };
      dispatch(setObjGlobal(obj));
    }
    // eslint-disable-next-line
  }, [inputs]);

  // Manejador de los inputs
  const handleInputs = (e, value, input) => {
    setStart(true);
    setInputs((prev) => {
      if (input === "province") {
        if (!value) {
          setIndexProv(null);
          return { province: "", city: "" };
        } else {
          return { ...prev };
        }
      } else if (input === "cities") {
        if (!value) {
          return { ...prev, city: "" };
        } else {
          return { ...prev };
        }
      } else {
        if (value && input === "provinceChange") {
          setShow(false);
          setIndexProv(() => {
            const index = provinces.findIndex((p) => p.id === value.id);
            return index;
          });
          // Demora aproposito para solventar un pegueño bug
          setTimeout(() => {
            setShow(true);
          }, 150);
          return { province: value.name, city: "" };
        } else if (value && input === "citiesChange") {
          return { ...prev, city: value.name };
        } else {
          return { ...prev };
        }
      }
    });
  };

  return (
    <List>
      <ListItem button key={index}>
        <ListItemText primary={text} />
      </ListItem>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "20px",
          width: "100%",
          pl: "10px",
          pr: "10px",
        }}
      >
        {/* ---------------------Province----------------------- */}
        <Autocomplete
          sx={{ width: "100%" }}
          options={provinces}
          getOptionLabel={(option) => option.name}
          onChange={(e, value) => {
            handleInputs(e, value, "provinceChange");
          }}
          onInputChange={(e, value) => handleInputs(e, value, "province")}
          defaultValue={{ name: objGlobal.province }}
          renderInput={(params) => (
            <TextField {...params} label={"Provinces"} placeholder="Search" />
          )}
        />

        {/* ---------------------Cities----------------------- */}
        {show && inputs.province && indexProv !== null ? (
          <Autocomplete
            sx={{ width: "100%" }}
            options={provinces[indexProv].cities}
            getOptionLabel={(option) => option.name}
            onChange={(e, value) => {
              handleInputs(e, value, "citiesChange");
            }}
            onInputChange={(e, value) => handleInputs(e, value, "cities")}
            defaultValue={{ name: objGlobal.city }}
            renderInput={(params) => (
              <TextField {...params} label={"Cities"} placeholder="Search" />
            )}
          />
        ) : null}
      </Box>
    </List>
  );
}
