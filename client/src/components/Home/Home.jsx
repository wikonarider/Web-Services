import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getServices, getUserFavs } from "../../redux/actions";
import Cards from "../Cards/Cards";
import Nav from "../Nav/Nav";

export default function Home() {
  const servicesState = useSelector((state) => state.services);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getServices());
    document.cookie && dispatch(getUserFavs(document.cookie.split("=")[1]));
  }, [dispatch]);

  return (
    <div>
      <Nav />
      <Cards services={servicesState} />
    </div>
  );
}
