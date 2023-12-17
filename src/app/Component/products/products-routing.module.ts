import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProdutListComponent } from './manage/produt-list/produt-list.component';
import { AddProdutComponent } from './manage/add-produt/add-produt.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'manage/produt-list', component: ProdutListComponent },
      { path: 'manage/add-produt', component: AddProdutComponent },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {}
