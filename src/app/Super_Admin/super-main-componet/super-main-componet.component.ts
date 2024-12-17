import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { OrderService } from '../../_Service/order.service';
import { RouterLink } from '@angular/router';
import { DiscountService } from '../../_Service/discount.service';
import { ProfileCount, RegisterService } from '../../_Service/register.service';
import { CampaignUserService, TotalUsersResponse } from '../../_Service/campaign-user.service';
@Component({
  selector: 'app-super-main-componet',
  standalone: true,
  imports: [MatIconModule,
    MatButtonModule,
    MatCardModule,RouterLink],
  templateUrl: './super-main-componet.component.html',
  styleUrl: './super-main-componet.component.css'
})
export class SuperMainComponetComponent {
  storeCount: ProfileCount | undefined;
  distributorCount: ProfileCount | undefined;
  brandCount: ProfileCount | undefined;
  totalUsersResponse: TotalUsersResponse | undefined

  constructor(private profileCountService:  RegisterService,private  campaignUserService: CampaignUserService) {}

  ngOnInit(): void {
    this.profileCountService.getStoreCount().subscribe((data) => {
      this.storeCount = data;
    });

    this.profileCountService.getDistributorCount().subscribe((data) => {
      this.distributorCount = data;
    });

    this.profileCountService.getBrandCount().subscribe((data) => {
      this.brandCount = data;
    });
this.getTotalUsers();

  }




  getTotalUsers(): void {
    this. campaignUserService.getTotalUsers().subscribe(
      (response: TotalUsersResponse) => {
        this.totalUsersResponse = response;
      },
      (error) => {
        console.error('Error fetching total users:', error);
      }
    );
  }
}
