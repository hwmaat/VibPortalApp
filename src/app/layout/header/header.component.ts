import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Globals } from '../../services/globals.service';
import { map } from 'rxjs/operators';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { AutoOpenMenuComponent } from './auto-open-menu.component';

@Component({
  standalone: true,
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule,
    AutoOpenMenuComponent
  ]
})
export class HeaderComponent {
  private globals = inject(Globals);
  title$ = this.globals.settings$.pipe(map(s => s.title));



}