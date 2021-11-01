import CardService from '../CardService/CardService';
import s from './Cards.module.css';

export default function Cards({ services }) {
  return (
    <div className={s.container}>
      {services &&
        services.map((service) => (
          <CardService key={service.id} service={service} />
        ))}
    </div>
  );
}
