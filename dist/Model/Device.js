"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeviceSensor = exports.Sensor = exports.Device = exports.SensorType = exports.DeviceType = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../db");
class DeviceType extends sequelize_1.Model {
}
exports.DeviceType = DeviceType;
class SensorType extends sequelize_1.Model {
}
exports.SensorType = SensorType;
class Device extends sequelize_1.Model {
}
exports.Device = Device;
class Sensor extends sequelize_1.Model {
}
exports.Sensor = Sensor;
class DeviceSensor extends sequelize_1.Model {
}
exports.DeviceSensor = DeviceSensor;
DeviceType.init({
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
SensorType.init({
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
Sensor.init({
    sensorID: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    sensorTypeID: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: SensorType,
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
Device.init({
    deviceID: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    deviceTypeID: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: DeviceType,
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
DeviceSensor.init({
    DeviceSensorID: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    deviceTypeID: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: DeviceType,
            key: "deviceTypeID"
        }
    },
    sensorID: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: Sensor,
            key: "sensorID"
        }
    }
}, {
    sequelize: db_1.sequelize,
    timestamps: false,
});
// Create Table ....
db_1.sequelize.sync({ alter: true })
    .then(() => console.log("Table created"))
    .catch(err => console.log("Error : While creating Database table", err));
