module.exports = (sequelize, DataTypes) => {
    const Portfolio = sequelize.define('Portfolio', {
        company: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        website: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        participation: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        visible: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        }
    }, {
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
    });

    Portfolio.associate = (db) => {
        db.Portfolio.belongsTo(db.User);
        db.Portfolio.hasMany(db.PortfolioImage);
        db.Portfolio.belongsToMany(db.Stack, { through: 'PortfolioTechStack' });
    };

    return Portfolio;
};