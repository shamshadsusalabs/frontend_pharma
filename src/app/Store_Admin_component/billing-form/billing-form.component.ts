import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatGridListModule } from '@angular/material/grid-list';
import { StoreBillingService } from '../../_Service/store-billing.service';
import { StoreService } from '../../_Service/store.service';
import { ToastrService } from 'ngx-toastr';
import { FileService } from '../../_Service/file.service';
import { CommonModule } from '@angular/common';
import { Patient, PatientService } from '../../_Service/patient.service';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
@Component({
  selector: 'app-billing-form',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatIconModule,
    MatInputModule,
    MatGridListModule,
    ReactiveFormsModule,
    FormsModule,CommonModule
  ],
  templateUrl: './billing-form.component.html',
  styleUrls: ['./billing-form.component.css']
})
export class BillingFormComponent implements OnInit {
  billingForm!: FormGroup;
  displayedColumns: string[] = [
    'drugName',
    'drugCode',
    'strip',
    'quantity',
    'mrp',
    'amount',
  ];
  dataSource!: MatTableDataSource<any>;
  filteredDrugs: any[] = [];
  filteredDrugsCode: any[] = [];
  filteredDrugsCodestrip:any[]=[];
  selectedDrug: any = null;
  constructor(private fb: FormBuilder,
    private storeBillingService : StoreBillingService,
    private  storeService: StoreService,
    private toastr: ToastrService ,
    private fileService:FileService,
    private patientService:PatientService,
    private cdr: ChangeDetectorRef// Toastr service

  ) {}

  ngOnInit(): void {
    this.billingForm = this.fb.group({
      ContactNumber: ['',Validators.required],
      patientName: [''],
      doctorName: [''],
      AdharCardNumber: ['',Validators.required],
      date: [''],
      address: [''],

      gst: [18], // Default GST is 18%
      discount: [0], // Default discount is 0%
      totalAmount: [],
      paymentMode: ['Cash'],/// Readonly total amount
      rows: this.fb.array([]), // Table rows
    });


    this.billingForm.get('ContactNumber')?.valueChanges.pipe(
      debounceTime(300), // Add a slight delay to avoid too many API calls
      distinctUntilChanged(), // Only call API if value changes
      switchMap((contactNumber: string) => {
        if (contactNumber.length === 10) {
          return this.getPatientData(contactNumber); // Call the new function
        }
        return new Observable(); // Return empty observable if length is not 10
      })
    ).subscribe((response: any) => {
      console.log('Fetched patient data:', response);
      if (response?.patient) {
        this.billingForm.patchValue({
          patientName: response.patient.patientName          ,
          doctorName: response.patient.doctorName,
          AdharCardNumber: response.patient.AdharCardNumber,
          address: response.patient.address,
          date: new Date().toISOString().split('T')[0]

        });
      }
    });



    // Subscribe to the gst and discount fields to automatically trigger calculation
    this.billingForm.get('gst')?.valueChanges.subscribe(() => {
      this.calculateTotalAmount();
    });

    this.billingForm.get('discount')?.valueChanges.subscribe(() => {
      this.calculateTotalAmount();
    });

    this.dataSource = new MatTableDataSource(this.rows.controls);
    this.initializeRows();
    this.calculateTotalAmount();
  }

  getPatientData(contactNumber: string): Observable<{ patient: Patient }> {
    return this.patientService.getPatientByContactNumber(contactNumber); // Call the service method to fetch patient data
  }

  get rows(): FormArray {
    return this.billingForm.get('rows') as FormArray;
  }


 onDrugNameInput(event: any, i: number): void {
    const searchCriteria = event.target.value.trim();
    console.log("Search Criteria:", searchCriteria); // Log the search criteria entered by the user

    if (searchCriteria.length >= 3) {
      this.storeService.getDrugs([searchCriteria]).subscribe((response: any) => {
     // Log the full API response

        // Ensure that the response.drugs is assigned to filteredDrugs
        this.filteredDrugs = response.drugs || [];  // Fallback to an empty array if drugs is not found

        // Log the filteredDrugs after assignment
      });
    } else {
      this.filteredDrugs = [];
    }
  }

  currentRowIndex: number | null = null;
  onDrugFocus(index: number): void {
    this.currentRowIndex = index;

  }

  onDrugSelect(drug: any): void {
    const index = this.currentRowIndex; // Use the focused row index
    if (index === null) {
      console.error('No row focused for drug selection!');
      return;
    }



    // Check for duplicate drug
    const isDuplicate = this.rows.controls.some((row, i) => {

      return row.get('drugCode')?.value === drug.drugCode && i !== index;
    });

    console.log('Is Duplicate:', isDuplicate);

    if (isDuplicate) {

      this.toastr.error('This drug is already selected in another row!', 'Duplicate Entry');
      return;
    }

    // Correctly update the row at the tracked index
    const row = this.rows.at(index); // Ensure the index is correct
    if (row) {


      row.patchValue({
        drugName: drug.drugName,
        drugCode: drug.drugCode,
        mrp: drug.perStripPrice,
      });


      this.filteredDrugsCodestrip.push(...this.filteredDrugs);
    } else {

    }

    // Clear filtered drugs
    this.filteredDrugs = [];

  }




