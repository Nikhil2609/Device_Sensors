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
const constant_1 = require("../constant");
class DeviceController {
    constructor(_deviceService) {
        this._deviceService = _deviceService;
        this.getSensors = (req, res) => __awaiter(this, void 0, void 0, function* () {
            console.log("Get Sensors Body , ", req.body);
            let sensors = yield this._deviceService.getSensors(req);
            // let rows = sensors.rows; // Data print on table
            // let totalRow = sensors.count; // Return from table...
            // let pages = Math.ceil(totalRow/skip); // total pagination number ... for 40 rows 1,2,3,4 on each page 10 rows..        
            // let current:number = parseInt(req.params.page) || 1;
            // let searchValue = req.body.searchValue;      // Value for Coloumn
            // let searchColoumn = req.body.SearchColoumn;  // Coloumn              
            // let orderBy = req.body.OrderBy; //fetch Order Column...        
            // let order:any = req.body.order || 'asc';            
            return res.render("sensorList", {
                rows: sensors.rows,
                totalRow: sensors.count,
                pages: Math.ceil(sensors.count / constant_1.skip),
                current: parseInt(req.params.page) || 1,
                searchValue: req.body.searchValue,
                searchColoumn: req.body.SearchColoumn,
                orderBy: req.body.OrderBy,
                order: req.body.order || 'asc',
                message: "SensorsList Data"
            });
        });
        this.addUpdateDeviceType = (req, res) => __awaiter(this, void 0, void 0, function* () {
            console.log("Device Type Body", req.body);
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
        this._deviceService = _deviceService;
    }
}
exports.DeviceController = DeviceController;
