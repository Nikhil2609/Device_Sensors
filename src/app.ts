import express from 'express';
import { DeviceController } from './controller/DeviceController';
import { Device, DeviceType, SensorType } from './model/Device';
import { DeviceRepositery } from './repositery/DeviceRepositery';
import { DeviceService } from "./service/DeviceService";

const app = express(); 
var bodyParser = require('body-parser');

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 

app.set('views', './src/view');// Set Which Folder to view
app.set('view engine', 'ejs'); // Which type of engine is used for rendering...

//create a device controller object for Request and Response...
let deviceRepositery = new DeviceRepositery();
let deviceService = new DeviceService(deviceRepositery);
let deviceController = new DeviceController(deviceService);

app.get('/',async (req,res)=>{
    res.render("index");
});

app.get('/getSensors/:page?',deviceController.getSensors);


// Add device type...
app.get('/add-UpdateDeviceType/:id?',async (req,res)=>{
    let deviceTypeid:any = req.params.id;
    let name;
    if(deviceTypeid != undefined){
        let deviceType = await DeviceType.findOne({where:{deviceTypeID:req.params.id}});
        console.log("DeviceType",deviceType);
        name = deviceType.name;
    }    
    res.render("addDeviceType",{deviceTypeid,name});
});
app.post('/add-UpdateDeviceType',deviceController.addUpdateDeviceType);
// Add Sensor type...
app.get('/addSensorType',(req,res)=>{
    res.render("addSensorType");
});
app.post('/addSensorType',deviceController.addSensorType);
// Add DeviceSensor...
app.get('/addDeviceSensor',async (req,res)=>{
    let deviceTypeList:any  = await DeviceType.findAll().then().catch(err => console.log(err));
    let sensorTypeList:any = await SensorType.findAll().then().catch(err=>console.log(err));
    
    // cast Seqlize object to Array for rendering to html....
    let deviceTypes:any = [];
    deviceTypeList.forEach((data: any) => {      
        deviceTypes.push(data);       
    }); 
    let sensorTypes:any = [];
    sensorTypeList.forEach((data: any) => {      
        sensorTypes.push(data);       
    });  
    res.render("addDeviceSensor",{deviceTypes,sensorTypes});
});
app.post('/addDeviceSensor',deviceController.addDeviceSensor);
// Add-Update Device...
app.get('/addUpdateDevice/:id?',async (req,res)=>{
    let deviceId:any = req.params.id;
    let deviceTypeId, deviceName= null;
    
    if(deviceId != undefined){
        let device : any = await Device.findOne({where:{deviceID:deviceId}});        
        deviceTypeId = device.deviceTypeID;
        deviceName = device.name;
    }   

    let devicesTypeList:any = await DeviceType.findAll().then().catch(err=>console.log(err));        
    // cast Seqlize object to Array for rendering to html....
    let array:any = [];
    devicesTypeList.forEach((data: any) => {      
        array.push(data);       
    });  

    console.log("Device type List",array);
    res.render("addDevice",{typeList:array,deviceId,deviceTypeId,deviceName});
});
app.post('/addUpdateDevice',deviceController.addUpdateDevice);

//Db query ...  fetch all details...
// SELECT * FROM `devices` INNER join devicetypes  ON devices.deviceTypeID = devicetypes.deviceTypeID INNER JOIN   devicesensors on devices.deviceTypeID = devicesensors.deviceTypeID inner join sensortypes on devicesensors.sensorTypeID = sensortypes.sensorTypeID
// where `deviceID` = 1 

// new Updated Query After Adding Sensor Table...
// SELECT  devices.deviceID, devices.name as Device_Name ,devicetypes.name as DeviceType_Name, sensortypes.name as 		SensorType_Name , sensors.name as Sensor_Name
// FROM `devices` INNER join devicetypes  ON devices.deviceTypeID = devicetypes.deviceTypeID 
// 			   INNER JOIN   devicesensors on devices.deviceTypeID = devicesensors.deviceTypeID 
//                inner join sensors on devicesensors.sensorID = sensors.sensorID
//                INNER JOIN sensortypes on sensors.sensorTypeID = sensortypes.sensorTypeID
// where `deviceID` = 1

//Db Query .... fetch only Sensor of that Device...
//SELECT devices.deviceID, devices.name ,devicetypes.name, sensortypes.name FROM `devices` INNER join devicetypes  ON devices.deviceTypeID = devicetypes.deviceTypeID INNER JOIN   devicesensors on devices.deviceTypeID = devicesensors.deviceTypeID inner join sensortypes on devicesensors.sensorTypeID = sensortypes.sensorTypeID
//where `deviceID` = 1  

app.get('*', function(req, res){
    res.send("404 : Page Not Found ");
  });
  
const port = process.env.PORT || 2000;
app.listen(port,()=>{
    console.log("server running on port",port);
});

module.exports = app;