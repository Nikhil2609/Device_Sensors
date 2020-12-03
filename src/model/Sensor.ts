import { Model } from "sequelize";

export class Sensor extends Model{
    sensorID! : number;
    sensorTypeID! : number;
    name!: string;
    active! :boolean;    
}