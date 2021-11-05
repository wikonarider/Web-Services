import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import HomeIcon from "@mui/icons-material/Home";
import { Link } from "react-router-dom";
import { postLogout } from "../../../utils/login";
import { useHistory } from "react-router";
import { setCookie as setCookieRedux } from "../../../redux/actions";
import { useDispatch } from "react-redux";

import s from "./AccountNav.module.css";

export default function AccountNav() {
  const dispatch = useDispatch();
  const history = useHistory();

  const logOutClear = async () => {
    await postLogout();
    dispatch(setCookieRedux(""));
    history.push("/home");
  };

  return (
    <div>
      <div className={s.nav}>
        <IconButton color="secondary" component={Link} to="/home">
          <HomeIcon />
        </IconButton>
        <p className={s.yourAccount}>Your Account</p>

        <div className={s.logOut}>
          <Button
            variant="outlined"
            color="primary"
            size="small"
            onClick={logOutClear}
          >
            LOG OUT
          </Button>
        </div>
      </div>
    </div>
  );
}
