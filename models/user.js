// Requiring bcrypt for password hashing. Using the bcrypt-nodejs version as the regular bcrypt module
// sometimes causes errors on Windows machines
var bcrypt = require("bcrypt-nodejs");
// Creating our User model
module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("User", {
        // user_id: {
        //     type: Sequelize.UUID,
        //     allowNull: false,
        //     foreignKey: true
        // },
        first_name: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        last_name: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        street: {
            type: Sequelize.STRING,
            allowNull: false
        },
        street_2: {
            type: Sequelize.STRING
        },
        city: {
            type: Sequelize.STRING,
            allowNull: false
        },
        state: {
            type: Sequelize.STRING,
            allowNull: false
        },
        zipcode: {
            type: Sequelize.STRING,
            allowNull: false
        },
        // The email cannot be null, and must be a proper email before creation
        // Email is user name
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        // The password cannot be null
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        phone: {
            type: Sequelize.STRING,
            allowNull: false
        },
        date_of_birth: {
            type: Sequelize.DATEONLY,
            allowNull: false
        },
        karma_points_user: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0
        }
    });

    User.associate = (models) => {
        User.belongsToMany(models.Event, {
            through: 'EventUser',
            foreignKey: 'event_id'
        });
    };

    // Creating a custom method for our User model. This will check if an unhashed password entered by the user can be compared to the hashed password stored in our database
    User.prototype.validPassword = password =>
        bcrypt.compareSync(password, this.password);
    // Hooks are automatic methods that run during various phases of the User Model lifecycle
    // In this case, before a User is created, we will automatically hash their password
    User.hook("beforeCreate", user => {
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
    });
    return User;
};
