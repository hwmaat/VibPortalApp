import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/ApiService.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { EuravibEditModel, EuravibImport } from '../../models/EuravibImport.interface';

export const MY_DATE_FORMATS = {
  parse: { dateInput: 'DD/MM/YYYY' },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'DD/MM/YYYY',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  standalone: true,
  selector: 'app-edit-euravib',
  templateUrl: './edit-euravib.component.html',
  styleUrls: ['./edit-euravib.component.scss'],
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
export class EditEuravibComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private api = inject(ApiService);
  private fb = inject(FormBuilder);

  //editForm!: FormGroup<{ [K in keyof Omit<EuravibImport, 'rowNum'>]: FormControl<EuravibImport[K] | null> }>;
  editForm!: FormGroup<{ [K in keyof EuravibEditModel]: FormControl<EuravibEditModel[K] | null> }>;
  suppl_Nr!: string;
  rev_Date!: string;
  dimset!: string;
  rowNum?: number = history.state?.rowNum;

  ngOnInit(): void {
    this.suppl_Nr = this.route.snapshot.paramMap.get('suppl_Nr')!;
    this.rev_Date = this.route.snapshot.paramMap.get('rev_Date')!;
    this.dimset = this.route.snapshot.paramMap.get('dimset')!;

    this.editForm = this.fb.group({
      suppl_Nr: this.fb.control(''),
      rev_Date: this.fb.control(''),
      dimset: this.fb.control(''),
      entry_Date: this.fb.control(''),
      user: this.fb.control(''),
      cas_Nr: this.fb.control(''),
      cas_Perc: this.fb.control(''),
      eg_Nr: this.fb.control(''),
      h_Nr: this.fb.control(''),
      h_Cat: this.fb.control(''),
      adr_Un_Nr: this.fb.control(''),
      adr_Cargo_Name: this.fb.control(''),
      adr_TransportHazard_Class: this.fb.control(''),
      adr_Packing_Group: this.fb.control(''),
      adr_Environment_Hazards: this.fb.control(''),
      adr_ExtraInfo: this.fb.control(''),
      imdg_Un_Nr: this.fb.control(''),
      imdg_Cargo_Name: this.fb.control(''),
      imdg_TransportHazard_Class: this.fb.control(''),
      imdg_Packing_Group: this.fb.control(''),
      imdg_Environment_Hazards: this.fb.control(''),
      imdg_ExtraInfo: this.fb.control(''),
      extraInfo_TunnelCode: this.fb.control(''),
      flashPoint: this.fb.control(''),
      ems_Fire: this.fb.control(''),
      ems_Spillage: this.fb.control('')
    });


    this.api.get<EuravibImport>(`euravib/${this.suppl_Nr}/${this.rev_Date}/${this.dimset}`).subscribe(record => {
      this.editForm.patchValue(record);
    });
 


  }

  save(): void {
    if (this.editForm.valid) {
      this.api.put(`euravib/${this.suppl_Nr}/${this.rev_Date}/${this.dimset}`, this.editForm.value).subscribe(() => {
        this.router.navigate(['/manage-euravib']);
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/manage-euravib']);
  }
}
