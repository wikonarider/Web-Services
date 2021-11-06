const comments = [
  {
    comment:
      "Mi esposa y yo quedamos muy contentos con el trabajo de hugo y su hermano. Son cumplidos, serios, organizados y responsables. Nos asesoraron desde el principio del trabajo con los materiales a comprar, nos explicaron con detalle como se realizaría la instalación del piso en el apartamento y nos dieron las recomendaciones para el cuidado del mismo. Tan seguros están de su trabajo que no nos pidieron adelanto de dinero para empezar la obra sino que les pagamos al final del trabajo, y algo que destacar es que terminaron antes de lo previsto. Por lo tanto los recomiendo al 100%.",
    score: 4,
    serviceId: 26,
    userId: "4e2191dc-36ad-11ec-8d3d-0242ac230003",
  },
  {
    comment:
      "Es el tercer trabajo que realizan para la familia, orden, excelentes acabados, aseo y cumplimiento.",
    score: 4,
    serviceId: 26,
    userId: "4e21929a-36ad-11ec-8d3d-0242ac170003",
  },
  {
    comment:
      "Remodele todo el apto. La asesoría fue constante son muy profesionales el trabajo quedó con calidad todo lo que necesite me lo facilitaron. Tenia el tiempo medido y me cumplieron en la fecha acordada. Solo puedo decir que estoy feliz con mi remodelacion y que los recomiendo. ",
    score: 4,
    serviceId: 26,
    userId: "be19f8e2-36aa-11ec-8d3d-0242ac130003",
  },
  {
    comment:
      "La instalación del piso quedo muy bien y los acabados quedaron perfectos, se cumplió el tiempo pactado, buena actitud de servicio, quedamos muy contentos con el trabajo y lo recomendamos.",
    score: 4,
    serviceId: 25,
    userId: "4e219056-36ad-11ec-8d3d-0242ac130003",
  },
  {
    comment:
      "Trabajadores cumplidos, dedidcados y muy pulidos. Fué un trabajo impecable, me siento satisfecho. Solicitan materiales de muy nuena calidad. Son responsables y confiables. La seriedad y puntualidad brindan un excelente valor agregado. Cuentan con la experiencia para todo tipo de trabajo de obra y remodelación. La dedicación exclusiva a los trabajos hace que se cumplan los tiempos previstos y con alto grado de responsabilidad",
    score: 4,
    serviceId: 25,
    userId: "4e2191dc-36ad-11ec-8d3d-0242ac230003",
  },
  {
    comment:
      "Agradecidos al 500% con su trabajo, totalmente pulidos, gracias a su experiencia pudimos mejorar nuestras ideas y obtener una remodelación que superó totalmente nuestras expectativas. Realmente si no hubiera sido por ustedes nada de lo que se hizo hubiera sido posible. Ideas innovadoras, todo fuera de lo común, un trabajo realmente de admirar. Mil y mil gracias !!",
    score: 4,
    serviceId: 25,
    userId: "4e218642-36ad-11ec-8d3d-0242ac130003",
  },
  {
    comment:
      "No contesta el celular, no responde whatsapps, no da facturas, recibos, evidencias. Incumple las citas. Los costos de reparación lucen elevados. No lo recomiendo en lo absoluto.",
    score: 1,
    serviceId: 27,
    userId: "be19f6da-36aa-11ec-8d3d-0242ac130003",
  },
  {
    comment:
      "No responde el celular de contacto ni responde el correo enviado.",
    score: 1,
    serviceId: 27,
    userId: "4e218e1c-36ad-11ec-8d3d-0242ac130003",
  },
  {
    comment:
      "Lo llame, fue a mi apartamento, llegamos a un acuerdo en precio y tiempo, le pague un adelanto, luego me subió el presupuesto y me dijo lo se demoraría una semana más y posteriormente que tres dias más. Le escribí para que me dijera cuando me entregaba se enfureció y me dijo que ya no me vendía nada y me devolvería el dinero, que le escribiera el numero de la cuenta. Le di en numero de mi cuenta el 15 de abril y a la fecha dice, como ustedes lo pueden constatar, que él no ha hecho negocio.",
    score: 2,
    serviceId: 27,
    userId: "4e218f98-36ad-11ec-8d3d-0242ac130003",
  },
  {
    comment:
      "Agende para el sabado y nunca llegaron , no contestan ese teléfono.",
    score: 1,
    serviceId: 2,
    userId: "4e21899e-36ad-11ec-8d3d-0242ac130003",
  },
  {
    comment:
      "Exelente servicio. El vehiculo esta muy bien adecuado para cualquier trasteo y el encargado es muy colaborador y eficiente ¡super recomendado!.",
    score: 4,
    serviceId: 2,
    userId: "4e219448-36ad-11ec-8d3d-0242ac130003",
  },
  {
    comment:
      "Me fue comentando cuando busqué referencia de un servicio de mudanza, que este servicio recomendado x su excelente puntuación en esta página y referencias personales y durante la mudanza de alguien cercano a mi desaparicieron objetos personales de considerable valor para su dueño los cuales nunca fueron recuperados y ellos ( el prestador del servicio y colaborador(es) tuvieron muy mala reacción e incluso intimidante contra la persona afectada que no fue resarcida por sus pérdidas.",
    score: 2,
    serviceId: 2,
    userId: "4e219812-36ad-11ec-8d3d-0242ac139003",
  },
  {
    comment:
      "El señor pretende que el trasteo se haga en menos de una hora en un edificio de 15 pisos, se la paso de afán ademas de eso llevo a una niña mas o menos de dos años, no me gusto el servicio.",
    score: 1,
    serviceId: 11,
    userId: "be19f20c-36aa-11ec-8d3d-0242ac130003",
  },
  {
    comment: "Recomendado. . Gracias.",
    score: 4,
    serviceId: 11,
    userId: "4e218d5e-36ad-11ec-8d3d-0242ac130003",
  },
  {
    comment:
      "Me encanto el servicio, hombre muy puntual, cumple con todas mis espectativas, excelente repertorio. Recomendado. . Gracias.",
    score: 4,
    serviceId: 11,
    userId: "be19f20c-36aa-11ec-8d3d-0242ac130003",
  },
  {
    comment:
      "Jez excelente toque, mi familia, mis amigos y yo hemos quedado muy contentos, tu energía, la magia de tu voz y la guitarra hicieron que pasaramos un gran momento, gracias por todo. Recomendadísimo tu show.",
    score: 4,
    serviceId: 20,
    userId: "4e2191dc-36ad-11ec-8d3d-0242ac230003",
  },
  {
    comment:
      "Pedi un servicio para hoy dia de la madre y ahora no me contestan. Me tumbaron.",
    score: 1,
    serviceId: 20,
    userId: "4e21899e-36ad-11ec-8d3d-0242ac130003",
  },
  {
    comment:
      "Hice un pedido el lunes 26 de octubre 2020 para hoy miércoles 28 y a pesar de que estaba un poco encima, hacen pedidos con mínimo un día de anticipación lo que es una gran ventaja para salir de un apuro y les agradezco. Apenas escribí, me enviaron el catálogo y más imágenes de referencia. Pedí el menú #4 y llego exactamente como lo ofertan. El pago fue muy sencillo de hacer. Me permitieron escoger la decoración de los globos ya que yo quería ponerle unos números con globos metalizados y quedó muy bonito. Me dijeron que el pedido llegaba en la franja horaria de 7:00 a 8:30 y efectivamente así fue, un poco después de las 8:30 la persona a la que le envíe el regalo lo estaba recibiendo. Quedo muy agradecida con ustedes, la persona que recibió el regalo quedo muy contenta.",
    score: 4,
    serviceId: 20,
    userId: "4e218642-36ad-11ec-8d3d-0242ac130003",
  },
  {
    comment: "Son muy buenos en lo que hacen y profesionales.",
    score: 4,
    serviceId: 2,
    userId: "be19f8e2-36aa-11ec-8d3d-0242ac130003",
  },
  {
    comment: "Fraude total.",
    score: 1,
    serviceId: 3,
    userId: "4e21929a-36ad-11ec-8d3d-0242ad130003",
  },
  {
    comment:
      "El trabajo quedo muy bien, primero se mando hacer una parte de la cocina y luego otra parte. El fabricante trabaja bien, le ocurrió un percance y se demoro un poco más",
    score: 4,
    serviceId: 3,
    userId: "4e218642-36ad-11ec-8d3d-0242ac130003",
  },
  {
    comment:
      "Tuve un inconveniente con mi portatil no cargaba windows, y tenia una informacion importante y enverdad que era importante, por recomendacion contrate sus servicion y me ayudo con la recuperacion de mi informacion. Comprometido con sus tareas.",
    score: 4,
    serviceId: 4,
    userId: "4e218f98-36ad-11ec-8d3d-0242ac130003",
  },
  {
    comment:
      "Juan me arregló mi computador pc de un daño en la board dificil de detectar. Queso satisfecho por su trabajo y lo recomiendo ampliamente.",
    score: 4,
    serviceId: 4,
    userId: "be19f8e2-36aa-11ec-8d3d-0242ac130003",
  },
  {
    comment:
      "Fué una experiencia bastante mala, el técnico me cobró 150. 000, clocó un spray, inicialmente funcionó, me dijo que no lo prendiera hasta después de tres horas, y cuando lo fui a prender no servia, quedo peor de lo que estaba, antes prendía y calentaba pero se apagaba y volvía a prender, ahora no prende y no me devuelve dinero. Que le pague 400. 000 mas para cambiar tarjeta.",
    score: 1,
    serviceId: 5,
    userId: "4e2191dc-36ad-11ec-8d3d-0242ac230003",
  },
  {
    comment:
      "Pésimos,no se lo recomiendo a nadie. Son las personas mas incumplidas del mundo, en tan solo día y medio me dejaron metida tres veces, todas citas puestas por camilo, nunca avisaron que no venían por mínima educación. La solución simplemente fue dejar de contestar, cuando reprogramaban las citas groseros al llamarles la atención sobre el incumplimiento. No los recomiendo.",
    score: 1,
    serviceId: 5,
    userId: "4e219812-36ad-11ec-8d3d-0242ac139003",
  },
  {
    comment:
      "Llevan mas de 5 dias informando que van a recojer un producto lo cual no ha pasado , son bastante incumplidos y ofrecen muy poco dinero en comparacion a otras empresas, es cuestion de buscar bien.",
    score: 1,
    serviceId: 15,
    userId: "4e218f98-36ad-11ec-8d3d-0242ac130003",
  },
  {
    comment:
      "Excelente trabajo, atento, responsable y profesional en lo que hace. Recomendado por su buen labor.",
    score: 4,
    serviceId: 15,
    userId: "4e218d5e-36ad-11ec-8d3d-0242ac130003",
  },
  {
    comment:
      "Henry llegó antes del tiempo estimado, es decir, se ve que es una persona muy cumplida y organizada, cuando llega a casa cumplió con los protocolos de seguridad (desinfección, tapabocas, etc) armó los muebles muy rápido y trajo todos los implementos necesarios para llevar a cabo su labor. Muy respetuoso y organizado en todo el tiempo que estuvo armando el mueble y para armar la campana. Muchas gracias por el servicio, recomendado para más labores.",
    score: 4,
    serviceId: 6,
    userId: "4e21899e-36ad-11ec-8d3d-0242ac130003",
  },
  {
    comment:
      "Estudio virtual, y me sacaron todas las materias sobre 4. 5, los recomiendo.",
    score: 4,
    serviceId: 7,
    userId: "be19f554-36aa-11ec-8d3d-0242ac130003",
  },
  {
    comment:
      "Muy recomendados, me gusta el sistema que tiene para pagar a los tutores y el de reclamos, excelentes. ",
    score: 4,
    serviceId: 8,
    userId: "4e219056-36ad-11ec-8d3d-0242ac130003",
  },
  {
    comment:
      "Tenia un montón de ensayos y un anteproyecto final de materia, y lo sacaron adelante, los recomiendo.",
    score: 4,
    serviceId: 8,
    userId: "4e2191dc-36ad-11ec-8d3d-0242ac230003",
  },
  {
    comment: "Buena atención, trabajo a tiempo y honesto.",
    score: 4,
    serviceId: 9,
    userId: "4e218e1c-36ad-11ec-8d3d-0242ac130003",
  },
  {
    comment:
      "Lo contrate para que le dictara clases a mi hijo que no entendia nada en la universidad, me angustiaba mucho porque es muy costosa la universidad. El profesor le colaboro muchisimo, las notas de mi hijo mejoraron mucho, con el metodo que usa mi hijo entiende mas facilmente en la universidad, ultimamente la nota mas baja que ha sacado es 4. 5. Recomiendo mucho a este profesor.",
    score: 4,
    serviceId: 9,
    userId: "4e218e1c-36ad-11ec-8d3d-0242ac130003",
  },
  {
    comment:
      "Lo contrate porque la mayoria de profesores no le entendian a mi hija, ella iba muy mal en el colegio, lo contrate y el metodo es muy bueno, mi hija ocupo el primer lugar en el colegio. El la preparo para entrar a la universidad nacional y lo logro, paso a medicina, estoy super contenta, es realmente bueno este profesor, lo recomiendo muchisimo.",
    score: 4,
    serviceId: 10,
    userId: "be19f554-36aa-11ec-8d3d-0242ac130003",
  },
  {
    comment:
      "Me gustaron mucho las clases, fue muy práctico, aprendí y reforcé los contenidos que necesitaba. Lo recomiendo mucho para tomar clases de matemáticas. ",
    score: 4,
    serviceId: 12,
    userId: "be19f8e2-36aa-11ec-8d3d-0242ac130003",
  },
  {
    comment:
      "Realmente los recomiendo por que si hicieron bien el trabajo y al precio que se debia.",
    score: 4,
    serviceId: 13,
    userId: "4e21899e-36ad-11ec-8d3d-0242ac130003",
  },
  {
    comment: "El señor muy amable dejo todo correcto.",
    score: 4,
    serviceId: 13,
    userId: "4e219678-36ad-11ec-8d3d-0242ac130003",
  },
  {
    comment: "Buen servicio, puntuales.",
    score: 4,
    serviceId: 14,
    userId: "be19f6da-36aa-11ec-8d3d-0242ac130003",
  },
  {
    comment:
      "Podría ser mejor, pero en cuanto al servicio y puntualidad: bien.",
    score: 3,
    serviceId: 14,
    userId: "be19f8e2-36aa-11ec-8d3d-0242ac130003",
  },
  {
    comment:
      "Muy puntuales, amables y hábiles. Aunque son cuidadosos en general, podría mejorar un poco la atención con las paredes. Considero que el precio cobrado fue razonable. Volvería a contratarlos definitivamente.",
    score: 4,
    serviceId: 14,
    userId: "be19f8e2-36aa-11ec-8d3d-0242ac130003",
  },
  {
    comment:
      "Nuestro grupo de trabajo agradecemos por arduo trabajo por el cuidado q le presto a los escritorios que me transporte el muchacho le recomiendo por mucho muy puntual",
    score: 4,
    serviceId: 25,
    userId: "4e219812-36ad-11ec-8d3d-0242ac139003",
  },
  {
    comment:
      "el mejor carpintero",
    score: 5,
    serviceId: 177,
    userId: "4e219812-36ad-11ec-8d3d-0242ac139003",
  },
  {
    comment:
      "me quedo la cocina hermosa, super agradecido",
    score: 5,
    serviceId: 177,
    userId: "4e219812-36ad-11ec-8d3d-0242ac139003",
  },
  {
    comment:
      "un trabajo impecable",
    score: 5,
    serviceId: 177,
    userId: "4e219812-36ad-11ec-8d3d-0242ac139003",
  },
  {
    comment:
      "el mejor plomero",
    score: 5,
    serviceId: 178,
    userId: "4e219812-36ad-11ec-8d3d-0242ac139003",
  },
  {
    comment:
      "me quedo la cocina hermosa, super agradecido",
    score: 5,
    serviceId: 178,
    userId: "4e219812-36ad-11ec-8d3d-0242ac139003",
  },
  {
    comment:
      "un trabajo impecable",
    score: 5,
    serviceId: 178,
    userId: "4e219812-36ad-11ec-8d3d-0242ac139003",
  },
  {
    comment:
      "los mejores para hacer una mudanza",
    score: 5,
    serviceId: 179,
    userId: "4e219812-36ad-11ec-8d3d-0242ac139003",
  },
  {
    comment:
      "hicieron todo muy rapido y son cuidadosos",
    score: 5,
    serviceId: 179,
    userId: "4e219812-36ad-11ec-8d3d-0242ac139003",
  },
  {
    comment:
      "un trabajo impecable",
    score: 5,
    serviceId: 179,
    userId: "4e219812-36ad-11ec-8d3d-0242ac139003",
  },
  {
    comment:
      "el mejor jardinero",
    score: 5,
    serviceId: 180,
    userId: "4e219812-36ad-11ec-8d3d-0242ac139003",
  },
  {
    comment:
      "me quedo el patio hermos0, super agradecido",
    score: 5,
    serviceId: 180,
    userId: "4e219812-36ad-11ec-8d3d-0242ac139003",
  },
  {
    comment:
      "un trabajo impecable",
    score: 5,
    serviceId: 180,
    userId: "4e219812-36ad-11ec-8d3d-0242ac139003",
  },
  {
    comment:
      "el mejor electricista",
    score: 5,
    serviceId: 181,
    userId: "4e219812-36ad-11ec-8d3d-0242ac139003",
  },
  {
    comment:
      "me arreglo un problema enorme, super agradecido",
    score: 5,
    serviceId: 181,
    userId: "4e219812-36ad-11ec-8d3d-0242ac139003",
  },
  {
    comment:
      "un trabajo impecable",
    score: 5,
    serviceId: 181,
    userId: "4e219812-36ad-11ec-8d3d-0242ac139003",
  },
  {
    comment:
      "el mejor limpiador del pais",
    score: 5,
    serviceId: 182,
    userId: "4e219812-36ad-11ec-8d3d-0242ac139003",
  },
  {
    comment:
      "me quedo la finca sin un grano de polvo, hermosa, super agradecido",
    score: 5,
    serviceId: 182,
    userId: "4e219812-36ad-11ec-8d3d-0242ac139003",
  },
  {
    comment:
      "un trabajo impecable",
    score: 5,
    serviceId: 182,
    userId: "4e219812-36ad-11ec-8d3d-0242ac139003",
  },
];

module.exports = {
  comments,
};
