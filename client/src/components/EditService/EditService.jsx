import React, { useState, useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { putService } from "../../redux/actions";
import { getServiceById } from "../../utils/servicesPage";
import ModalService from "../CreateService/ModalService";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PhotoSizeSelectActualIcon from "@mui/icons-material/PhotoSizeSelectActual";
import Skeleton from "@mui/material/Skeleton";
import useMediaQuery from "@mui/material/useMediaQuery";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import s from "./EditService.module.css";

function validateServices(input) {
  for (let key in input) {
    if (key === "price" && input[key] < 100) {
      return false;
    } else {
      if (!input[key]) {
        return false;
      }
    }
  }
  return true;
}

function errorsValidate(input) {
  let errors = {};
  if (!input.title) {
    errors.title = "Title empty";
  }

  if (!input.description) {
    errors.description = "Description empty";
  }

  if (!input.price) {
    errors.price = "Price empty";
  } else if (input.price < 100) {
    errors.price = "Minimun price is 100";
  }

  return errors;
}

function EditService({ id }) {
  const history = useHistory();
  const dispatch = useDispatch();

  const groups = useSelector((state) => state.groups);
  const provinces = useSelector((state) => state.provinces);
  const query = useMediaQuery("(max-width: 500px)");

  //-----------REF-------------------------------
  const fileInput = useRef();

  const [inputs, setInputs] = useState({
    groupId: "",
    categoryId: "",
    provinceId: "",
    cityId: "",
    title: "",
    description: "",
    price: "",
    img: "",
    avaliable: "",
  });
  const [inputsComplete, setInputsComplete] = useState({
    province: null,
    city: null,
  });
  const [skeleton, setSkeleton] = useState(false);
  const [errors, setErrors] = useState({});
  const [modal, setModal] = useState(false);
  const [show, setShow] = useState(false);
  const [service, setService] = useState({});

  //---------- TRAIGO INFO DEL SERVICIO ---------------
  useEffect(() => {
    getServiceById(id)
      .then((data) => setService(data.service))
      .catch((e) => console.log(e));
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (Object.keys(service).length) {
      setInputs(() => ({
        title: service.title,
        description: service.description,
        price: service.price,
        img: service.img,
        categoryId: service.category.id,
        groupId: service.category.group.id,
        provinceId: service.province.id,
        cityId: service.city.id,
        avaliable: service.avaliable ? "true" : "false",
      }));
      setInputsComplete(() => {
        const province = provinces.find((p) => p.id === service.province.id);
        const city = province.cities.find((c) => c.id === service.city.id);
        return {
          province: province,
          city: city,
        };
      });
      setShow(true);
    }
    // eslint-disable-next-line
  }, [service]);

  const handleInputs = (e) => {
    setInputs((prev) => {
      const obj = {
        ...prev,
        [e.target.name]: e.target.value,
      };
      if (e.target.name === "groupId") {
        obj.categoryId = "";
      }
      setErrors(errorsValidate(obj));
      return obj;
    });
  };

  const handleInputProvince = (e, value, input) => {
    if (input === "province" && !value) {
      setInputsComplete(() => ({
        province: null,
        city: null,
      }));
      setInputs((prev) => ({
        ...prev,
        provinceId: "",
        cityId: "",
      }));
      setShow(false);
    } else if (input === "province") {
      return;
    } else {
      setInputsComplete(() => ({
        province: value,
        city: null,
      }));
      if (value) {
        setShow(false);
        setInputs((prev) => ({
          ...prev,
          provinceId: value.id,
          cityId: "",
        }));
        setTimeout(() => {
          setShow(true);
        }, 100);
      }
    }
  };

  const handleInputCity = (e, value, input) => {
    if (input === "cities" && !value) {
      setInputsComplete((prev) => ({
        ...prev,
        city: null,
      }));
      setInputs((prev) => ({
        ...prev,
        cityId: "",
      }));
    } else if (input === "cities") {
      return;
    } else {
      setInputsComplete((prev) => ({
        ...prev,
        city: value,
      }));
      if (value) {
        setInputs((prev) => ({
          ...prev,
          cityId: value.id,
        }));
      }
    }
  };

  const handleChangeSwitch = (e) => {
    setInputs((prev) => ({
      ...prev,
      avaliable: e.target.checked ? "true" : "false",
    }));
  };

  const loadImg = async (files) => {
    const reader = new FileReader();
    reader.readAsDataURL(files);

    const formData = new FormData();
    formData.append("file", files);
    // replace this with your upload preset name
    formData.append("upload_preset", "hn1tlyfq");
    const options = {
      method: "POST",
      body: formData,
    };

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dzjz8pe0y/image/upload",
        options
      );
      const res_1 = await res.json();
      setSkeleton(false);
      return setInputs((prev) => ({ ...prev, img: res_1.secure_url }));
    } catch (err) {
      return console.log(err);
    }
  };

  const handleSubmit = () => {
    try {
      let obj = {
        serviceId: id,
      };
      if (inputs.avaliable === "false") {
        obj.avaliable = "false";
      } else {
        obj = {
          ...obj,
          ...inputs,
          price: Number(inputs.price),
        };
      }
      dispatch(putService(obj));
      setModal(true);
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <>
      {!Object.keys(service).length ? (
        <Box
          sx={{ display: "flex", justifyContent: "center", marginTop: "20%" }}
        >
          <div className={s.spinner}></div>
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "20px",
            width: "80%",
            ml: "auto",
            mr: "auto",
          }}
        >
          {/* ---------------- Boton back --------------------- */}
          <Box
            display="grid"
            justifyContent="flex-start"
            sx={{ marginLeft: 2, marginTop: 2 }}
          >
            <IconButton
              color="primary"
              onClick={() => history.push("/account")}
            >
              <ArrowBackIcon />
            </IconButton>
          </Box>
          {/* -------------------------------------------------- */}
          {/* ---------------- Disable service------------------ */}
          <FormControlLabel
            control={
              <Switch
                checked={inputs.avaliable === "true"}
                color="success"
                onChange={handleChangeSwitch}
                inputProps={{ "aria-label": "controlled" }}
              />
            }
            label={
              inputs.avaliable === "true"
                ? "Service avaliable"
                : "Service disable"
            }
          />

          {/* -------------------------------------------------- */}
          {/* ----------Manejador de categorias y provincias ------*/}
          <Box
            sx={{
              display: "flex",
              gap: "20px",
              flexWrap: query ? "wrap" : "nowrap",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                width: "100%",
              }}
            >
              {/* ---------------- Category(group) -------------------- */}
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  disabled={inputs.avaliable === "false"}
                  value={inputs.groupId}
                  label="Category"
                  name="groupId"
                  onChange={(e) => handleInputs(e, null)}
                >
                  {groups &&
                    groups.map((el) => (
                      <MenuItem key={`${el.name}_${el.id}`} value={el.id}>
                        {el.name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
              {/* ---------------------------------------------------- */}

              {/* ---------------- Type(Categoria) -------------------- */}
              {groups[inputs.groupId - 1] && inputs.groupId !== null ? (
                <FormControl fullWidth>
                  <InputLabel>Type</InputLabel>
                  <Select
                    disabled={inputs.avaliable === "false"}
                    value={inputs.categoryId}
                    label="Type"
                    name="categoryId"
                    onChange={(e) => handleInputs(e, null)}
                  >
                    {groups &&
                      groups[inputs.groupId - 1].categories.map((el) => (
                        <MenuItem key={`${el.name}_${el.id}`} value={el.id}>
                          {el.name}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              ) : null}
              {/* ---------------------------------------------------- */}
            </Box>

            {/* ------------------- Province ----------------------- */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                width: "100%",
              }}
            >
              <Autocomplete
                fullwidth="true"
                disabled={inputs.avaliable === "false"}
                value={inputsComplete.province}
                options={provinces}
                getOptionLabel={(option) => option.name}
                onChange={(e, value) => handleInputProvince(e, value, null)}
                onInputChange={(e, value) =>
                  handleInputProvince(e, value, "province")
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={"Provinces"}
                    placeholder="Search"
                  />
                )}
              />
              {/* ---------------------------------------------------- */}

              {/* ------------------- Ciudad ----------------------- */}
              {show && inputs.provinceId && inputsComplete.province.cities ? (
                <Autocomplete
                  fullwidth="true"
                  disabled={inputs.avaliable === "false"}
                  options={inputsComplete.province.cities}
                  getOptionLabel={(option) => option.name}
                  value={inputsComplete.city}
                  onChange={(e, value) => {
                    handleInputCity(e, value, null);
                  }}
                  onInputChange={(e, value) => {
                    handleInputCity(e, value, "cities");
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label={"Cities"}
                      placeholder="Search"
                    />
                  )}
                />
              ) : null}
            </Box>
          </Box>
          {/* ---------------------------------------------------- */}
          {/* ----Manejador de titulo, descripcion  y precio -----*/}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            <TextField
              disabled={inputs.avaliable === "false"}
              name="title"
              placeholder="title"
              value={inputs.title}
              onChange={handleInputs}
              error={
                inputs.avaliable === "true"
                  ? errors.title
                    ? true
                    : false
                  : false
              }
              helperText={inputs.avaliable === "true" ? errors.title : ""}
              label="New Title"
              variant="outlined"
              required
              fullWidth
            />

            <TextField
              disabled={inputs.avaliable === "false"}
              multiline
              minRows={4}
              name="description"
              placeholder="description"
              value={inputs.description}
              onChange={handleInputs}
              error={
                inputs.avaliable === "true"
                  ? errors.description
                    ? true
                    : false
                  : false
              }
              helperText={inputs.avaliable === "true" ? errors.description : ""}
              label="New Description"
              variant="outlined"
              required
              fullWidth
            />

            <TextField
              disabled={inputs.avaliable === "false"}
              name="price"
              placeholder="price"
              value={inputs.price}
              onChange={handleInputs}
              error={
                inputs.avaliable === "true"
                  ? errors.price
                    ? true
                    : false
                  : false
              }
              helperText={inputs.avaliable === "true" ? errors.price : ""}
              label="New Price"
              variant="outlined"
              type="number"
              required
              fullWidth
            />
          </Box>
          {/* ---------------------------------------------------- */}
          {/* ----------------- Carga de imagen ------------------ */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            <TextField
              style={{ display: "none" }}
              name="img"
              type="file"
              inputRef={fileInput}
              onChange={(e) => loadImg(e.target.files[0])}
            />

            <Button
              variant="outlined"
              startIcon={<PhotoSizeSelectActualIcon />}
              color="secondary"
              onClick={() => {
                fileInput.current.click();
                setSkeleton(true);
              }}
              fullWidth={true}
            >
              Select File
            </Button>

            {/* ----------------- Box imagen/skeleton ------------------ */}
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
            >
              {inputs.img && !skeleton ? (
                <img
                  style={{ maxWidth: "345px", width: "100%" }}
                  src={inputs.img}
                  alt="upload_image"
                />
              ) : null}
              {skeleton ? (
                <Skeleton variant="rectangular" width={345} height={268} />
              ) : null}
            </Box>
            {/* ---------------------------------------------------- */}
          </Box>
          {/* ---------------------------------------------------- */}

          <Button
            disabled={
              inputs.avaliable === "true" ? !validateServices(inputs) : false
            }
            type="submit"
            variant="contained"
            fullWidth={true}
            color="secondary"
            onClick={handleSubmit}
          >
            Edit Service
          </Button>

          <ModalService
            modal={modal}
            setModal={setModal}
            message={"Service edited successfully!"}
          />
        </Box>
      )}
    </>
  );
}

export default EditService;
