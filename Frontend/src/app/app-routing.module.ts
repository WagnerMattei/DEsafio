

import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { MenuComponent } from  './menu/menu.component';

import { UsuariosFormComponent } from './usuarios/usuarios-form/usuarios-form.component';
import { UsuariosDetailComponent } from './usuarios/usuarios-detail/usuarios-detail.component';
import { ContasFormComponent } from './contas/contas-form/contas-form.component';
import { ContasDetailComponent } from './contas/contas-detail/contas-detail.component';
import { TransacoesFormComponent } from './transacoes/transacoes-form/transacoes-form.component';
import { TransacoesDetailComponent } from './transacoes/transacoes-detail/transacoes-detail.component';
import { AuthService } from './auth/auth.service';
import { TransacoesListComponent } from './transacoes/transacoes-list/transacoes-list.component';
import { UsuariosListComponent } from './usuarios/usuarios-list/usuarios-list.component';
import { ContasListComponent } from './contas/contas-list/contas-list.component';

const appRoutes: Routes = [  
    { path: '', component: MenuComponent},

    { path: 'usuarios',component: UsuariosListComponent },
    { path: 'usuarios/novo', component: UsuariosFormComponent, canActivate: [AuthService] },
    { path: 'usuarios/:id', component: UsuariosDetailComponent},
    { path: 'usuarios/edit/:id', component: UsuariosFormComponent, canActivate: [AuthService]},

    { path: 'contas',component: ContasListComponent },
    { path: 'contas/novo', component: ContasFormComponent},
    { path: 'contas/:numero', component: ContasDetailComponent},
    { path: 'contas/edit/:numero', component: ContasFormComponent},

    { path: 'transacoes',component: TransacoesListComponent },
    { path: 'transacoes/novo', component:  TransacoesFormComponent},
    { path: 'transacoes/:id', component:  TransacoesDetailComponent},
    { path: 'transacoes/edit/:id', component:  TransacoesFormComponent},
]

    @NgModule(
    {
        imports: [RouterModule.forRoot(appRoutes, {useHash: false})],
        exports: [RouterModule] 
    })
export class AppRoutingModule{}

