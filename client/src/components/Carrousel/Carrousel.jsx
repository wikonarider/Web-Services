import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import CarrouselItem from "./CarrouselItem";
//habria que tener un estado con los destacados y esos serian los que se muestran
//queda asi para visualizar

const featured = [
  {
    title: "Karaoke",
    description: "Servicio de karaoke para eventos",
    img: "https://i.ytimg.com/vi/7BqddKQSVhE/maxresdefault.jpg",
    price: 1.05,
  },
  {
    title: "Musical performance drag queen",
    description: "show de entretenimiento para eventos, diversión asegurada",
    img: "https://choose901.com/wp-content/uploads/2019/05/F545B03B-C871-4693-852F-B3602AAA5B77.jpg",
    price: 19.3,
  },
  {
    title: "Gasista",
    description: "Hago revisión de instalaciones en general",
    img: "https://irp-cdn.multiscreensite.com/ebcd9081/MOBILE/jpg/1642655-banner.jpg",
    price: 8,
  },
  {
    title: "Electricista",
    description:
      "Matriculado, servicios de electricidad integral, instalaciones en obras",
    img: "https://static9.depositphotos.com/1192060/1105/i/600/depositphotos_11057897-stock-photo-woman-measuring-electrical-current.jpg",
    price: 3.05,
  },
  {
    title: "Paseadora de perros",
    description: "Tengo mucha experiencia ¡también soy adiestradora!",
    img: "https://cnnespanol.cnn.com/wp-content/uploads/2020/07/200724095936-primera-perritos-full-169.jpg?quality=100&strip=info",
    price: 15.3,
  },
  {
    title: "Profesora de yoga",
    description: "Formación en la Escuela Internacional de Yoga",
    img: "https://centro-maya.com/wp-content/uploads/2019/08/profesora-de-yoga-en-Valencia-Mislata-1303x618.jpg",
    price: 28.3,
  },
  {
    title: "Servicio de Catering Ejecutivo",
    description:
      "Nuestros servicios de catering se ajustan a las necesidades de los clientes",
    img: "https://images.pexels.com/photos/1243337/pexels-photo-1243337.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    price: 15.3,
  },
  {
    title: "Fletes",
    description:
      "Rápido, seguro, eficiente, equipo entrenado gracias a 20 años en mudanzas.",
    img: "https://fotos.perfil.com/2020/05/16/trim/1280/720/20200516comerciociudadfletesprotocolojuanobregong-957557.jpg",
    price: 19.3,
  },
  {
    title: "Reparacion pc",
    description:
      "Ofrecemos un servicio a medida, de calidad y buen precio para resolver cualquier problema",
    img: "https://www.cetae.com.ar/wp-content/uploads/2018/02/reppc.jpg",
    price: 28.3,
  },
];

export default function Carrousel() {
  return (
    <div style={{ opacity: "98%", width: "80%", margin: "40px auto 0 auto" }}>

      <Carousel
        dynamicHeight={true}
        autoPlay={true}
        interval={3000}
        infiniteLoop={true}
        showThumbs={false}
        showStatus={false}
      >
        {featured.map((f) => (
          <CarrouselItem key={f.title} title={f.title} img={f.img}/>
        ))}
      </Carousel>
    </div>
  );
}
