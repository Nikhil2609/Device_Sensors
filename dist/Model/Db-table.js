"use strict";
// this file contain only table init() , association 
// and sequlize.sync() in app.ts file(startup)
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = require("../db"); // Db connection Object ...
const Device_1 = require("./Device");
const Device_Sensors_1 = require("./Device-Sensors");
const Device_type_1 = require("./Device-type");
const Sensor_1 = require("./Sensor");
const Sensor_type_1 = require("./Sensor-type");
// table intlize in database by init() (which coloumn ,dataType,Primary key , Foreign key ,Unique, AutoIncrement)
Device_type_1.DeviceType.init({
    deviceTypeID: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
    },
    isActive: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    sequelize: db_1.sequelize,
    timestamps: false,
});
Sensor_type_1.SensorType.init({
    sensorTypeID: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
    },
    isActive: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    sequelize: db_1.sequelize,
    timestamps: false,
});
Sensor_1.Sensor.init({
    sensorID: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    sensorTypeID: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: Sensor_type_1.SensorType,
            key: 'sensorTypeID'
        }
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
    },
    isActive: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    sequelize: db_1.sequelize,
    timestamps: false,
});
Device_1.Device.init({
    deviceID: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    deviceTypeID: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: Device_type_1.DeviceType,
            key: 'deviceTypeID'
        }
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
    },
    isActive: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    sequelize: db_1.sequelize,
    timestamps: false,
});
Device_Sensors_1.DeviceSensor.init({
    DeviceSensorID: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    deviceTypeID: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: Device_type_1.DeviceType,
            key: "deviceTypeID"
        }
    },
    sensorID: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: Sensor_1.Sensor,
            key: "sensorID"
        }
    }
}, {
    sequelize: db_1.sequelize,
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
db_1.sequelize.sync({ alter: true })
    .then(() => console.log("Table created"))
    .catch(err => console.log("Error : While creating Database table", err));
