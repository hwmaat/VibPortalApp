import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Globals } from '../../services/globals.service';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [CommonModule, AsyncPipe, NgIf]
})
export class HomeComponent {
  settings$ = inject(Globals).settings$;
}
