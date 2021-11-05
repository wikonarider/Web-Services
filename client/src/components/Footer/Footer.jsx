import React, { useState, useEffect } from "react";
import { getServicesPage } from "../../utils/servicesPage";
import { setServicesPage, setEndPage } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";

import SkeletonFooter from "./SkeletonFooter";

function Footer() {
  const dispatch = useDispatch();
  const objGlobal = useSelector((state) => state.objGlobal);
  const [page, setPage] = useState(0);
  const endPage = useSelector((state) => state.endPage);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setPage(() => 0);
  }, [objGlobal]);

  const handleClick = async () => {
    setLoading(() => true);
    const obj = {
      ...objGlobal,
      page: page + 1,
    };
    setPage((prev) => prev + 1);
    const response = await getServicesPage(obj);

    if (response.length) {
      setTimeout(() => {
        dispatch(setServicesPage(response));
        setLoading(() => false);
      }, 300);
    } else {
      dispatch(setEndPage(true));
      setPage(() => 0);
      setLoading(() => false);
    }
  };
  return (
    <div
      style={{
        padding: "20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      {loading ? <SkeletonFooter /> : null}
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
