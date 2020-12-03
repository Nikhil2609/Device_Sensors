import { Model } from "sequelize";

export class Device extends Model{
    deviceID! : number;
    deviceTypeID! : number;
    name!: string;
    active! :boolean;      
}



