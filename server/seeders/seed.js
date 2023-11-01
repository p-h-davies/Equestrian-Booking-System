const { User, Lessons } = require('../models');
const bcrypt = require('bcrypt');

async function seedDB() {
    try {
        //Get relevant monogoDB documents
        const lessonCollection = await Lessons.find({}).exec();
        const userCollection = await User.find({}).exec();

        //check if database is empty
        if (lessonCollection.length === 0 && userCollection.length === 0) {

            const currentDate = new Date().toISOString().split('T')[0];

            //Define new lesson
            const newLessons = [
                {
                    title: 'Private Lesson',
                    date: currentDate,
                    start: '11:00 AM',
                    end: '12:00 PM',
                    limit: '1',
                }
            ]

            //Add new lesson to DB
            const savedLessons = await Lessons.insertMany(newLessons);

            console.log('Lessons seeded:', savedLessons);

            //User password hashing
            const saltRounds = 10;
            const hashedPasswords = await Promise.all([
                bcrypt.hash('password', saltRounds),
                bcrypt.hash('password', saltRounds),
            ]);

            //Define new users
            const newUsers = [
                {
                    username: 'admin',
                    email: 'admin@lbr.com',
                    firstName: 'Admin',
                    lastName: 'Horse',
                    password: hashedPasswords[0],
                    role: 'admin',
                },
                {
                    username: 'user',
                    email: 'user@lbr.com',
                    firstName: 'User',
                    lastName: 'Pony',
                    password: hashedPasswords[1],
                },
            ];

            //Add new users to DB
            const savedUsers = await User.insertMany(newUsers);

            console.log('Users seeded:', savedUsers);

            console.log('Seeding completed! 🌱');
        }
    } catch (error) {
        console.log(error);
    }
}


module.exports = { seedDB };