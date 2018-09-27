import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuditorComponent } from './auditor.component';
import { DispatchedComponent } from '../../shared/dispatched/dispatched.component';
import { AuditedComponent } from '../../shared/audited/audited.component';

const routes: Routes = [
    {
        path: '',
        component: AuditorComponent,
        children: [
            { path: '', redirectTo: 'auditor-ready' },
            { path: 'auditor-ready', component: DispatchedComponent },
            { path: 'audited-ads', component: AuditedComponent },

          
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuditorRoutingModule {}
