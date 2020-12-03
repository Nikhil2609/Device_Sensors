import { Model } from "sequelize";

export class DeviceSensor extends Model{
    deviceSensorId!: number;
    deviceTypeID!:number;
    sensorID!:number;    
}