module.exports = function (sequelize, DataTypes) {
	
	// defines grocery list values within table
	var groceryList = sequelize.define("groceryList", {
		whichList: DataTypes.STRING,
		groceryName: DataTypes.STRING,
		groceryAmount: DataTypes.STRING,
		complete: DataTypes.BOOLEAN,
		usersListId: DataTypes.STRING
		}, 
		{
			freezeTableName: true,
			tableName: 'groceryList'
		}
	)
	groceryList.associate = models => {
		groceryList.belongsTo(models.usersList, {
			foreignKey: 'usersListId',
			onDelete: 'CASCADE'
		})
	}
	return groceryList;
};