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
const Device_1 = require("../model/Device");
const Device_Sensors_1 = require("../model/Device-Sensors");
const Device_type_1 = require("../model/Device-type");
const Sensor_1 = require("../model/Sensor");
const Sensor_type_1 = require("../model/Sensor-type");
class DeviceRepositery {
    constructor() {
        console.log("Device Repositery constructor called", this);
    }
    //     async getSensors(req:any,
    //         limit:number,
    //         offset: number,
    //         OrderColoumn:Order,
    //         whereColoumn:WhereOptions<any>): Promise<{
    //                                                    rows: Device[];
    //                                                    count: number;
    //                                                }>{
    // return new Promise((resolve,reject)=>{
    // Device.findAndCountAll(
    //        {                                                                                                    
    //        attributes:["deviceID","name"],                                                
    //        order:OrderColoumn,
    //        where : whereColoumn,
    //        limit:limit,
    //        offset:offset,
    //        subQuery:false ,                                                                                                
    //        include:
    //                [                                                        
    //                {
    //                model:DeviceType,required:true ,attributes:["deviceTypeID","name"],                                                                                                   
    //                include:[
    //                    {
    //                        model:DeviceSensor,required:true,attributes:["deviceSensorId"],
    //                        include:[{
    //                            model:Sensor ,required:true,attributes:["sensorID","name"],
    //                            include:[
    //                                {model:SensorType,required:true,attributes:["sensorTypeID","name"]}]
    //                        }]
    //                    }
    //                ]
    //                }
    //            ],                                                                                                                                                                                                                                                               
    //        raw:true,
    //        nest:true                                                                                        
    //        })                    
    //      .then( =>{
    //       rows = value.rows;                                                
    //       TotalRow = value.count;
    //       console.log("Rows ",TotalRow);
    //       pages = Math.ceil(TotalRow/limit);
    //      }))
    //      .catch(err=>console.log("Error On getDeviceSensors ",err));   
    //    });
    // }   
    getSensors(req, limit, offset, OrderColoumn, whereColoumn) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                Device_1.Device.findAndCountAll({
                    attributes: ["deviceID", "name"],
                    order: OrderColoumn,
                    where: whereColoumn,
                    limit: limit,
                    offset: offset,
                    subQuery: false,
                    include: [
                        {
                            model: Device_type_1.DeviceType, required: true, attributes: ["deviceTypeID", "name"],
                            include: [
                                {
                                    model: Device_Sensors_1.DeviceSensor, required: true, attributes: ["deviceSensorId"],
                                    include: [{
                                            model: Sensor_1.Sensor, required: true, attributes: ["sensorID", "name"],
                                            include: [
                                                { model: Sensor_type_1.SensorType, required: true, attributes: ["sensorTypeID", "name"] }
                                            ]
                                        }]
                                }
                            ]
                        }
                    ],
                    raw: true,
                    nest: true
                })
                    .then((value) => {
                    console.log("Rows", value.rows);
                    console.log("Rows", value.count);
                    resolve(value);
                })
                    .catch(err => console.log("Error in getSensors ", err));
            });
        });
    }
    addDeviceType(body) {
        return __awaiter(this, void 0, void 0, function* () {
            return Device_type_1.DeviceType.create({ name: body.deviceTypeName });
        });
    }
    updateDeviceType(body) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                Device_type_1.DeviceType.update({ name: body.deviceTypeName }, { where: { deviceTypeID: body.deviceTypeId } })
                    .then((data) => __awaiter(this, void 0, void 0, function* () {
                    // Delete All previous Sensor When we update deviceType..
                    let deleteSensor = yield Device_Sensors_1.DeviceSensor.destroy({ where: { deviceTypeID: body.deviceTypeId } });
                    console.log("Delete Old Sensor in Device_Sensor Table ", deleteSensor);
                    let response = Device_type_1.DeviceType.findOne({ where: { deviceTypeID: body.deviceTypeId } });
                    resolve(response);
                }))
                    .catch((err) => console.log("Errr", err));
            });
        });
    }
    addSensorType(body) {
        return __awaiter(this, void 0, void 0, function* () {
            return Sensor_type_1.SensorType.create({ name: body.sensorTypeName });
        });
    }
    addDeviceSensor(body) {
        return Device_Sensors_1.DeviceSensor.create({
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
