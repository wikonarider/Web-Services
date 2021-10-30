import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getServices } from "../../redux/actions";
import Cards from "../Cards/Cards";
// import Nav from '../Nav/Nav';
import SideBar from "../SideBar/SideBar";
import Carrousel from "../Carousel/Carousel";

export default function Home() {
  const servicesState = useSelector((state) => state.services);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getServices());
  }, [dispatch]);

  return (
    <div>
      <Carrousel />
      <SideBar />
      <Cards services={servicesState} />
    </div>
  );
}
