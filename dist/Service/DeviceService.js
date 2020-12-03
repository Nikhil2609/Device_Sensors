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
exports.DeviceService = void 0;
const Device_Sensors_1 = require("../model/Device-Sensors");
const Device_type_1 = require("../model/Device-type");
const Sensor_type_1 = require("../model/Sensor-type");
const sequelize_1 = require("sequelize");
const Sensor_1 = require("../model/Sensor");
const constant_1 = require("../constant");
class DeviceService {
    constructor(_deviceRepositery) {
        this._deviceRepositery = _deviceRepositery;
        this._deviceRepositery = _deviceRepositery;
        console.log("Device service called", this);
    }
    getSensors(req) {
        return __awaiter(this, void 0, void 0, function* () {
            let current = parseInt(req.params.page) || 1;
            ;
            let offset = (current - 1) * constant_1.skip; // skip declare at global leval...
            let limit = constant_1.skip;
            let searchValue = req.body.searchValue; // Value for Coloumn
            let SearchColoumn = req.body.SearchColoumn; // Coloumn       
            let whereColoumn;
            let OrderBy = req.body.OrderBy; //fetch Order Column...
            let OrderColoumn; // used in findAll Order property 
            let order = req.body.order || 'asc';
            console.log("Service ", searchValue, SearchColoumn, OrderColoumn, order);
            // for Where Condition on which Coloumn...
            if (SearchColoumn == "Device") {
                whereColoumn = { name: { [sequelize_1.Op.like]: '%' + searchValue + '%' } };
            }
            else if (SearchColoumn == "DeviceType") {
                whereColoumn = { '$DeviceType.name$': { [sequelize_1.Op.like]: '%' + searchValue + '%' } };
            }
            else if (SearchColoumn == "Sensor") {
                whereColoumn = { '$DeviceType.DeviceSensors.Sensor.name$': { [sequelize_1.Op.like]: '%' + searchValue + '%' } };
            }
            else if (SearchColoumn == "SensorType") {
                whereColoumn = { '$DeviceType.DeviceSensors.Sensor.SensorType.name$': { [sequelize_1.Op.like]: '%' + searchValue + '%' } };
            }
            else {
                whereColoumn = { name: { [sequelize_1.Op.like]: '%%' } };
            }
            // for Order Coloumn..
            if (OrderBy == "Device") {
                OrderColoumn = [['name', order]];
            }
            else if (OrderBy == "DeviceType") {
                OrderColoumn = [[Device_type_1.DeviceType, 'name', order]];
            }
            else if (OrderBy == "Sensor") {
                OrderColoumn = [[Device_type_1.DeviceType, Device_Sensors_1.DeviceSensor, Sensor_1.Sensor, 'name', order]];
            }
            else if (OrderBy == "SensorType") {
                OrderColoumn = [[Device_type_1.DeviceType, Device_Sensors_1.DeviceSensor, Sensor_1.Sensor, Sensor_type_1.SensorType, 'name', order]];
            }
            else {
                OrderColoumn = [['deviceID', order]];
            }
            console.log("Search value", searchValue, "Coloumn ", SearchColoumn, "Order By ", OrderBy);
            let sensors = yield this._deviceRepositery.getSensors(req, limit, offset, OrderColoumn, whereColoumn);
            return sensors;
        });
    }
    addDeviceType(body) {
        return __awaiter(this, void 0, void 0, function* () {
            let deviceType = yield this._deviceRepositery.addDeviceType(body);
            return deviceType;
        });
    }
    updateDeviceType(body) {
        return __awaiter(this, void 0, void 0, function* () {
            let deviceType = yield this._deviceRepositery.updateDeviceType(body);
            return deviceType;
        });
    }
    addSensorType(body) {
        return __awaiter(this, void 0, void 0, function* () {
            let sensorType = yield this._deviceRepositery.addSensorType(body);
            return sensorType;
        });
    }
    addDeviceSensor(body) {
        return __awaiter(this, void 0, void 0, function* () {
            let deviceSensor = yield this._deviceRepositery.addDeviceSensor(body);
            return deviceSensor;
        });
    }
    addDevice(body) {
        return __awaiter(this, void 0, void 0, function* () {
            let device = yield this._deviceRepositery.addDevice(body);
            return device;
        });
    }
    updateDevice(body) {
        return __awaiter(this, void 0, void 0, function* () {
            let device = yield this._deviceRepositery.updateDevice(body);
            return device;
        });
    }
}
exports.DeviceService = DeviceService;
