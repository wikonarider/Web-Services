import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import s from "./CreateService.module.css";
import { createService, getGroups } from "../../redux/actions";
import axios from "axios";
import ModalService from "./ModalService";
import { Box } from "@mui/system";

export default function CreateService() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGroups());
  }, []);

  const groups = useSelector((state) => state.groups);

  const [errors, setErrors] = useState({});
  const [modal, setModal] = useState(false);
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    price: "",
    userName: "frankera1312",
    img: "",
  });

  const [category, setCategory] = useState("");
  const [type, setType] = useState("");

  let typesNames = [];

  const handleCategorySelect = (e) => {
    setCategory(e.target.value);
  };

  const handleTypeSelect = (e) => {
    setType(e.target.value);
  };

  function isNumber(price) {
    return /^[+-]?\d*\.?\d+(?:[Ee][+-]?\d+)?$/.test(price);
  }

  function errorsValidate(inputs) {
    let errors = {};

    if (!inputs.title) {
      errors.title = "Title is required";
    } else if (!inputs.description) {
      errors.description = "Description is required";
    } else if (!inputs.price) {
      errors.price = "Price is required";
    } else if (!isNumber(inputs.price)) {
      errors.price = "Price must to be a number";
    }

    return errors;
  }

  function handleInput(e) {
    setInputs((prev) => {
      const input = {
        ...prev,
        [e.target.name]: e.target.value,
      };
      // console.log(inputs)

      setErrors(() => {
        return errorsValidate({
          ...inputs,
          [e.target.name]: e.target.value,
        });
      });

      // console.log('errors', errors)

      return input;
    });
  }

  function handleSubmit(e) {
    e.preventDefault(e);
    if (inputs.title && inputs.img && inputs.description && inputs.price) {
      setModal(true);
      dispatch(createService(inputs));
      setInputs({
        title: "",
        description: "",
        price: "",
        userName: "frankera1312",
        img: "",
      });
    } else {
      alert("Faltan campos por completar");
    }
  }

  function loadImg(files) {
    const reader = new FileReader();
    reader.onload = function () {
      let imgDiv = document.querySelector("#imgBox");
      imgDiv.src = reader.result; //Básicamente lo que hago acá es
      //convertir la img en una URL para poder mandarla
    };
    reader.readAsDataURL(files);

    const formData = new FormData();
    formData.append("file", files);
    formData.append("upload_preset", "za6qmkus");
    axios
      .post("https://api.cloudinary.com/v1_1/dd9t6masq/auto/upload", formData)
      .then((response) =>
        setInputs({ ...inputs, img: response.data.secure_url })
      );
    console.log("url", inputs.img);
    //hacer cuenta cloudinay
  }

  for(let i =0; i<groups.length; i++){
    if (category === groups[i].name) {
      typesNames = groups[i].categories;
    }
  }

  return (
    <div className={s.container}>
      <form onSubmit={(e) => handleSubmit(e)} className={s.formWrapper}>
        <div>
          <Box sx={{ minWidth: 200 }}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                value={category}
                label="Category"
                onChange={handleCategorySelect}
                defaultValue=""
              >
                {groups &&
                  groups.map((el) => (
                    <MenuItem key={el.name} value={el.name}>
                      {el.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Box>
        </div>
        {category && (
          <div>
            <Box sx={{ minWidth: 200 }}>
              <FormControl fullWidth>
                <InputLabel>Type</InputLabel>
                <Select
                  value={type}
                  label="Type"
                  onChange={handleTypeSelect}
                  defaultValue=""
                >
                  {typesNames &&
                    typesNames.map((el) => (
                      <MenuItem key={el.name} value={el.name}>
                        {el.name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Box>
          </div>
        )}

        {groups && groups.map((el) => {})}

        <div className={s.inputsContainer}>
          <TextField
            name="title"
            placeholder="Title"
            value={inputs.title}
            onChange={handleInput}
            error={errors.title ? true : false}
            helperText={errors.title}
            label="Title"
            variant="outlined"
            required
            fullWidth
          ></TextField>
        </div>

        <div className={s.inputsContainer}>
          <TextField
            name="description"
            placeholder="Description"
            value={inputs.description}
            onChange={handleInput}
            error={errors.description ? true : false}
            helperText={errors.description}
            label="Description"
            variant="outlined"
            required
            fullWidth
          ></TextField>
        </div>

        <div className={s.inputsContainer}>
          <TextField
            name="price"
            placeholder="Price"
            value={inputs.price}
            onChange={handleInput}
            error={errors.price ? true : false}
            helperText={errors.price}
            label="Price"
            variant="outlined"
            required
            fullWidth
          ></TextField>
        </div>

        <div className={s.inputsContainer}>
          <TextField
            name="img"
            type="file"
            fullWidth
            onChange={(e) => loadImg(e.target.files[0])}
          />
        </div>

        <div className={s.imgContainer}>
          <img id="imgBox" src="hola" alt=""></img>
        </div>

        {!errors.title && !errors.description && !errors.price ? (
          <div className={s.submitButton}>
            <Button type="submit" variant="contained">
              Create Service
            </Button>
          </div>
        ) : (
          <div className={s.submitButton}>
            <Button disabled type="submit" variant="contained">
              Create Service
            </Button>
          </div>
        )}
      </form>

      <ModalService
        modal={modal}
        setModal={setModal}
        message={"¡Service created successfully!"}
      />
    </div>
  );
}
