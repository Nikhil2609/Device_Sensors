import { Request,Response } from "express";
import { DeviceService } from "../service/DeviceService";
import { skip } from "../constant";

export class DeviceController {

    public constructor(private readonly _deviceService:DeviceService){        
        this._deviceService =  _deviceService;                     
    }   
    
    getSensors = async (req:Request,res:Response)=>{ 
        console.log("Get Sensors Body , ",req.body);  
        let sensors = await this._deviceService.getSensors(req);      

        let rows = sensors.rows; // Data print on table
        let totalRow = sensors.count; // Return from table...
        let pages = Math.ceil(totalRow/skip); // total pagination number ... for 40 rows 1,2,3,4 on each page 10 rows..        
        
        let searchValue = req.body.searchValue;      // Value for Coloumn
        let searchColoumn = req.body.SearchColoumn;  // Coloumn              
        let orderBy = req.body.OrderBy; //fetch Order Column...        
        let order:any = req.body.order || 'asc';

        console.log("Service ",searchValue,searchColoumn,orderBy,order);
        // let searchValue;
        // let OrderBy;
        // let order;
        let current:number = parseInt(req.params.page) || 1;

        console.log("Controller rows length ",rows.length);
        console.log("Controller Total row before pagination",totalRow);
        console.log("Total page",pages , " per page ", skip);
        console.log("Current page number",current);

        return res.render("sensorList",{
                                        rows, // data
                                        totalRow, // total Rows before Pagination            
                                        pages,
                                        current,
                                        searchValue,
                                        searchColoumn,
                                        orderBy,
                                        order,
                                        message:"SensorsList Data"
                                       }
                        ); 

//         <div style="margin-left: 15px;"> 
//     <% if (pages > 0) { %>
//       <ul class="pagination">
//           <% if (current == 1) { %>
//             <li class="disabled page-item">
//               <a class="page-link" href="#" aria-label="Previous">
//                 <span aria-hidden="true">&laquo;</span>
//                 <span class="sr-only">Previous</span>
//               </a>
//             </li>              
//           <% } else { %>
//             <li class="page-item">
//               <a class="page-link" href="/getSensors/1?SearchColoumn=<%=SearchColoumn%>&searchValue=<%=searchValue%>&OrderBy=<%=OrderBy%>&order=<%=order%>" aria-label="Previous">
//                 <span aria-hidden="true">&laquo;</span>
//                 <span class="sr-only">Previous</span>
//               </a>
//             </li>               
//           <% } %>
          
//           <% for (var i = 1; i <= pages; i++) { %>
//               <% if (i == current) { %>
//                 <li class="active page-item"><a class="page-link" href="#"><%= i %></a></li>                  
//               <% } else { %>
//                   <li class="page-item"><a class="page-link" href="/getSensors/<%= i %>?SearchColoumn=<%=SearchColoumn%>&searchValue=<%=searchValue%>&OrderBy=<%=OrderBy%>&order=<%=order%>"><%= i %></a></li>                  
//               <% } %>              
//           <% } %>
//           <% if (current == pages) { %>
//             <li class=" disabled page-item">
//               <a class="page-link" href="#" aria-label="Next">
//                 <span aria-hidden="true">&raquo;</span>
//                 <span class="sr-only">Next</span>
//               </a>
//             </li>              
//           <% } else { %>
//             <li class="page-item">
//               <a class="page-link" href="/search/<%= pages %>?SearchColoumn=<%=SearchColoumn%>&searchValue=<%=searchValue%>&OrderBy=<%=OrderBy%>&order=<%=order%>" aria-label="Next">
//                 <span aria-hidden="true">&raquo;</span>
//                 <span class="sr-only">Next</span>
//               </a>
//             </li>              
//           <% } %>          
//       </ul>
//       <% } %> 
// </div>        
    
    }
    