  onDrugNameInputcode(event: any, i: number): void {
    const searchCriteria = event.target.value.trim();
    // Log the search criteria entered by the user

    if (searchCriteria.length >= 3) {
      this.storeService.getDrugs([searchCriteria]).subscribe((response: any) => {
       // Log the full API response

        // Ensure that the response.drugs is assigned to filteredDrugs
        this.filteredDrugsCode = response.drugs || [];  // Fallback to an empty array if drugs is not found

      });
    } else {
      this.filteredDrugsCode = [];
    }
  }


  onStripsChange(index: number): void {


    const row = this.rows.at(index) as FormGroup;

    const strips = +row.get('strip')?.value || 0;


    const drugCode = row.get('drugCode')?.value;


    const matchingDrug = this.filteredDrugsCodestrip.find(drug => drug.drugCode === drugCode);


    if (matchingDrug) {
      const perStripQuantity = matchingDrug.perStripQuantity || 0;


      const quantity = strips * perStripQuantity;


      row.get('quantity')?.setValue(quantity, { emitEvent: false });


      this.cdr.detectChanges();


      this.onQuantityOrMrpChange(row);


      this.filteredDrugsCodestrip = [];
    } else {
      row.get('quantity')?.setValue(0, { emitEvent: false });


      this.cdr.detectChanges();

    }
  }







  onQuantityOrMrpChange(row: FormGroup): void {
    const quantity = row.get('quantity')?.value || 0;
   // Log the updated quantity
    const mrp = row.get('mrp')?.value || 0;
    const amount = quantity * mrp;
    row.get('amount')?.setValue(amount, { emitEvent: false });
    this.calculateTotalAmount();
  }

  currentRowIndexcode: number | null = null;
  onDrugFocuscode(index: number): void {
    this.currentRowIndexcode = index;

  }

  onDrugSelectcode(drug: any): void {
    const index = this.currentRowIndexcode;
    if (index === null) {

      return;
    }

    const row = this.rows.at(index);
    if (row) {
      row.patchValue({
        drugName: drug.drugName,
        drugCode: drug.drugCode,
        mrp: drug.perStripPrice,
        strips: 0, // Reset strips field
        quantity: 0, // Reset quantity field
      });
    }
    this.filteredDrugsCodestrip.push(...this.filteredDrugs);

    this.filteredDrugsCode = []; // Clear filtered drugs
  }



  createRow(): FormGroup {
    return this.fb.group({
      drugName: [''],
      drugCode: [''],
      strip:[],
      quantity: [0, Validators.required],
      mrp: [0, Validators.required],
      amount: [0, Validators.required],
    });


  }

  initializeRows(): void {
    for (let i = 0; i < 20; i++) {
      this.rows.push(this.createRow());
    }
    this.dataSource.data = this.rows.controls;
  }



  calculateTotalAmount(): void {
    let totalAmount = 0;

    this.rows.controls.forEach((row) => {
      const amount = row.get('amount')?.value || 0;
      totalAmount += amount;
    });

    const gstPercentage = this.billingForm.get('gst')?.value || 0;
    const discountPercentage = this.billingForm.get('discount')?.value || 0;

    const gstAmount = (totalAmount * gstPercentage) / 100;
    const discountAmount = (totalAmount * discountPercentage) / 100;

    const finalAmount = totalAmount + gstAmount - discountAmount;

    this.billingForm.get('totalAmount')?.setValue(finalAmount, {
      emitEvent: false,
    });
  }

  onFieldChange(): void {
    this.calculateTotalAmount();
  }




  onSubmitCustomer(): void {
    // Manually extract only the required form fields
    const formData: Patient = {
      patientName: this.billingForm.value.patientName,
      doctorName: this.billingForm.value.doctorName,
      AdharCardNumber: this.billingForm.value.AdharCardNumber,
      address: this.billingForm.value.address,
      ContactNumber: this.billingForm.value.ContactNumber
    };

  // Log the form data to the console

    // Call the createPatient service to save the data
    this.patientService.createPatient(formData).subscribe(
      (response) => {
      // Display the success message from the backend
        console.log(response);
      },
      (error) => {
      // Display error message from the backend
        console.error(error);
      }
    );
  }






