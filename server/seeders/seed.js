const { User, Lessons } = require('../models');

//Seeding the Database after connection has been established
function seedDB() {
    Lessons.find({})
        .exec()
        //Checks to see if DB has already been created
        .then(async collection => {
            if (collection.length === 0) {
                //Adds Thought Data
                try {
                    const lesson1 = await Lessons.create({ lessonType: 'Solo', maxRiders: '1' });
                    const lesson2 = await Lessons.create({ lessonType: 'Joint', maxRiders: '2' });
                    //Adds User Data
                    await User
                        .insertMany([
                            { username: 'horselady', email: 'codingstudent@gmail.com', firstName: 'Alex', lastName: 'Horse', password: 'horses4eva' },
                            { username: 'charlietheunicorn', email: 'mongoosegirl@gmail.com', firstName: 'Jean', lastName: 'Pony', password: 'password' },
                        ]);
                    //Updates User Data to Include Thoughts
                    await User.findOneAndUpdate(
                        { username: 'horselady' },
                        {
                            $push: { lessons: lesson1._id }
                        },
                        { new: true }
                    );
                    await User.findOneAndUpdate(
                        { username: 'charlietheunicorn' },
                        {
                            $push: { lessons: lesson2._id }
                        },
                        { new: true }
                    );
                    console.log('Seeding completed! 🌱')
                } catch (error) {
                    console.log(error);
                }
            }
        });

}

module.exports = { seedDB }