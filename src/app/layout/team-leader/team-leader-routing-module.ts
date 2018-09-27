import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeamLeaderComponent } from './team-leader.component';
import { DashboardComponent } from '../../shared/dashboard/dashboard.component';
import { DispatchedComponent } from '../../shared/dispatched/dispatched.component';
import { ReportComponent } from '../../shared/report/report.component';
import { AdsComponent } from '../../shared/ads/ads.component';
const routes: Routes = [
    {
        path: '',
        component: TeamLeaderComponent,
        children: [
            { path: '', redirectTo: 'dashboard' },
            { path: 'dashboard', component: DashboardComponent },
            { path: 'ads', component: AdsComponent },
            { path: 'dispatched-ads', component: DispatchedComponent },
            { path: 'reports', component: ReportComponent }

          
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TeamLeaderRoutingModule {}
