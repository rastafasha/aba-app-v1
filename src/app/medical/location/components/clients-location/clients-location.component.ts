import { Component, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { routes } from 'src/app/shared/routes/routes';

import { url_media } from 'src/app/config/config';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { DoctorService } from 'src/app/medical/doctors/service/doctor.service';
import { PatientMService } from 'src/app/medical/patient-m/service/patient-m.service';
import { LocationService } from '../../services/location.service';



@Component({
  selector: 'app-clients-location',
  templateUrl: './clients-location.component.html',
  styleUrls: ['./clients-location.component.scss']
})
export class ClientsLocationComponent {

  @Input() locationId:any;

  public routes = routes;
  public selectedValue!: string;
  option_selected:number = 1;
  
  dataSource!: MatTableDataSource<any>;

  public showFilter = false;
  public searchDataValue = '';
  public lastIndex = 0;
  public pageSize = 10;
  public totalDatapatient = 0;
  public totalDatadoctor = 0;
  public skip = 0;
  public limit: number = this.pageSize;
  public pageIndex = 0;
  public serialNumberArray: Array<number> = [];
  public currentPage = 1;
  public pageNumberArray: Array<number> = [];
  public pageSelection: Array<any> = [];
  public totalPages = 0;

  public title: string = '';

  public  URLMedia = `${url_media}`;
  public services:any = [];
  public patients:any = [];
  public specialists:any = [];
  public location_info: any;

  public code: any;
  public provider: any;
  public description: any;
  public unit_prize: any;
  public hourly_fee: any;
  public max_allowed: any;

  public location_id: any;
  public location_iddd: any;
  public user: any;
  public roles:any = [];
  public location_selected: any;
  
  public patient_generals:any = [];

  valid_form:boolean = false;
  valid_form_success:boolean = false;

  public text_success:string = '';
  public text_validation:string = '';

  public patientList: any = [];
  public specialistList: any = [];
  public patientid: any ;
  public patient_id: any ;
  public doctor_generals: any ;
  public doctor_id: any ;
  search:any= null;
  status:any= null;

  
  constructor(
    public doctorService:DoctorService,
    public locationService:LocationService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public patientService: PatientMService,
    
  ){

  }

  ngOnInit(): void {
    this.locationId;
    window.scrollTo(0, 0);
    let USER = localStorage.getItem("user");
    this.user = JSON.parse(USER ? USER: '');
    this.roles = this.user.roles[0];

    this.doctorService.closeMenuSidebar();

    this.activatedRoute.params.subscribe((resp:any)=>{
      console.log(resp);
      this.location_id = resp.id;
    });

    this.activatedRoute.params.subscribe(params => {
      this.location_iddd = params['location_id'];
    });

    this.getLocation();
  }

  isPermission(permission:string){
    if(this.user.roles.includes('SUPERADMIN')){
      return true;
    }
    if(this.user.permissions.includes(permission)){
      return true;
    }
    return false;
  }


  optionSelected(value:number){
    this.option_selected = value;
  }
  
  getLocation(){
    this.locationService.getLocation(this.location_id).subscribe((resp:any)=>{
      console.log(resp);
      this.location_selected = resp.location;

      this.location_info= this.location_selected.location;
      // this.title= this.location_selected.location.title;
      this.patients = resp.patients;
      this.specialists = resp.specialists;

      this.totalDatapatient = resp.specialists.length;

      this.locationService.listLocationPatients(this.search, this.status, this.location_id).subscribe((resp:any)=>{

        this.totalDatapatient = resp.patients.data.length;
        this.patient_generals = resp.patients.data;
        this.patientid = resp.patients.data.id;
        this.patient_id = resp.patients.data.patient_id;
       this.getTableDataGeneralPatient();

      })


    })
  }


  getTableDataGeneralPatient(){
    this.patientList = [];
    this.serialNumberArray = [];
    
    this.patients.map((res: any, index: number) => {
      const serialNumber = index + 1;
      if (index >= this.skip && serialNumber <= this.limit) {
       
        this.patientList.push(res);
        this.serialNumberArray.push(serialNumber);
      }
    });
    this.dataSource = new MatTableDataSource<any>(this.patientList);
    this.calculateTotalPages(this.totalDatapatient, this.pageSize);
  }
 

  public getMoreData(event: string): void {
    if (event == 'next') {
      this.currentPage++;
      this.pageIndex = this.currentPage - 1;
      this.limit += this.pageSize;
      this.skip = this.pageSize * this.pageIndex;
      this.getTableDataGeneralPatient();
    } else if (event == 'previous') {
      this.currentPage--;
      this.pageIndex = this.currentPage - 1;
      this.limit -= this.pageSize;
      this.skip = this.pageSize * this.pageIndex;
      this.getTableDataGeneralPatient();
    }
  }

  public moveToPage(pageNumber: number): void {
    this.currentPage = pageNumber;
    this.skip = this.pageSelection[pageNumber - 1].skip;
    this.limit = this.pageSelection[pageNumber - 1].limit;
    if (pageNumber > this.currentPage) {
      this.pageIndex = pageNumber - 1;
    } else if (pageNumber < this.currentPage) {
      this.pageIndex = pageNumber + 1;
    }
    this.getTableDataGeneralPatient();
  }

  public PageSize(): void {
    this.pageSelection = [];
    this.limit = this.pageSize;
    this.skip = 0;
    this.currentPage = 1;
    this.getTableDataGeneralPatient();
    this.searchDataValue = '';
  }

  private calculateTotalPages(totalDatapatient: number, pageSize: number): void {
    this.pageNumberArray = [];
    this.totalPages = totalDatapatient / pageSize;
    if (this.totalPages % 1 != 0) {
      this.totalPages = Math.trunc(this.totalPages + 1);
    }
    /* eslint no-var: off */
    for (var i = 1; i <= this.totalPages; i++) {
      const limit = pageSize * i;
      const skip = limit - pageSize;
      this.pageNumberArray.push(i);
      this.pageSelection.push({ skip: skip, limit: limit });
    }
  }



  public searchData(value: any): void {debugger
    this.dataSource.filter = value.trim().toLowerCase();
    this.patientList = this.dataSource.filteredData;
  }

  public searchDataDoct(value: any): void {debugger
    this.dataSource.filter = value.trim().toLowerCase();
    this.specialistList = this.dataSource.filteredData;
  }

  cambiarStatusCliente(patient:any){
    let VALUE = patient.status;
    // console.log(VALUE);
    
    this.patientService.updateStatus(patient, patient.id).subscribe(
      resp =>{
        // console.log(resp);
        Swal.fire('Updated', `Client Status Updated successfully!`, 'success');
        this.getLocation();
      }
    )
  }

  
}
