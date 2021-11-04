module.exports = function (sequelize, Sequelize) {
    const Event = sequelize.define("Event", {
        event_name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        event_owner: {
            type: Sequelize.STRING,
            allowNull: false
        },
        organization: {
            type: Sequelize.STRING
        },
        event_date: {
            type: Sequelize.DATEONLY,
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
        event_description: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        karma_points_event: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 5
        }
    });

    Event.associate = (models) => {
        Event.belongsToMany(models.User, {
            through: 'EventUser',
            foreignKey: 'user_id'
        });
    };

    return Event;
};