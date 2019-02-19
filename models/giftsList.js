module.exports = function(sequelize, DataTypes) {

     // defines gift list values within table

     var giftsList = sequelize.define("giftsList", {
          whichList: DataTypes.STRING,
          giftName: DataTypes.STRING,
          giftBudget: DataTypes.STRING,
          giftBought: DataTypes.STRING,
          complete: DataTypes.BOOLEAN,
          userListId: DataTypes.STRING
          }, 
          {
               freezeTableName: true,
               tableName: 'giftsList'
          }
     )
     // giftsList.associate = models => {
     //      giftsList.belongsTo(models.usersList, {
     //           foreignKey: userUID
     //      })
     // }
     return giftsList;
}