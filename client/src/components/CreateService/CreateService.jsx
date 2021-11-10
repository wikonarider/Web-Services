import { React, useEffect, useRef, useState } from "react";
import { connect, useDispatch } from "react-redux";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Autocomplete from "@mui/material/Autocomplete";
import Checkbox from "@mui/material/Checkbox";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import s from "./CreateService.module.css";
import { createService, getGroups, getProvinces } from "../../redux/actions";
import ModalService from "./ModalService";
import Box from "@mui/system/Box";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import IconButton from "@mui/material/IconButton";
import PhotoSizeSelectActualIcon from "@mui/icons-material/PhotoSizeSelectActual";
import { useHistory } from "react-router";
import Skeleton from "@mui/material/Skeleton";
import Grid from "@mui/material/Grid";

function CreateService(props) {
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGroups());
    dispatch(getProvinces());
    // eslint-disable-next-line
  }, []);

  //--------- SKELETON -----------
  const [skeleton, setSkeleton] = useState(false);

  const handleSkeleton = () => {
    setSkeleton(true);
  };

  //----------------------------

  const { provinces, groups } = props;

  const [index, setIndex] = useState({
    indexCat: "",
    indexProv: "",
  });
  const [names, setNames] = useState({
    province: "",
    category: "",
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
  //-----------------HANDLE SELECT ALL --------------------------------

  const handleSelectAll = () => {
    let idCities = provinces[index.indexProv].cities.map((c) => c.id);
    setInputs({ ...inputs, cities: idCities });
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

  //--------------------------------------------------------------------submit
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
      setNames({
        province: "",
        category: "",
      });
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

  //---------HANDLE IMAGE -------------------------------------

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
      setSkeleton(false);
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
  //-----------------------------------------------------------------------------------

  //-----------REF-------------------------------
  const fileInput = useRef();
  //---------------------------------

  const selecStyle = {
    marginTop: 2,
  };

  const imgContainerShow = {
    width: "345px",
    height: "194px",
  };

  const imgContainerNone = {
    display: "none",
    width: "345px",
    height: "194px",
  };

  if (provinces && groups) {
    return (
      <Box sx={{marginLeft: '10%'}}>
        <Box
          display="grid"
          justifyContent="flex-start"
          sx={{ marginLeft: 2, marginTop: 2 }}
        >
          <IconButton color="primary" onClick={() => history.push("/account")}>
            <ArrowBackIcon />
          </IconButton>
        </Box>

        <form onSubmit={(e) => handleSubmit(e)}>
          <Grid container justifyContent="center" spacing={2}>
            <Grid container item spacing={2}>
              <Grid item xs={12} md={5}>
                {/*-------- SELECT DE CATEGORIA ----------- */}

                <FormControl fullWidth>
                  <InputLabel sx={selecStyle}>Category</InputLabel>
                  <Select
                    sx={selecStyle}
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

                {/*--------------- SELECT DE SUBCATEGORIA -------------*/}
                {inputs.categoryId && (
                  <FormControl fullWidth>
                    <InputLabel sx={selecStyle}>Type</InputLabel>
                    <Select
                      sx={selecStyle}
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
                )}
              </Grid>

              <Grid item xs={12} md={5}>
                {/*------------- SELECT DE PROVINCIA ---------------------*/}
                <Autocomplete
                  sx={selecStyle}
                  fullwidth="true"
                  options={provinces}
                  getOptionLabel={(option) => option.name}
                  onChange={(e, value) => handleProvince(value)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label={"Provinces"}
                      placeholder="Search"
                    />
                  )}
                />

                {/*--------------- SELECT DE CIUDAD -----------------------*/}
                {inputs.provinces && (
                  <Autocomplete
                    sx={selecStyle}
                    fullwidth="true"
                    multiple
                    limitTags={2}
                    options={provinces[index.indexProv].cities}
                    onChange={(e, value) => handleCity(value)}
                    disableCloseOnSelect
                    getOptionLabel={(option) => option.name}
                    renderOption={(props, option, { selected }) => (
                      <li {...props}>
                        <Checkbox
                          icon={icon}
                          checkedIcon={checkedIcon}
                          checked={selected}
                        />
                        {option.name}
                      </li>
                    )}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Cities"
                        placeholder="Search"
                      />
                    )}
                  />
                )}
                {/* ------------------------------------------ */}

                {/* --------SELECT ALL BUTTON -------------------- */}
              </Grid>
              {inputs.provinces && (
                <Grid
                  item
                  xs={12}
                  md={2}
                  alignSelf="flex-end"
                >
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={handleSelectAll}
                  >
                    select all
                  </Button>
                </Grid>
              )}
            </Grid>
            {/* ----------------------------------------- */}

            <Grid item xs={12} md={12}>
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
            </Grid>

            <Grid item xs={12} md={12}>
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
            </Grid>

            <Grid item xs={12} md={12}>
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
            </Grid>

            <div className={s.file}>
              <TextField
                style={{ display: "none" }}
                name="img"
                type="file"
                inputRef={fileInput}
                onChange={(e) => loadImg(e.target.files[0])}
              />
            </div>

            <Grid item xs={12} md={12}>
              <Button
                variant="outlined"
                startIcon={<PhotoSizeSelectActualIcon />}
                color="secondary"
                onClick={() => {
                  fileInput.current.click();
                  handleSkeleton();
                }}
                fullWidth={true}
              >
                Select File
              </Button>
            </Grid>

            {skeleton && (
              <Grid item md={12}>
                <Skeleton variant="rectangular" width={345} height={194} />
              </Grid>
            )}

            <Grid
              item
              md={3}
              sx={inputs.img ? imgContainerShow : imgContainerNone}
            >
              <img
                className={s.imgRender}
                id="imgBox"
                src="serviceImage"
                alt=""
              ></img>
            </Grid>

            {!errors.title &&
            !errors.description &&
            !errors.price &&
            inputs.img ? (
              <Grid item xs={12} md={12}>
                <Button type="submit" variant="contained" fullWidth={true}>
                  Create Service
                </Button>
              </Grid>
            ) : (
              <Grid item xs={12} md={12}>
                <Button
                  disabled
                  type="submit"
                  variant="contained"
                  fullWidth={true}
                >
                  Create Service
                </Button>
              </Grid>
            )}
          </Grid>
        </form>

        <ModalService
          modal={modal}
          setModal={setModal}
          message={"Service created successfully!"}
        />
      </Box>
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
