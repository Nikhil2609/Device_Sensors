import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("Device-Sensor","root","",{
    host:"localhost",
    dialect:"mysql"
});

//Check Db Connection...
async function connection() {
    
    await sequelize.authenticate()
    .then( () => console.log("Connection Establised"))
    .catch( err => console.log("Database Connection Error",err)); 
} 
connection();

  