module.exports = function (sequelize, DataTypes) {
     
     // defines recipe list values within table

     var recipeList = sequelize.define("recipeList", {
          whichList: DataTypes.STRING,          
          recipeImage: DataTypes.STRING,
          recipeName: DataTypes.STRING,
          recipeLink: DataTypes.STRING,
          recipeMakes: DataTypes.STRING,
          complete: DataTypes.BOOLEAN,  
          usersListId: DataTypes.STRING 
          }, 
          {
               freezeTableName: true,
               tableName: 'recipeList'
          }
     )
     // recipeList.associate = models => {
     //      recipeList.belongsTo(models.usersList, {
     //           foreignKey: { allowNull: false }
     //      })
     // }
    return recipeList;
};