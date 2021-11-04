import CardService from "../CardService/CardService";
import s from "./Cards.module.css";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserInfo } from "../../redux/actions";

export default function Cards({ services }) {
  const dispatch = useDispatch();
  const cookie = useSelector((state) => state.cookie);

  useEffect(() => {
    if (cookie) {
      (async () => {
        dispatch(await getUserInfo());
      })();
    }
  }, [cookie, dispatch]);

  return (
    <div className={s.container}>
      {services &&
        services.map((service, i) => (
          <CardService
            key={`${service.id}_${service.title}_${i}`}
            service={service}
          />
        ))}
    </div>
  );
}
