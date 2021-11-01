import { React, useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Autocomplete,
  Checkbox,
} from "@mui/material";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import s from "./CreateService.module.css";
import { createService, getGroups, getProvinces } from "../../redux/actions";
import ModalService from "./ModalService";
import { Box } from "@mui/system";

function CreateService(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGroups());
    dispatch(getProvinces());
    // eslint-disable-next-line
  }, []);

  const { provinces, groups } = props;

  const [index, setIndex] = useState({
    indexCat: "",
    indexProv: "",
  });
  const [names, setNames] = useState({
    province: "",
    category: "",
    subCategory: "",
    city: "",
  }); //names

  //props input client
  const [errors, setErrors] = useState({});
  const [modal, setModal] = useState(false);
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    price: "",
    img: "",
    categoryId: "",
    provinces: "",
    cities: [],
    subCategory: "",
  });
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

  //HANDLE CATEGORIA - SUBCATEGORIA - PROVINCIA - CIUDAD
  //------------------------------------------------------------------------set subCategory
  const handleSubCategory = (idSubCat) => {
    var [subCat] = groups[index.indexCat].categories.filter(
      (e) => e.id === idSubCat
    );

    setInputs({ ...inputs, subCategory: subCat.id });
    setNames({ ...names, subCategory: subCat.name });
  };
  //-------------------------------------------------------------------set category
  const handleCategory = (idCategory) => {
    var ind = 0;

    var [cat] = groups.filter(function (e, i) {
      if (e.id === idCategory) {
        ind = i;
      }
      return e.id === idCategory;
    });
    setInputs({ ...inputs, categoryId: cat.id });
    setIndex({ ...index, indexCat: ind });
    setNames({
      ...names,
      category: cat.name,
    });
  };
  //-------------------------------------------------------------------set province
  const handleProvince = (province) => {
    if (province) {
      var indexPro = provinces.indexOf(province);
      setInputs({
        //borra si selecciona otra provincia
        ...inputs,
        provinces: { id: province.id, name: province.name },
        cities: [],
      });
      setIndex({ ...index, indexProv: indexPro });
      setNames({ ...names, province: province.name });
    } else {
      setInputs({
        //borra si selecciona otra provincia
        ...inputs,
        provinces: "",
        cities: [],
      });
    }
  };
  //----------------------------------------------------------------------------------------set city
  const handleCity = (city) => {
    if (city) {
      var idCities = city.map((e) => e.id);
      setInputs({ ...inputs, cities: idCities });
    } else {
      setInputs({ ...inputs, cities: [] });
    }
  };
  //-----------------------------------------------------------------handleinput
  function handleInput(e) {
    setInputs((prev) => {
      const input = {
        ...prev,
        [e.target.name]: e.target.value,
      };
      setErrors(() => {
        return errorsValidate({
          ...inputs,
          [e.target.name]: e.target.value,
        });
      });
      return input;
    });
  }

  //---------------------------------------------------------------submit
  function handleSubmit(e) {
    e.preventDefault();
    if (
      inputs.title &&
      inputs.categoryId &&
      inputs.provinces &&
      inputs.description &&
      inputs.img &&
      inputs.price &&
      inputs.cities.length
    ) {
      setModal(true);
      dispatch(createService({ ...inputs, price: parseInt(inputs.price) }));

      setInputs({
        title: "",
        description: "",
        price: "",
        userId: "",
        img: "",
        categoryId: "",
        subCategory: "",
        provinces: "",
        cities: [],
      });
    } else {
      alert("Faltan parmetros");
    }
  }

  const loadImg = async (files) => {
    const reader = new FileReader();
    reader.onload = function () {
      let imgDiv = document.querySelector("#imgBox");
      imgDiv.src = reader.result; //Básicamente lo que hago acá es
      //convertir la img en una URL para poder mandarla
    };
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
      return setInputs({ ...inputs, img: res_1.secure_url });
    } catch (err) {
      return console.log(err);
    }
  };
  //---------------------------------------------------------------------------------validate
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
  //-----------------------------------------------------

  if (provinces && groups) {
    return (
      <div className={s.container}>
        <form onSubmit={(e) => handleSubmit(e)} className={s.formWrapper}>
          {/* SELECT DE CATEGORIA */}
          <div>
            <Box sx={{ minWidth: 200 }}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  value={inputs.categoryId}
                  label="Category"
                  onChange={(e) => handleCategory(e.target.value)}
                >
                  {groups &&
                    groups.map((el) => (
                      <MenuItem key={el.name} value={el.id}>
                        {el.name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Box>
          </div>

          {/* SELECT DE SUBCATEGORIA */}
          {inputs.categoryId && (
            <div>
              <Box sx={{ minWidth: 200 }}>
                <FormControl fullWidth>
                  <InputLabel>Type</InputLabel>
                  <Select
                    label="Type"
                    value={inputs.subCategory}
                    onChange={(e) => handleSubCategory(e.target.value)}
                    defaultValue=""
                  >
                    {groups[index.indexCat].categories.map((el) => (
                      <MenuItem key={el.name} value={el.id}>
                        {el.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </div>
          )}

          {/* SELECT DE PROVINCIA */}
          <div>
            <Autocomplete
              options={provinces}
              getOptionLabel={(option) => option.name}
              onChange={(e, value) => handleProvince(value)}
              style={{ width: 500 }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={"Provinces"}
                  placeholder="Search"
                />
              )}
            />
          </div>

          {/* SELECT DE CIUDAD */}
          {inputs.provinces && (
            <div>
              <Autocomplete
                multiple
                options={provinces[index.indexProv].cities}
                onChange={(e, value) => handleCity(value)}
                disableCloseOnSelect
                getOptionLabel={(option) => option.name}
                renderInput={(props, option, { selected }) => (
                  <li {...props}>
                    <Checkbox
                      icon={icon}
                      checkedIcon={checkedIcon}
                      style={{ marginRight: 8 }}
                      checked={selected}
                    />
                    {option.name}
                  </li>
                )}
                style={{ width: 500 }}
                renderInput={(params) => (
                  <TextField {...params} label="Cities" placeholder="Search" />
                )}
              />
            </div>
          )}
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
          message={"Service created successfully!"}
        />
      </div>
    );
  } else {
    return <label>cargando</label>;
  }
}

function mapStateToProps(state) {
  return {
    groups: state.groups,
    provinces: state.provinces,
  };
}
export default connect(mapStateToProps, {})(CreateService);
