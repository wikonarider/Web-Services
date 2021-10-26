   export default function Card ({service}){
       return (
           <div>
               <h3>{service.title}</h3>
               <img src={service.img}></img>
               <h3>Description: {service.description}</h3>
               <h3>Price: {service.price}</h3>
           </div>
       )
   }