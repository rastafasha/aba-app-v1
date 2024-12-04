import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';
import { AppRoutes } from 'src/app/shared/routes/routes';
import { ClaimsService } from './claims.service';
import { Claim } from './models/claim.model';

@Component({
  selector: 'app-claims',
  templateUrl: './claims.component.html',
  styleUrls: ['./claims.component.scss']
})
export class ClaimsComponent implements OnInit {
  routes = AppRoutes;
  claims: Claim[] = [];
  isLoading = true;

  constructor(
    private location: Location,
    private claimsService: ClaimsService
  ) { }

  ngOnInit() {
    this.loadClaims();
  }

  loadClaims() {
    this.isLoading = true;
    this.claimsService.getAll().subscribe({
      next: (claims) => {
        this.claims = claims;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading claims:', error);
        this.isLoading = false;
      }
    });
  }

  downloadClaim(claim: Claim) {
    let { content, filename } = claim;
    if (!filename.endsWith('.dat') && !filename.endsWith('.txt')) {
      filename += '.dat';
    }
    const blob = new Blob([content], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
    link.remove();
  }

  sendClaim(claim: Claim) {
    this.claimsService.send(claim.id).subscribe({
      next: (response) => {
        Swal.fire('Success', `Claim sent successfully!`, 'success');
        console.log('Claim sent:', response);
        this.loadClaims();
      },
      error: (error) => {
        Swal.fire('Error', `Failed to send claim: ${error.message}`, 'error');
        console.error('Error sending claim:', error);
        this.loadClaims();
      }
    });
  }

  deleteClaim(claim: Claim) {
    this.claimsService.delete(claim.id).subscribe({
      next: (response) => {
        Swal.fire('Success', `Claim deleted successfully!`, 'success');
        console.log('Claim deleted:', response);
        this.loadClaims();
      },
      error: (error) => {
        Swal.fire('Error', `Failed to deleted claim: ${error.message}`, 'error');
        console.error('Error deleting claim:', error);
        this.loadClaims();
      }
    });
    
  }


  goBack() {
    this.location.back();
  }
}
