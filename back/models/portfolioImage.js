module.exports = (sequelize, DataTypes) => {
    const PortfolioImage = sequelize.define('PortfolioImage', {
        uid: {
            type: DataTypes.STRING(200),
            allowNull: false,
        },
        filename: {
            type: DataTypes.STRING(200),
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING(200),
            allowNull: false,
        },
        url: {
            type: DataTypes.STRING(200),
            allowNull: false,
        },
    }, {
        charset: 'utf8',
        collate: 'utf8_general_ci',
    });

    PortfolioImage.associate = (db) => {
        db.PortfolioImage.belongsTo(db.Portfolio);
    };

    return PortfolioImage;
};