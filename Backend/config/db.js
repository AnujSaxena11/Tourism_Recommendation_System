const {Sequelize} = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
    }
  }
});


const userAuthModel = require('../models/userAuth');
const authSessionModel = require('../models/authSessions');

const userAuth = sequelize.define('UserAuth', userAuthModel, { timestamps: true });
const authSession = sequelize.define('authSession', authSessionModel, { timestamps: true });


userAuth.hasMany(authSession, { foreignKey: 'userId' });
authSession.belongsTo(userAuth, { foreignKey: 'userId' });

const connectDB = async () => {
    try{
        await sequelize.authenticate();
        await sequelize.sync();
        console.log("DB connected and synced successfully");
    }
    catch(error){
        console.error('Error connecting to the database:', error);
        process.exit(1);
    }
}

module.exports = {
    sequelize,
    connectDB,
    userAuth,
    authSession,
};