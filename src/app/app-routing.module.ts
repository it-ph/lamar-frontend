import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RouteGuard } from './guard/routeguard';

const routes: Routes = [
    {
        path: '', 
        loadChildren: './layout/login/login.module#LoginModule',
        canActivate: [RouteGuard],
        data:{
            config:{
                roles: [],
                authenticated: false
            }
        }
    },
    {
        path: 'admin', 
        loadChildren: './layout/admin/admin.module#AdminModule',
        canActivate: [RouteGuard],
        data:{
            config:{
                roles: ['Admin'],
                authenticated: true
            }
        }
    },
    {
        path: 'team-leader', 
        loadChildren: './layout/team-leader/team-leader.module#TeamLeaderModule',
        canActivate: [RouteGuard],
        data:{
            config:{
                roles: ['Team Leader'],
                authenticated: true
            }
        }
    },
    { 
        path: 'support', 
        loadChildren: './layout/support/support.module#SupportModule',   
        canActivate: [RouteGuard],
        data:{
            config:{
                roles: ['Support'],
                authenticated: true
            }
        }
    },
    { 
        path: 'qa',
        canActivate: [RouteGuard], 
        loadChildren: './layout/qa/qa.module#QAModule',
        data:{
            config:{
                roles: ['QA'],
                authenticated: true
            }
        }
    },
    { 
        path: 'artist', 
        loadChildren: './layout/artist/artist.module#ArtistModule',
        canActivate: [RouteGuard],
        data:{
            config:{
                roles: ['Artist'],
                authenticated: true
            }
        }
    },
    { 
        path: 'dp', 
        loadChildren: './layout/dp/dp.module#DPModule',
        canActivate: [RouteGuard],
        data:{
            config:{
                roles: ['DP'],
                authenticated: true
            }
        }
    },
    { 
        path: 'auditor', 
        loadChildren: './layout/auditor/auditor.module#AuditorModule',
        canActivate: [RouteGuard],
        data:{
            config:{
                roles: ['Auditor'],
                authenticated: true
            }
        }
    }
    
    
    ];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule]
})
export class AppRoutingModule {}
