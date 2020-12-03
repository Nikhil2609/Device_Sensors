import { DeviceRepositery } from "../repositery/DeviceRepositery";
import { Device} from "../model/Device";
import { DeviceSensor } from "../model/Device-Sensors";
import { DeviceType } from "../model/Device-type";
import { SensorType } from "../model/Sensor-type";
import { Order, Op, WhereOptions } from "sequelize";
import { Sensor } from "../model/Sensor";
import { skip } from "../constant";

export class DeviceService {

    constructor(private readonly _deviceRepositery:DeviceRepositery){        
        this._deviceRepositery = _deviceRepositery;
        console.log("Device service called",this);
    }

    async getSensors(req:any):Promise<{
                                        rows: Device[];
                                        count: number;
                                     }>
    {        
        let current = parseInt(req.params.page) || 1;;
        let offset  = (current-1)*skip;  // skip declare at global leval...
        let limit   = skip;

        let searchValue = req.body.searchValue;      // Value for Coloumn
        let SearchColoumn = req.body.SearchColoumn;  // Coloumn       
        
        let whereColoumn:WhereOptions;
        let OrderBy = req.body.OrderBy; //fetch Order Column...
        let OrderColoumn:Order ;  // used in findAll Order property 
        let order:any = req.body.order || 'asc';


        console.log("Service ",searchValue,SearchColoumn,OrderColoumn,order);

         // for Where Condition on which Coloumn...
         if(SearchColoumn == "Device"){
            whereColoumn =  {name:{[Op.like]:'%'+searchValue+'%'}}; 
        }
        else if(SearchColoumn == "DeviceType"){
            whereColoumn =  {'$DeviceType.name$':{[Op.like]:'%'+searchValue+'%'}};
        }
        else if(SearchColoumn == "Sensor"){
            whereColoumn =  {'$DeviceType.DeviceSensors.Sensor.name$':{[Op.like]:'%'+searchValue+'%'}};
        }
        else if(SearchColoumn == "SensorType"){
            whereColoumn =  {'$DeviceType.DeviceSensors.Sensor.SensorType.name$':{[Op.like]:'%'+searchValue+'%'}};
        }
        else{
            whereColoumn =  {name:{[Op.like]:'%%'}}; 
        }

        // for Order Coloumn..
        if(OrderBy == "Device"){
            OrderColoumn = [['name',order]];
        }
        else if(OrderBy == "DeviceType"){
            OrderColoumn = [[DeviceType,'name',order]];
        }
        else if(OrderBy == "Sensor"){
            OrderColoumn = [[DeviceType,DeviceSensor,Sensor,'name',order]];
        }
        else if(OrderBy == "SensorType"){
            OrderColoumn = [[DeviceType,DeviceSensor,Sensor,SensorType,'name',order]];
        }
        else{
            OrderColoumn = [['deviceID',order]];
        }  
        
        console.log("Search value",searchValue,"Coloumn ",SearchColoumn , "Order By ",OrderBy);
        let sensors = await this._deviceRepositery.getSensors(req,limit,offset,OrderColoumn,whereColoumn);
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