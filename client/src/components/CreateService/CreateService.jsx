import React, { useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { createService } from "../../redux/actions";
import ModalService from "./ModalService";
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

function CreateService() {
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
  });
  const [indexProv, setIndexProv] = useState(null);
  const [skeleton, setSkeleton] = useState(false);
  const [errors, setErrors] = useState({});
  const [modal, setModal] = useState(false);
  const [show, setShow] = useState(false);

  // Manejador de inputs
  const handleInputs = (e, value, input) => {
    setInputs((prev) => {
      // Cuando borra del text field
      if (input === "province") {
        if (!value) {
          setIndexProv(null);
          return { ...prev, provinceId: "", cityId: "" };
        } else {
          return { ...prev };
        }
      } else if (input === "cities") {
        if (!value) {
          return { ...prev, cityId: "" };
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
          return { ...prev, provinceId: value.id, cityId: "" };
        } else if (value && input === "citiesChange") {
          return { ...prev, cityId: value.id };
          // Resto de inputs
        } else {
          const obj = {
            ...prev,
            [e.target.name]: e.target.value,
          };
          if (e.target.name === "groupId") {
            obj.categoryId = "";
          }
          return obj;
        }
      }
    });
    setInputs((prev) => {
      setErrors(errorsValidate(prev));
      return prev;
    });
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
      dispatch(createService({ ...inputs, price: Number(inputs.price) }));
      setInputs({
        groupId: "",
        categoryId: "",
        provinceId: "",
        cityId: "",
        title: "",
        description: "",
        price: "",
        img: "",
      });
      setModal(true);
    } catch (e) {
      console.log(e.response.data);
    }
  };

  return (
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
        <IconButton color="primary" onClick={() => history.push("/account")}>
          <ArrowBackIcon />
        </IconButton>
      </Box>
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
          {inputs.groupId ? (
            <FormControl fullWidth>
              <InputLabel>Type</InputLabel>
              <Select
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
            options={provinces}
            getOptionLabel={(option) => option.name}
            onChange={(e, value) => {
              handleInputs(e, value, "provinceChange");
            }}
            onInputChange={(e, value) => handleInputs(e, value, "province")}
            renderInput={(params) => (
              <TextField {...params} label={"Provinces"} placeholder="Search" />
            )}
          />
          {/* ---------------------------------------------------- */}

          {/* ------------------- Ciudad ----------------------- */}
          {show && inputs.provinceId ? (
            <Autocomplete
              fullwidth="true"
              options={provinces[indexProv].cities}
              getOptionLabel={(option) => option.name}
              onChange={(e, value) => {
                handleInputs(e, value, "citiesChange");
              }}
              onInputChange={(e, value) => handleInputs(e, value, "cities")}
              renderInput={(params) => (
                <TextField {...params} label={"Cities"} placeholder="Search" />
              )}
            />
          ) : null}
        </Box>
      </Box>
      {/* ---------------------------------------------------- */}
      {/* ----Manejador de titurlo, descripcion  y precio -----*/}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <TextField
          name="title"
          placeholder="title"
          value={inputs.title}
          onChange={handleInputs}
          error={errors.title ? true : false}
          helperText={errors.title}
          label="Title"
          variant="outlined"
          required
          fullWidth
        />

        <TextField
          multiline
          minRows={4}
          name="description"
          placeholder="description"
          value={inputs.description}
          onChange={handleInputs}
          error={errors.description ? true : false}
          helperText={errors.description}
          label="Description"
          variant="outlined"
          required
          fullWidth
        />

        <TextField
          name="price"
          placeholder="price"
          value={inputs.price}
          onChange={handleInputs}
          error={errors.price ? true : false}
          helperText={errors.price}
          label="Price"
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
        disabled={!validateServices(inputs)}
        type="submit"
        variant="contained"
        fullWidth={true}
        color="secondary"
        onClick={handleSubmit}
      >
        Create Service
      </Button>

      <ModalService
        modal={modal}
        setModal={setModal}
        message={"Service created successfully!"}
      />
    </Box>
  );
}

export default CreateService;
