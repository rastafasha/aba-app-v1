import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Observable, of, tap } from 'rxjs';
import { AuthService } from 'src/app/core/auth/auth.service';
import {
  ApiV2Response,
  AppUser,
  DoctorV2,
  InsuranceV2,
  LocationV2,
  PaServiceV2,
  PatientV2,
  PosCoveredV2,
} from 'src/app/core/models';
import {
  InsurancesV2Service,
  LocationsV2Service,
  PatientsV2Service,
} from 'src/app/core/services';
import { PaServicesV2Service } from 'src/app/core/services/pa-services.v2.service';
import { AppRoutes } from 'src/app/shared/routes/routes';
import { compareObjects } from 'src/app/shared/utils';
import Swal from 'sweetalert2';
import { DoctorService } from '../../doctors/service/doctor.service';
import { EditPaServiceModalComponent } from '../edit-pa-service-modal/edit-pa-service-modal.component';
import { PatientsUseCasesService } from '../service/patients-use-cases.service';
import {
  DEFAULT_AVATAR,
  INTAKEN_OPTIONS,
} from './edit-patient-m.component.const';

type PatientV2FormControls = {
  [T in keyof PatientV2]: AbstractControl<PatientV2[T]>;
};
type PaServiceV2FormControls = {
  [T in keyof PaServiceV2]: AbstractControl<PaServiceV2[T]>;
};

@Component({
  selector: 'app-edit-patient-m',
  templateUrl: './edit-patient-m.component.html',
  styleUrls: ['./edit-patient-m.component.scss'],

})
export class EditPatientMComponent implements OnInit {
  routes = AppRoutes;
  id: number;
  patient: PatientV2;
  locations: LocationV2[] = [];
  providers: DoctorV2[] = [];
  rbts: DoctorV2[] = [];
  bcbas: DoctorV2[] = [];
  insurances: InsuranceV2[] = [];
  insurerSelected: InsuranceV2;
  showLocationSelected = false;
  defaultAvatar = DEFAULT_AVATAR;
  posCoveredOptions: PosCoveredV2[] = [];

  user: AppUser;
  roles = [];
  doctor_id: number;
  location: LocationV2[] = [];
  location_id: number;