    addUpdateDeviceType = async (req:Request,res:Response) => {  
        console.log("Device Type Body",req.body); 
        if(req.body.deviceTypeId){
            let deviceType = await this._deviceService.updateDeviceType(req.body);
            console.log("Updated DeviceType Data",deviceType);
            //res.render("/addDeviceSensor");
            return res.status(200).json({deviceType,message:"Update Device TYpe into database"});
        }
        else{
            let deviceType = await this._deviceService.addDeviceType(req.body);            
            return res.status(201).json({deviceType,message:"Add Device TYpe into database"});
        }            
    }
    addSensorType = async (req:Request,res:Response) =>{        
        let deviceType = await this._deviceService.addSensorType(req.body);        
        if(typeof(deviceType) == undefined){
            return res.status(400).json({message:"Something wrong with form data"});
        }
        return res.status(201).json({deviceType,message:"Add Device TYpe into database"});
    }
    addDeviceSensor = async (req:Request,res:Response)=>{
        let data = this._deviceService.addDeviceSensor(req.body);
        if(typeof(data) == undefined){
            return res.status(400).send("Something wrong with form data");
        }
        return res.status(201).json({data,message:"Add DeviceSensor into database"});
    }
    addUpdateDevice = async (req:Request,res:Response)=>{     
        console.log("Add Device Body",req.body); 
        if(req.body.deviceId){
            let device = await this._deviceService.updateDevice(req.body);
            console.log("Updated DeviceData",device);
            return res.status(200).json({device,message:"Update Device into database"});            
        }
        else{
            let device = await this._deviceService.addDevice(req.body);
            console.log("Inserted DeviceData",device);
            return res.status(201).json({device,message:"Add Device into database"});
        }       
    }  

    // addSensor = async (req:Request,res:Response)=>{        
    //     let sensor = await this._deviceService.addSensor(req.body);
    //     if(typeof(sensor) == undefined){
    //         return res.status(400).send("Something wrong with form data");
    //     }
    //     return res.status(200).send("Add Device into database");
    // }    
    
    //  async addDeviceType (req:Request,res:Response)  { 
    //     console.log("this",this);                // this is undefine...
    //     let deviceType = await this.deviceService.addDeviceType(req.body);
    //     if(typeof(deviceType) == undefined){
    //         return res.status(400).send("Something wrong with form data");
    //     }
    //     return res.status(200).send("Add Device TYpe into database");
    // }


//Node js , express, sequlize 

//just for only Render mutiple Table Data into one Html Table..... 
    // getSensors = async (req:Request,res:Response)=>{   
        
    //     //         SELECT devices.deviceID, devices.name ,devicetypes.name, sensortypes.name 
    //     //         FROM `devices` INNER join devicetypes  ON devices.deviceTypeID = devicetypes.deviceTypeID 
    //     // 		   INNER JOIN   devicesensors on devices.deviceTypeID = devicesensors.deviceTypeID 
    //     //         inner join sensors on devicesensors.sensorID = sensors.sensorID
    //     //         INNER JOIN sensortypes on sensors.sensorTypeID = sensortypes.sensorTypeID
        
                
    //             let sensors:any[] = await this._deviceService.getSensors(req.body);       
    //             console.log("Sensors array length ",sensors.length);
    //             console.log("Sensor",sensors);
    //              console.log("Sensor type",typeof(sensors));        
    //             // console.log("Device name",sensors[0].name);
    //             // console.log("Device name ",sensors[8].name);        
    //             //  console.log("Device name ",sensors[19].name);        
    //             //  console.log("DeviceType name ",sensors[0].DeviceType.deviceTypeID);          
    //             //  console.log("sensor name ",sensors[0].DeviceType.DeviceSensors.Sensor.name); 
    //             //  console.log("sensorType name ",sensors[0].DeviceType.DeviceSensors.Sensor.SensorType.name); 
    //             //  console.log("sensor name ",sensors[8].DeviceType.DeviceSensors.Sensor.name);
    //             //  console.log("sensorType name ",sensors[8].DeviceType.DeviceSensors.Sensor.SensorType.name);
    //             //  console.log("sensor name ",sensors[19].DeviceType.DeviceSensors.Sensor.name);
    //             //  console.log("sensorType name ",sensors[19].DeviceType.DeviceSensors.Sensor.SensorType.name);
        
                
    //             // console.log("DeviceType ID ",sensors[0].DeviceType.deviceTypeID);       
    //             // console.log("DeviceType Name ",sensors[0].DeviceType.name);                 
    //             // console.log("Sensors ",sensors.DeviceType.DeviceSensors[3].Sensor.name); 
    //             // console.log("SensorType name ",sensors[0].DeviceType.DeviceSensors[1].Sensor.SensorType.name); 
                
