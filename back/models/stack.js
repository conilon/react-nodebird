module.exports = (sequelize, DataTypes) => {
    const Stack = sequelize.define('Stack', {
        name: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
    }, {
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
    });

    Stack.associate = (db) => {
        db.Stack.belongsToMany(db.Portfolio, { through: 'PortfolioTechStack' });
    };

    return Stack;
};