const gardener = [
  {
    title: "Jardinero Matriculado",
    description:
      "Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.\n\nAenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.\n\nCurabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.",
    img: "https://image.freepik.com/free-photo/young-gardener-woman-holding-plant-giving-thumbs-up-gesture_231208-10983.jpg",
    price: 1500,
    categoryId: 30,
    userId: "4e219448-36ad-11ec-8d3d-0242ac130003",
    createdAt: "2020-12-06T09:21:53.535Z",
    provinceId: 82,
    cityId: 82084,
  },
  {
    title: "Jardinero Profesional",
    description:
      "Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.\n\nEtiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.\n\nPraesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.",
    img: "https://image.freepik.com/free-photo/happy-young-handsome-slavic-gardener-uniform-hat-holding-flowerplant-pruners-looking-isolated_141793-68627.jpg",
    price: 2500,
    categoryId: 30,
    userId: "4e219510-36ad-11ec-8d3d-0242ac110003",
    createdAt: "2020-08-31T03:18:33.852Z",
    provinceId: 14,
    cityId: 14014,
  },
  {
    title: "Jardinero Junior",
    description:
      "In congue. Etiam justo. Etiam pretium iaculis justo.\n\nIn hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.",
    img: "https://image.freepik.com/free-photo/plant-care-concept-happy-male-gardener-holds-pot-with-cactus-dressed-striped-jumper-apron-being-good-mood_273609-31227.jpg",
    price: 1000,
    categoryId: 30,
    userId: "4e219448-36ad-11ec-8d3d-0242ac130003",
    createdAt: "2020-09-01T23:46:02.474Z",
    provinceId: 2,
    cityId: 2007,
  },
  {
    title: "Hago Changas en el Jardin",
    description:
      "Phasellus in felis. Donec semper sapien a libero. Nam dui.\n\nProin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.",
    img: "https://image.freepik.com/free-photo/smiling-young-female-gardener-uniform-wearing-gardening-hat-gloves-holds-flowerpot-spade-shoulder-isolated-olive-green-wall-with-copy-space_141793-93584.jpg",
    price: 500,
    categoryId: 30,
    userId: "4e21929a-36ad-11ec-8d3d-0242ad130003",
    createdAt: "2021-02-16T04:23:20.531Z",
    provinceId: 82,
    cityId: 82084,
  },
  {
    title: "Jardinero - solo casas grandes",
    description:
      "Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.\n\nQuisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.",
    img: "https://img.freepik.com/free-photo/young-beautiful-florist-watering-flowers_176420-2060.jpg?size=338&ext=jpg",
    price: 1250,
    categoryId: 30,
    userId: "4e21929a-36ad-11ec-8d3d-0242ac170003",
    createdAt: "2020-03-10T05:42:59.530Z",
    provinceId: 14,
    cityId: 14014,
  },
];

