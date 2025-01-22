import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth/auth.service';
import { AppUser, PatientV2 } from 'src/app/core/models';
import { AppRoutes } from 'src/app/shared/routes/routes';
import html2canvas from 'html2canvas';
import * as jspdf from 'jspdf';

@Component({
  selector: 'app-bip-profile-head',
  templateUrl: './bip-profile-head.component.html',
  styleUrls: ['./bip-profile-head.component.scss'],
})
export class BipProfileHeadComponent implements OnInit {
  @Input() contentToConvert: ElementRef;
  @Input() patient: PatientV2;
  routes = AppRoutes;
  user: AppUser;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.user = this.authService.user as AppUser;
  }

  isPermission(permission: string) {
    return (
      this.user.roles.includes('SUPERADMIN') ||
      this.user.roles.includes('ADMIN') ||
      this.user.permissions.includes(permission)
    );
  }

  onPrint() {
    window.print();
  }

  convertToPdf(): void {
    const data = this.contentToConvert.nativeElement;

    html2canvas(data).then((canvas) => {
      // Define necessary settings
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      // Create a new PDF document
      const pdf = new jspdf.jsPDF('p', 'mm');
      let position = 0;

      // Add image to PDF
      pdf.addImage(
        canvas.toDataURL('image/png'),
        'PNG',
        0,
        position,
        imgWidth,
        imgHeight
      );
      heightLeft -= pageHeight;

      pdf.addImage(
        canvas.toDataURL('image/jpg'),
        'JPG',
        0,
        position,
        imgWidth,
        imgHeight
      );
      heightLeft -= pageHeight;

      // Add additional pages if necessary
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(
          canvas.toDataURL('image/png'),
          'PNG',
          0,
          position,
          imgWidth,
          imgHeight
        );
        heightLeft -= pageHeight;
      }

      // Save the PDF
      const filename = `bip_${this.patient.patient_identifier}.pdf`;
      pdf.save(filename);
    });
  }
}
