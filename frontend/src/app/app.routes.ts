import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UserpageComponent } from './components/userpage/userpage.component';
import { AdminPageComponent } from './components/adminpage/adminpage.component';
import { NgModule } from '@angular/core';
import { roleUserGuard } from './securities/guards/role-user.guard';
import { roleAdminGuard } from './securities/guards/role-admin.guard';
import { authGuard } from './securities/guards/auth.guard';
import { DatiutenteComponent } from './components/datiutente/datiutente.component';
import { UserTaskDelGiornoComponent } from './components/user-task-del-giorno/user-task-del-giorno.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [authGuard] },
  { path: 'login', component: LoginComponent, canActivate: [authGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [authGuard] },
  { path: 'userpage', component: UserpageComponent, canActivate: [roleUserGuard] },
  { path: 'userTaskDelGiorno', component: UserTaskDelGiornoComponent, canActivate: [roleUserGuard] },
  { path: 'userprofile', component: DatiutenteComponent, canActivate: [roleUserGuard] },
  { path: 'adminpage', component: AdminPageComponent, canActivate: [roleAdminGuard]},
  { path: '**', redirectTo: '' } // Reindirizza alla home se la pagina non esiste
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}