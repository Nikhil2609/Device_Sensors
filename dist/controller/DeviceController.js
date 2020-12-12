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
exports.DeviceController = void 0;
<<<<<<< HEAD
const sequelize_1 = require("sequelize");
const Device_1 = require("../Model/Device");
=======
const constant_1 = require("../constant");
>>>>>>> 172153ef3cfb74c365d2ffa39af118ad7fff9d81
class DeviceController {
    constructor(_deviceService) {
        this._deviceService = _deviceService;
        this.getSensors = (req, res) => __awaiter(this, void 0, void 0, function* () {
<<<<<<< HEAD
            //let sensors:any[] = await this._deviceService.getSensors(req.body);
            let current = parseInt(req.params.page) || 1;
            let skip = 5;
            let offset = (current - 1) * skip;
            let limit = skip;
            let searchValue = req.query.searchValue; // Value for Coloumn
            let SearchColoumn = req.query.SearchColoumn; // Coloumn       
            let whereColoumn;
            let OrderBy = req.query.OrderBy; //fetch Order Column...
            let OrderColoumn; // used in findAll Order property 
            let order = req.query.order || 'asc';
            console.log("Search value", searchValue, "Coloumn ", SearchColoumn, "Order By ", OrderBy);
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
                OrderColoumn = [[Device_1.DeviceType, 'name', order]];
            }
            else if (OrderBy == "Sensor") {
                OrderColoumn = [[Device_1.DeviceType, Device_1.DeviceSensor, Device_1.Sensor, 'name', order]];
            }
            else if (OrderBy == "SensorType") {
                OrderColoumn = [[Device_1.DeviceType, Device_1.DeviceSensor, Device_1.Sensor, Device_1.SensorType, 'name', order]];
            }
            else {
                OrderColoumn = [['deviceID', order]];
            }
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
            let rows; // Data print on table
            let pages; // total pagination number ... for 40 rows 1,2,3,4 on each page 10 rows..
            let TotalRow; // total Rows before Pagination...
            const sensors = yield Device_1.Device.findAndCountAll({
                attributes: ["deviceID", "name"],
                order: OrderColoumn,
                where: whereColoumn,
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
            })
                .then(((value) => {
                rows = value.rows;
                TotalRow = value.count;
                console.log("Rows ", TotalRow);
                pages = Math.ceil(TotalRow / limit);
            }))
                .catch(err => console.log("Error On getDeviceSensors ", err));
            return res.render("sensorList", {
                rows,
                TotalRow,
                current,
                pages,
                SearchColoumn,
                searchValue,
                OrderBy,
                order,
=======
            let sensors = yield this._deviceService.getSensors(req);
            return res.render("sensorList", {
                rows: sensors.rows,
                totalRow: sensors.count,
                pages: Math.ceil(sensors.count / constant_1.skip),
                current: parseInt(req.params.page) || 1,
                searchValue: req.body.searchValue,
                searchColoumn: req.body.SearchColoumn,
                orderBy: req.body.OrderBy,
                order: req.body.order || 'asc',
>>>>>>> 172153ef3cfb74c365d2ffa39af118ad7fff9d81
                message: "SensorsList Data"
            });
        });
        this.addUpdateDeviceType = (req, res) => __awaiter(this, void 0, void 0, function* () {
<<<<<<< HEAD
            console.log("Device Type Body", req.body);
=======
>>>>>>> 172153ef3cfb74c365d2ffa39af118ad7fff9d81
            if (req.body.deviceTypeId) {
                let deviceType = yield this._deviceService.updateDeviceType(req.body);
                console.log("Updated DeviceType Data", deviceType);
                //res.render("/addDeviceSensor");
                return res.status(200).json({ deviceType, message: "Update Device TYpe into database" });
            }
            else {
                let deviceType = yield this._deviceService.addDeviceType(req.body);
                return res.status(201).json({ deviceType, message: "Add Device TYpe into database" });
            }
        });
        this.addSensorType = (req, res) => __awaiter(this, void 0, void 0, function* () {
            let deviceType = yield this._deviceService.addSensorType(req.body);
            if (typeof (deviceType) == undefined) {
                return res.status(400).json({ message: "Something wrong with form data" });
            }
            return res.status(201).json({ deviceType, message: "Add Device TYpe into database" });
        });
        this.addDeviceSensor = (req, res) => __awaiter(this, void 0, void 0, function* () {
            let data = this._deviceService.addDeviceSensor(req.body);
            if (typeof (data) == undefined) {
                return res.status(400).send("Something wrong with form data");
            }
            return res.status(201).json({ data, message: "Add DeviceSensor into database" });
        });
        this.addUpdateDevice = (req, res) => __awaiter(this, void 0, void 0, function* () {
            console.log("Add Device Body", req.body);
            if (req.body.deviceId) {
                let device = yield this._deviceService.updateDevice(req.body);
                console.log("Updated DeviceData", device);
                return res.status(200).json({ device, message: "Update Device into database" });
            }
            else {
                let device = yield this._deviceService.addDevice(req.body);
                console.log("Inserted DeviceData", device);
                return res.status(201).json({ device, message: "Add Device into database" });
            }
        });
<<<<<<< HEAD
=======
        this.addSensor = (req, res) => __awaiter(this, void 0, void 0, function* () {
            let sensor = yield this._deviceService.addSensor(req.body);
            if (typeof (sensor) == undefined) {
                return res.status(400).send("Something wrong with form data");
            }
            return res.status(200).send("Add Device into database");
        });
>>>>>>> 172153ef3cfb74c365d2ffa39af118ad7fff9d81
        this._deviceService = _deviceService;
    }
}
exports.DeviceController = DeviceController;
