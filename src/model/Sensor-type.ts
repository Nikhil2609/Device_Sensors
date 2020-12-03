import { Model } from "sequelize";

export class SensorType extends Model{
    sensorTypeID!: number;
    name!: string;
    isActive!: boolean;
}