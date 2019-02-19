module.exports = function(sequelize, DataTypes) {

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
     // eventList.associate = models => {
     //      eventList.belongsTo(models.usersList, {
     //           foreignKey: { allowNull: false }
     //      })
     // }
     return eventList;
}