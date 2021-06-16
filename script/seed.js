'use strict'

const {db, models: {User, Bike} } = require('../server/db')

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }) // clears db and matches models to tables
  console.log('db synced!')

  // Users list
  const usersArray = [
    { username: 'Victor', password: 'victor' },
    { username: 'Luis', password: 'luis' },
    { username: 'Leo', password: 'leo' },
    { username: 'Joshua', password: 'joshua' },
    { username: 'Paola', password: 'paola' },
    { username: 'Peter', password: 'peter' },
    { username: 'Sandra', password: 'sandra' },
    { username: 'Robert', password: 'robert' },
    { username: 'Lilia', password: 'lilia' },
    { username: 'Led', password: 'Led' },
  ]
  // Bikes list
  const bikesArray = [
    { 
        model: 'Bergamont E-Ville Edition', 
        price: 4582, 
        year: 2021, 
        description: `State-of-the-art low step-through unisex frame with outstanding 
        riding characteristics.`,
        imageURL: './images/Bergamont_E-Ville_Edition.jpg'
    },
    { 
        model: 'Bergamont E-Cargoville LJ Edition', 
        price: 4071, 
        description: `Innovative, massive frame concept with maximum integration, perfect 
        ergonomics and intuitive, safe and agile steering and handling.`,
        imageURL: './images/Bergamont_E-Cargoville_JS_Edition.jpg'
    },
    { 
        model: 'Bergamont E-Horizon FS', 
        price: 3192, 
        description: `The benchmark in comfor, ergonomics, handling and safety, with 
        full-suspension 100/80 mm chassis and the latest Bosch engine and PowerTube battery technology.`,
        imageURL: './images/Bergamont_E-Horizon_FS.jpg'
    },
    { 
        model: 'Bergamont E-Grandurance', 
        price: 3192, 
        description: `Commuter, Tourer and Explorer with Fazua drive. With 60 Nm torque and 252 Wh battery capacity, 
        the stylish e-Grandurance has virtually no limits.`,
        imageURL: './images/Bergamont_E-Grandurance.jpg'
    },
    { 
        model: 'Bergamont Sweep 6', 
        price: 1251, 
        description: `Urban mobility features spliced with racing bike genes: 
        The Sweep is a riding statement for dynamic commuters.`,
        imageURL: './images/Bergamont_Sweep_6.jpg'
    },
    { 
        model: 'Bergamont Vitess 7', 
        price: 915, 
        description: `Lightweight, almost maintenance-free endurance runner, with perfectly balanced, dynamic 
        riding characteristics and sporty upright seating position.`,
        imageURL: './images/Bergamont_Vitess_7.jpg'
    },
    { 
        model: 'Trek 520', 
        price: 1799,
        year: 2021,
        description: `520 is a classic steel touring bike built for the open road. It's the longest running 
        model in Trek's lineup, and it's been perfected year after year since 1983.`,
        imageURL: './images/Trek_520.jpg'
    },
    { 
        model: 'Trek 820', 
        price: 449,
        description: `820 is the most affordable mountain bike in the Trek line, but its quality and durability 
        far exceed its price. It's great for beginners who want a versatile bike they can ride anywhere, 
        from light off-road trails and gravel paths to multi-use trails and potholed city streets.`,
        imageURL: './images/Trek_820.jpg'
    },
    { 
        model: 'Trek 1120', 
        price: 2899,
        description: `1120 is a touring bike with unlimited off-road capability. Smart, secure packing options, 
        thoughtfully designed racks, and mountain-ready spec make it the ideal tool for your wildest adventures.`,
        imageURL: './images/Trek_1120.jpg'
    },
    { 
        model: 'Allant+ 9S', 
        price: 6299,
        description: `Allant+ pushes the boundaries of possibility on every ride, from fast, traffic-free commutes 
        to long cruises. Its hill-flattening boost, distance-shrinking range, and thoughtful features make it easy 
        and fun to ride farther and do more by bike instead of taking the car.`,
        imageURL: './images/Trek_Allant_plus.jpg'
    },
  ]

  // Creating Users
  const users = await Promise.all(usersArray.map(user => 
    User.create(user))
  );

  // Creating Bikes
  const bikes = await Promise.all(bikesArray.map(bike => 
    Bike.create(bike))
);

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${bikes.length} bikes`)
  console.log(`seeded successfully`)
  return {
    users,
    bikes
  }
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
