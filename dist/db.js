"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
exports.sequelize = new sequelize_1.Sequelize("Device-Sensor", "root", "", {
    host: "localhost",
    dialect: "mysql"
});
//Check Db Connection...
function connection() {
    return __awaiter(this, void 0, void 0, function* () {
        yield exports.sequelize.authenticate()
            .then(() => console.log("Connection Establised"))
            .catch(err => console.log("Database Connection Error", err));
    });
}
connection();
<<<<<<< HEAD
=======
// this file contain only table init() , association , sync 
const sequelize_2 = require("sequelize");
const Device_1 = require("./model/Device");
const Device_Sensors_1 = require("./model/Device-Sensors");
const Device_type_1 = require("./model/Device-type");
const Sensor_1 = require("./model/Sensor");
const Sensor_type_1 = require("./model/Sensor-type");
// table intlize in database by init() (which coloumn ,dataType,Primary key , Foreign key ,Unique, AutoIncrement)
Device_type_1.DeviceType.init({
    deviceTypeID: {
        type: sequelize_2.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: sequelize_2.DataTypes.STRING,
    },
    isActive: {
        type: sequelize_2.DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    sequelize: exports.sequelize,
    timestamps: false,
});
Sensor_type_1.SensorType.init({
    sensorTypeID: {
        type: sequelize_2.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: sequelize_2.DataTypes.STRING,
    },
    isActive: {
        type: sequelize_2.DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    sequelize: exports.sequelize,
    timestamps: false,
});
Sensor_1.Sensor.init({
    sensorID: {
        type: sequelize_2.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    sensorTypeID: {
        type: sequelize_2.DataTypes.INTEGER,
        references: {
            model: Sensor_type_1.SensorType,
            key: 'sensorTypeID'
        }
    },
    name: {
        type: sequelize_2.DataTypes.STRING,
    },
    isActive: {
        type: sequelize_2.DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    sequelize: exports.sequelize,
    timestamps: false,
});
Device_1.Device.init({
    deviceID: {
        type: sequelize_2.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    deviceTypeID: {
        type: sequelize_2.DataTypes.INTEGER,
        references: {
            model: Device_type_1.DeviceType,
            key: 'deviceTypeID'
        }
    },
    name: {
        type: sequelize_2.DataTypes.STRING,
    },
    isActive: {
        type: sequelize_2.DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    sequelize: exports.sequelize,
    timestamps: false,
});
Device_Sensors_1.DeviceSensor.init({
    DeviceSensorID: {
        type: sequelize_2.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    deviceTypeID: {
        type: sequelize_2.DataTypes.INTEGER,
        references: {
            model: Device_type_1.DeviceType,
            key: "deviceTypeID"
        }
    },
    sensorID: {
        type: sequelize_2.DataTypes.INTEGER,
        references: {
            model: Sensor_1.Sensor,
            key: "sensorID"
        }
    }
}, {
    sequelize: exports.sequelize,
    timestamps: false,
});
// Association (connect table to table by foreign key)
// one to one RelationShip...
Device_type_1.DeviceType.hasOne(Device_1.Device, { foreignKey: "deviceTypeID" });
Device_1.Device.belongsTo(Device_type_1.DeviceType, { foreignKey: "deviceTypeID" });
// For Many to many Relation Ship... 2 step ( 2 time one to many create many to many)
// step :1 one to many connect (DeviceType to DeviceSensor)
// step :2 one to many connect (DeviceSensor to Sensor)
Device_type_1.DeviceType.hasMany(Device_Sensors_1.DeviceSensor, { foreignKey: "deviceTypeID" });
Device_Sensors_1.DeviceSensor.belongsTo(Device_type_1.DeviceType, { foreignKey: "deviceTypeID" });
Sensor_1.Sensor.hasMany(Device_Sensors_1.DeviceSensor, { foreignKey: "sensorID" });
Device_Sensors_1.DeviceSensor.belongsTo(Sensor_1.Sensor, { foreignKey: "sensorID" });
//one to many SensorType-Sensors
Sensor_type_1.SensorType.hasMany(Sensor_1.Sensor, { foreignKey: "sensorTypeID" });
Sensor_1.Sensor.belongsTo(Sensor_type_1.SensorType, { foreignKey: "sensorTypeID" });
// Create Table ....
// sequelize.sync({alter:true})
//                     .then(()=> console.log("Table created"))
//                     .catch(err => console.log("Error : While creating Database table",err))
>>>>>>> 172153ef3cfb74c365d2ffa39af118ad7fff9d81
