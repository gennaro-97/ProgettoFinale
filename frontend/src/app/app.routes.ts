import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UserpageComponent } from './components/userpage/userpage.component';
import { AdminPageComponent } from './components/adminpage/adminpage.component';
import { NgModule } from '@angular/core';
import { authGuard } from './securities/guards/auth.guard';
import { roleAdminGuard } from './securities/guards/role-admin.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'userpage', component: UserpageComponent, canActivate: [authGuard] },
  { path: 'adminpage', component: AdminPageComponent, canActivate: [roleAdminGuard]},
  { path: '**', redirectTo: '' } // Reindirizza alla home se la pagina non esiste
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}