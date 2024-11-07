import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { ApiResponse } from '../../core/models';
import { doctorsLists } from './doctors-list';
import { sidebar } from './sidebar.data';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  getDoctorsList(): Observable<ApiResponse> {
    return of(JSON.parse(JSON.stringify(doctorsLists)));
  }

  getPatientsList(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>('assets/json/doctors-list.json').pipe(
      map((res: ApiResponse) => {
        return res;
      })
    );
  }
  getStaffList(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>('assets/json/staff-list.json').pipe(
      map((res: ApiResponse) => {
        return res;
      })
    );
  }
  getAppointmentList(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>('assets/json/appointment-list.json').pipe(
      map((res: ApiResponse) => {
        return res;
      })
    );
  }
  getStaffHoliday(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>('assets/json/staff-holiday.json').pipe(
      map((res: ApiResponse) => {
        return res;
      })
    );
  }
  getSchedule(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>('assets/json/schedule.json').pipe(
      map((res: ApiResponse) => {
        return res;
      })
    );
  }
  getInvoices(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>('assets/json/invoices.json').pipe(
      map((res: ApiResponse) => {
        return res;
      })
    );
  }
  getPayments(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>('assets/json/payments.json').pipe(
      map((res: ApiResponse) => {
        return res;
      })
    );
  }
  getExpenses(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>('assets/json/expenses.json').pipe(
      map((res: ApiResponse) => {
        return res;
      })
    );
  }
  getTaxes(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>('assets/json/taxes.json').pipe(
      map((res: ApiResponse) => {
        return res;
      })
    );
  }
  getProvidentFund(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>('assets/json/provident-fund.json').pipe(
      map((res: ApiResponse) => {
        return res;
      })
    );
  }
  getDepartmentList(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>('assets/json/department-list.json').pipe(
      map((res: ApiResponse) => {
        return res;
      })
    );
  }
  getSalary(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>('assets/json/salary.json').pipe(
      map((res: ApiResponse) => {
        return res;
      })
    );
  }
  getAssetsList(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>('assets/json/assets-list.json').pipe(
      map((res: ApiResponse) => {
        return res;
      })
    );
  }
  getExpenseReports(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>('assets/json/expense-reports.json').pipe(
      map((res: ApiResponse) => {
        return res;
      })
    );
  }
  getInvoiceReports(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>('assets/json/invoice-reports.json').pipe(
      map((res: ApiResponse) => {
        return res;
      })
    );
  }
  getAllInvoice(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>('assets/json/all-invoice.json').pipe(
      map((res: ApiResponse) => {
        return res;
      })
    );
  }
  getPatientDashboard(): Observable<ApiResponse> {
    return this.http
      .get<ApiResponse>('assets/json/patient-dashboard.json')
      .pipe(
        map((res: ApiResponse) => {
          return res;
        })
      );
  }
  getInvoicesPaid(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>('assets/json/invoices-paid.json').pipe(
      map((res: ApiResponse) => {
        return res;
      })
    );
  }
  getInvoicesOverdue(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>('assets/json/invoices-overdue.json').pipe(
      map((res: ApiResponse) => {
        return res;
      })
    );
  }
  getInvoicesDraft(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>('assets/json/invoices-draft.json').pipe(
      map((res: ApiResponse) => {
        return res;
      })
    );
  }
  getInvoicesCancelled(): Observable<ApiResponse> {
    return this.http
      .get<ApiResponse>('assets/json/invoices-cancelled.json')
      .pipe(
        map((res: ApiResponse) => {
          return res;
        })
      );
  }
  getInvoicesRecurring(): Observable<ApiResponse> {
    return this.http
      .get<ApiResponse>('assets/json/invoices-recurring.json')
      .pipe(
        map((res: ApiResponse) => {
          return res;
        })
      );
  }
  getStaffLeave(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>('assets/json/staff-leave.json').pipe(
      map((res: ApiResponse) => {
        return res;
      })
    );
  }
  getEvents() {
    return this.http.get<ApiResponse>('assets/json/scheduleevents.json').pipe(
      map((res: ApiResponse) => {
        return res;
      })
    );
  }
  getDataTables() {
    return this.http.get<ApiResponse>('assets/json/data-tables.json').pipe(
      map((res: ApiResponse) => {
        return res;
      })
    );
  }
  sidebar = JSON.parse(JSON.stringify(sidebar));
  carousel1 = [
    {
      quantity: '68',
      units: 'kg',
    },
    {
      quantity: '70',
      units: 'kg',
    },
    {
      quantity: '72',
      units: 'kg',
    },
    {
      quantity: '74',
      units: 'kg',
    },
    {
      quantity: '76',
      units: 'kg',
    },
  ];
  carousel2 = [
    {
      quantity: '160',
      units: 'cm',
    },
    {
      quantity: '162',
      units: 'cm',
    },
    {
      quantity: '164',
      units: 'cm',
    },
    {
      quantity: '166',
      units: 'cm',
    },
    {
      quantity: '168',
      units: 'cm',
    },
  ];
  socialLinks = [
    {
      icon: 'facebook',
      placeholder: 'https://www.facebook.com',
    },
    {
      icon: 'twitter',
      placeholder: 'https://www.twitter.com',
    },
    {
      icon: 'youtube',
      placeholder: 'https://www.youtube.com',
    },
    {
      icon: 'linkedin',
      placeholder: 'https://www.linkedin.com',
    },
  ];
  upcomingAppointments = [
    {
      no: 'R00001',
      patientName: 'Andrea Lalema',
      doctor: 'Dr.Jenny Smith',
      date: '12.05.2022 at',
      time: '7.00 PM',
      disease: 'Fracture',
      img: 'assets/img/profiles/avatar-03.jpg',
    },
    {
      no: 'R00002',
      patientName: 'Cristina Groves',
      doctor: 'Dr.Angelica Ramos',
      date: '13.05.2022 at',
      time: '7.00 PM',
      disease: 'Fever',
      img: 'assets/img/profiles/avatar-05.jpg',
    },
    {
      no: 'R00003',
      patientName: 'Bernardo',
      doctor: 'Dr.Martin Doe',
      date: '14.05.2022 at',
      time: '7.00 PM',
      disease: 'Fracture',
      img: 'assets/img/profiles/avatar-04.jpg',
    },
    {
      no: 'R00004',
      patientName: 'Galaviz Lalema',
      doctor: 'Dr.Martin Doe',
      date: '15.05.2022 at',
      time: '7.00 PM',
      disease: 'Fracture',
      img: 'assets/img/profiles/avatar-03.jpg',
    },
    {
      no: 'R00005',
      patientName: 'Dr.William Jerk',
      doctor: 'Dr.Angelica Ramos',
      date: '16.05.2022 at',
      time: '7.00 PM',
      disease: 'Fever',
      img: 'assets/img/profiles/avatar-02.jpg',
    },
  ];
  recentPatients = [
    {
      no: 'R00001',
      patientName: 'Andrea Lalema',
      age: '21',
      date: '12.05.2022 at',
      dateOfBirth: '07 January 2002',
      diagnosis: 'Heart attack',
      img: 'assets/img/profiles/avatar-02.jpg',
      triage: 'Non Urgent',
    },
    {
      no: 'R00002',
      patientName: 'Mark Hay Smith',
      age: '23',
      date: '13.05.2022 at',
      dateOfBirth: '06 January 2002',
      diagnosis: 'Jaundice',
      img: 'assets/img/profiles/avatar-03.jpg',
      triage: 'Emergency',
    },
    {
      no: 'R00003',
      patientName: 'Cristina Groves',
      age: '25',
      date: '14.05.2022 at',
      dateOfBirth: '10 January 2002',
      diagnosis: 'Malaria',
      img: 'assets/img/profiles/avatar-04.jpg',
      triage: 'Out Patient',
    },
    {
      no: 'R00004',
      patientName: 'Galaviz Lalema',
      age: '21',
      date: '15.05.2022 at',
      dateOfBirth: '09 January 2002',
      diagnosis: 'Typhoid',
      img: 'assets/img/profiles/avatar-05.jpg',
      triage: 'Urgent',
    },
  ];
  patientProfile = [
    {
      date: '29/09/2022',
      doctor: 'Dr.Jenny Smith',
      treatment: 'Check up',
      charges: '$ 60',
    },
    {
      date: '19/09/2022',
      doctor: 'Andrea Lalema',
      treatment: '	Blood Test',
      charges: '$ 50',
    },
    {
      date: '20/09/2022',
      doctor: 'Dr.William Stephin',
      treatment: 'Blood Pressure',
      charges: '$ 30',
    },
  ];
  blogs = [
    {
      img1: 'assets/img/blog/blog-1.jpg',
      img2: 'assets/img/profiles/avatar-01.jpg',
      heading5: 'Diabetes',
      count1: '58',
      count2: '500',
      date: '05 Sep 2022',
      heading4: 'Jenifer Robinson',
      name: 'M.B.B.S, Diabetologist',
      heading3: "Simple Changes That Lowered My Mom's Blood Pressure",
      paragraph:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...',
      msg: 'Read more in 8 Minutes',
    },
    {
      img1: 'assets/img/blog/blog-2.jpg',
      img2: 'assets/img/profiles/avatar-02.jpg',
      heading5: 'Safety',
      count1: '18',
      count2: '5k',
      date: '05 Sep 2022',
      heading4: 'Mark hay smith',
      name: 'M.B.B.S, Neurologist',
      heading3: 'Vaccines Are Close - But Right Now We Need to Hunker Down',
      paragraph:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...',
      msg: 'Read more in 2 Minutes',
    },
    {
      img1: 'assets/img/blog/blog-3.jpg',
      img2: 'assets/img/profiles/avatar-03.jpg',
      heading5: 'Dermotology',
      count1: '28',
      count2: '2.5k',
      date: '05 Sep 2022',
      heading4: 'Denise Stevens',
      name: 'M.B.B.S, Dermotologist',
      heading3: 'Hair Loss On One Side of Head – Causes & Treatments',
      paragraph:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...',
      msg: 'Read more in 3 Minutes',
    },
    {
      img1: 'assets/img/blog/blog-4.jpg',
      img2: 'assets/img/profiles/avatar-05.jpg',
      heading5: 'Ophthalmology',
      count1: '48',
      count2: '600',
      date: '05 Sep 2022',
      heading4: 'Laura Williams',
      name: 'M.B.B.S, Ophthalmologist',
      heading3:
        'Eye Care Routine To Get Rid Of Under Eye Circles And Puffiness',
      paragraph:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...',
      msg: 'Read more in 5 Minutes',
    },
    {
      img1: 'assets/img/blog/blog-5.jpg',
      img2: 'assets/img/profiles/avatar-06.jpg',
      heading5: 'Dentist',
      count1: '48',
      count2: '600',
      date: '05 Sep 2022',
      heading4: 'Linda Carpenter',
      name: 'M.B.B.S, Dentist',
      heading3: '5 Facts About Teeth Whitening You Should Know',
      paragraph:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...',
      msg: 'Read more in 3 Minutes',
    },
    {
      img1: 'assets/img/blog/blog-6.jpg',
      img2: 'assets/img/profiles/avatar-04.jpg',
      heading5: 'Gynecologist',
      count1: '18',
      count2: '300',
      date: '05 Sep 2022',
      heading4: 'Mark hay smith',
      name: 'M.B.B.S, Gynecologist',
      heading3: 'Sciatica: Symptoms, Causes & Treatments',
      paragraph:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...',
      msg: 'Read more in 10 Minutes',
    },
  ];
  invoicesGrid = [
    {
      invoiceNumber: 'IN093439#@09',
      name: 'Barbara Moore',
      img: 'assets/img/profiles/avatar-04.jpg',
      amount: 'Amount',
      amounts: '$1,54,220',
      text: 'Due Date',
      dueDate: '23 Mar 2022',
      status: 'Paid',
    },
    {
      invoiceNumber: 'IN093439#@10',
      name: 'Karlene Chaidez',
      img: 'assets/img/profiles/avatar-06.jpg',
      amount: 'Amount',
      amounts: '$1,222',
      text: 'Due Date',
      dueDate: '18 Mar 2022',
      status: 'Overdue',
      overDue: 'Overdue 14 days',
    },
    {
      invoiceNumber: 'IN093439#@11',
      name: 'Russell Copeland',
      img: 'assets/img/profiles/avatar-08.jpg',
      amount: 'Amount',
      amounts: '$3,470',
      text: 'Due Date',
      dueDate: '10 Mar 2022',
      status: 'Cancelled',
    },
    {
      invoiceNumber: 'IN093439#@12',
      name: 'Joseph Collins',
      img: 'assets/img/profiles/avatar-10.jpg',
      amount: 'Amount',
      amounts: '$8,265',
      text: 'Due Date',
      dueDate: '30 Mar 2022',
      status: 'Sent',
    },
    {
      invoiceNumber: 'IN093439#@13',
      name: 'Jennifer Floyd',
      img: 'assets/img/profiles/avatar-11.jpg',
      amount: 'Amount',
      amounts: '$5,200',
      text: 'Due Date',
      dueDate: '20 Mar 2022',
      status: 'Cancelled',
    },
    {
      invoiceNumber: 'IN093439#@14',
      name: 'Leatha Bailey',
      img: 'assets/img/profiles/avatar-09.jpg',
      amount: 'Amount',
      amounts: '$480',
      text: 'Due Date',
      dueDate: '15 Mar 2022',
      status: 'Sent',
    },
    {
      invoiceNumber: 'IN093439#@15',
      name: 'Alex Campbell',
      img: 'assets/img/profiles/avatar-12.jpg',
      amount: 'Amount',
      amounts: '$1,999',
      text: 'Due Date',
      dueDate: '08 Mar 2022',
      status: 'Overdue',
      overDue: 'Overdue 10 days',
    },
    {
      invoiceNumber: 'IN093439#@16',
      name: 'Marie Canales',
      img: 'assets/img/profiles/avatar-03.jpg',
      amount: 'Amount',
      amounts: '$2,700',
      text: 'Due Date',
      dueDate: '18 Mar 2022',
      status: 'Paid',
    },
  ];
}
