const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect;
const faker = require("faker");
const { DeviceService } = require("../../dist/Service/DeviceService");
const { DeviceRepositery } = require("../../dist/Repositery/DeviceRepositery");

describe("device Service",()=>{
    let deviceService;
    beforeEach(()=>{
        deviceRepositery = new DeviceRepositery();
        deviceService = new DeviceService(deviceRepositery);
    });    

    describe("Add Sensor Type",async ()=>{
        const stubValue = {            
            sensorTypeName :faker.random.words()
        }
        it("Service :Insert SensorType", async()=>{            
            //creating stub for Respositery method (external method call)
            const stub = sinon.stub(deviceRepositery,"addSensorType").returns(stubValue);;                        
            const sensorType = await deviceService.addSensorType(stubValue);            
            expect(stub.calledOnce).to.be.true;
            expect(sensorType.sensorTypeName).to.eq(stubValue.sensorTypeName);
        });
    });

    describe("Add DeviceType",async ()=>{        
        const stubValue = {                       
            name :faker.random.words(),
            isActive : true,
        }
        it("Service :Add DeviceType", async()=>{            
            //creating stub for Respositery method (external method call)
            const stub = sinon.stub(deviceRepositery,"addDeviceType").returns(stubValue);;                        
            const deviceType = await deviceService.addDeviceType(stubValue);            
            expect(stub.calledOnce).to.be.true;            
            expect(stubValue.name).to.eq(deviceType.name);                      
            expect(stubValue.isActive).to.eq(true);
        });
    });

    describe("Add DeviceSensor",async ()=>{        
        const stubValue = {
            deviceSensorId:1,                       
            deviceTypeID :1,
            sensorTypeID :1          
        }
        it("Service :Add DeviceSensor", async()=>{            
            //creating stub for Respositery method (external method call)
            const stub = sinon.stub(deviceRepositery,"addDeviceSensor").returns(stubValue);;                        
            const deviceSensor = await deviceService.addDeviceSensor(stubValue);            
            expect(stub.calledOnce).to.be.true;            
            expect(stubValue.deviceTypeID).to.eq(deviceSensor.deviceTypeID);
            expect(stubValue.sensorTypeID).to.eq(deviceSensor.sensorTypeID); 
            expect(stubValue.deviceSensorId).to.eq(deviceSensor.deviceSensorId);                                          
        });
    });

    describe("Add Device",async ()=>{        
        const stubValue = {                       
            name : "Redmi 8",
            deviceTypeID : 1        
        }
        it("Service :Add Device", async()=>{            
            //creating stub for Respositery method (external method call)
            const stub = sinon.stub(deviceRepositery,"addDevice").returns(stubValue);;                        
            const device = await deviceService.addDevice(stubValue);            
            expect(stub.calledOnce).to.be.true;    
            expect(device).to.be.a('object');        
            expect(stubValue.name).to.eq(device.name);
            expect(stubValue.deviceTypeID).to.eq(device.deviceTypeID);
            expect(device.deviceTypeID).to.eq(1);                               
        });
    });
    //baki chhe ...
    describe("Get Sensors",async ()=>{        
        const stubValue = {                       
            name : "Redmi 8",
            deviceTypeID : 1        
        }
        it("Service :Get Sensors", async()=>{            
            //creating stub for Respositery method (external method call)
            const stub = sinon.stub(deviceRepositery,"getSensors");            
            const device = await deviceService.getSensors(stubValue);            
            expect(stub.calledOnce).to.be.true;    
            //expect(device).to.be.a('object');        
            //expect(stubValue.name).to.eq(device.name);
            //expect(stubValue.deviceTypeID).to.eq(device.deviceTypeID);            
        });
    });

    describe("Update DeviceType",async ()=>{        
        const stubValue = {                       
            name :"Updated Test Device-Type",
            deviceTypeID: 6  // from database ...
        }
        it("Service :Update DeviceType", async()=>{            
            //creating stub for Respositery method (external method call)
            const stub = sinon.stub(deviceRepositery,"updateDeviceType").returns(stubValue);;                        
            console.log("Stub value",stub);
            const deviceType = await deviceService.updateDeviceType(stubValue);            
            expect(stub.calledOnce).to.be.true;            
            expect(stubValue.name).to.eq(deviceType.name);
            expect(stubValue.deviceTypeID).to.eq(deviceType.deviceTypeID);                                  
        });
    });

    describe("Update Device",async ()=>{        
        const stubValue = {                       
            name : "Redmi 8 Pro",
            deviceTypeID : 1,
            deviceId: 7 // from db       
        }
        it("Service :Update Device", async()=>{            
            //creating stub for Respositery method (external method call)
            const stub = sinon.stub(deviceRepositery,"updateDevice").returns(stubValue);;                        
            const device = await deviceService.updateDevice(stubValue);            
            expect(stub.calledOnce).to.be.true;    
            expect(device).to.be.a('object');        
            expect(stubValue.name).to.eq(device.name);
            expect(stubValue.deviceTypeID).to.eq(device.deviceTypeID);
            expect(device.deviceTypeID).to.eq(stubValue.deviceTypeID);
            expect(device.deviceId).to.eq(stubValue.deviceId);
        });
    });
});

