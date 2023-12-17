import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdersComponent } from './orders/orders.component';
import { TransactionComponent } from './transaction/transaction.component';

const routes: Routes = [
  { path : '' , children : [
    {path : 'orders' , component : OrdersComponent},
    {path : 'transaction' , component : TransactionComponent}

  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesRoutingModule { }
