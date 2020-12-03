const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect;
const faker = require("faker");
const { DeviceService } =  require("../../dist/Service/DeviceService");
const { DeviceController } = require("../../dist/controller/DeviceController");

describe("device Controller",()=>{
  let status,json,res;
        let deviceService;
        beforeEach(()=>{
            status = sinon.stub();
            json = sinon.spy();           
            res = {json,status};           
            status.returns(res);
            const deviceRepositery = sinon.spy();            
            deviceService = new DeviceService(deviceRepositery);
        })
    describe("Add Sensor Type: ",async ()=>{            
        it("Controller : Add Sensor Type ", async function() {    
            const req = {
                body: { sensorTypeName:faker.name.firstName()}
              };        
            const stubValue = {
                sensorTypeID : faker.random.number(),
                name :faker.random.words()
            }            
            
            const stub = sinon.stub(deviceService,"addSensorType").returns(stubValue);            
            const deviceController = new DeviceController(deviceService);            
            await deviceController.addSensorType(req, res);            
            
            expect(stub.calledOnce).to.be.true;      
            expect(status.args[0][0]).to.equal(201);            
            //expect(json.args[0][0].deviceType).to.be.a('object');                    
            expect(json.args[0][0].message).to.equal("Add Device TYpe into database");
                        
        });
    });
    
    describe("Add Device Type: ",async ()=>{
       
      it("Controller : Add Device Type ", async function() {    
          const req = {
              body: { sensorTypeName:faker.name.firstName()}
            };        
          const stubValue = {
              deviceTypeID : 1,
              name :"Mobile"
          }            
          
          const stub = sinon.stub(deviceService,"addDeviceType").returns(stubValue);            
          const deviceController = new DeviceController(deviceService);            
          await deviceController.addUpdateDeviceType(req, res);            
                    
          expect(stub.calledOnce).to.be.true;      
          expect(status.args[0][0]).to.equal(201);            
          expect(json.args[0][0].deviceType).to.be.a('object');                    
          expect(json.args[0][0].message).to.equal("Add Device TYpe into database");
                      
       });
    });

    describe("Update Device Type: ",async ()=>{
         
      it("Controller : Update Device Type ", async function() {    
          const req = {
              body: { deviceTypeId : 6}
            };        
          const stubValue = {
              deviceTypeID : 6,
              name :"Test Device-Type"
          }

          const stub = sinon.stub(deviceService,"updateDeviceType").returns(stubValue);            
          const deviceController = new DeviceController(deviceService);            
          await deviceController.addUpdateDeviceType(req, res);            
                    
          expect(stub.calledOnce).to.be.true;      
          expect(status.args[0][0]).to.equal(200);            
          expect(json.args[0][0].deviceType).to.be.a('object');                    
          expect(json.args[0][0].message).to.equal("Update Device TYpe into database");
                      
       });
    });

    describe("Add Device: ",async ()=>{
         
      it("Controller : Add Device", async function() {    
          const req = {
              body: { sensorTypeName:faker.name.firstName()}
            };        
          const stubValue = {
              deviceID : 1,
              deviceTypeID :1,
              name:"Samsung A 20",
              active:true
          }            
          
          const stub = sinon.stub(deviceService,"addDevice").returns(stubValue);            
          const deviceController = new DeviceController(deviceService);            
          await deviceController.addUpdateDevice(req, res);            
                    
          expect(stub.calledOnce).to.be.true;   
          expect(status.args[0][0]).to.equal(201);            
          expect(json.args[0][0].device).to.be.a('object');                    
          expect(json.args[0][0].message).to.equal("Add Device into database");
                      
       });
    });
    
    describe("Update Device: ",async ()=>{
          
      it("Controller : Update Device", async function() {    
          const req = {
              body: { deviceId : 1}
            };        
          const stubValue = {
              deviceID : 1,
              deviceTypeID :1,
              name:"Samsung A 20",
              active:true
          }            
          
          const stub = sinon.stub(deviceService,"updateDevice").returns(stubValue);            
          const deviceController = new DeviceController(deviceService);            
          await deviceController.addUpdateDevice(req, res);            
                    
          expect(stub.calledOnce).to.be.true;   
          expect(status.args[0][0]).to.equal(200);            
          expect(json.args[0][0].device).to.be.a('object');                    
          expect(json.args[0][0].message).to.equal("Update Device into database");
                      
       });
    });
    
    describe("Add DeviceSensor: ",async ()=>{
        
      it("Controller : Add DeviceSensor", async function() {    
          const req = {
              body: { sensorTypeName:faker.name.firstName()}
            };        
          const stubValue = {
            deviceSensorId:1,
            deviceTypeID:1,
            sensorTypeID:1
          }
          
          const stub = sinon.stub(deviceService,"addDeviceSensor").returns(stubValue);            
          const deviceController = new DeviceController(deviceService);            
          await deviceController.addDeviceSensor(req, res);            
                    
          expect(stub.calledOnce).to.be.true;      
          expect(status.args[0][0]).to.equal(201);
          expect(json.args[0][0].data).to.be.a('object');                    
          expect(json.args[0][0].message).to.equal("Add DeviceSensor into database");
                      
       });
    });
    
    describe("Get Sensors:",async ()=>{
          
      it("Controller : Get Sensors", async function() {    
          const req = {
              body: { }
            };                             
                    
          const stub = sinon.stub(deviceService,"getSensors");
          const deviceController = new DeviceController(deviceService);            
          await deviceController.getSensors(req, res);            
                    
          expect(stub.calledOnce).to.be.true;   
          expect(status.args[0][0]).to.equal(200);            
          //expect(json.args[0][0].sensors).to.be.a('array');                    
          expect(json.args[0][0].message).to.equal("sensorsList Data");
                      
       });
    });  
});