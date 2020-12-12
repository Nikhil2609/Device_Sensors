<<<<<<< HEAD
import { DataTypes, Model, Sequelize } from "sequelize";
import { sequelize } from "../db"; 

export class DeviceType extends Model{
    public deviceTypeID!: number;
    public name!: string;
    public isActive!: boolean;     
}
export class SensorType extends Model{
    sensorTypeID!: number;
    name!: string;
    isActive!: boolean;
}
=======
import { Model } from "sequelize";

>>>>>>> 172153ef3cfb74c365d2ffa39af118ad7fff9d81
export class Device extends Model{
    deviceID! : number;
    deviceTypeID! : number;
    name!: string;
<<<<<<< HEAD
    active! :boolean;  
    public DeviceType:DeviceType;  
}
export class Sensor extends Model{
    sensorID! : number;
    sensorTypeID! : number;
    name!: string;
    active! :boolean;
    public sensorType:SensorType;
}
export class DeviceSensor extends Model{
    deviceSensorId!: number;
    deviceTypeID!:number;
    sensorID!:number;
    public deviceType:DeviceType;
    public sensor:Sensor;
}

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

// Create Table ....
sequelize.sync({alter:true})
         .then(()=> console.log("Table created"))
         .catch(err => console.log("Error : While creating Database table",err))
=======
    active! :boolean;      
}



>>>>>>> 172153ef3cfb74c365d2ffa39af118ad7fff9d81
