import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';  // Importar el guard

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },  // Redirige a login si no está autenticado
  { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule) },
  { path: 'registro', loadChildren: () => import('./pages/registro/registro.module').then(m => m.RegistroPageModule) },
  {
    path: 'tabs',
    canActivate: [AuthGuard],  // Aplicamos el guard para proteger los tabs
    loadChildren: () => import('./tabs/tabs/tabs.module').then(m => m.TabsPageModule),  // Importa el módulo de Tabs
  },
  // Otras rutas aquí si es necesario
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
