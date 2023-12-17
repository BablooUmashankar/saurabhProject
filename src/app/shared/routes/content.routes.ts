import { Routes } from "@angular/router";
import { DashboardModule } from "../../Component/dashboard/dashboard.module";
import { MastersModule } from "src/app/Component/masters/masters.module";
import { InvoiceModule } from "src/app/Component/invoice/invoice.module";
import { ProductsModule } from "src/app/Component/products/products.module";
import { UsersModule } from "src/app/Component/users/users.module";
import { SettingsModule } from "src/app/Component/settings/settings.module";
import { ReportsModule } from "src/app/Component/reports/reports.module";
import { SalesModule } from "src/app/Component/sales/sales.module";


export const contentRoutes : Routes = [
 
{ path : 'dashboard' , loadChildren : () => import('../../Component/dashboard/dashboard.module').then(m => DashboardModule) },
{ path : 'masters' , loadChildren : () => import('../../Component/masters/masters.module').then(m => MastersModule) },
{ path : 'invoice' , loadChildren : () => import('../../Component/invoice/invoice.module').then(m => InvoiceModule) },
{ path : 'produts' , loadChildren : () => import('../../Component/products/products.module').then(m => ProductsModule) },
{ path : 'users' , loadChildren : () => import('../../Component/users/users.module').then(m => UsersModule) },
{ path : 'settings' , loadChildren : () => import('../../Component/settings/settings.module').then(m => SettingsModule) },
{ path : 'reports' , loadChildren : () => import('../../Component/reports/reports.module').then(m => ReportsModule) },
{ path : 'sales' , loadChildren : () => import('../../Component/sales/sales.module').then(m => SalesModule) }

]