  intakenOptions = INTAKEN_OPTIONS;
  services = [];
  files: File[] = [];
  documents = [];
  documentSelected;
  form: FormGroup<PatientV2FormControls>;
  paForm: FormGroup<PaServiceV2FormControls>;
  constructor(
    private useCases: PatientsUseCasesService,
    private patientsService: PatientsV2Service,
    private paServicesService: PaServicesV2Service,
    private locationsService: LocationsV2Service,
    private providersService: DoctorService,
    private insurancesService: InsurancesV2Service,
    private route: ActivatedRoute,
    private authService: AuthService,
    private fb: FormBuilder,
    public dialog: MatDialog
  ) {
    this.form = this.fb.group<PatientV2FormControls>({
      id: this.fb.control(0),

      patient_identifier: this.fb.control(''),
      first_name: this.fb.control(''),
      last_name: this.fb.control(''),
      full_name: this.fb.control(''),
      avatar: this.fb.control(''),
      status: this.fb.control(''),
      insurer_id: this.fb.control(0),
      insurer_secondary_id: this.fb.control(0),
      insurance_identifier: this.fb.control(''),
      insurance_secondary_identifier: this.fb.control(''),
      birth_date: this.fb.control(null as Date),
      age: this.fb.control(0),
      gender: this.fb.control(0),
      education: this.fb.control(''),
      profession: this.fb.control(''),
      school_name: this.fb.control(''),
      school_number: this.fb.control(''),
      parent_guardian_name: this.fb.control(''),
      relationship: this.fb.control(''),
      parent_city: this.fb.control(''),
      parent_state: this.fb.control(''),
      parent_zip: this.fb.control(''),

      parent_gender: this.fb.control(0),
      parent_birth_date: this.fb.control(null as Date),
      emmployment: this.fb.control(false),
      auto_accident: this.fb.control(false),
      other_accident: this.fb.control(false),
      is_self_subscriber: this.fb.control(false),

      language: this.fb.control(''),
      phone: this.fb.control(''),
      home_phone: this.fb.control(''),
      work_phone: this.fb.control(''),
      email: this.fb.control('', { validators: [Validators.email] }),
      city: this.fb.control(''),
      zip: this.fb.control(''),
      state: this.fb.control(''),
      address: this.fb.control(''),
      parent_address: this.fb.control(''),

      special_note: this.fb.control(''),
      diagnosis_code: this.fb.control(''),
      // referring_provider: this.fb.control(''),
      referring_code: this.fb.control(''),
      npi: this.fb.control(''),

      schedule: this.fb.control(''),
      summer_schedule: this.fb.control(''),
      location_id: this.fb.control(0),
      eqhlid: this.fb.control(''),
      elegibility_date: this.fb.control(new Date()),
      pos_covered: this.fb.control<string[]>([]),
      deductible_individual_I_F: this.fb.control(''),
      balance: this.fb.control(''),
      coinsurance: this.fb.control(''),
      copayments: this.fb.control(''),
      oop: this.fb.control(''),
      patient_control: this.fb.control(''),
      welcome: this.fb.control(''),
      consent: this.fb.control(''),
      insurance_card: this.fb.control(''),
      eligibility: this.fb.control(''),
      mnl: this.fb.control(''),
      referral: this.fb.control(''),
      ados: this.fb.control(''),
      iep: this.fb.control(''),
      asd_diagnosis: this.fb.control(''),
      cde: this.fb.control(''),
      submitted: this.fb.control(''),
      interview: this.fb.control(''),
      // patient_id: this.fb.control(this.id),
      pa_services: this.fb.control<PaServiceV2[]>([]),
      pa_assessments: this.fb.control(''),
      compayment_per_visit: this.fb.control(''),
      insurer_secundary: this.fb.control(''),
      rbt_home_id: this.fb.control(null as number),
      rbt2_school_id: this.fb.control(null as number),
      bcba_home_id: this.fb.control(null as number),
      bcba_school_id: this.fb.control(null as number),
      bcba2_school_id: this.fb.control(null as number),
      clin_director_id: this.fb.control(null as number),
      telehealth: this.fb.control(false),
      pay: this.fb.control(false),

      created_at: this.fb.control(null as Date),
      updated_at: this.fb.control(null as Date),
      deleted_at: this.fb.control(null as Date),
      referring_provider_first_name: this.fb.control(''),
      referring_provider_last_name: this.fb.control(''),
      referring_provider_npi: this.fb.control(''),
    });

    this.paForm = this.fb.group<PaServiceV2FormControls>({
      id: this.fb.control(0),
      patient_id: this.fb.control(this.id),
      pa_service: this.fb.control(''), //the name of the service
      cpt: this.fb.control(null as string),
      n_units: this.fb.control(null as number),
      spent_units: this.fb.control(null as number),
      start_date: this.fb.control(new Date()),
      end_date: this.fb.control(null as Date),
      created_at: this.fb.control(null as Date),
      updated_at: this.fb.control(null as Date),
      deleted_at: this.fb.control(null as Date),
    });
  }