  onSubmit(): void {
    const formValues = this.billingForm.value;

    // Retrieve user object from local storage and extract the _id
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const userId = user._id || ''; // Ensure it’s a string or empty if not found

    // Filter out empty rows from the 'rows' array
    const filteredRows = formValues.rows.filter(
      (row: { drugName: any; drugCode: any; strip: number; quantity: number; mrp: number }) =>
        row.drugName && row.drugCode && row.quantity > 0 && row.mrp > 0
    );

    // Prepare data for updateDrugStock service
    const stockUpdates = filteredRows.map((row: { drugCode: string; quantity: number; strip?: number }) => {
      const stockUpdate: { drugCode: string; quantity: number; strip?: number } = {
        drugCode: row.drugCode,
        quantity: row.quantity,
      };

      // Include strip only if it's provided or has a value greater than zero
      if (row.strip !== undefined && row.strip > 0) {
        stockUpdate.strip = row.strip;
      }

      return stockUpdate;
    });

    formValues.rows = filteredRows;
    formValues.userId = userId;

    // Step 1: Call createBilling service
    this.storeBillingService.createBilling(formValues).subscribe(
      (billingResponse) => {
        this.toastr.success('Billing created successfully!', 'Success'); // Success message

        // Step 2: Call updateDrugStock service
        this.storeService.updateDrugStock(stockUpdates).subscribe(
          (updateResponse) => {
            this.onSubmitCustomer()
            this.FileSaver();
            this.toastr.success('Stock updated successfully!', 'Success'); // Success message
              //  this.resetForm(); // Reset form after success
          },
          (updateError) => {
            this.toastr.error('Error updating stock.', 'Something went wrong'); // Error message
          }
        );
      },
      (billingError) => {
        this.toastr.error('Error creating billing.', 'Something went wrong'); // Error message
      }
    );
  }

  FileSaver() {
    const formValues = this.billingForm.value;

    // Retrieve the user object from localStorage
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const userId = user._id || '';

    // Extract and display user details
    const userDetails = {
      id: userId,
      name: user.name || '',
      email: user.email || '',
      contact: user.contact || '',
      gstNumber: user.gstNumber || '',
      licenseNumber: user.licenseNumber || '',
      profile: user.profile || '',
      shopName: user.shopName || ''
    };

    // Filter out empty rows from the 'rows' array
    const filteredRows = formValues.rows.filter(
      (row: { drugName: any; drugCode: any; quantity: number; mrp: number }) =>
        row.drugName && row.drugCode && row.quantity > 0 && row.mrp > 0
    );

    // Prepare the complete form data with user details and filtered rows
    const completeFormData = {
      ...formValues,
      rows: filteredRows,
      userDetails: userDetails // Send the user details along with the form data
    };

    // Call the service to send the form data to the backend
    this.fileService.createBilling(completeFormData).subscribe(
      (response) => {
        // Handle success logic (e.g., show a success message)
      },
      (error) => {
        console.error('Error creating billing entry:', error);
        // Handle error logic (e.g., show an error message)
      }
    );
  }


// Example call to test the function



  moveFocus(event: KeyboardEvent, nextControlName: string): void {


    if (event.key === 'Enter') {


      // Prevent form submission when Enter is pressed
      event.preventDefault();

      // Log all the available input elements' IDs on the page
      const allElements = document.querySelectorAll('input');
      allElements.forEach((el: HTMLElement) => {

      });

      // Manually focus the next input element based on nextControlName
      const nextElement = document.getElementById(nextControlName) as HTMLElement;


      if (nextElement) {
        nextElement.focus();

      } else {

      }
    }
  }

  moveFocusInTable(event: KeyboardEvent, rowIndex: number, currentField: string): void {
    if (event.key === 'Enter') {
      event.preventDefault();

      // If it's the last field in the current row (amount), move to the first field of the next row (product)
      if (currentField === 'mrp') {
        const nextRowFirstField = document.getElementById(`drugName-${rowIndex + 1}`) as HTMLElement;
        if (nextRowFirstField) {
          nextRowFirstField.focus();
        }
      } else {
        // Otherwise, move to the next field in the current row
        const nextField = this.getNextField(currentField);
        const nextFieldElement = document.getElementById(`${nextField}-${rowIndex}`) as HTMLElement;
        if (nextFieldElement) {
          nextFieldElement.focus();
        }
      }
    }
  }

  // Get the next field's name based on the current field
  getNextField(currentField: string): string {
    const fieldOrder = ['drugName', 'drugCode', 'strip', 'quantity', 'mrp', 'amount'];
    const currentIndex = fieldOrder.indexOf(currentField);
    return fieldOrder[currentIndex + 1];
  }



  resetForm() {
    const gstValue = this.billingForm.get('gst')?.value;  // Get current value of gst
    const paymentModeValue = this.billingForm.get('paymentMode')?.value;  // Get current value of paymentMode

    // Reset the form except for gst and paymentMode
    this.billingForm.reset({
      patientName: '',
      doctorName: '',
      AdharCardNumber: '',
      date: '',
      address: '',
      ContactNumber: '',
      discount: 0,
      totalAmount: [],
      rows: [],  // Reset table rows as well
    });

    // Keep the original values of gst and paymentMode
    this.billingForm.patchValue({
      gst: gstValue,
      paymentMode: paymentModeValue
    });
  }

}
