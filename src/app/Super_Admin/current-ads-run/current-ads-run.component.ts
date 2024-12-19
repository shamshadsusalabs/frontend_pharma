import { Component } from '@angular/core';
import { Advertisement, ConfirmAdsService } from '../../_Service/confirm-ads.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-current-ads-run',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './current-ads-run.component.html',
  styleUrl: './current-ads-run.component.css'
})
export class CurrentAdsRunComponent {
  advertisements: Advertisement[] = [];

  constructor(private advertisementService: ConfirmAdsService) {}

  ngOnInit(): void {
    this.advertisementService.getAllAdvertisements().subscribe(
      (response: any) => {
        if (Array.isArray(response.advertisements)) {
          this.advertisements = response.advertisements; // Correctly access the advertisements array
        } else {
          console.error('Advertisements data is not in the correct format.');
        }
      },
      (error) => {
        console.error('Error fetching advertisements:', error);
      }
    );
  }


}
