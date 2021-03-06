module.exports = function(sequelize, DataTypes) {

	// defines card list values within table
	var cardsList = sequelize.define("cardsList", {
		whichList: DataTypes.STRING,
		cardName: DataTypes.STRING,
		cardAddress: DataTypes.STRING,
		cardCity: DataTypes.STRING,
		cardState: DataTypes.STRING,
		cardZipCode: DataTypes.STRING,
		complete: DataTypes.BOOLEAN,
		usersListId: DataTypes.STRING
		}, 
		{
			freezeTableName: true,
			tableName: 'cardsList'
		}
	)
	cardsList.associate = models => {
		cardsList.belongsTo(models.usersList, {
			foreignKey: 'usersListId',
			onDelete: 'CASCADE'
		})
	}
	return cardsList;
}