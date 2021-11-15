import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setObjGlobal } from "../../../redux/actions/index";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import axios from "axios";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

export default function SideBarFilterLocaltion({ text, index }) {
  const dispatch = useDispatch();
  const objGlobal = useSelector((state) => state.objGlobal);
  const [inputs, setInputs] = useState({ province: "", city: "" });
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [provinceId, setProvinceId] = useState(null);

  useEffect(() => {
    setInputs({
      province: objGlobal.province,
      city: objGlobal.city,
    });
    if (!objGlobal.province) {
      setProvinceId(null);
    }
  }, [objGlobal]);

  useEffect(() => {
    axios
      .get("/provinces?filter=true")
      .then((response) => response.data)
      .then((data) => {
        setProvinces(data.provinces);
        setCities(data.cities);
        if (objGlobal.province) {
          setProvinceId(() => {
            const index = data.provinces.findIndex(
              (p) => p.name === objGlobal.province
            );
            return data.provinces[index].id;
          });
        }
      })
      .catch((e) => console.log(e));
    // eslint-disable-next-line
  }, []);

  const handleInputs = (e) => {
    setInputs((prev) => {
      const obj = {
        ...prev,
        [e.target.name]: e.target.value,
      };
      if (e.target.name === "province") {
        obj.city = "";
        setProvinceId(() => {
          const index = provinces.findIndex((p) => p.name === e.target.value);
          return provinces[index].id;
        });
      }
      const objG = {
        ...objGlobal,
        ...obj,
      };
      dispatch(setObjGlobal(objG));
      return obj;
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
          padding: "10px 10px 0 10px",
        }}
      >
        {/* ---------------------Province----------------------- */}
        <FormControl fullWidth>
          <InputLabel>Province</InputLabel>
          <Select
            value={inputs.province}
            label="Province"
            name="province"
            onChange={(e) => handleInputs(e)}
          >
            {provinces &&
              provinces.map((el) => (
                <MenuItem key={`${el.name}_${el.id}`} value={el.name}>
                  {`${el.name} (${el.count})`}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        {/* ---------------------------------------------------- */}

        {/* ---------------------Cities----------------------- */}
        {provinceId !== null ? (
          <FormControl fullWidth>
            <InputLabel>Cities</InputLabel>
            <Select
              value={inputs.city}
              label="Cities"
              name="city"
              onChange={(e) => handleInputs(e)}
            >
              {cities &&
                cities.map((el) => {
                  if (el.provinceId === provinceId) {
                    return (
                      <MenuItem key={`${el.name}_${el.id}`} value={el.name}>
                        {`${el.name} (${el.count})`}
                      </MenuItem>
                    );
                  } else {
                    return null;
                  }
                })}
            </Select>
          </FormControl>
        ) : null}
        {/* ---------------------------------------------------- */}
      </Box>
    </List>
  );
}
