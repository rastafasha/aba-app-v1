import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs';
import { AuthService } from 'src/app/core/auth/auth.service';
import { AppUser } from 'src/app/core/models/users.model';
import { DoctorService } from '../../doctors/service/doctor.service';
import { NoteRbtService } from '../../../../core/services/notes-rbt.service';
import { AppRoutes } from 'src/app/shared/routes/routes';
import { NotesRbtV2Service } from 'src/app/core/services';
declare var $: any;
@Component({
  selector: 'app-notes-by-client',
  templateUrl: './notes-by-client.component.html',
  styleUrls: ['./notes-by-client.component.scss'],
})
export class NotesByClientComponent implements OnInit {
  routes = AppRoutes;
  patient_identifier: any;
  patient_id: any;
  doctor_id: any;
  patient_selected: any;
  client_selected: any;
  note_selected: any;
  bip_id: any;
  note_id: any;
  user: AppUser;

  isLoading = true;
  notesPatientList = [];
  notespatient_generals = [];
  dataSource!: MatTableDataSource<any>;
  showFilter = false;
  searchDataValue = '';
  lastIndex = 0;
  pageSize = 10;
  totalDataNotepatient = 0;
  skip = 0;
  limit: number = this.pageSize;
  pageIndex = 0;
  serialNumberArray: number[] = [];
  currentPage = 1;
  pageNumberArray: number[] = [];
  pageSelection = [];
  totalPages = 0;
  text_validation: any;

  roles = [];
  permissions = [];

  constructor(
    private ativatedRoute: ActivatedRoute,
    private notesRbtV2Service: NotesRbtV2Service,
    private noteRbtService: NoteRbtService,
    private doctorService: DoctorService,
    private location: Location,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    //
    this.ativatedRoute.params.subscribe((resp) => {
      this.patient_id = resp['id'];

      // this.patient_id= resp.patient_id;
      // console.log(this.client_id);
    });
    //  this.getNotesByPatient();
    this.getTableData();

    // const USER = localStorage.getItem("user");
    // this.user = JSON.parse(USER ? USER: '');
    // this.doctor_id = this.user.id;
    this.user = this.authService.user as AppUser;
  }

  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }

  isPermission(permission: string) {
    if (this.user.roles.includes('SUPERADMIN')) {
      return true;
    }
    if (this.user.roles.includes('ADMIN')) {
      return true;
    }
    if (this.user.permissions.includes(permission)) {
      return true;
    }
    return false;
  }

  private getTableData(): void {
    this.isLoading = true;
    this.notesPatientList = [];
    this.serialNumberArray = [];

    this.notesRbtV2Service
      .list({
        per_page: 15,
        patient_id: this.patient_id,
      })
      .pipe(
        finalize(() => {
          this.isLoading = false; // Set loading to false when request completes
        })
      )
      .subscribe((resp) => {
        this.totalDataNotepatient = resp.total;
        this.notespatient_generals = resp.data;
        this.patient_id = resp.data[0].patient_id;
        this.patient_identifier = resp.data[0].patient_identifier;
        console.log(this.patient_identifier);
        this.getTableDataGeneral();
      });
  }

  sortData(sort: any) {
    const data = this.notesPatientList.slice();

    if (!sort.active || sort.direction === '') {
      this.notesPatientList = data;
    } else {
      this.notesPatientList = data.sort((a, b) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const aValue = (a as any)[sort.active];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const bValue = (b as any)[sort.active];
        return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
      });
    }
  }

  searchData(value: any): void {
    this.dataSource.filter = value.trim().toLowerCase();
    this.notesPatientList = this.dataSource.filteredData;
  }

  getTableDataGeneral() {
    this.notesPatientList = [];
    this.serialNumberArray = [];

    this.notespatient_generals.map((res: any, index: number) => {
      const serialNumber = index + 1;
      if (index >= this.skip && serialNumber <= this.limit) {
        this.notesPatientList.push(res);
        this.serialNumberArray.push(serialNumber);
      }
    });
    this.dataSource = new MatTableDataSource<any>(this.notesPatientList);
    this.calculateTotalPages(this.totalDataNotepatient, this.pageSize);
  }

  getMoreData(event: string): void {
    if (event === 'next') {
      this.currentPage++;
      this.pageIndex = this.currentPage - 1;
      this.limit += this.pageSize;
      this.skip = this.pageSize * this.pageIndex;
      this.getTableDataGeneral();
    } else if (event === 'previous') {
      this.currentPage--;
      this.pageIndex = this.currentPage - 1;
      this.limit -= this.pageSize;
      this.skip = this.pageSize * this.pageIndex;
      this.getTableDataGeneral();
    }
  }

  moveToPage(pageNumber: number): void {
    this.currentPage = pageNumber;
    this.skip = this.pageSelection[pageNumber - 1].skip;
    this.limit = this.pageSelection[pageNumber - 1].limit;
    if (pageNumber > this.currentPage) {
      this.pageIndex = pageNumber - 1;
    } else if (pageNumber < this.currentPage) {
      this.pageIndex = pageNumber + 1;
    }
    this.getTableDataGeneral();
  }

  PageSize(): void {
    this.pageSelection = [];
    this.limit = this.pageSize;
    this.skip = 0;
    this.currentPage = 1;
    this.getTableDataGeneral();
    this.searchDataValue = '';
  }

  private calculateTotalPages(
    totalDatapatient: number,
    pageSize: number
  ): void {
    this.pageNumberArray = [];
    this.totalPages = totalDatapatient / pageSize;
    if (this.totalPages % 1 !== 0) {
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
  selectUser(note: any) {
    this.note_selected = note;
  }
  deleteRol() {
    this.noteRbtService.delete(this.note_selected.id).subscribe((resp) => {
      // console.log(resp);

      if (resp?.message === 403) {
        this.text_validation = resp?.message_text || '';
      } else {
        const INDEX = this.notesPatientList.findIndex(
          (item) => item.id === this.note_selected.id
        );
        if (INDEX !== -1) {
          this.notesPatientList.splice(INDEX, 1);

          $('#delete_patient').hide();
          $('#delete_patient').removeClass('show');
          $('.modal-backdrop').remove();
          $('body').removeClass();
          $('body').removeAttr('style');
          this.note_selected = null;
        }
      }
    });
  }
}
