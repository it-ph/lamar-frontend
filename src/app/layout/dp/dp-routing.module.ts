import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DpComponent } from './dp.component';
import { DashboardComponent } from '../../shared/dashboard/dashboard.component';
const routes: Routes = [
    {
        path: '',
        component: DpComponent,
        children: [
            { path: '', redirectTo: 'dashboard' },
            { path: 'dashboard', component: DashboardComponent },
          
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DpRoutingModule {}
