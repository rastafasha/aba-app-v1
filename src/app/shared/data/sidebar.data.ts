import { AppRoutes } from '../routes/routes';

export const sidebar = [
  {
    tittle: 'Main',
    showAsTab: false,
    separateRoute: false,
    menu: [
      {
        menuValue: 'Dashboard',
        hasSubRoute: true,
        showSubRoute: false,
        base: AppRoutes.dashboard.dashboard,
        route: AppRoutes.dashboard.dashboard,
        img: 'assets/img/icons/menu-icon-01.svg',
        subMenus: [
          {
            menuValue: 'Admin Dashboard',
            route: AppRoutes.dashboard.admin,
            base: AppRoutes.dashboard.dashboard,
            permision: 'admin_dashboard',
            show_nav: true,
          },
          // {
          //   menuValue: 'Staff Dashboard',
          //   route: AppRoutes.dashboard.doctor,
          //   base: AppRoutes.dashboard.dashboard,
          //   permision: 'doctor_dashboard',
          //   show_nav: true,
          // },
          // {
          //   menuValue: 'Client Dashboard',
          //   route: AppRoutes.dashboard.patient,
          //   base: AppRoutes.dashboard.dashboard,
          //   permision: 'client_dashboard',
          //   show_nav: true,
          // },
        ],
      },
      {
        menuValue: 'Roles',
        hasSubRoute: true,
        showSubRoute: false,
        base: AppRoutes.roles.roles,
        icon: 'fa-columns',
        faIcon: true,
        subMenus: [
          {
            menuValue: 'Register Role',
            route: AppRoutes.roles.register,
            base: AppRoutes.roles.roles,
            permision: 'register_rol',
            show_nav: true,
          },
          {
            menuValue: 'List Roles',
            route: AppRoutes.roles.list,
            base: AppRoutes.roles.roles,
            permision: 'list_rol',
            show_nav: true,
          },
        ],
      },

      {
        menuValue: 'Employees',
        hasSubRoute: true,
        showSubRoute: false,
        base: AppRoutes.doctors.doctors,
        img: 'assets/img/icons/menu-icon-02.svg',
        subMenus: [
          {
            menuValue: 'Employees List',
            route: AppRoutes.doctors.list,
            base: AppRoutes.doctors.doctors,
            permision: 'list_employers',
            show_nav: true,
          },
          {
            menuValue: 'Add Employe',
            route: AppRoutes.doctors.add,
            base: AppRoutes.doctors.doctors,
            permision: 'register_employer',
            show_nav: true,
          },
          {
            menuValue: 'Edit Employe (role)',
            // route: routes.editDoctor,
            // base: routes.editDoctor,
            route: '',
            base: '',
            permision: 'edit_employer',
            show_nav: false,
          },
          {
            menuValue: 'Employe Profile (role)',
            // route: routes.doctorProfile,
            // base: routes.doctorProfile,
            route: '',
            base: '',
            permision: 'register_employer',
            show_nav: false,
          },
          {
            menuValue: 'Delete Employe (role)',
            // route: routes.doctorProfile,
            // base: routes.doctorProfile,
            route: '',
            base: '',
            permision: 'delete_employer',
            show_nav: false,
          },
        ],
      },
      {
        menuValue: 'Clients',
        hasSubRoute: true,
        showSubRoute: false,
        base: AppRoutes.patients.patients,
        img: 'assets/img/icons/menu-icon-03.svg',
        subMenus: [
          {
            menuValue: 'Clients List',
            route: AppRoutes.patients.list,
            base: AppRoutes.patients.patients,
            permision: 'list_patient',
            show_nav: true,
          },
          {
            menuValue: 'WS',
            route: AppRoutes.patients.logReport,
            base: AppRoutes.patients.patients,
            permision: 'list_patient_log_report',
            show_nav: true,
          },
          {
            menuValue: 'Edit Client (role)',
            // route: routes.patient.list,
            // base: routes.patient.list,
            route: '',
            base: '',
            permision: 'edit_patient',
            show_nav: false,
          },
          {
            menuValue: 'Add Clients',
            route: AppRoutes.patients.add,
            base: AppRoutes.patients.patients,
            permision: 'register_patient',
            show_nav: true,
          },
        ],
      },
      {
        menuValue: 'Insurance',
        hasSubRoute: true,
        showSubRoute: false,
        base: AppRoutes.insurance.insurance,
        img: 'assets/img/icons/menu-icon-03.svg',
        subMenus: [
          {
            menuValue: 'Insurance List',
            route: AppRoutes.insurance.list,
            base: AppRoutes.insurance.insurance,
            permision: 'list_insurance',
            show_nav: true,
          },
          {
            menuValue: 'Add Insurance',
            route: AppRoutes.insurance.add,
            base: AppRoutes.insurance.insurance,
            permision: 'register_insurance',
            show_nav: true,
          },
        ],
      },
      {
        menuValue: 'Location',
        hasSubRoute: true,
        showSubRoute: false,
        base: AppRoutes.location.location,
        img: 'assets/img/icons/menu-icon-03.svg',
        subMenus: [
          {
            menuValue: 'Location List',
            route: AppRoutes.location.list,
            base: AppRoutes.location.location,
            permision: 'list_location',
            show_nav: true,
          },
          // {
          //   menuValue: 'Add Location',
          //   route: AppRoutes.location.register,
          //   base: AppRoutes.location.location,
          //   permision: 'register_location',
          //   show_nav: false,
          // },
          // {
          //   menuValue: 'Edit Location ',
          //   // route: routes.auth.registerLocation,
          //   // base: routes.auth.registerLocation,
          //   permision: 'edit_location',
          //   show_nav: false,
          // },
        ],
      },
      {
        menuValue: 'Reports',
        hasSubRoute: true,
        showSubRoute: false,
        base: 'reports',
        img: 'assets/img/icons/menu-icon-02.svg',
        subMenus: [
          {
            menuValue: 'Logs',
            route: AppRoutes.reports.logs,
            base: AppRoutes.reports.reports,
          },
        ],
      },
      // {
      //   menuValue: 'Bip (Roles)',
      //   hasSubRoute: true,
      //   showSubRoute: false,
      //   base: AppRoutes.bip.bip,
      //   img: 'assets/img/icons/menu-icon-03.svg',
      //   show_nav: false,
      //   subMenus: [
      //     {
      //       menuValue: 'Bip List',
      //       // route: AppRoutes.bip.list,
      //       // base: AppRoutes.bip.list,
      //       route: '',
      //       base: '',
      //       permision: 'list_bip',
      //       show_nav: false,
      //     },
      //     {
      //       menuValue: 'Bip Add',
      //       // route: AppRoutes.bip.register,
      //       // base: AppRoutes.bip.register,
      //       route: '',
      //       base: '',
      //       permision: 'register_bip',
      //       show_nav: false,
      //     },
      //     {
      //       menuValue: 'Bip Edit',
      //       // route: routes.editBip,
      //       // base: routes.editBip,
      //       route: '',
      //       base: '',
      //       permision: 'edit_bip',
      //       show_nav: false,
      //     },
      //     {
      //       menuValue: 'View Bip',
      //       // route: routes.editBip,
      //       // base: routes.editBip,
      //       route: '',
      //       base: '',
      //       permision: 'view_bip',
      //       show_nav: false,
      //     },
      //   ],
      // },
      // {
      //   menuValue: 'Note Rbt (Roles)',
      //   hasSubRoute: true,
      //   showSubRoute: false,
      //   base: AppRoutes.noteRbt.noteRbt,
      //   img: 'assets/img/icons/menu-icon-03.svg',
      //   show_nav: false,
      //   subMenus: [
      //     {
      //       menuValue: 'Note Rbt List',
      //       route: AppRoutes.noteRbt.list,
      //       base: AppRoutes.noteRbt.list,
      //       // route: '',
      //       // base: '',
      //       permision: 'list_noterbt',
      //       show_nav: false,
      //     },
      //     {
      //       menuValue: 'Note Rbt Add',
      //       route: AppRoutes.noteRbt.add,
      //       base: AppRoutes.noteRbt.add,
      //       // route: '',
      //       // base: '',
      //       permision: 'register_noterbt',
      //       show_nav: false,
      //     },
      //     {
      //       menuValue: 'Note Rbt Edit',
      //       route: AppRoutes.noteRbt.edit,
      //       base: AppRoutes.noteRbt.edit,
      //       // route: '',
      //       // base: '',
      //       permision: 'edit_noterbt',
      //       show_nav: false,
      //     },
      //     {
      //       menuValue: 'View Note Rbt',
      //       route: AppRoutes.noteRbt.view,
      //       base: AppRoutes.noteRbt.view,
      //       // route: '',
      //       // base: '',
      //       permision: 'view_noterbt',
      //       show_nav: false,
      //     },
      //     {
      //       menuValue: 'Delete Note Rbt',
      //       // route: routes.editBip,
      //       // base: routes.editBip,
      //       route: '',
      //       base: '',
      //       permision: 'delete_noterbt',
      //       show_nav: false,
      //     },
      //   ],
      // },
      // {
      //   menuValue: 'Note BCBA (Roles)',
      //   hasSubRoute: true,
      //   showSubRoute: false,
      //   base: AppRoutes.noteBcba.noteBcba,
      //   img: 'assets/img/icons/menu-icon-03.svg',
      //   show_nav: false,
      //   subMenus: [
      //     {
      //       menuValue: 'Note BCBA List',
      //       route: AppRoutes.noteBcba.list,
      //       base: AppRoutes.noteBcba.list,
      //       permision: 'list_notebcba',
      //       show_nav: false,
      //     },
      //     {
      //       menuValue: 'Note BCBA Add',
      //       route: AppRoutes.noteBcba.add,
      //       base: AppRoutes.noteBcba.add,
      //       // route: '',
      //       // base: '',
      //       permision: 'register_notebcba',
      //       show_nav: false,
      //     },
      //     {
      //       menuValue: 'Note BCBA Edit',
      //       route: AppRoutes.noteBcba.edit,
      //       base: AppRoutes.noteBcba.edit,
      //       // route: '',
      //       // base: '',
      //       permision: 'edit_notebcba',
      //       show_nav: false,
      //     },
      //     {
      //       menuValue: 'View Note BCBA',
      //       // route: routes.editBip,
      //       // base: routes.editBip,
      //       route: '',
      //       base: '',
      //       permision: 'view_notebcba',
      //       show_nav: false,
      //     },
      //     {
      //       menuValue: 'Delete Note BCBA',
      //       // route: routes.editBip,
      //       // base: routes.editBip,
      //       route: '',
      //       base: '',
      //       permision: 'delete_notebcba',
      //       show_nav: false,
      //     },
      //   ],
      // },
      // {
      //   menuValue: 'Billing',
      //   hasSubRoute: true,
      //   showSubRoute: false,
      //   base: 'billing',
      //   img: 'assets/img/icons/menu-icon-03.svg',
      //   subMenus: [
      //     {
      //       menuValue: 'Billing List',
      //       route: routes.BillingList,
      //       base: routes.BillingList,
      //       permision: 'list_billing',
      //       show_nav: true,
      //     },
      //   ],
      // },

      // {
      //   menuValue: 'Staff',
      //   hasSubRoute: true,
      //   showSubRoute: false,
      //   base: 'staff',
      //   img: 'assets/img/icons/menu-icon-08.svg',
      //   subMenus: [
      //     {
      //       menuValue: 'Staff List',
      //       route: routes.staffList,
      //       base: routes.staffList,
      //     },
      //     {
      //       menuValue: 'Add Staff',
      //       route: routes.addStaff,
      //       base: routes.addStaff,
      //     },
      //     {
      //       menuValue: 'Staff Profile',
      //       route: routes.staffProfile,
      //       base: routes.staffProfile,
      //     },
      //     {
      //       menuValue: 'Leaves',
      //       route: routes.staffLeave,
      //       base: routes.staffLeave,
      //     },
      //     {
      //       menuValue: 'Holidays',
      //       route: routes.staffHoliday,
      //       base: routes.staffHoliday,
      //     },
      //     {
      //       menuValue: 'Attendance',
      //       route: routes.staffAttendance,
      //       base: routes.staffAttendance,
      //     },
      //   ],
      // },
      // {
      //   menuValue: 'Appointments',
      //   hasSubRoute: true,
      //   showSubRoute: false,
      //   base: 'appointments',
      //   img: 'assets/img/icons/menu-icon-04.svg',
      //   subMenus: [
      //     {
      //       menuValue: 'Appointment List',
      //       route: routes.appointments.list,
      //       base: routes.appointments.list,
      //     },
      //     {
      //       menuValue: 'Book Appointment',
      //       route: routes.addAppointment,
      //       base: routes.addAppointment,
      //     },
      //     {
      //       menuValue: 'Edit Appointment',
      //       route: routes.editAppointment,
      //       base: routes.editAppointment,
      //     },
      //   ],
      // },
      // {
      //   menuValue: 'Doctor Schedule',
      //   hasSubRoute: true,
      //   showSubRoute: false,
      //   base: 'doctor-schedule',
      //   img: 'assets/img/icons/menu-icon-05.svg',
      //   subMenus: [
      //     {
      //       menuValue: 'Schedule List',
      //       route: routes.doctorSchedule.schedule,
      //       base: routes.doctorSchedule.schedule,
      //     },
      //     {
      //       menuValue: 'Book Appointment',
      //       route: routes.addSchedule,
      //       base: routes.addSchedule,
      //     },
      //     {
      //       menuValue: 'Edit Appointment',
      //       route: routes.editSchedule,
      //       base: routes.editSchedule,
      //     },
      //   ],
      // },
      // {
      //   menuValue: 'Departments',
      //   hasSubRoute: true,
      //   showSubRoute: false,
      //   base: 'departments',
      //   img: 'assets/img/icons/menu-icon-06.svg',
      //   subMenus: [
      //     {
      //       menuValue: 'Department List',
      //       route: routes.specialities.list,
      //       base: routes.specialities.list,
      //     },
      //     {
      //       menuValue: 'Add Department',
      //       route: routes.addDepartment,
      //       base: routes.addDepartment,
      //     },
      //     {
      //       menuValue: 'Edit Department',
      //       route: routes.editDepartment,
      //       base: routes.editDepartment,
      //     },
      //   ],
      // },
      // {
      //   menuValue: 'Accounts',
      //   hasSubRoute: true,
      //   showSubRoute: false,
      //   base: 'accounts',
      //   img: 'assets/img/icons/menu-icon-07.svg',
      //   subMenus: [
      //     {
      //       menuValue: 'Invoices',
      //       route: routes.accounts.invoices,
      //       base: routes.accounts.invoices,
      //     },
      //     {
      //       menuValue: 'Payments',
      //       route: routes.accounts.payments,
      //       base: routes.accounts.payments,
      //     },
      //     {
      //       menuValue: 'Expenses',
      //       route: routes.expenses,
      //       base: routes.expenses,
      //     },
      //     {
      //       menuValue: 'Taxes',
      //       route: routes.taxes,
      //       base: routes.taxes,
      //     },
      //     {
      //       menuValue: 'Provident Fund',
      //       route: routes.accounts.providentFund,
      //       base: routes.accounts.providentFund,
      //     },
      //   ],
      // },

      // {
      //   menuValue: 'Chat',
      //   route: routes.chat,
      //   hasSubRoute: false,
      //   showSubRoute: false,
      //   base: 'chat',
      //   img: 'assets/img/icons/menu-icon-10.svg',
      //   subMenus: [],
      // },
      // {
      //   menuValue: 'Call',
      //   hasSubRoute: true,
      //   showSubRoute: false,
      //   base: 'calls',
      //   img: 'assets/img/icons/menu-icon-11.svg',
      //   subMenus: [
      //     {
      //       menuValue: 'Voice Call',
      //       route: routes.calls.voice,
      //       base: routes.calls.voice,
      //     },
      //     {
      //       menuValue: 'Video Call',
      //       route: routes.calls.video,
      //       base: routes.calls.video,
      //     },
      //     {
      //       menuValue: 'Incoming Call',
      //       route: routes.incomingCall,
      //       base: routes.incomingCall,
      //     },
      //   ],
      // },
      // {
      //   menuValue: 'Email',
      //   hasSubRoute: true,
      //   showSubRoute: false,
      //   base: 'email',
      //   img: 'assets/img/icons/menu-icon-12.svg',
      //   subMenus: [
      //     {
      //       menuValue: 'Compose Mail',
      //       route: routes.email.compose,
      //       base: routes.email.compose,
      //     },
      //     {
      //       menuValue: 'Inbox',
      //       route: routes.email.inbox,
      //       base: routes.email.inbox,
      //     },
      //     {
      //       menuValue: 'Mail View',
      //       route: routes.mailView,
      //       base: routes.mailView,
      //     },
      //   ],
      // },
      // {
      //   menuValue: 'Blog',
      //   hasSubRoute: true,
      //   showSubRoute: false,
      //   base: 'blogs',
      //   img: 'assets/img/icons/menu-icon-13.svg',
      //   subMenus: [
      //     {
      //       menuValue: 'Blog',
      //       route: routes.blog,
      //       base: routes.blog,
      //     },
      //     {
      //       menuValue: 'Blog View',
      //       route: routes.blogDetails,
      //       base: routes.blogDetails,
      //     },
      //     {
      //       menuValue: 'Add Blog',
      //       route: routes.addBlog,
      //       base: routes.addBlog,
      //     },
      //     {
      //       menuValue: 'Edit Blog',
      //       route: routes.editBlog,
      //       base: routes.editBlog,
      //     },
      //   ],
      // },
      // {
      //   menuValue: 'Assets',
      //   route: routes.assets.list,
      //   hasSubRoute: false,
      //   showSubRoute: false,
      //   icon: 'fa-cube',
      //   faIcon: true,
      //   base: 'assets',
      //   subMenus: [],
      // },
      // {
      //   menuValue: 'activities',
      //   route: routes.activities,
      //   hasSubRoute: false,
      //   showSubRoute: false,
      //   img: 'assets/img/icons/menu-icon-14.svg',
      //   base: 'activities',
      //   subMenus: [],
      // },
      // {
      //   menuValue: 'Reports',
      //   hasSubRoute: true,
      //   showSubRoute: false,
      //   base: 'reports',
      //   img: 'assets/img/icons/menu-icon-02.svg',
      //   subMenus: [
      //     {
      //       menuValue: 'Expense Report',
      //       route: routes.expenseReports,
      //       base: routes.expenseReports,
      //     },
      //     {
      //       menuValue: 'Invoice Report',
      //       route: routes.invoiceReports,
      //       base: routes.invoiceReports,
      //     },
      //   ],
      // },
      // {
      //   menuValue: 'Invoice',
      //   hasSubRoute: true,
      //   showSubRoute: false,
      //   base: 'invoice',
      //   img: 'assets/img/icons/menu-icon-15.svg',
      //   subMenus: [
      //     {
      //       menuValue: 'Invoices List',
      //       route: routes.invoice.all,
      //       base: routes.invoice.all,
      //     },
      //     {
      //       menuValue: 'Invoice Grid',
      //       route: routes.invoice.grid,
      //       base: routes.invoice.grid,
      //     },
      //     {
      //       menuValue: 'Add Invoices',
      //       route: routes.invoice.add,
      //       base: routes.invoice.add,
      //     },
      //     {
      //       menuValue: 'Edit Invoices',
      //       route: routes.invoices.edit,
      //       base: routes.invoices.edit,
      //     },
      //     {
      //       menuValue: 'Invoices Details',
      //       route: routes.invoice.view,
      //       base: routes.invoice.view,
      //     },
      //     {
      //       menuValue: 'Invoices Settings',
      //       route: routes.invoice.settings,
      //       base: routes.invoice.settings,
      //     },
      //   ],
      // },
      // {
      //   menuValue: 'Settings',
      //   route: routes.settings,
      //   hasSubRoute: false,
      //   showSubRoute: false,
      //   img: 'assets/img/icons/menu-icon-16.svg',
      //   base: 'settings',
      //   subMenus: [],
      // },
      {
        menuValue: 'Claims',
        route: AppRoutes.claims.claims,
        hasSubRoute: false,
        showSubRoute: false,
        img: 'assets/img/icons/menu-icon-16.svg',
        base: AppRoutes.claims.claims,
        subMenus: [],
      }
    ],
  },
];
