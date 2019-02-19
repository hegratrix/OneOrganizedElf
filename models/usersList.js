module.exports = function(sequelize, DataTypes) {
     
     var usersList = sequelize.define("usersList", {
          userNickname: DataTypes.STRING,
          userEmail: DataTypes.STRING,
          userUID: DataTypes.STRING
          }, 
          {
               freezeTableName: true,
               tableName: 'usersList'
          }
     )

     // usersList.associate = models => {
     //      usersList.hasMany(models.cardsList, {
     //           onDelete: 'cascade'
     //      })
     //      usersList.hasMany(models.eventList, {
     //           onDelete: 'cascade'
     //      })
     //      usersList.hasMany(models.giftsList, {
     //           onDelete: 'cascade'
     //      })
     //      usersList.hasMany(models.groceryList, {
     //           onDelete: 'cascade'
     //      })
     //      usersList.hasMany(models.recipeList, {
     //           onDelete: 'cascade'
     //      })
     //      usersList.hasMany(models.wishList, {
     //           onDelete: 'cascade'
     //      })
     // }

     return usersList;
}