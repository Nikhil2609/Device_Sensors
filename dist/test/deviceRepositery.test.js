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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = __importDefault(require("chai"));
const except = chai_1.default.expect;
const DeviceRepositery_1 = require("../Repositery/DeviceRepositery");
//const {DeviceRepositery} = require("../dist/Repositery/DeviceRepositery"); // for js extension
//mocha dist/test/**.js
describe.skip("deviceRepositery", () => {
    describe("Insert", () => {
        const testBody = {
            sensorTypeName: "Test Sensor"
        };
        it("Insert SensorType", () => __awaiter(void 0, void 0, void 0, function* () {
            const deviceRepositery = new DeviceRepositery_1.DeviceRepositery();
            const sensorType = yield deviceRepositery.addSensorType(testBody);
            console.log("Innsert Test Sensor ", sensorType);
            except(testBody.sensorTypeName).to.eq(sensorType.name);
        }));
    });
});
