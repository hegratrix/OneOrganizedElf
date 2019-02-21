module.exports = function(sequelize, DataTypes) {
	 
	// defines user list values within table
	var usersList = sequelize.define("usersList", {
		userNickname: DataTypes.STRING,
		userEmail: DataTypes.STRING,
		userUID: {
			type: DataTypes.STRING,
			primaryKey: true
			}
		}, 
		{
			freezeTableName: true,
			tableName: 'usersList'
		}
	)
	usersList.associate = models => {
		usersList.hasMany(models.cardsList),
		usersList.hasMany(models.eventList),
		usersList.hasMany(models.giftsList),
		usersList.hasMany(models.groceryList),
		usersList.hasMany(models.recipeList),
		usersList.hasMany(models.wishList)
	}
	return usersList;
}