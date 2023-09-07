import { Driver } from "./driver";
import { Vehicle } from "./vehicle";

export class VehicleDriverMappingDto {
    id?:number;
    date?:any;
    sort?: string;
    vehicleMaster?:Vehicle = new Vehicle();
    driverMaster?:Driver = new Driver();
    isDeleted?:boolean;
    createdBy?:string;
    modifiedBy?:string;
    creationTime?:any;
    modifiedTime?:any;
}