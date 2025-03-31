import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-auto-open-menu',
  template: `
    <div class="app-nav-item" [matMenuTriggerFor]="menu" #menuTrigger="matMenuTrigger"
        (mouseenter)="mouseEnter(menuTrigger)"
        (mouseleave)="mouseLeave(menuTrigger)">
      <ng-content select="[trigger]"></ng-content>
    </div>

    <mat-menu #menu="matMenu" [hasBackdrop]="false">
      <div (mouseenter)="mouseEnter(menuTrigger)" (mouseleave)="mouseLeave(menuTrigger)">
        <ng-content select="[content]"></ng-content>
      </div>
    </mat-menu>
  `,
  standalone: true,
  imports: [    MatToolbarModule,
    MatMenuModule,
    MatButtonModule]
})
export class AutoOpenMenuComponent {
  timedOutCloser: any;

  mouseEnter(trigger: any): void {
    if (this.timedOutCloser) {
      clearTimeout(this.timedOutCloser);
    }
    trigger.openMenu();
  }

  mouseLeave(trigger: any): void {
    this.timedOutCloser = setTimeout(() => {
      trigger.closeMenu();
    }, 100); // Slight delay to allow smooth transitions
  }
}
