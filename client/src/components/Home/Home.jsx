import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getServices } from "../../redux/actions";
import Cards from "../Cards/Cards";
import Nav from "../Nav/Nav";

export default function Home() {
  const servicesState = useSelector((state) => state.services);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getServices(""));
  }, [dispatch]);

  return (
    <div>
      <Nav />
      <Cards services={servicesState} />
    </div>
  );
}
