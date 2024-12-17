import { Routes } from '@angular/router';
import { authGuard } from './Store_Admin_component/AuthGuard/auth.guard';

export const routes: Routes = [
  {
    path: 'Super-Admin',
    canActivate: [authGuard] ,
    loadComponent: () => import('./Super_Admin/super-dashboard/super-dashboard.component').then(c => c.SuperDashboardComponent),
    children: [
      {
        path: '',
        redirectTo: 'main-content-SuperAdmin',
        pathMatch: 'full'
      },
      {
        path: 'main-content-SuperAdmin',
        loadComponent: () => import('./Super_Admin/super-main-componet/super-main-componet.component').then(c => c.SuperMainComponetComponent)
      },
      {
        path: 'Sell-All-Drugs',
        loadComponent: () => import('./Super_Admin/super-sell-drugs/super-sell-drugs.component').then(c => c.SuperSellDrugsComponent)
      },
      {
        path: 'store-user',
        loadComponent: () => import('./Super_Admin/all-storeuser-list/all-storeuser-list.component').then(c => c.AllStoreuserListComponent)
      },
      {
        path: 'brand-user',
        loadComponent: () => import('./Super_Admin/all-barnd-user-list/all-barnd-user-list.component').then(c => c.AllBarndUserListComponent)
      },
      {
        path: 'distributor-user',
        loadComponent: () => import('./Super_Admin/all-distributor-list/all-distributor-list.component').then(c => c.AllDistributorListComponent)
      },
      {
        path: 'sell-all-drugs',
        loadComponent: () => import('./Super_Admin/all-sell-drugs/all-sell-drugs.component').then(c => c.AllSellDrugsComponent)
      },
      {
        path: 'narcotis-users',
        loadComponent: () => import('./Super_Admin/narcotis-users/narcotis-users.component').then(c => c.NarcotisUsersComponent)
      },
      {
        path: 'campaign-users',
        loadComponent: () => import('./Super_Admin/campaign-users/campaign-users.component').then(c => c.CampaignUsersComponent)
      },


    ]
  },

  {
    path: 'Narcotis-Admin',
    canActivate: [authGuard] ,
    loadComponent: () => import('./Narcotis_Admin/narcotis-dashboard/narcotis-dashboard.component').then(c => c.NarcotisDashboardComponent),
    children: [
      {
        path: '',
        redirectTo: 'main-content-narcotis',
        pathMatch: 'full'
      },
      {
        path: 'main-content-narcotis',
        loadComponent: () => import('./Narcotis_Admin/main-components/main-components.component').then(c => c.MainComponentsComponent)
      },
      {
        path: 'all-sell-drug-narcotis',
        loadComponent: () => import('./Narcotis_Admin/all-sell-drugs/all-sell-drugs.component').then(c => c.AllSellDrugsComponent)
      },

    ]
  },

  {
    path: '',
    loadComponent: () => import('./Authentication/login/login.component').then(c => c.LoginComponent)
  },
  {
    path: 'registor',
    loadComponent: () => import('./Authentication/registor/registor.component').then(c => c.RegistorComponent)
  },
  {
    path: 'narcotis-department-login',
    loadComponent: () => import('./Authentication/narcotis-login/narcotis-login.component').then(c => c.NarcotisLoginComponent)
  },
  {
    path: 'narcotis-department-registor',
    loadComponent: () => import('./Authentication/narcotis-registation/narcotis-registation.component').then(c => c.NarcotisRegistationComponent)
  },
  {
    path: 'campaign-login',
    loadComponent: () => import('./Authentication/campaign-login/campaign-login.component').then(c => c.CampaignLoginComponent)
  },
  {
    path: 'campaign-registor',
    loadComponent: () => import('./Authentication/campaign-registation/campaign-registation.component').then(c => c.CampaignRegistationComponent)
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
      {
        path: 'order-drugs',
        loadComponent: () => import('./Store_Admin_component/order-distributore/order-distributore.component').then(c => c.OrderDistributoreComponent)
      },
      {
        path: 'order-drugs-brand',
        loadComponent: () => import('./Store_Admin_component/order-brand/order-brand.component').then(c => c.OrderBrandComponent)
      },
      {
        path: 'unpaid-invoice',
        loadComponent: () => import('./Store_Admin_component/unpaid-bill/unpaid-bill.component').then(c => c.UnpaidBillComponent)
      },
      {
        path: 'confirm-order',
        loadComponent: () => import('./Store_Admin_component/confirm-order/confirm-order.component').then(c => c.ConfirmOrderComponent)
      },

      {
        path: 'setting',
        loadComponent: () => import('./Store_Admin_component/setting/setting.component').then(c => c.SettingComponent)
      },



    ]
  },
  {
    path: 'Brand-Admin-dashboard',
    canActivate: [authGuard] ,
    loadComponent: () => import('./Brand_Admin_component/brand-dashbord/brand-dashbord.component').then(c => c.BrandDashbordComponent),
    children: [
      {
        path: '',
        redirectTo: 'main-content-brand',
        pathMatch: 'full'
      },
      {
        path: 'main-content-brand',
        loadComponent: () => import('./Brand_Admin_component/brand-main-componet/brand-main-componet.component').then(c => c.BrandMainComponetComponent)
      },

      {
        path: 'Brand-set',
        loadComponent: () => import('./Brand_Admin_component/brand-set-shopanddiscount/brand-set-shopanddiscount.component').then(c => c.BrandSetShopanddiscountComponent)
      },
      {
        path: 'Brand-discount',
        loadComponent: () => import('./Brand_Admin_component/brand-discount/brand-discount.component').then(c => c.BrandDiscountComponent)
      },
      {
        path: 'Brand-Pending-Order',
        loadComponent: () => import('./Brand_Admin_component/brand-pending-order/brand-pending-order.component').then(c => c.BrandPendingOrderComponent)
      },
      {
        path: 'Brand-Confirm-Order',
        loadComponent: () => import('./Brand_Admin_component/brand-confirm-order/brand-confirm-order.component').then(c => c.BrandConfirmOrderComponent)
      },
      {
        path: 'setting-brand',
        loadComponent: () => import('./Brand_Admin_component/setting-brand/setting-brand.component').then(c => c.SettingBrandComponent)
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
      {
        path: 'distributor-Pending-Order',
        loadComponent: () => import('./Distributer_Admin_component/distributor-pending-order/distributor-pending-order.component').then(c => c.DistributorPendingOrderComponent)
      },
      {
        path: 'distributor-Confirm-Order',
        loadComponent: () => import('./Distributer_Admin_component/distributor-confirm-order/distributor-confirm-order.component').then(c => c.DistributorConfirmOrderComponent)
      },

      {
        path: 'setting-distributor',
        loadComponent: () => import('./Distributer_Admin_component/setting-distributor/setting-distributor.component').then(c => c.SettingDistributorComponent)
      },




    ]
  }
];
