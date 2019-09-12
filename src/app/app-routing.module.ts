import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'list',
    loadChildren: () => import('./list/list.module').then(m => m.ListPageModule)
  },
  { path: 'user-infos', loadChildren: './pages/user-infos/user-infos.module#UserInfosPageModule' },
  { path: 'tasks-list', loadChildren: './pages/tasks-list/tasks-list.module#TasksListPageModule', canActivate: [AuthGuard] },
  { path: 'form', loadChildren: './pages/form/form.module#FormPageModule' },
  { path: 'form/:id', loadChildren: './pages/form/form.module#FormPageModule' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
