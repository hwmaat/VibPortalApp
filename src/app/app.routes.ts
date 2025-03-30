import { Routes } from '@angular/router';
import { UploadMsdsComponent } from './pages/upload-msds/upload-msds.component';
import { ManageMsdsComponent } from './pages/manage-msds/manage-msds.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', redirectTo: 'upload-msds', pathMatch: 'full' }, // 👈 Add this line
      { path: 'upload-msds', component: UploadMsdsComponent },
      { path: 'manage-msds', component: ManageMsdsComponent }
    ]
  }
];