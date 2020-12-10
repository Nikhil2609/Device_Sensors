import { Device, DeviceSensor, DeviceType ,SensorType} from "../Model/Device";
import { DeviceRepositery } from "../repositery/DeviceRepositery";
export class DeviceService {

    constructor(private readonly _deviceRepositery:DeviceRepositery){        
        this._deviceRepositery = _deviceRepositery;
        console.log("Device service called",this);
    }

    async getSensors(body:any):Promise<Device[]>{
        let sensors = await this._deviceRepositery.getSensors(body);
        return sensors;
    }
    async addDeviceType(body:any): Promise<DeviceType>{
        let deviceType = await this._deviceRepositery.addDeviceType(body);                                                    
        return deviceType;              
    }
    async updateDeviceType(body:any): Promise<DeviceType>{
        let deviceType = await this._deviceRepositery.updateDeviceType(body);                                                    
        return deviceType;              
    }
    async addSensorType(body:any): Promise<SensorType>{
        let sensorType = await this._deviceRepositery.addSensorType(body);
        return sensorType;              
    }
    async addDeviceSensor(body:any):Promise<DeviceSensor>{
        let deviceSensor = await this._deviceRepositery.addDeviceSensor(body);
        return deviceSensor;
    }
    async addDevice(body:any): Promise<Device>{     
        let device = await this._deviceRepositery.addDevice(body);
        return device;               
    }
    async updateDevice(body:any): Promise<Device>{     
        let device = await this._deviceRepositery.updateDevice(body);
        return device;               
    }
    // addSensor(body:any): Promise<Sensor>{
    //     return new Promise((resolve,reject)=>{
    //         console.log("Add Sensor Service",body);
    //         Sensor.create({
    //                             name : body.Sensor,
    //                             sensorTypeID : body.SensorType
    //                           })
    //                   .then((data)=>{ 
    //                             console.log("Data",data);
    //                             resolve(data)
    //                         })                                                                               
    //                   .catch((err)=> {
    //                       console.log("Error in Add DeviceType ",err);
    //                       reject(err);
    //                     });
    //     })        
    // }    
}