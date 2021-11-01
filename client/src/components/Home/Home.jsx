import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getServices } from "../../redux/actions";
import Cards from "../Cards/Cards";
import Nav from "../Nav/Nav";
import Carrousel from "../Carrousel/Carrousel";

export default function Home() {
  const servicesState = useSelector((state) => state.services);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getServices());
  }, [dispatch]);

  return (
    <div>
      <Nav />
      <Carrousel />
      <Cards services={servicesState} />
    </div>
  );
}
