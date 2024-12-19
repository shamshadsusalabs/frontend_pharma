import { Component, OnInit, ViewChild } from '@angular/core';
import { AdsService,  AdvertisementResponse } from '../../_Service/ads.service';  // Correct the path if needed
import { CommonModule } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { Advertisement, ConfirmAdsService } from '../../_Service/confirm-ads.service';
@Component({
  selector: 'app-ads-request',
  standalone: true,
  imports: [CommonModule,MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatIconModule,],
  templateUrl: './ads-request.component.html',
  styleUrls: ['./ads-request.component.css']  // Corrected 'styleUrl' to 'styleUrls'
})
export class AdsRequestComponent implements OnInit {
  displayedColumns: string[] = ['userName', 'userContactNumber', 'image1', 'image2', 'image3', 'image4','action'];  // Updated columns
  dataSource = new MatTableDataSource<any>([]);  // Data source for the table
  feedbackMessage: string = '';

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;

  constructor(private advertisementService: AdsService,private confirmAdsService:ConfirmAdsService) {}

  ngOnInit(): void {
    this.fetchAdvertisements();
  }

  fetchAdvertisements(): void {
    this.feedbackMessage = 'Loading advertisements...';
    this.advertisementService.getAdvertisements().subscribe(
      (response: any) => {
        console.log('Advertisements fetched successfully:', response);
        if (response.success && response.data.length > 0) {
          const advertisements = response.data[0].advertisements;
          const userInfo = {
            userName: response.data[0].userName,
            userContactNumber: response.data[0].userContactNumber,
            images: advertisements.map((ad: { imageUrl: any; position: any }) => ({
              imageUrl: ad.imageUrl,
              position: ad.position
            })) // Collecting both imageUrl and position
          };

          this.dataSource.data = [userInfo];
          console.log("scbshc",this.dataSource.data); // Set the user info and images as a single row
        } else {
          this.feedbackMessage = 'No advertisements available.';
        }
        this.feedbackMessage = '';  // Clear the loading message
      },
      (error) => {
        console.error('Error fetching advertisements:', error);
        this.feedbackMessage = 'There was an error fetching the advertisements. Please try again later.';
      }
    );
  }

  ngAfterViewInit() {
    if (this.paginator && this.sort) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase(); // Get the input value
    this.dataSource.filter = filterValue; // Set the filter value

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage(); // Reset to the first page if filter is applied
    }
  }


  logDetails(element: any): void {
    // Check if the user is attempting to replace an existing advertisement
    const userConfirmed = window.confirm('An advertisement already exists. Are you sure you want to replace it?');

    if (userConfirmed) {
      console.log('Advertisement Details:', element);

      // Call the create advertisement method from the service
      this.confirmAdsService.createAdvertisement(element).subscribe(
        (response) => {
          console.log('Advertisement created successfully:', response);
        },
        (error) => {
          console.error('Error creating advertisement:', error);
        }
      );
    } else {
      console.log('Advertisement creation cancelled.');
    }
  }
}
