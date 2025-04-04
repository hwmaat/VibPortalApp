import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/ApiService.service';
import { VibImport } from '../../models/vibimport.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'DD/MM/YYYY',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  standalone: true,
  selector: 'app-edit-msds',
  templateUrl: './edit-msds.component.html',
  styleUrls: ['./edit-msds.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule
  ]
})
export class EditMsdsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private api = inject(ApiService);
  private fb = inject(FormBuilder);

  editForm!: FormGroup<{ [K in keyof VibImport]: FormControl<VibImport[K] | null> }>;
  id!: number;

  ngOnInit(): void {
    this.id = parseInt(this.route.snapshot.paramMap.get('id') || '0', 10);

    // Initialize empty form with default values
    this.editForm = this.fb.group({
      id: this.fb.control(0),
      supplierNr: this.fb.control(''),
      dimset: this.fb.control(''),
      entryDate: this.fb.control(''),
      revisionDate: this.fb.control(''),
      cas_Number: this.fb.control(''),
      cas_Percentages: this.fb.control(''),
      h_Number: this.fb.control(''),
      h_Cat: this.fb.control(''),
      adr_Un_Nr: this.fb.control(''),
      adr_CargoName: this.fb.control(''),
      adr_TransportHazardClass: this.fb.control(''),
      adr_PackagingGroup: this.fb.control(''),
      adr_EnvironmentHazards: this.fb.control(''),
      adr_ExtraInfo: this.fb.control(''),
      imdg_UnNumber: this.fb.control(''),
      imdg_CargoName: this.fb.control(''),
      imdg_TransportHazardClass: this.fb.control(''),
      imdg_PackagingGroup: this.fb.control(''),
      imdg_EnvironmentHazards: this.fb.control(''),
      imdg_ExtraInfo: this.fb.control(''),
      extraInfoTunnelCode: this.fb.control(''),
      flashPoint: this.fb.control(''),
      ems_Fire: this.fb.control(''),
      ems_Spillage: this.fb.control(''),
      userName: this.fb.control(''),
      egNumber: this.fb.control(''),
      status: this.fb.control('')
    });

    this.api.get<VibImport>(`managemsds/${this.id}`).subscribe(record => {
      this.editForm.setValue(record);
    });
  }

  save(): void {
    if (this.editForm.valid) {
      this.api.put(`managemsds/${this.id}`, this.editForm.value).subscribe(() => {
        this.router.navigate(['/manage-msds'], {
          queryParams: { selectedId: this.id }
        });
      });
    }
  }
  cancel(): void {
    this.router.navigate(['/manage-msds'], {
      queryParams: { selectedId: this.id }
    });
  }
  
}
