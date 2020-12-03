import { Model } from "sequelize";

export class DeviceType extends Model{
    public deviceTypeID!: number;
    public name!: string;
    public isActive!: boolean;     
}