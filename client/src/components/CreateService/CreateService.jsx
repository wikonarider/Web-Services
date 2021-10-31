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

  const [province, setProvince] = useState({ });
  const [subGrup,setSubGrup]=useState({
      category:"",
      subCategory:""
  })


  //props input client
  const [errors, setErrors] = useState({});
  const [modal, setModal] = useState(false);
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    price: "",
    userId: "",
    img: "",
    categoryId: "",
    provinces: [],
  });

  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

  //HANDLE CATEGORIA - SUBCATEGORIA - PROVINCIA - CIUDAD
  const handleGroup = (e) => {
    setInputs({ ...inputs, categoryId: e.target.value });
  };
  //-------------------------------------------------------------------set province
  const handleProvince = (nameProvince) => {
    const prov = provinces.filter((e) => e.name === nameProvince);

    if (province === prov) {
      //verifico que no exista en province
      setProvince({});
    } else {
      setProvince(prov[0]);
    }
  };
  //----------------------------------------------------------------------------------------set city
  const handleCity = (nameCity) => {
    const city = province.cities.filter((e) => e.name === nameCity);
    if (province.cities.includes(city)) {
      //verifico que no exista en city
      setProvince({
        ...province,
        cities: province.cities.filter((e) => e.id !== city.id),
      });
    } else {
      setProvince({ ...province, cities: province.cities.concat(city) });
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

  function handleSubmit(e) {
    //---------------------------------------------------------------submit

    if (
      inputs.title &&
      inputs.categoryId &&
      inputs.provinces.length &&
      inputs.description &&
      inputs.price
    ) {
      setModal(true);
      dispatch(createService(inputs));

      setInputs({
        title: "",
        description: "",
        price: "",
        userId: "",
        img: "",
        categoryId: "",
        provinces: [],
        type: "",
      });
    } else {
      alert("Faltan campos por completar");
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
                <Select label="Category" onChange={handleGroup} defaultValue="">
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
          {prop.categories && (
            <div>
              <Box sx={{ minWidth: 200 }}>
                <FormControl fullWidth>
                  <InputLabel>Type</InputLabel>
                  <Select
                    value={subCities}
                    label="Type"
                    onChange={handleGroup}
                    defaultValue=""
                  >
                    {inputs.categoryId &&
                      prop.categories.map((el) => (
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
              multiple
              onChange={(e) => handleProvince(e.target.value)}
              options={["prop.provinces"]}
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
                <TextField {...params} label="Provinces" placeholder="Search" />
              )}
            />
          </div>

          {/* SELECT DE CIUDAD */}

          <div>
            <Autocomplete
              multiple
              options={[]}
              onChange={(e) => handleCity(e.target.value)}
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
          message={"Â¡Service created successfully!"}
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