    //             // sensors.forEach((a: any) => {
    //             //     console.log(sensors.length);
    //             //     console.log("Device ID ",a.deviceID);
    //             //     console.log("Device Name ",a.name);            
    //             //     console.log("DeviceType ID ",a.DeviceType.deviceTypeID);
    //             //     console.log("DeviceType Name ",a.DeviceType.name);           
        
    //             //     // Device Sensors has many sensors...
    //             //     a.DeviceType.DeviceSensors.forEach((b: any) => {
    //             //         console.log("Sensor ID ",b.Sensor.sensorID);           
    //             //         console.log("Sensor Name ",b.Sensor.name);
    //             //         console.log("SensorType ID ",b.Sensor.SensorType.sensorTypeID);
    //             //         console.log("SensorType Name ",b.Sensor.SensorType.name);
    //             //     });            
    //             // });
        
    //             //console.log("Array length",sensors.length);
        
    //             // let device:Device[] = [];   
    //             // let deviceSensors:DeviceSensor[] = [];      
    //             // let sensorList:Sensor[]= [];
    //             // let sensorTypelist:SensorType[] = [];
    //             // sensors.DeviceType.DeviceSensors.forEach((element:any) => {
    //             //     console.log("type of Device Sensors",typeof(sensors[0].DeviceType.DeviceSensors))
    //             //     console.log("type",element);
    //             //     console.log("Sensors Type",element.Sensor.SensorType.name);
    //             //     sensorTypelist.push(element.Sensor.SensorType.name);            
    //             //     sensorList.push(element.Sensor.name);
    //             // });  
        
    //             // let data = [sensorTypelist, sensorList];
                    
    //             // console.log("SensorType List",sensorTypelist," type of data",typeof(data));        
    //             // console.log("Sensor List",sensorList,"type",typeof(sensorList));
            
    //             let data1 = JSON.stringify(sensors);
    //             //console.log(data1);
    //             return res.render("sensorList",{sensors,message:"SensorsList Data"});
                     
    //             //     <!-- Sensors : <%= data[0]%>
    //         // Sensors : <%= data.sensorList%>
        
    //         // <br>
        
    //         // <table border="1">
    //         //     <tr>
    //         //         <td>SensorType</td>
    //         //         <td>Sensor</td>
    //         //     </tr> 
    //         //         <% for(var i=0,j=0 ; j< data[0].length ; i++,j++) {%>
    //         //         <tr>
    //         //             <td><%= data[0][j]%></td>
    //         //             <td><%= data[1][j]%></td>
    //         //         </tr>
    //         //         <% }%>    
    //         // </table>
        
    //         // <br>
    //         // <br>
        
    //         // Sensor Type length : <%= data[0].length %> <br>
    //         // Sensors length : <%= data[1].length %> -->
                        
    //             //return res.status(200).json({sensors,message:"sensorsList Data"});
        
    //             //console.log("Device type name",sensors[0].name);        
    //             //console.log("Device name ",sensors[0].Device[0].name);        
    //             //console.log("Device",sensors[0].DeviceSensors[0].SensorType[1]);
    //             // let sensorList:any = [];
    //             // sensors[0].DeviceSensors.forEach((element: any) => {
    //             //   sensorList.push(element.SensorType.name);
    //             //   console.log("Element ",);  
    //             // });
    //             // let deviceType  = sensors[0].name;
    //             // let deviceName= sensors[0].Device.name;
        
    //             //console.log("Total Sensor in Device ",sensorList.length);
        
    //             return res.render("sensorList",{sensors,message:"SensorsList Data"});
        
    //             //res.json(" 1) DeviceName :"+deviceName + " (2) DeviceType :"+deviceType+" (3) Total "+ sensorList.length+" Sensor in Device (4) SensorList :"+sensorList);
    //         }




}