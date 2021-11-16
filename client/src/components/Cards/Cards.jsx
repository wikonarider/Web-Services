import CardService from "../CardService/CardService";
import s from "./Cards.module.css";
import Grow from "@mui/material/Grow";

export default function Cards({ services }) {
  return (
    <Grow in={true} {...(true ? { timeout: 2500 } : {})}>
      <div className={s.container}>
        {services &&
          services.map((service, i) => (
            <CardService
              key={`${service.id}_${service.title}`}
              service={service}
            />
          ))}
      </div>
    </Grow>
  );
}
