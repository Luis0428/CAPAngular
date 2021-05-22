import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CelularComponent } from './celular/celular.component';
import { ContactoComponent } from './contacto/contacto.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'contacto',
    component: ContactoComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'celular',
    component: CelularComponent
  },
  {
    path: 'celular/:id',
    component: CelularComponent
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
