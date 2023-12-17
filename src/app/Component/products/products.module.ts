import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { AddProdutComponent } from './manage/add-produt/add-produt.component';
import { ProdutListComponent } from './manage/produt-list/produt-list.component';


@NgModule({
  declarations: [
    AddProdutComponent,
    ProdutListComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule
  ]
})
export class ProductsModule { }
