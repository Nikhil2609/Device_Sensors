import { Order, WhereOptions } from "sequelize/types";
import { Device } from "../model/Device";
import { DeviceSensor } from "../model/Device-Sensors";
import { DeviceType } from "../model/Device-type";
import { Sensor } from "../model/Sensor";
import { SensorType } from "../model/Sensor-type";

export class DeviceRepositery{

    constructor(){
        console.log("Device Repositery constructor called",this);
    }
    
    async getSensors(req:any,
        limit:number,
        offset: number,
        OrderColoumn:Order,
        whereColoumn:WhereOptions<any>): Promise<{
                                                   rows: Device[];
                                                   count: number;
                                               }>
        { 
            return new Promise((resolve,reject)=>{
                Device.findAndCountAll(
                        {                                                                                                    
                            attributes:["deviceID","name"],                                                
                            order:OrderColoumn,
                            where : whereColoumn,
                            limit:limit,
                            offset:offset,
                            subQuery:false ,                                                                                                
                            include:
                                    [                                                        
                                    {
                                    model:DeviceType,required:true ,attributes:["deviceTypeID","name"],                                                                                                   
                                    include:[
                                        {
                                            model:DeviceSensor,required:true,attributes:["deviceSensorId"],
                                            include:[{
                                                model:Sensor ,required:true,attributes:["sensorID","name"],
                                                include:[
                                                    {model:SensorType,required:true,attributes:["sensorTypeID","name"]}]
                                            }]
                                        }
                                    ]
                                    }
                                ],                                                                                                                                                                                                                                                               
                            raw:true,
                            nest:true                                                                                        
                        })  
                      .then((value: {
                                rows: Device[];
                                count: number;}) =>
                             {
                                 console.log("Rows",value.rows);
                                 console.log("Rows",value.count);
                                 resolve(value);
                             }
                            )
                      .catch(err => console.log("Error in getSensors ",err));
            });
        }         
    
    async addDeviceType(body:any):Promise<DeviceType>{
        return DeviceType.create({ name : body.deviceTypeName });
    }
    async updateDeviceType(body:any):Promise<DeviceType>{      
        return new Promise((resolve,reject)=>{
         DeviceType.update( { name : body.deviceTypeName },
                            {where:{deviceTypeID:body.deviceTypeId}} )                           
                    .then(async (data)=>{
                        // Delete All previous Sensor When we update deviceType..
                        let deleteSensor = await DeviceSensor.destroy({where:{deviceTypeID : body.deviceTypeId}});
                        console.log("Delete Old Sensor in Device_Sensor Table ",deleteSensor);
                        let response = DeviceType.findOne({where:{deviceTypeID:body.deviceTypeId}});                      
                        resolve(response);})                    
                    .catch((err)=> console.log("Errr",err));
        });
    }    
    async addSensorType(body:any):Promise<SensorType>{
        return SensorType.create({ name : body.sensorTypeName });
    }
    addDeviceSensor(body:any):Promise<DeviceSensor>{
        return DeviceSensor.create({
                                    deviceTypeID: body.DeviceType,
                                    sensorID:body.Sensor
                                    })
    }
    addDevice(body:any):Promise<Device>{
        return Device.create({
                                name : body.Device,
                                deviceTypeID : body.deviceType
                            })
    }
    updateDevice(body:any):Promise<Device>{
        return new Promise((resolve,reject)=>{
            Device.update(
                            {
                                name : body.Device,
                                deviceTypeID : body.deviceType
                            },
                            {where:{deviceID:body.deviceId},returning:false}
                        )
                    .then((data)=>{
                        let response = Device.findOne({where:{deviceID:body.deviceId}});                      
                        resolve(response);
                    })
                    .catch((err)=> console.log("Errr",err));
                })  
    }
    addSensor(body:any):Promise<Sensor>{
        return Sensor.create({
                                name : body.Sensor,
                                sensorTypeID : body.sensorType
                            })
    }
}