  ngOnInit(): void {
    this.useCases.init();
    this.user = this.authService.user as AppUser;

    this.doctor_id = this.user.id;
    this.location_id = this.user.location_id;
    this.roles = this.user.roles;

    if (this.user.roles[0] === 'SUPERADMIN') {
      this.showLocationSelected = true;
    }
    //
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.onRefresh();
    });
    //
    this.locationsService
      .list()
      .subscribe((resp) => (this.locations = resp.data));
    //
    this.providersService.list().subscribe((resp) => {
      this.providers = resp.users.data;

      this.rbts = this.providers.filter(
        (provider) => provider.roles.name.toLowerCase() === 'rbt'
      );
      this.bcbas = this.providers.filter(
        (provider) => provider.roles.name.toLowerCase() === 'bcba'
      );
    });
    //
    this.insurancesService
      .list()
      .subscribe((res) => (this.insurances = res.data));
    //
    this.useCases
      .getPosCovered()
      .pipe(tap(console.log))
      .subscribe((data) => (this.posCoveredOptions = data));
  }

  onRefresh(): void {
    const get$ = this.id
      ? this.patientsService.get(this.id)
      : (of({
          data: new PatientV2({}),
          total: 1,
          status: 'success',
        }) as Observable<ApiV2Response<PatientV2>>);
    get$.subscribe((resp) => {
      this.updateData(resp.data);
      console.log(resp);
    });
  }

  updateReferringCode(event: Event) {
    const input = event.target as HTMLInputElement; // Hacemos el casting
  const currentValue = input.value;

  // Verificamos si el valor ya comienza con "DN"
  if (!currentValue.startsWith('DN')) {
    this.form.patchValue({
      referring_code: 'DN' + currentValue // Agregamos "DN" solo si no está presente
    });
  } else {
    this.form.patchValue({
      referring_code: currentValue // Mantenemos el valor actual si ya tiene "DN"
    });
  }
  }

  // eslint-disable-next-line no-debugger
  onSave() {debugger
    if (this.form.invalid) return;

    this.useCases.savePatient(this.form.getRawValue(), this.id).subscribe({
      next: (resp) => {
        Swal.fire('Updated', `Saved successfully!`, 'success');
        this.patient = resp.data;
        this.onRefresh();
        // if(this.user.roles[0] === 'MANAGER') {
        //   this.router.navigate([
        //     AppRoutes.location.view,
        //     this.user.location_id,
        //   ]);
        // }
        // if (this.user.roles[0] === 'SUPERADMIN') {
        //   this.router.navigate([AppRoutes.patients.list]);
        // }
      },
      error: () => {
        Swal.fire('Error', `Can't update!`, 'error');
      },
    });
  }
  // PA

  onAddPaService() {
    const pa_services = this.patient.pa_services ?? [];
    //podria requerir crear o borrar antes de actualizar
    this.paForm.patchValue({ patient_id: this.id, id: -pa_services.length });
    pa_services.push(this.paForm.getRawValue());
    this.form.patchValue({ pa_services });
    this.paForm.reset();
    this.onSave();
  }

  onDeletePaService(event) {
    // Add confirmation dialog
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        const pa_services = this.patient.pa_services ?? [];
        const pa_service_to_delete = pa_services.find(
          (item) => item.id === event.id
        );
        if (pa_service_to_delete) {
          pa_service_to_delete.deleted = true; // Mark as deleted
        }
        this.form.patchValue({ pa_services });
        this.patient.pa_services = pa_services;
        this.onSave();
        Swal.fire(
          'Deleted!',
          'Your PA service has been marked for deletion.',
          'success'
        );
      }
    });
  }

  //FILE:
  // Aclaraciones
  // Existen 3 conceptos acá
  // Picture: el avatar del cliente/paciente
  // File: archivo que esta por ser subido (vista previa)
  // Document: archivo que ya se a subido y pertenece al paciente

  onLoadPicture($event) {
    if ($event.target.files[0].type.indexOf('image')) {
      Swal.fire('Error', 'This type of file is not supported', 'error');
      return;
    }
    const file = $event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const avatar = reader.result as string;
      this.patient.avatar = avatar;
      this.form.patchValue({ avatar });
    };
  }

  //FILES
  ////////////////////////////////////////////////////////////////
  onLoadFile(event: Event): void {
    const input = event.target as HTMLInputElement;
    const files = input.files;
    for (let index = 0; index < files.length; index++) {
      const file = files.item(index);
      this.files.push(file);
    }
    //
    input.value = '';
  }

  onSaveFiles() {
    this.useCases.saveFiles(this.files);
  }
  onDeleteFile(i: number) {
    const file = this.files[i];
    this.useCases.deleteFile(file).subscribe((resp) => {
      console.log(resp);
      this.files = this.files.filter((_, index) => index !== i);
    });
  }
  // DOCS
  ////////////////////////////////////////////////////////////////////////
  onSelectDoc(event) {
    this.documentSelected = event;
  }

  onDeleteDocument(i: number) {
    const doc = this.documents[i];
    this.documents = this.documents.filter((_, index) => index !== i);
    this.useCases.deleteLaboratory(doc.id).subscribe(() => {
      this.onRefresh();
    });
  }

  onCloseReload() {
    console.error('OnCloseReload');
  }

  onGetDocumentIframe(event) {
    console.error(event);
  }

  ////////////////////////////////////////////////////////////////
  private updateData(data: PatientV2) {
    console.log(data);
    console.log(data.pa_services);
    this.patient = data;
    this.form.patchValue(this.patient);
    console.log(this.form.getRawValue());
    console.table(compareObjects(data, this.form.getRawValue()));
  }

  ////////////////////////////////////////////////////////////////
  goBack() {
    this.useCases.goBack();
  }

  onEditPaService(paService: PaServiceV2) {
    const ref = this.dialog.open(EditPaServiceModalComponent, {
      data: { paService: paService },
      width: '300px',
    });
    ref.afterClosed().subscribe((resp) => {


      this.paServicesService
        .update(resp, resp.id)
        .subscribe(() => this.onRefresh());
    });
  }


}
