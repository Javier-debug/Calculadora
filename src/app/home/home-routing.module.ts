import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeTemplateComponent } from './home-template/home-template.component';

const routes: Routes = [
  {
    path: '',
    component: HomeTemplateComponent,
    children: [
      {
        path: 'cal',
        loadChildren: () => import('../calculator/calculator.module').then((m) => m.CalculatorModule),
        // canLoad: [LoadModuleGuard]
      },
      {path: '**', redirectTo: 'cal'}
    ]
  },
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }