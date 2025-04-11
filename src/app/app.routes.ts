import { Routes } from '@angular/router';
import { UploadMsdsComponent } from './pages/upload-msds/upload-msds.component';
import { ManageMsdsComponent } from './pages/manage-msds/manage-msds.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { EditMsdsComponent } from './pages/edit-msds/edit-msds.component';
import { HomeComponent } from './pages/home/home.component';
import { ManageEuravibComponent } from './pages/manage-euravib/manage-euravib.component';
import { EditEuravibComponent } from './pages/edit-euravib/edit-euravib.component';



export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'upload-msds', component: UploadMsdsComponent },
      { path: 'manage-msds', component: ManageMsdsComponent },
      { path: 'manage-euravib', component: ManageEuravibComponent },
      { path: 'edit-msds/:id', component: EditMsdsComponent },
      {path: 'edit-euravib/:suppl_Nr/:rev_Date/:dimset',
        loadComponent: () => import('./pages/edit-euravib/edit-euravib.component').then(m => m.EditEuravibComponent)},
      { path: 'zenya-search', loadComponent: () => import('./components/zenya-search/zenya-search.component').then(m => m.ZenyaSearchComponent)}
    ]
  }
];

