import { Routes } from '@angular/router';
import { authGuard } from './Store_Admin_component/AuthGuard/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./Authentication/login/login.component').then(c => c.LoginComponent)
  },
  {
    path: 'registor',
    loadComponent: () => import('./Authentication/registor/registor.component').then(c => c.RegistorComponent)
  },
  {
    path: 'Store-Admin-dashboard',
    canActivate: [authGuard] ,
    loadComponent: () => import('./Store_Admin_component/dashboard/dashboard.component').then(c => c.DashboardComponent),
    children: [
      {
        path: '',
        redirectTo: 'main-content',
        pathMatch: 'full'
      },
      {
        path: 'main-content',
        loadComponent: () => import('./Store_Admin_component/main-component/main-component.component').then(c => c.MainComponentComponent)
      },
      {
        path: 'store-Upload-drugs',
        loadComponent: () => import('./Store_Admin_component/upload-drugs/upload-drugs.component').then(c => c.UploadDrugsComponent)
      },
      {
        path: 'store-view-drugs',
        loadComponent: () => import('./Store_Admin_component/store-view-drugs/store-view-drugs.component').then(c => c.StoreViewDrugsComponent)
      },
      {
        path: 'billing-Form',
        loadComponent: () => import('./Store_Admin_component/billing-form/billing-form.component').then(c => c.BillingFormComponent)
      },
      {
        path: 'notification',
        loadComponent: () => import('./Store_Admin_component/stock-alert/stock-alert.component').then(c => c.StockAlertComponent)
      },
      {
        path: 'invoice',
        loadComponent: () => import('./Store_Admin_component/invoice/invoice.component').then(c => c.InvoiceComponent)
      },
      {
        path: 'files',
        loadComponent: () => import('./Store_Admin_component/files/files.component').then(c => c.FilesComponent)
      },
      {
        path: 'purchase-files',
        loadComponent: () => import('./Store_Admin_component/purchase-file/purchase-file.component').then(c => c.PurchaseFileComponent)
      },
      {
        path: 'low-stock',
        loadComponent: () => import('./Store_Admin_component/low-stock/low-stock.component').then(c => c.LowStockComponent)
      },
      {
        path: 'expiry-stock',
        loadComponent: () => import('./Store_Admin_component/expiry-drug/expiry-drug.component').then(c => c.ExpiryDrugComponent)
      },



    ]
  },
  {
    path: 'Brand-Admin-dashboard',
    canActivate: [authGuard] ,
    loadComponent: () => import('./Brand_Admin_component/dashboard/dashboard.component').then(c => c.DashboardComponent),
    children: [
      {
        path: '',
        redirectTo: 'main-content',
        pathMatch: 'full'
      },
      {
        path: 'main-content',
        loadComponent: () => import('./Brand_Admin_component/main-component/main-component.component').then(c => c.MainComponentComponent)
      },
      {
        path: 'Brand-Upload-drugs',
        loadComponent: () => import('./Brand_Admin_component/uplod-drugs/uplod-drugs.component').then(c => c.UplodDrugsComponent)
      },
      {
        path: 'brand-view-drugs',
        loadComponent: () => import('./Brand_Admin_component/brand-view-drugs/brand-view-drugs.component').then(c => c.BrandViewDrugsComponent)
      },


    ]
  },



  {
    path: 'Distributor-Admin-dashboard',
    canActivate: [authGuard] ,
    loadComponent: () => import('./Distributer_Admin_component/distributer-dashbord/distributer-dashbord.component').then(c => c.DistributerDashbordComponent),
    children: [
      {
        path: '',
        redirectTo: 'main-content-distributor',
        pathMatch: 'full'
      },
      {
        path: 'main-content-distributor',
        loadComponent: () => import('./Distributer_Admin_component/distributor-main-component/distributor-main-component.component').then(c => c.DistributorMainComponentComponent)
      },

      {
        path: 'distributor-set',
        loadComponent: () => import('./Distributer_Admin_component/distributor-set-shopanddiscount/distributor-set-shopanddiscount.component').then(c => c.DistributorSetShopanddiscountComponent)
      },
      {
        path: 'distributor-discount',
        loadComponent: () => import('./Distributer_Admin_component/distributor-discount/distributor-discount.component').then(c => c.DistributorDiscountComponent)
      },


    ]
  }
];
