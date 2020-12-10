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
exports.DeviceRepositery = void 0;
const Device_1 = require("../Model/Device");
class DeviceRepositery {
    constructor() {
        console.log("Device Repositery constructor called", this);
    }
    getSensors(body) {
        return __awaiter(this, void 0, void 0, function* () {
            // let deviceId = body.deviceid;   
            let current = body;
            let offset = (current - 1) * 10;
            let limit = 10;
            // one to one RelationShip...
            Device_1.DeviceType.hasOne(Device_1.Device, { foreignKey: "deviceTypeID" });
            Device_1.Device.belongsTo(Device_1.DeviceType, { foreignKey: "deviceTypeID" });
            // For Many to many Relation Ship... 2 step ( 2 time one to many create many to many)
            // step :1 one to many connect (DeviceType to DeviceSensor)
            // step :2 one to many connect (DeviceSensor to Sensor)
            Device_1.DeviceType.hasMany(Device_1.DeviceSensor, { foreignKey: "deviceTypeID" });
            Device_1.DeviceSensor.belongsTo(Device_1.DeviceType, { foreignKey: "deviceTypeID" });
            Device_1.Sensor.hasMany(Device_1.DeviceSensor, { foreignKey: "sensorID" });
            Device_1.DeviceSensor.belongsTo(Device_1.Sensor, { foreignKey: "sensorID" });
            //one to many SensorType-Sensors
            Device_1.SensorType.hasMany(Device_1.Sensor, { foreignKey: "sensorTypeID" });
            Device_1.Sensor.belongsTo(Device_1.SensorType, { foreignKey: "sensorTypeID" });
            const sensors = yield Device_1.Device.findAll({
                attributes: ["deviceID", "name"],
                order: [['deviceID', 'asc']],
                limit: limit,
                offset: offset,
                subQuery: false,
                include: [
                    {
                        model: Device_1.DeviceType, required: true, attributes: ["deviceTypeID", "name"],
                        include: [
                            {
                                model: Device_1.DeviceSensor, required: true, attributes: ["deviceSensorId"],
                                include: [{
                                        model: Device_1.Sensor, required: true, attributes: ["sensorID", "name"],
                                        include: [
                                            { model: Device_1.SensorType, required: true, attributes: ["sensorTypeID", "name"] }
                                        ]
                                    }]
                            }
                        ]
                    }
                ],
                raw: true,
                nest: true
            });
            // const sensors = await sequelize
            //                         .query("select devices.name ,devicetypes.name, sensortypes.name" +
            //                                 " from `devices` INNER join devicetypes  ON devices.deviceTypeID = devicetypes.deviceTypeID "+
            //                                 " inner join devicesensors on devices.deviceTypeID = devicesensors.deviceTypeID "+
            //                                 " inner join sensortypes on devicesensors.sensorTypeID = sensortypes.sensorTypeID"+ 
            //                                 " where `deviceID` = "+deviceId+"");
            //console.log("Sensors Data",sensors);
            //console.log("Json data",JSON.stringify(sensors));
            return sensors;
        });
    }
    addDeviceType(body) {
        return __awaiter(this, void 0, void 0, function* () {
            return Device_1.DeviceType.create({ name: body.deviceTypeName });
        });
    }
    updateDeviceType(body) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                Device_1.DeviceType.update({ name: body.deviceTypeName }, { where: { deviceTypeID: body.deviceTypeId } })
                    .then((data) => __awaiter(this, void 0, void 0, function* () {
                    // Delete All previous Sensor When we update deviceType..
                    let deleteSensor = yield Device_1.DeviceSensor.destroy({ where: { deviceTypeID: body.deviceTypeId } });
                    console.log("Delete Old Sensor in Device_Sensor Table ", deleteSensor);
                    let response = Device_1.DeviceType.findOne({ where: { deviceTypeID: body.deviceTypeId } });
                    resolve(response);
                }))
                    .catch((err) => console.log("Errr", err));
            });
        });
    }
    addSensorType(body) {
        return __awaiter(this, void 0, void 0, function* () {
            return Device_1.SensorType.create({ name: body.sensorTypeName });
        });
    }
    addDeviceSensor(body) {
        return Device_1.DeviceSensor.create({
            deviceTypeID: body.DeviceType,
            sensorTypeID: body.SensorType
        });
    }
    addDevice(body) {
        return Device_1.Device.create({
            name: body.Device,
            deviceTypeID: body.deviceType
        });
    }
    updateDevice(body) {
        return new Promise((resolve, reject) => {
            Device_1.Device.update({
                name: body.Device,
                deviceTypeID: body.deviceType
            }, { where: { deviceID: body.deviceId }, returning: false })
                .then((data) => {
                let response = Device_1.Device.findOne({ where: { deviceID: body.deviceId } });
                resolve(response);
            })
                .catch((err) => console.log("Errr", err));
        });
    }
}
exports.DeviceRepositery = DeviceRepositery;
