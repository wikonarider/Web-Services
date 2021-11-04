import React, { useState } from "react";
import { getServicesPage } from "../../utils/servicesPage";
import { setServicesPage, setEndPage } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";

function Footer() {
  const dispatch = useDispatch();
  const objGlobal = useSelector((state) => state.objGlobal);
  const [page, setPage] = useState(0);
  const endPage = useSelector((state) => state.endPage);

  const handleClick = async () => {
    const obj = {
      ...objGlobal,
      page: page + 1,
    };
    setPage((prev) => prev + 1);
    const response = await getServicesPage(obj);

    if (response.length) {
      dispatch(setServicesPage(response));
    } else {
      dispatch(setEndPage(true));
      setPage(() => 0);
    }
  };
  return (
    <div style={{ padding: "20px" }}>
      <Button
        onClick={handleClick}
        variant="contained"
        sx={endPage ? { display: "none" } : {}}
      >
        Load more
      </Button>
    </div>
  );
}

export default Footer;
