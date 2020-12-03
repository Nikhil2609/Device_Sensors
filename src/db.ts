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
// this file contain only table init() , association , sync 

import { DataTypes } from "sequelize";
import { Device } from "./model/Device";
import { DeviceSensor } from "./model/Device-Sensors";
import { DeviceType } from "./model/Device-type";
import { Sensor } from "./model/Sensor";
import { SensorType } from "./model/Sensor-type";


// table intlize in database by init() (which coloumn ,dataType,Primary key , Foreign key ,Unique, AutoIncrement)
DeviceType.init(
    {
        deviceTypeID :{
            type : DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true,            
        },
        name :{
            type:DataTypes.STRING,            
        },
        isActive :{
            type :DataTypes.BOOLEAN,
            defaultValue:true
        }
    },
    {       
        sequelize, // compulsary pass Db connection Object ...
        timestamps: false, // createdAt and updatedAt..               
    }
);
SensorType.init(
    {
        sensorTypeID :{
            type : DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true
        },
        name :{
            type:DataTypes.STRING,            
        },
        isActive :{
            type :DataTypes.BOOLEAN,
            defaultValue:true
        }
    },
    {
        sequelize,
        timestamps: false, // createdAt and updatedAt..        
    }
);
Sensor.init(
    {
        sensorID:{
            type:DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true
        },   
        sensorTypeID:{
            type:DataTypes.INTEGER,
            references:{
                model : SensorType, // Foreign key class                     
                key : 'sensorTypeID'
            }
        },
        name :{
            type:DataTypes.STRING,            
        },
        isActive :{
            type :DataTypes.BOOLEAN,
            defaultValue:true
        }
    },
    {
        sequelize,
        timestamps: false, // createdAt and updatedAt..        
    }
);
Device.init(
    {
        deviceID:{
            type:DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true
        },   
        deviceTypeID:{
            type:DataTypes.INTEGER,
            references:{
                model : DeviceType, // Foreign key class                     
                key : 'deviceTypeID'
            }
        },
        name :{
            type:DataTypes.STRING,            
        },
        isActive :{
            type :DataTypes.BOOLEAN,
            defaultValue:true
        }
    },
    {
        sequelize,
        timestamps: false, // createdAt and updatedAt..       
    }
);
DeviceSensor.init(
    {
        DeviceSensorID :{
            type:DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true
        },
        deviceTypeID:{
            type:DataTypes.INTEGER,
            references:{
                model:DeviceType,
                key:"deviceTypeID"
            }
        },
        sensorID:{
            type:DataTypes.INTEGER,
            references:{
                model:Sensor,
                key:"sensorID"
            }
        }
    },
    {
        sequelize,
        timestamps: false, // createdAt and updatedAt..        
    }
);

// Association (connect table to table by foreign key)
// one to one RelationShip...
DeviceType.hasOne(Device,{foreignKey:"deviceTypeID"});
Device.belongsTo(DeviceType,{foreignKey:"deviceTypeID"});

// For Many to many Relation Ship... 2 step ( 2 time one to many create many to many)
// step :1 one to many connect (DeviceType to DeviceSensor)
// step :2 one to many connect (DeviceSensor to Sensor)
DeviceType.hasMany(DeviceSensor,{foreignKey:"deviceTypeID"});
DeviceSensor.belongsTo(DeviceType,{foreignKey:"deviceTypeID"}); 
Sensor.hasMany(DeviceSensor,{foreignKey:"sensorID"});
DeviceSensor.belongsTo(Sensor,{foreignKey:"sensorID"});

//one to many SensorType-Sensors
SensorType.hasMany(Sensor,{foreignKey:"sensorTypeID"});
Sensor.belongsTo(SensorType,{foreignKey:"sensorTypeID"});

// Create Table ....
// sequelize.sync({alter:true})
//                     .then(()=> console.log("Table created"))
//                     .catch(err => console.log("Error : While creating Database table",err))

