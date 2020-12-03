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
const DeviceService_1 = require("../Service/DeviceService");
const DeviceController_1 = require("../controller/DeviceController");
const expect = chai_1.default.expect;
describe("device Controller", () => {
    describe("Add", () => __awaiter(void 0, void 0, void 0, function* () {
        let status, json, send, res;
        let deviceService;
        beforeEach(() => {
            status = sinon_1.default.stub();
            json = sinon_1.default.spy();
            send = sinon_1.default.spy();
            res = { json, status };
            status.returns(res);
        });
        it("Controller : Add Sensor Type ", function () {
            return __awaiter(this, void 0, void 0, function* () {
                const req = {
                    body: { sensorTypeName: faker_1.default.name.firstName() }
                };
                const stubValue = {
                    sensorTypeID: faker_1.default.random.number(),
                    name: faker_1.default.random.words()
                };
                const deviceRepositery = sinon_1.default.spy();
                deviceService = new DeviceService_1.DeviceService(deviceRepositery);
                console.log("Service class", deviceService);
                const stub = sinon_1.default.stub(deviceService, "addSensorType");
                const deviceController = new DeviceController_1.DeviceController(deviceService);
                console.log("Stub executed", stub.calledOnce);
                yield deviceController.addSensorType(req, res);
                console.log("Stub executed", stub.calledOnce);
                expect(stub.calledOnce).to.be.true;
                expect(status.args[0][0]).to.equal(201);
                expect(json.args[0][0].deviceType).to.equal(stubValue);
                expect(send.args[0][0]).to.equal("Add Device TYpe into database");
            });
        });
    }));
});
