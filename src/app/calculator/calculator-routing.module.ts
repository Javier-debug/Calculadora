import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TemplateComponent } from './template/template.component';

const routes: Routes = [
  {path: 'cal', component: TemplateComponent},
  {path: '**', redirectTo: 'cal'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CalculatorRoutingModule { }