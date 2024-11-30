import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-distributor-main-component',
  standalone: true,
  imports: [MatIconModule,
    MatButtonModule,
    MatCardModule,],
  templateUrl: './distributor-main-component.component.html',
  styleUrl: './distributor-main-component.component.css'
})
export class DistributorMainComponentComponent {

}
