import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QaComponent } from './qa.component';
import { DashboardComponent } from '../../shared/dashboard/dashboard.component';

const routes: Routes = [
    {
        path: '',
        component: QaComponent,
        children: [
            { path: '', redirectTo: 'dashboard' },
            { path: 'dashboard', component: DashboardComponent}

          
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class QARoutingModule {}
