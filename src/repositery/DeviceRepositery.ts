import { HasOne, Model, Sequelize } from "sequelize";
import { sequelize } from "../db";
import { Device, DeviceSensor, DeviceType, Sensor, SensorType } from "../Model/Device";

export class DeviceRepositery{

    constructor(){
        console.log("Device Repositery constructor called",this);
    }

    async getSensors(body:any):Promise<Device[]>{
        // let deviceId = body.deviceid;   
         let current = body;
         let offset = (current-1)*10;
        let limit = 10;
        
        // one to one RelationShip...
        DeviceType.hasOne(Device,{foreignKey:"deviceTypeID"});
        Device.belongsTo(DeviceType,{foreignKey:"deviceTypeID"});

        // For Many to many Relation Ship... 2 step ( 2 time one to many create many to many)
        // step :1 one to many connect (DeviceType to DeviceSensor)
        // step :2 one to many connect (DeviceSensor to Sensor)
        DeviceType.hasMany(DeviceSensor,{foreignKey:"deviceTypeID"});
        DeviceSensor.belongsTo(DeviceType,{foreignKey:"deviceTypeID"}); 
        Sensor.hasMany(DeviceSensor,{foreignKey:"sensorID"});
        DeviceSensor.belongsTo(Sensor,{foreignKey:"sensorID"});

        //one to many SensorType-Sensors
        SensorType.hasMany(Sensor,{foreignKey:"sensorTypeID"});
        Sensor.belongsTo(SensorType,{foreignKey:"sensorTypeID"});    
                
        const sensors = await Device.findAll(
                                             {                                                                                                    
                                                attributes:["deviceID","name"], 
                                                order:[['deviceID','asc']],  
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
                                               },);
        
        
        // const sensors = await sequelize
        //                         .query("select devices.name ,devicetypes.name, sensortypes.name" +
        //                                 " from `devices` INNER join devicetypes  ON devices.deviceTypeID = devicetypes.deviceTypeID "+
        //                                 " inner join devicesensors on devices.deviceTypeID = devicesensors.deviceTypeID "+
        //                                 " inner join sensortypes on devicesensors.sensorTypeID = sensortypes.sensorTypeID"+ 
        //                                 " where `deviceID` = "+deviceId+"");
        //console.log("Sensors Data",sensors);
        //console.log("Json data",JSON.stringify(sensors));
        return sensors;
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
                                    sensorTypeID:body.SensorType
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
}