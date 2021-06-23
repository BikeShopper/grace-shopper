'use strict';

const {
  db,
  models: { User, Bike, Cart, CartItems },
} = require("../server/db");


/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log('db synced!');

  // Users list
  const usersArray = [
    { username: 'Victor', password: 'victor' },
    { username: 'Luis', password: 'luis' },
    { username: 'Leo', password: 'leo', isAdmin: true },
    { username: 'Joshua', password: 'joshua' },
    { username: 'Paola', password: 'paola' },
    { username: 'Peter', password: 'peter' },
    { username: 'Sandra', password: 'sandra' },
    { username: 'Robert', password: 'robert' },
    { username: 'Lilia', password: 'lilia' },
    { username: 'Led', password: 'Led' },
  ];
  // Bikes list
  const bikesArray = [
    {
      model: 'Bergamont E-Ville Edition',
      price: 4582,
      year: 2021,
      description: `State-of-the-art low step-through unisex frame with outstanding 
        riding characteristics.`,
      imageURL: '/images/Bergamont_E-Ville_Edition.jpg',
    },
    {
      model: 'Bergamont E-Cargoville LJ Edition',
      price: 4071,
      description: `Innovative, massive frame concept with maximum integration, perfect 
        ergonomics and intuitive, safe and agile steering and handling.`,
      imageURL: '/images/Bergamont_E-Cargoville_JS_Edition.jpg',
    },
    {
      model: 'Bergamont E-Horizon FS',
      price: 3192,
      description: `The benchmark in comfor, ergonomics, handling and safety, with 
        full-suspension 100/80 mm chassis and the latest Bosch engine and PowerTube battery technology.`,
      imageURL: '/images/Bergamont_E-Horizon_FS.jpg',
    },
    {
      model: 'Bergamont E-Grandurance',
      price: 3192,
      description: `Commuter, Tourer and Explorer with Fazua drive. With 60 Nm torque and 252 Wh battery capacity, 
        the stylish e-Grandurance has virtually no limits.`,
      imageURL: '/images/Bergamont_E-Grandurance.jpg',
    },
    {
      model: 'Bergamont Sweep 6',
      price: 1251,
      description: `Urban mobility features spliced with racing bike genes: 
        The Sweep is a riding statement for dynamic commuters.`,
      imageURL: '/images/Bergamont_Sweep_6.jpg',
    },
    {
      model: 'Bergamont Vitess 7',
      price: 915,
      description: `Lightweight, almost maintenance-free endurance runner, with perfectly balanced, dynamic 
        riding characteristics and sporty upright seating position.`,
      imageURL: '/images/Bergamont_Vitess_7.jpg',
    },
    {
      model: 'Trek 520',
      price: 1799,
      year: 2021,
      description: `520 is a classic steel touring bike built for the open road. It's the longest running 
        model in Trek's lineup, and it's been perfected year after year since 1983.`,
      imageURL: '/images/Trek_520.jpg',
    },
    {
      model: 'Trek 820',
      price: 449,
      description: `820 is the most affordable mountain bike in the Trek line, but its quality and durability 
        far exceed its price. It's great for beginners who want a versatile bike they can ride anywhere, 
        from light off-road trails and gravel paths to multi-use trails and potholed city streets.`,
      imageURL: '/images/Trek_820.jpg',
    },
    {
      model: 'Trek 1120',
      price: 2899,
      description: `1120 is a touring bike with unlimited off-road capability. Smart, secure packing options, 
        thoughtfully designed racks, and mountain-ready spec make it the ideal tool for your wildest adventures.`,
      imageURL: '/images/Trek_1120.jpg',
    },
    {
      model: 'Allant+ 9S',
      price: 6299,
      description: `Allant+ pushes the boundaries of possibility on every ride, from fast, traffic-free commutes 
        to long cruises. Its hill-flattening boost, distance-shrinking range, and thoughtful features make it easy 
        and fun to ride farther and do more by bike instead of taking the car.`,
      imageURL: '/images/Trek_Allant_plus.jpg',
    },
    // 100 more bikes
    {
      model: "Vernonia ×vulturina Shinners (pro sp.)",
      price: 7153,
      year: 1992,
      description:
        "Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem. Praesent id massa id nisl venenatis lacinia.",
    },
    {
      model: "Melica ciliata L.",
      price: 5998,
      year: 1997,
      description:
        "Praesent lectus. Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.",
    },
    {
      model: "Penstemon laxus A. Nelson",
      price: 1918,
      year: 1995,
      description:
        "Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim.",
    },
    {
      model: "Eriogonum esmeraldense S. Watson var. toiyabense J.T. Howell",
      price: 8897,
      year: 2010,
      description:
        "Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.",
    },
    {
      model: "Crataegus ×kennedyi Sarg. (pro sp.)",
      price: 3069,
      year: 1994,
      description:
        "Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.",
    },
    {
      model: "Dracaena marginata Lam.",
      price: 9784,
      year: 1990,
      description:
        "Nulla justo. Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.",
    },
    {
      model: "Phacelia humilis Torr. & A. Gray var. dudleyi J.T. Howell",
      price: 6401,
      year: 2010,
      description:
        "Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat. In congue. Etiam justo.",
    },
    {
      model: "Hymenopappus filifolius Hook. var. nanus (Rydb.) B.L. Turner",
      price: 6498,
      year: 2003,
      description:
        "Aenean sit amet justo. Morbi ut odio. Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim.",
    },
    {
      model: "Orobanche valida Jeps.",
      price: 1936,
      year: 2011,
      description:
        "Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem. Integer tincidunt ante vel ipsum.",
    },
    {
      model: "Harbouria trachypleura (A. Gray) J.M. Coult. & Rose",
      price: 2449,
      year: 2011,
      description:
        "Duis at velit eu est congue elementum. In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.",
    },
    {
      model: "Heliconia irrasa R.R. Sm.",
      price: 6896,
      year: 2002,
      description:
        "In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem. Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.",
    },
    {
      model: "Holozonia Greene",
      price: 2070,
      year: 1997,
      description:
        "Praesent lectus. Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.",
    },
    {
      model: "Aspicilia caesiopruinosa (H. Magn.) J.W. Thomson",
      price: 4546,
      year: 1984,
      description:
        "Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede. Morbi porttitor lorem id ligula.",
    },
    {
      model: "Erigeron ovinus Cronquist",
      price: 3195,
      year: 1993,
      description:
        "Duis mattis egestas metus. Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.",
    },
    {
      model: "Calamagrostis purpurascens R. Br. var. purpurascens",
      price: 9285,
      year: 1986,
      description:
        "Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.",
    },
    {
      model: "Lupinus pachylobus Greene",
      price: 5300,
      year: 2000,
      description: "Sed ante. Vivamus tortor. Duis mattis egestas metus.",
    },
    {
      model: "Saussurea americana D.C. Eaton",
      price: 9296,
      year: 2010,
      description:
        "Donec quis orci eget orci vehicula condimentum. Curabitur in libero ut massa volutpat convallis.",
    },
    {
      model:
        "Ipomopsis aggregata (Pursh) V.E. Grant ssp. attenuata (A. Gray) V.E. Grant & A.D. Grant",
      price: 1549,
      year: 2010,
      description: "Proin at turpis a pede posuere nonummy. Integer non velit.",
    },
    {
      model: "Trichomanes alatum Sw.",
      price: 7007,
      year: 2005,
      description:
        "In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.",
    },
    {
      model: "Typha L.",
      price: 3140,
      year: 1991,
      description:
        "Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor.",
    },
    {
      model: "Sagina decumbens (Elliott) Torr. & A. Gray ssp. decumbens",
      price: 2931,
      year: 2009,
      description:
        "Integer non velit. Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue.",
    },
    {
      model: "Centaurea depressa M. Bieb.",
      price: 7919,
      year: 2007,
      description:
        "Etiam justo. Etiam pretium iaculis justo. In hac habitasse platea dictumst.",
    },
    {
      model:
        "Camissonia claviformis (Torr. & Frém.) P.H. Raven ssp. cruciformis (Kellogg) P.H. Raven",
      price: 1925,
      year: 1992,
      description:
        "Nunc rhoncus dui vel sem. Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci.",
    },
    {
      model: "Aletes humilis J.M. Coult. & Rose",
      price: 8671,
      year: 2004,
      description:
        "Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero. Nullam sit amet turpis elementum ligula vehicula consequat.",
    },
    {
      model: "Cornus L.",
      price: 4456,
      year: 2007,
      description: "Integer ac neque. Duis bibendum.",
    },
    {
      model:
        "Pseudognaphalium canescens (DC.) W.A. Weber ssp. thermale (E.E. Nelson) Kartesz",
      price: 8696,
      year: 2010,
      description:
        "Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis. Sed ante.",
    },
    {
      model: "Lupinus holmgrenianus C.P. Sm.",
      price: 2453,
      year: 2011,
      description: "Aliquam erat volutpat. In congue.",
    },
    {
      model: "Kirschsteiniothelia aethiops (Berk. & Curtis) D. Hawksw.",
      price: 3788,
      year: 2009,
      description: "Donec semper sapien a libero. Nam dui.",
    },
    {
      model: "Veronica grandiflora Gaertn.",
      price: 7215,
      year: 2008,
      description:
        "In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.",
    },
    {
      model:
        "Chrysolepis chrysophylla (Douglas ex Hook.) Hjelmqvist var. chrysophylla",
      price: 9212,
      year: 1996,
      description:
        "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros. Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue.",
    },
    {
      model: "Lycopodium digitatum Dill. ex A. Braun",
      price: 5149,
      year: 1997,
      description:
        "Nunc purus. Phasellus in felis. Donec semper sapien a libero. Nam dui.",
    },
    {
      model: "Cyperus sandwicensis Kük.",
      price: 9042,
      year: 2008,
      description:
        "Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.",
    },
    {
      model: "Draba corrugata S. Watson",
      price: 7527,
      year: 2010,
      description:
        "Etiam pretium iaculis justo. In hac habitasse platea dictumst.",
    },
    {
      model: "Castilleja yukonis Pennell",
      price: 8300,
      year: 2007,
      description:
        "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.",
    },
    {
      model: "Leucobryum antillarum Schimp. ex Besch.",
      price: 8943,
      year: 2007,
      description:
        "Nulla suscipit ligula in lacus. Curabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.",
    },
    {
      model: "Leptochloa divaricatissima S.T. Blake",
      price: 4188,
      year: 2007,
      description:
        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue.",
    },
    {
      model: "Burmannia ledermannii Jonk.",
      price: 6233,
      year: 2004,
      description:
        "In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet. Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo.",
    },
    {
      model: "Lonchocarpus domingensis (Turp. ex Pers.) DC.",
      price: 7739,
      year: 1999,
      description:
        "Nunc nisl. Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.",
    },
    {
      model: "Crataegus exilis Beadle",
      price: 1658,
      year: 1997,
      description: "Phasellus in felis. Donec semper sapien a libero.",
    },
    {
      model: "Oxytropis campestris (L.) DC. var. wanapum E. Joyal",
      price: 3452,
      year: 2008,
      description:
        "Nullam varius. Nulla facilisi. Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit.",
    },
    {
      model: "Arnoglossum sulcatum (Fernald) H. Rob.",
      price: 1556,
      year: 1993,
      description:
        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.",
    },
    {
      model: "Phacelia laxiflora J.T. Howell",
      price: 9860,
      year: 2011,
      description:
        "Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem. Sed sagittis.",
    },
    {
      model: "Deparia fenzliana (Luerss.) M. Kato",
      price: 1802,
      year: 2001,
      description:
        "Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
    },
    {
      model: "Taenidia montana (Mack.) Cronquist",
      price: 6949,
      year: 1994,
      description:
        "Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem. Fusce consequat. Nulla nisl.",
    },
    {
      model: "Triumfetta pentandra A. Rich.",
      price: 5230,
      year: 1996,
      description:
        "Etiam pretium iaculis justo. In hac habitasse platea dictumst.",
    },
    {
      model: "Condalia ericoides (A. Gray) M.C. Johnst.",
      price: 9080,
      year: 2007,
      description:
        "Nunc nisl. Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.",
    },
    {
      model: "Asplenium flabellulatum Kunze",
      price: 8565,
      year: 2003,
      description:
        "Curabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla.",
    },
    {
      model: "Pectis papposa Harv. & A. Gray var. papposa",
      price: 8354,
      year: 2007,
      description: "Aliquam erat volutpat. In congue.",
    },
    {
      model:
        "Erysimum capitatum (Douglas ex Hook.) Greene var. lompocense (G. Rossb.) Kartesz",
      price: 6833,
      year: 2001,
      description:
        "Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin interdum mauris non ligula pellentesque ultrices.",
    },
    {
      model: "Gagea fistulosa (Ramond ex DC.) Ker Gawl., nom. illeg.",
      price: 1698,
      year: 2006,
      description: "In quis justo. Maecenas rhoncus aliquam lacus.",
    },
    {
      model: "Toxicodendron radicans (L.) Kuntze",
      price: 7651,
      year: 2000,
      description:
        "Suspendisse potenti. Cras in purus eu magna vulputate luctus.",
    },
    {
      model: "Monardella undulata Benth.",
      price: 9474,
      year: 1993,
      description:
        "In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin interdum mauris non ligula pellentesque ultrices.",
    },
    {
      model: "Hazardia cana (A. Gray) Greene",
      price: 3447,
      year: 2009,
      description:
        "Donec quis orci eget orci vehicula condimentum. Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.",
    },
    {
      model: "Lagerstroemia L.",
      price: 7615,
      year: 2000,
      description:
        "Sed accumsan felis. Ut at dolor quis odio consequat varius.",
    },
    {
      model: "Castela erecta Turp. ssp. texana (Torr. & A. Gray) Cronquist",
      price: 8420,
      year: 1988,
      description:
        "Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit.",
    },
    {
      model: "Linanthus bigelovii (A. Gray) Greene",
      price: 6809,
      year: 2007,
      description:
        "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros. Vestibulum ac est lacinia nisi venenatis tristique.",
    },
    {
      model: "Viola calcicola R.A. McCauley & H.E. Ballard",
      price: 1948,
      year: 2001,
      description:
        "Integer a nibh. In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.",
    },
    {
      model: "Polypodium virginianum L.",
      price: 2447,
      year: 1999,
      description:
        "Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.",
    },
    {
      model: "Penstemon hallii A. Gray",
      price: 5701,
      year: 2006,
      description:
        "Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat. In congue.",
    },
    {
      model: "Sisyrinchium halophilum Greene",
      price: 8187,
      year: 2002,
      description:
        "Nulla tellus. In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.",
    },
    {
      model: "Primula alcalina Cholewa & Douglass M. Hend.",
      price: 3764,
      year: 1998,
      description:
        "Suspendisse potenti. Cras in purus eu magna vulputate luctus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien.",
    },
    {
      model: "Enemion biternatum Raf.",
      price: 6921,
      year: 1999,
      description:
        "Aenean auctor gravida sem. Praesent id massa id nisl venenatis lacinia.",
    },
    {
      model: "Dichrostachys cinerea (L.) Wight & Arn.",
      price: 6694,
      year: 1995,
      description: "Pellentesque at nulla. Suspendisse potenti.",
    },
    {
      model: "Piperia colemanii R. Morgan & Glicenstein",
      price: 8853,
      year: 2004,
      description:
        "Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus. Curabitur at ipsum ac tellus semper interdum.",
    },
    {
      model: "Quercus ×stelloides Palmer",
      price: 1549,
      year: 1994,
      description:
        "Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus. Pellentesque at nulla. Suspendisse potenti.",
    },
    {
      model: "Toxicodendron Mill.",
      price: 6339,
      year: 2005,
      description: "Proin eu mi. Nulla ac enim.",
    },
    {
      model: "Utricularia exoleta R. Br.",
      price: 3880,
      year: 1994,
      description:
        "Curabitur convallis. Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.",
    },
    {
      model: "Vanclevea Greene",
      price: 9415,
      year: 1986,
      description:
        "In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue.",
    },
    {
      model: "Aulacomnium acuminatum (Lindb. & Arnell) Kindb.",
      price: 3015,
      year: 2005,
      description:
        "Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem.",
    },
    {
      model: "Euphorbia strictior Holz.",
      price: 6139,
      year: 1993,
      description:
        "Nulla suscipit ligula in lacus. Curabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla.",
    },
    {
      model: "Stenosiphon Spach",
      price: 4211,
      year: 2001,
      description:
        "Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero. Nullam sit amet turpis elementum ligula vehicula consequat.",
    },
    {
      model: "Delissea lanaiensis (Rock) Lammers",
      price: 4229,
      year: 2006,
      description:
        "Mauris sit amet eros. Suspendisse accumsan tortor quis turpis. Sed ante. Vivamus tortor.",
    },
    {
      model: "Carex limosa L.",
      price: 9730,
      year: 2012,
      description:
        "Mauris sit amet eros. Suspendisse accumsan tortor quis turpis. Sed ante.",
    },
    {
      model: "Lupinus culbertsonii Greene",
      price: 3375,
      year: 2011,
      description:
        "Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus. Pellentesque at nulla.",
    },
    {
      model:
        "Carex scirpoidea Michx. ssp. stenochlaena (T. Holm) Á. Löve & D. Löve",
      price: 7041,
      year: 2003,
      description:
        "Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis. Fusce posuere felis sed lacus.",
    },
    {
      model: "Begonia hirtella Link",
      price: 2610,
      year: 1994,
      description:
        "Donec quis orci eget orci vehicula condimentum. Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.",
    },
    {
      model: "Arthothelium albovirescens (Nyl.) Fink",
      price: 6110,
      year: 2010,
      description:
        "Nulla mollis molestie lorem. Quisque ut erat. Curabitur gravida nisi at nibh. In hac habitasse platea dictumst.",
    },
    {
      model: "Lepanthes veleziana Stimson var. retusicolumna Stimson",
      price: 8446,
      year: 1998,
      description:
        "In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin interdum mauris non ligula pellentesque ultrices.",
    },
    {
      model: "Quercus similis Ashe",
      price: 4307,
      year: 2010,
      description:
        "Nulla facilisi. Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.",
    },
    {
      model: "Hedeoma nana (Torr.) Briq. ssp. nana",
      price: 6487,
      year: 1992,
      description:
        "Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat. Praesent blandit.",
    },
    {
      model: "Philadelphus cordifolius Lange",
      price: 9102,
      year: 2012,
      description:
        "Vivamus tortor. Duis mattis egestas metus. Aenean fermentum.",
    },
    {
      model: "Rhynchospora corniculata (Lam.) A. Gray",
      price: 1950,
      year: 2006,
      description:
        "In congue. Etiam justo. Etiam pretium iaculis justo. In hac habitasse platea dictumst.",
    },
    {
      model: "Polygonum leptocarpum B.L. Rob.",
      price: 2708,
      year: 1999,
      description:
        "In eleifend quam a odio. In hac habitasse platea dictumst. Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem.",
    },
    {
      model: "Poa cusickii Vasey ssp. purpurascens (Vasey) Soreng",
      price: 6361,
      year: 2004,
      description:
        "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti. Nullam porttitor lacus at turpis.",
    },
    {
      model: "Hedyotis vegrandis W.H. Lewis",
      price: 8132,
      year: 1996,
      description:
        "Curabitur convallis. Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.",
    },
    {
      model: "Arabis hastatula Greene",
      price: 7603,
      year: 2000,
      description: "Suspendisse potenti. In eleifend quam a odio.",
    },
    {
      model: "Phacelia congesta Hook.",
      price: 4726,
      year: 1992,
      description:
        "Nulla suscipit ligula in lacus. Curabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.",
    },
    {
      model: "Synsepalum (A. DC.) Daniell",
      price: 9680,
      year: 1993,
      description:
        "Integer non velit. Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi.",
    },
    {
      model: "Pertusaria pruinifera Erichsen",
      price: 4164,
      year: 2001,
      description:
        "Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus.",
    },
    {
      model: "Polyblastia obsoleta Arnold",
      price: 1909,
      year: 2006,
      description:
        "Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Etiam vel augue. Vestibulum rutrum rutrum neque.",
    },
    {
      model: "Veronica agrestis L.",
      price: 3144,
      year: 1999,
      description: "Suspendisse accumsan tortor quis turpis. Sed ante.",
    },
    {
      model: "Allosidastrum (Hochr.) Krapov., Fryxell & D.M. Bates",
      price: 4628,
      year: 1997,
      description:
        "Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum. Curabitur in libero ut massa volutpat convallis.",
    },
    {
      model: "Trifolium lupinaster L.",
      price: 4074,
      year: 1980,
      description:
        "Nulla nisl. Nunc nisl. Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa.",
    },
    {
      model: "Physaria iveyana O'Kane, K.N. Sm. & K.A. Arp",
      price: 8540,
      year: 1968,
      description:
        "Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim.",
    },
    {
      model: "Douglasia nivalis Lindl. var. dentata (S. Watson) A. Gray",
      price: 2276,
      year: 2002,
      description:
        "Ut at dolor quis odio consequat varius. Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.",
    },
    {
      model: "Ribes oxyacanthoides L. ssp. setosum (Lindl.) Sinnott",
      price: 7229,
      year: 1992,
      description:
        "Nulla ut erat id mauris vulputate elementum. Nullam varius.",
    },
    {
      model: "Asplenium ×clermontiae Syme",
      price: 8353,
      year: 1995,
      description:
        "Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius. Integer ac leo.",
    },
    {
      model: "Polygala boykinii Nutt. var. boykinii",
      price: 8385,
      year: 1995,
      description: "Phasellus in felis. Donec semper sapien a libero.",
    },
    {
      model: "Erigeron decumbens Nutt.",
      price: 2421,
      year: 2012,
      description:
        "Aenean sit amet justo. Morbi ut odio. Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim.",
    },
    {
      model: "Taxiphyllum taxirameum (Mitt.) Fleisch.",
      price: 5173,
      year: 1992,
      description:
        "Morbi non quam nec dui luctus rutrum. Nulla tellus. In sagittis dui vel nisl. Duis ac nibh.",
    },
  ];

  const userCarts = [
    {
      fulfilled: false,
      userId: 1,
    },
    {
      fulfilled: true,
      userId: 2,
    },
    {
      fulfilled: false,
      userId: 2,
    },
  ];

  const userCartArray = [
    {
      quantity: 1,
      price: 4582,
    },
    {
      quantity: 1,
      price: 3192,
    },
    {
      quantity: 2,
      price: 3192,
    },
  ];

  // Creating Users
  const users = await Promise.all(usersArray.map((user) => User.create(user)));

  // Creating Bikes
  const bikes = await Promise.all(bikesArray.map((bike) => Bike.create(bike)));

  // Creating Carts
  const userCartsData = await Promise.all(
    userCarts.map((cart) => Cart.create(cart))
  );

  console.log(`seeded ${users.length} users`);
  console.log(`seeded ${bikes.length} bikes`);
  console.log(`seeded successfully`);
  return {
    users,
    bikes,
    userCartsData,
  };
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...');
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
