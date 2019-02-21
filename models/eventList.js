module.exports = function(sequelize, DataTypes) {

	// defines event list values within table
	var eventList = sequelize.define("eventList", {
		eventName: DataTypes.STRING,
		eventDate: DataTypes.STRING,
		eventTime: DataTypes.STRING,
		eventLocation: DataTypes.STRING,
		eventInstructions: DataTypes.STRING,
		complete: DataTypes.BOOLEAN,
		usersListId: DataTypes.STRING
		},
		{
			freezeTableName: true,
			tableName: 'eventList'
		}
	)
	eventList.associate = models => {
		eventList.belongsTo(models.usersList, {
			foreignKey: 'usersListId',
			onDelete: 'CASCADE'
		})
	}
	return eventList;
}