import { React, useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
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
import axios from "axios";
import ModalService from "./ModalService";
import { Box } from "@mui/system";

function CreateService(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGroups());
    dispatch(getProvinces());
    // eslint-disable-next-line
  }, []);

  // CATEGORIAS-SUBCATEGORIAS // PROVINCIAS-CIUDADES
  //Category -> categoria / Type -> subcategoria // provinceLocation -> Provincia({provinces:[]}) / citieLocation -> Ciudad({cities:[]})
  //props de back
  const { provinces, groups } = props;

  const [index, setIndex] = useState({
    indexCat: "2",
    indexProv: "2",
  });
  const [names, setNames] = useState({
    city: "",
    province: "",
    category: "",
    subCategory: "",
  }); //names

  //props input client
  const [errors, setErrors] = useState({});
  const [modal, setModal] = useState(false);
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    price: "",
    //hardcodeo el id para para comprobar en el back
    img: "https://placeimg.com/400/400/service/3",
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

    var [cat] = groups.filter((e, i) => {
      if (e.id === idCategory) {
        ind = i;
        return e;
      }
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
      setNames({ ...names, province: province.name, cities: "" });
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
      inputs.price &&
      inputs.cities.length
    ) {
      // setModal(true);
      console.log("entre a submmit");
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
      console.log("no entre a submit");
    }
  }

  function loadImg(files) {
    const reader = new FileReader();
    const formData = new FormData();
    reader.onload = function () {
      let imgDiv = document.querySelector("#imgBox");
      imgDiv.src = reader.result; //BÃ¡sicamente lo que hago acÃ¡ es
      //convertir la img en una URL para poder mandarla
    };
    reader.readAsDataURL(files);
    formData.append("file", files);
    formData.append("upload_preset", "za6qmkus");
    axios
      .post("https://api.cloudinary.com/v1_1/dd9t6masq/auto/upload", formData)
      .then((response) =>
        setInputs({ ...inputs, img: response.data.secure_url })
      );
    //hacer cuenta cloudinay
  }
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
            <TextField name="img" type="file" fullWidth />
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
