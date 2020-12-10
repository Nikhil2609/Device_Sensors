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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeviceService = void 0;
class DeviceService {
    constructor(_deviceRepositery) {
        this._deviceRepositery = _deviceRepositery;
        this._deviceRepositery = _deviceRepositery;
        console.log("Device service called", this);
    }
    getSensors(body) {
        return __awaiter(this, void 0, void 0, function* () {
            let sensors = yield this._deviceRepositery.getSensors(body);
            return sensors;
        });
    }
    addDeviceType(body) {
        return __awaiter(this, void 0, void 0, function* () {
            let deviceType = yield this._deviceRepositery.addDeviceType(body);
            return deviceType;
        });
    }
    updateDeviceType(body) {
        return __awaiter(this, void 0, void 0, function* () {
            let deviceType = yield this._deviceRepositery.updateDeviceType(body);
            return deviceType;
        });
    }
    addSensorType(body) {
        return __awaiter(this, void 0, void 0, function* () {
            let sensorType = yield this._deviceRepositery.addSensorType(body);
            return sensorType;
        });
    }
    addDeviceSensor(body) {
        return __awaiter(this, void 0, void 0, function* () {
            let deviceSensor = yield this._deviceRepositery.addDeviceSensor(body);
            return deviceSensor;
        });
    }
    addDevice(body) {
        return __awaiter(this, void 0, void 0, function* () {
            let device = yield this._deviceRepositery.addDevice(body);
            return device;
        });
    }
    updateDevice(body) {
        return __awaiter(this, void 0, void 0, function* () {
            let device = yield this._deviceRepositery.updateDevice(body);
            return device;
        });
    }
}
exports.DeviceService = DeviceService;
