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
const sinon_1 = __importDefault(require("sinon"));
const faker_1 = __importDefault(require("faker"));
const expept = chai_1.default.expect;
const DeviceService_1 = require("../Service/DeviceService");
const DeviceRepositery_1 = require("../Repositery/DeviceRepositery");
//const {DeviceService} = require("../dist/Service/DeviceService");
describe.skip("device Service", () => {
    describe("Insert", () => __awaiter(void 0, void 0, void 0, function* () {
        const stubValue = {
            sensorTypeID: faker_1.default.random.number(),
            sensorTypeName: faker_1.default.random.words()
        };
        it("Insert SensorType", () => __awaiter(void 0, void 0, void 0, function* () {
            const deviceRepositery = new DeviceRepositery_1.DeviceRepositery();
            //creating stub for Respositery method (external method call)
            const stub = sinon_1.default.stub(deviceRepositery, "addSensorType").returns(stubValue);
            ;
            const deviceService = new DeviceService_1.DeviceService(deviceRepositery);
            const sensorType = yield deviceService.addSensorType(stubValue);
            console.log("Service: Insert Sensor Type Data :", sensorType);
            expept(stub.calledOnce).to.be.true;
            expept(sensorType.sensorTypeName).to.eq(stubValue.sensorTypeName);
        }));
    }));
});