const babySister = [
  {
    title: "Niñera cualquier horario",
    description:
      "Sed ante. Vivamus tortor. Duis mattis egestas metus.\n\nAenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.",
    img: "https://image.freepik.com/free-photo/pretty-sister-spending-time-with-her-baby-brother-sitting-floor-bedroom-beautiful-young-babysitter-playing-with-little-boy-indoors-holding-stuffed-toy-duck-infancy-childcare-motherhood_344912-7.jpg",
    price: 750,
    categoryId: 31,
    userId: "be19f20c-36aa-11ec-8d3d-0242ac130003",
    createdAt: "2021-07-09T03:16:03.383Z",
    provinceId: 2,
    cityId: 2007,
  },
  {
    title: "Niñero, solo niños buenos",
    description:
      "Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.",
    img: "https://img.freepik.com/free-photo/sister-playing-word-search-with-her-little-brother_53876-137626.jpg?size=626&ext=jpg",
    price: 1000,
    categoryId: 31,
    userId: "be19f554-36aa-11ec-8d3d-0242ac130003",
    createdAt: "2020-08-28T10:18:04.408Z",
    provinceId: 82,
    cityId: 82084,
  },
  {
    title: "Niñera toda la semana",
    description:
      "Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.\n\nAenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.",
    img: "https://image.freepik.com/free-photo/children-posing-with-babysitter_23-2147664055.jpg",
    price: 600,
    categoryId: 31,
    userId: "be19f6da-36aa-11ec-8d3d-0242ac130003",
    createdAt: "2021-07-23T01:35:25.899Z",
    provinceId: 14,
    cityId: 14014,
  },
  {
    title: "Niñera solo findes",
    description:
      "Fusce consequat. Nulla nisl. Nunc nisl.\n\nDuis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.\n\nIn hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.",
    img: "https://image.freepik.com/free-photo/babysitter-watching-kids-playing_23-2147664060.jpg",
    price: 700,
    categoryId: 31,
    userId: "be19f8e2-36aa-11ec-8d3d-0242ac130003",
    createdAt: "2021-08-31T10:51:53.994Z",
    provinceId: 2,
    cityId: 2007,
  },
  {
    title: "Niñero niños de 4 a 6 años",
    description:
      "Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.",
    img: "https://image.freepik.com/free-photo/beautiful-shot-elderly-female-baby-girl-looking-through-window_181624-2437.jpg",
    price: 500,
    categoryId: 31,
    userId: "4e218642-36ad-11ec-8d3d-0242ac130003",
    createdAt: "2021-07-16T13:15:33.222Z",
    provinceId: 82,
    cityId: 82084,
  },
];

const cleaningAndMaidService = [
  {
    title: "Limpieza de Oficinas",
    description:
      "Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.",
    img: "https://image.freepik.com/free-photo/disinfecting-home_155003-9129.jpg",
    price: 4250,
    categoryId: 32,
    userId: "4e21899e-36ad-11ec-8d3d-0242ac130003",
    createdAt: "2021-02-14T12:11:41.799Z",
    provinceId: 14,
    cityId: 14014,
  },
  {
    title: "Limpieza de Casas Grandes",
    description:
      "In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.",
    img: "https://image.freepik.com/free-photo/young-smiling-woman-cleans-kitchen-her-home_231208-535.jpg",
    price: 5000,
    categoryId: 32,
    userId: "4e218b24-36ad-11ec-8d3d-0242ac130003",
    createdAt: "2021-02-03T10:41:40.381Z",
    provinceId: 2,
    cityId: 2007,
  },
  {
    title: "Limpieza toda la semana",
    description:
      "Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.\n\nQuisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.\n\nVestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.",
    img: "https://image.freepik.com/free-photo/young-girl-is-holding-cleaning-product-gloves-rags-basin-white-wall_1150-21780.jpg",
    price: 2500,
    categoryId: 32,
    userId: "4e218c00-36ad-11ec-8d3d-0242ac130003",
    createdAt: "2020-07-04T10:05:19.149Z",
    provinceId: 6,
    cityId: 6412,
  },
  {
    title: "Limpieza dia por medio L,J,V",
    description:
      "Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.\n\nNullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.",
    img: "https://image.freepik.com/free-photo/happy-young-woman-blue-rubber-using-mop-while-cleaning-floor-home_28283-1482.jpg",
    price: 2000,
    categoryId: 32,
    userId: "4e218d5e-36ad-11ec-8d3d-0242ac130003",
    createdAt: "2020-05-16T15:31:59.642Z",
    provinceId: 6,
    cityId: 6014,
  },
  {
    title: "Limpieza de tuberias",
    description:
      "Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.\n\nDuis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.",
    img: "https://image.freepik.com/free-photo/set-male-hands-holds-rag-mop_273609-31531.jpg",
    price: 5000,
    categoryId: 32,
    userId: "4e218e1c-36ad-11ec-8d3d-0242ac130003",
    createdAt: "2020-04-10T05:11:10.689Z",
    provinceId: 6,
    cityId: 6412,
  },
];

const houseServices = [...gardener, ...babySister, ...cleaningAndMaidService];

module.exports = {
  houseServices,
};
