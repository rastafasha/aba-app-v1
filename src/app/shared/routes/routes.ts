export class AppRoutes {
  private static Url = '';

  static get baseUrl(): string {
    return this.Url;
  }
  static get changePassword2(): string {
    return `${this.baseUrl}/change-password`;
  }
  static get forgotPassword(): string {
    return `${this.baseUrl}/forgot-password`;
  }
  static get lockScreen(): string {
    return `${this.baseUrl}/lock-screen`;
  }
  static get login(): string {
    return `${this.baseUrl}/login`;
  }
  static get register(): string {
    return `${this.baseUrl}/register`;
  }
  static get addPayment(): string {
    return `${this.baseUrl}/accounts/add-payment`;
  }
  static get expenses(): string {
    return `${this.baseUrl}/accounts/expenses`;
  }
  static get addExpense(): string {
    return `${this.baseUrl}/accounts/add-expense`;
  }
  static get editExpense(): string {
    return `${this.baseUrl}/accounts/edit-expense`;
  }
  static get invoices(): string {
    return `${this.baseUrl}/accounts/invoices`;
  }
  static get invoiceView(): string {
    return `${this.baseUrl}/accounts/invoice-view`;
  }
  static get payments(): string {
    return `${this.baseUrl}/accounts/payments`;
  }
  static get editPayment(): string {
    return `${this.baseUrl}/accounts/edit-payment`;
  }
  static get providentFund(): string {
    return `${this.baseUrl}/accounts/provident-fund`;
  }
  static get addProvidentFund(): string {
    return `${this.baseUrl}/accounts/add-provident-fund`;
  }
  static get editProvidentFund(): string {
    return `${this.baseUrl}/accounts/edit-provident-fund`;
  }
  static get taxes(): string {
    return `${this.baseUrl}/accounts/taxes`;
  }
  static get addTax(): string {
    return `${this.baseUrl}/accounts/add-tax`;
  }
  static get editTax(): string {
    return `${this.baseUrl}/accounts/edit-tax`;
  }
  static get activities(): string {
    return `${this.baseUrl}/activities`;
  }
  //static get addAppointment(): string {
  // `  return ${this.baseUrl}/appointments/add-appointment`;
  // }
  static get addAppointment(): string {
    return `${this.baseUrl}/appointments/add`;
  }
  //static get appointmentList(): string {
  // `  return ${this.baseUrl}/appointments/appointment-list`;
  // }
  static get appointmentList(): string {
    return `${this.baseUrl}/appointments/list`;
  }
  //static get editAppointment(): string {
  // `  return ${this.baseUrl}/appointments/edit-appointment`;
  // }
  static get editAppointment(): string {
    return `${this.baseUrl}/appointments/edit`;
  }
  static get addAsset(): string {
    return `${this.baseUrl}/assets/add-asset`;
  }
  static get assetsList(): string {
    return `${this.baseUrl}/assets/assets-list`;
  }
  static get editAsset(): string {
    return `${this.baseUrl}/assets/edit-asset`;
  }
  static get blankPage(): string {
    return `${this.baseUrl}/blank-page`;
  }
  static get addBlog(): string {
    return `${this.baseUrl}/blogs/add-blog`;
  }
  static get blog(): string {
    return `${this.baseUrl}/blogs/blog`;
  }
  static get blogDetails(): string {
    return `${this.baseUrl}/blogs/blog-details`;
  }
  static get editBlog(): string {
    return `${this.baseUrl}/blogs/edit-blog`;
  }
  //static get calendar(): string {
  // `  return ${this.baseUrl}/calendar`;
  // }
  static get calendar(): string {
    return `${this.baseUrl}/appointment-calendar/show`;
  }
  static get incomingCall(): string {
    return `${this.baseUrl}/calls/incoming-call`;
  }
  static get videoCall(): string {
    return `${this.baseUrl}/calls/video-call`;
  }
  static get voiceCall(): string {
    return `${this.baseUrl}/calls/voice-call`;
  }
  static get chat(): string {
    return `${this.baseUrl}/chat`;
  }
  static get tabs(): string {
    return `${this.baseUrl}/components/tabs`;
  }
  static get typography(): string {
    return `${this.baseUrl}/components/typography`;
  }
  static get uikit(): string {
    return `${this.baseUrl}/components/uikit`;
  }
  static get adminDashboard(): string {
    return `${this.baseUrl}/dashboard/admin-dashboard`;
  }
  static get doctorDashboard(): string {
    return `${this.baseUrl}/dashboard/doctor-dashboard`;
  }
  static get patientDashboard(): string {
    return `${this.baseUrl}/dashboard/patient-dashboard`;
  }
  //static get addDepartment(): string {
  // `  return ${this.baseUrl}/departments/add-department`;
  // }
  static get addDepartment(): string {
    return `${this.baseUrl}/specialities/register`;
  }
  //static get departmentList(): string {
  // `  return ${this.baseUrl}/departments/department-list`;
  // }
  static get departmentList(): string {
    return `${this.baseUrl}/specialities/list`;
  }
  static get editDepartment(): string {
    return `${this.baseUrl}/departments/edit-department`;
  }
  //static get addDoctor(): string {
  // `  return ${this.baseUrl}/doctor/add-doctor`;
  // }
  static get addDoctor(): string {
    return `${this.baseUrl}/doctors/add`;
  }
  static get doctorProfile(): string {
    return `${this.baseUrl}/doctor/doctor-profile`;
  }
  //static get doctorProfile(): string {
  // `  return ${this.baseUrl}/doctor/doctor-profile`;
  // }
  static get doctorSetting(): string {
    return `${this.baseUrl}/doctor/doctor-setting`;
  }
  //static get doctorsList(): string {
  // `  return ${this.baseUrl}/doctor/doctors-list`;
  // }
  static get doctorsList(): string {
    return `${this.baseUrl}/doctors/list`;
  }
  static get editDoctor(): string {
    return `${this.baseUrl}/doctor/edit-doctor`;
  }
  static get addSchedule(): string {
    return `${this.baseUrl}/doctor-schedule/add-schedule`;
  }
  static get editSchedule(): string {
    return `${this.baseUrl}/doctor-schedule/edit-schedule`;
  }
  static get schedule(): string {
    return `${this.baseUrl}/doctor-schedule/schedule`;
  }
  static get email(): string {
    return `${this.baseUrl}/email`;
  }
  static get compose(): string {
    return `${this.baseUrl}/email/compose`;
  }
  static get confirmMail(): string {
    return `${this.baseUrl}/email/confirm-mail`;
  }
  static get inbox(): string {
    return `${this.baseUrl}/email/inbox`;
  }
  static get mailView(): string {
    return `${this.baseUrl}/email/mail-view`;
  }
  static get forms(): string {
    return `${this.baseUrl}/forms`;
  }
  static get formBasicInputs(): string {
    return `${this.baseUrl}/forms/form-basic-inputs`;
  }
  static get formHorizontal(): string {
    return `${this.baseUrl}/forms/form-horizontal`;
  }
  static get formInputGroups(): string {
    return `${this.baseUrl}/forms/form-input-groups`;
  }
  static get formVertical(): string {
    return `${this.baseUrl}/forms/form-vertical`;
  }
  static get gallery(): string {
    return `${this.baseUrl}/gallery`;
  }
  static get addInvoice(): string {
    return `${this.baseUrl}/invoice/add-invoice`;
  }
  static get createInvoice(): string {
    return `${this.baseUrl}/invoice/create-invoice`;
  }
  static get editInvoice(): string {
    return `${this.baseUrl}/invoice/edit-invoice`;
  }
  static get editInvoices(): string {
    return `${this.baseUrl}/invoice/edit-invoices`;
  }
  static get invoicesGrid(): string {
    return `${this.baseUrl}/invoice/invoices-grid`;
  }
  static get allInvoice(): string {
    return `${this.baseUrl}/invoice/all-invoice`;
  }
  static get invoicesCancelled(): string {
    return `${this.baseUrl}/invoice/invoices-cancelled`;
  }
  static get invoicesDraft(): string {
    return `${this.baseUrl}/invoice/invoices-draft`;
  }
  static get invoicesOverdue(): string {
    return `${this.baseUrl}/invoice/invoices-overdue`;
  }
  static get invoicesPaid(): string {
    return `${this.baseUrl}/invoice/invoices-paid`;
  }
  static get invoicesRecurring(): string {
    return `${this.baseUrl}/invoice/invoices-recurring`;
  }
  static get invoicesSettings(): string {
    return `${this.baseUrl}/invoice/invoices-settings`;
  }
  static get taxSettings(): string {
    return `${this.baseUrl}/invoice/tax-settings`;
  }
  static get viewInvoice(): string {
    return `${this.baseUrl}/invoice/view-invoice`;
  }
  //static get addPatient(): string {
  // `  return ${this.baseUrl}/patient/add-patient`;
  // }
  static get addPatient(): string {
    return `${this.baseUrl}/patients/add`;
  }
  static get editPatient(): string {
    return `${this.baseUrl}/patient/edit-patient`;
  }
  static get patientProfile(): string {
    return `${this.baseUrl}/patient/patient-profile`;
  }
  static get patientSetting(): string {
    return `${this.baseUrl}/patient/patient-setting`;
  }
  //static get patientsList(): string {
  // `  return ${this.baseUrl}/patient/patients-list`;
  // }
  static get patientsList(): string {
    return `${this.baseUrl}/patients/list`;
  }
  static get patientsLogReport(): string {
    return `${this.baseUrl}/patients/ws`;
  }
  static get addSalary(): string {
    return `${this.baseUrl}/payroll/add-salary`;
  }
  static get editSalary(): string {
    return `${this.baseUrl}/payroll/edit-salary`;
  }
  //static get salary(): string {
  // `  return ${this.baseUrl}/payroll/salary`;
  // }
  static get salary(): string {
    return `${this.baseUrl}/appointment-pay/list`;
  }

  static get salaryView(): string {
    return `${this.baseUrl}/payroll/salary-view`;
  }
  static get profile(): string {
    return `${this.baseUrl}/profile`;
  }
  static get editProfile(): string {
    return `${this.baseUrl}/edit-profile`;
  }
  static get expenseReports(): string {
    return `${this.baseUrl}/reports/expense-reports`;
  }
  static get invoiceReports(): string {
    return `${this.baseUrl}/reports/invoice-reports`;
  }
  static get setting(): string {
    return `${this.baseUrl}/setting`;
  }
  static get settings(): string {
    return `${this.baseUrl}/settings/general-settings`;
  }
  static get bankSettings(): string {
    return `${this.baseUrl}/settings/bank-settings`;
  }
  static get changePassword(): string {
    return `${this.baseUrl}/settings/change-password`;
  }
  static get emailSettings(): string {
    return `${this.baseUrl}/settings/email-settings`;
  }
  static get localizationDetails(): string {
    return `${this.baseUrl}/settings/localization-details`;
  }
  static get othersSettings(): string {
    return `${this.baseUrl}/settings/others-settings`;
  }
  static get paymentSettings(): string {
    return `${this.baseUrl}/settings/payment-settings`;
  }
  static get seoSettings(): string {
    return `${this.baseUrl}/settings/seo-settings`;
  }
  static get socialLinks(): string {
    return `${this.baseUrl}/settings/social-links`;
  }
  static get socialSettings(): string {
    return `${this.baseUrl}/settings/social-settings`;
  }
  static get themeSettings(): string {
    return `${this.baseUrl}/settings/theme-settings`;
  }
  static get addLeave(): string {
    return `${this.baseUrl}/staff/add-leave`;
  }
  //static get addStaff(): string {
  // `  return ${this.baseUrl}/staff/add-staff`;
  // }
  static get addStaff(): string {
    return `${this.baseUrl}/staffs/add-staff`;
  }
  static get editLeave(): string {
    return `${this.baseUrl}/staff/edit-leave`;
  }
  static get editStaff(): string {
    return `${this.baseUrl}/staff/edit-staff`;
  }
  static get staffAttendance(): string {
    return `${this.baseUrl}/staff/staff-attendance`;
  }
  static get staffHoliday(): string {
    return `${this.baseUrl}/staff/staff-holiday`;
  }
  static get staffLeave(): string {
    return `${this.baseUrl}/staff/staff-leave`;
  }
  //static get staffList(): string {
  // `  return ${this.baseUrl}/staff/staff-list`;
  // }
  static get staffList(): string {
    return `${this.baseUrl}/staffs/list`;
  }
  static get staffProfile(): string {
    return `${this.baseUrl}/staff/staff-profile`;
  }
  static get staffSetting(): string {
    return `${this.baseUrl}/staff/staff-setting`;
  }
  static get tablesBasic(): string {
    return `${this.baseUrl}/tables/tables-basic`;
  }
  static get tablesDataTables(): string {
    return `${this.baseUrl}/tables/tables-datatables`;
  }
  static get error404(): string {
    return `${this.baseUrl}/error/error404`;
  }
  static get error500(): string {
    return `${this.baseUrl}/error/error500`;
  }
  //nuevas
  static get registerRole(): string {
    return `${this.baseUrl}/roles/register`;
  }
  static get listadoRole(): string {
    return `${this.baseUrl}/roles/list`;
  }
  static get addInsurance(): string {
    return `${this.baseUrl}/insurance/register`;
  }
  static get insuranceList(): string {
    return `${this.baseUrl}/insurance/list`;
  }
  static get bip(): string {
    return `${this.baseUrl}/bip/`;
  }

  static get bipList(): string {
    return `${this.baseUrl}/bip/list`;
  }
  static get registerBip(): string {
    return `${this.baseUrl}/bip/register`;
  }
  static get editBip(): string {
    return `${this.baseUrl}/bip/edit`;
  }

  static get LocationList(): string {
    return `${this.baseUrl}/location/list`;
  }
  static get registerLocation(): string {
    return `${this.baseUrl}/location/register`;
  }
  static get editNoteRbt(): string {
    return `${this.baseUrl}/note-rbt/edit`;
  }
  static get listNoteRbt(): string {
    return `${this.baseUrl}/note-rbt/listbyclient`;
  }
  static get goalAdd(): string {
    return `${this.baseUrl}/bip/goal/add`;
  }
  static get editNoteBcba(): string {
    return `${this.baseUrl}/note-bcba/edit`;
  }
  static get listNoteBcba(): string {
    return `${this.baseUrl}/note-bcba/listbyclient`;
  }

  //static get BillingList(): string {
  // `  return ${this.baseUrl}/billing/list`;
  // }
}
