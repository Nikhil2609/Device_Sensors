const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect;
const faker = require("faker");
const {DeviceRepositery} = require("../../dist/Repositery/DeviceRepositery");

describe("deviceRepositery",() =>{
    let deviceRepositery;
    beforeEach(()=>{
        deviceRepositery = new DeviceRepositery();
    })

    describe("Add Sensor Type",()=>{
        const testBody = {
            sensorTypeName :"Test Sensor"
        }
        it("Repositery : Insert SensorType", async ()=>{            
            const sensorType = await deviceRepositery.addSensorType(testBody);  
            console.log("Innsert Test Sensor ",sensorType);
            expect(testBody.sensorTypeName).to.eq(sensorType.name);          
        })
    })

    describe("Add DeviceType",()=>{
        const testBody = {
            deviceTypeName :"Test Device-Type"
        }
        it("Repositery : Add DeviceType", async ()=>{         
            const deviceType = await deviceRepositery.addDeviceType(testBody);              
            expect(deviceType).to.be.a('object');
            expect(testBody.deviceTypeName).to.eq(deviceType.name);          
        })
    })
    
    describe("Update DeviceType",()=>{
        const testBody = {
            deviceTypeName :"Updated Test Device-Type",
            deviceTypeId: 6  // from database ...
        }
        it("Repositery : Update DeviceType", async ()=>{         
            const deviceType = await deviceRepositery.updateDeviceType(testBody);              
            expect(deviceType).to.be.a('object');
            expect(testBody.deviceTypeId).to.eq(deviceType.deviceTypeID);          
            expect(testBody.deviceTypeName).to.eq(deviceType.name);          
        })
    })
    
    describe("Add DeviceSensor",()=>{
        const testBody = {
            DeviceType : 1,
            SensorType : 1
        }
        it("Repositery : Add DeviceSensor", async ()=>{         
            const deviceSensor = await deviceRepositery.addDeviceSensor(testBody);              
            expect(deviceSensor).to.be.a('object');
            expect(testBody.DeviceType).to.eq(deviceSensor.deviceTypeID);          
        })
    })

    describe("Add Device",()=>{
        const testBody = {
            Device : "Redmi 8",
            deviceType : 1
        }
        it("Repositery : Add Device", async ()=>{         
            const device = await deviceRepositery.addDevice(testBody);              
            expect(device).to.be.a('object');
            expect(testBody.Device).to.eq(device.name);          
        })
    })
   
    describe("Update Device",()=>{
        const testBody = {
            Device : "Redmi 8 Pro",
            deviceType : 1,
            deviceId: 7 // from db
        }
        it("Repositery : Update Device", async ()=>{         
            const device = await deviceRepositery.updateDevice(testBody);              
            expect(device).to.be.a('object');
            expect(testBody.deviceId).to.eq(device.deviceID);          
            expect(testBody.Device).to.eq(device.name);          
        })
    })
    
    describe("Get Sensors",()=>{
        const testBody = {            
            deviceid : 4
        }
        it("Repositery : Get Sensors of Device", async ()=>{         
            const sensors = await deviceRepositery.getSensors(testBody);
            console.log("Device sensors",sensors);
            console.log("Device sensors",sensors.length);
            expect(sensors.length).to.eq(2);            
        })
    })
    
})
