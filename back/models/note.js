module.exports = (sequelize, DataTypes) => {
    const Note = sequelize.define('Note', {
        title: {
            type: DataTypes.STRING(100),
            allowNull: false,
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

    Note.associate = (db) => {
        db.Note.belongsTo(db.Category);
        db.Note.belongsTo(db.User);
    };

    return Note;
};
