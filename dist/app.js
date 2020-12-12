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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const DeviceController_1 = require("./controller/DeviceController");
<<<<<<< HEAD
const Device_1 = require("./Model/Device");
const DeviceRepositery_1 = require("./Repositery/DeviceRepositery");
const DeviceService_1 = require("./Service/DeviceService");
const app = express_1.default();
var bodyParser = require('body-parser');
=======
const db_1 = require("./db");
const Device_1 = require("./model/Device");
const Device_type_1 = require("./model/Device-type");
const Sensor_1 = require("./model/Sensor");
const Sensor_type_1 = require("./model/Sensor-type");
const DeviceRepositery_1 = require("./repositery/DeviceRepositery");
const DeviceService_1 = require("./service/DeviceService");
const app = express_1.default();
var bodyParser = require('body-parser');
// fro Creating table ...
db_1.sequelize.sync({ alter: true })
    .then(() => console.log("Table created"))
    .catch(err => console.log("Error : While creating Database table", err));
>>>>>>> 172153ef3cfb74c365d2ffa39af118ad7fff9d81
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('views', './src/view'); // Set Which Folder to view
app.set('view engine', 'ejs'); // Which type of engine is used for rendering...
//create a device controller object for Request and Response...
let deviceRepositery = new DeviceRepositery_1.DeviceRepositery();
let deviceService = new DeviceService_1.DeviceService(deviceRepositery);
let deviceController = new DeviceController_1.DeviceController(deviceService);
app.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render("index");
}));
app.get('/getSensors/:page?', deviceController.getSensors);
<<<<<<< HEAD
=======
app.post('/getSensors/:page', deviceController.getSensors);
>>>>>>> 172153ef3cfb74c365d2ffa39af118ad7fff9d81
// Add device type...
app.get('/add-UpdateDeviceType/:id?', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let deviceTypeid = req.params.id;
    let name;
    if (deviceTypeid != undefined) {
<<<<<<< HEAD
        let deviceType = yield Device_1.DeviceType.findOne({ where: { deviceTypeID: req.params.id } });
=======
        let deviceType = yield Device_type_1.DeviceType.findOne({ where: { deviceTypeID: req.params.id } });
>>>>>>> 172153ef3cfb74c365d2ffa39af118ad7fff9d81
        console.log("DeviceType", deviceType);
        name = deviceType.name;
    }
    res.render("addDeviceType", { deviceTypeid, name });
}));
app.post('/add-UpdateDeviceType', deviceController.addUpdateDeviceType);
// Add Sensor type...
app.get('/addSensorType', (req, res) => {
    res.render("addSensorType");
});
app.post('/addSensorType', deviceController.addSensorType);
// Add DeviceSensor...
app.get('/addDeviceSensor', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
<<<<<<< HEAD
    let deviceTypeList = yield Device_1.DeviceType.findAll().then().catch(err => console.log(err));
    let sensorTypeList = yield Device_1.SensorType.findAll().then().catch(err => console.log(err));
=======
    let deviceTypeList = yield Device_type_1.DeviceType.findAll().then().catch(err => console.log(err));
    let sensorList = yield Sensor_1.Sensor.findAll().then().catch(err => console.log(err));
>>>>>>> 172153ef3cfb74c365d2ffa39af118ad7fff9d81
    // cast Seqlize object to Array for rendering to html....
    let deviceTypes = [];
    deviceTypeList.forEach((data) => {
        deviceTypes.push(data);
    });
<<<<<<< HEAD
    let sensorTypes = [];
    sensorTypeList.forEach((data) => {
        sensorTypes.push(data);
    });
    res.render("addDeviceSensor", { deviceTypes, sensorTypes });
=======
    let sensors = [];
    sensorList.forEach((data) => {
        sensors.push(data);
    });
    res.render("addDeviceSensor", { deviceTypes, sensors });
>>>>>>> 172153ef3cfb74c365d2ffa39af118ad7fff9d81
}));
app.post('/addDeviceSensor', deviceController.addDeviceSensor);
// Add-Update Device...
app.get('/addUpdateDevice/:id?', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let deviceId = req.params.id;
    let deviceTypeId, deviceName = null;
    if (deviceId != undefined) {
        let device = yield Device_1.Device.findOne({ where: { deviceID: deviceId } });
        deviceTypeId = device.deviceTypeID;
        deviceName = device.name;
    }
<<<<<<< HEAD
    let devicesTypeList = yield Device_1.DeviceType.findAll().then().catch(err => console.log(err));
=======
    let devicesTypeList = yield Device_type_1.DeviceType.findAll().then().catch(err => console.log(err));
>>>>>>> 172153ef3cfb74c365d2ffa39af118ad7fff9d81
    // cast Seqlize object to Array for rendering to html....
    let array = [];
    devicesTypeList.forEach((data) => {
        array.push(data);
    });
    console.log("Device type List", array);
    res.render("addDevice", { typeList: array, deviceId, deviceTypeId, deviceName });
}));
app.post('/addUpdateDevice', deviceController.addUpdateDevice);
<<<<<<< HEAD
=======
// Add-Update Device...
app.get('/addSensor', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let sensorTypeList = yield Sensor_type_1.SensorType.findAll().then().catch(err => console.log(err));
    let array = [];
    sensorTypeList.forEach((data) => {
        array.push(data);
    });
    res.render("addSensor", { typeList: array });
}));
app.post('/addSensor', deviceController.addSensor);
>>>>>>> 172153ef3cfb74c365d2ffa39af118ad7fff9d81
//Db query ...  fetch all details...
// SELECT * FROM `devices` INNER join devicetypes  ON devices.deviceTypeID = devicetypes.deviceTypeID INNER JOIN   devicesensors on devices.deviceTypeID = devicesensors.deviceTypeID inner join sensortypes on devicesensors.sensorTypeID = sensortypes.sensorTypeID
// where `deviceID` = 1 
// new Updated Query After Adding Sensor Table...
// SELECT  devices.deviceID, devices.name as Device_Name ,devicetypes.name as DeviceType_Name, sensortypes.name as 		SensorType_Name , sensors.name as Sensor_Name
// FROM `devices` INNER join devicetypes  ON devices.deviceTypeID = devicetypes.deviceTypeID 
// 			   INNER JOIN   devicesensors on devices.deviceTypeID = devicesensors.deviceTypeID 
//                inner join sensors on devicesensors.sensorID = sensors.sensorID
//                INNER JOIN sensortypes on sensors.sensorTypeID = sensortypes.sensorTypeID
// where `deviceID` = 1
//Db Query .... fetch only Sensor of that Device...
//SELECT devices.deviceID, devices.name ,devicetypes.name, sensortypes.name FROM `devices` INNER join devicetypes  ON devices.deviceTypeID = devicetypes.deviceTypeID INNER JOIN   devicesensors on devices.deviceTypeID = devicesensors.deviceTypeID inner join sensortypes on devicesensors.sensorTypeID = sensortypes.sensorTypeID
//where `deviceID` = 1  
app.get('*', function (req, res) {
    res.send("404 : Page Not Found ");
});
const port = process.env.PORT || 2000;
app.listen(port, () => {
    console.log("server running on port", port);
});
module.exports = app;
