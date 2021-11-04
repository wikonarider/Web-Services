import { useSelector } from "react-redux";
import { useEffect } from "react";
import Cards from "../Cards/Cards";
import Nav from "../Nav/Nav";
import Carrousel from "../Carrousel/Carrousel";
import Footer from "../Footer/Footer";

export default function Home() {
  const servicesState = useSelector((state) => state.services);

  const topSixServices = servicesState.slice(0, 6);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <Nav />
      <Carrousel topSix={topSixServices} />
      {servicesState.length > 0 ? (
        <Cards services={servicesState} />
      ) : (
        <h1>There are no services to show</h1>
      )}
      <Footer />
    </div>
  );
}
