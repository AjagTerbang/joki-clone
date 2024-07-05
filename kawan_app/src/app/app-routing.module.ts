import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./register/register.module').then((m) => m.RegisterPageModule),
  },
  {
    path: 'splash-screen',
    loadChildren: () =>
      import('./splash-screen/splash-screen.module').then(
        (m) => m.SplashScreenPageModule
      ),
  },
  {
    path: 'courses',
    loadChildren: () =>
      import('./courses/courses.module').then((m) => m.CoursesPageModule),
  },
  {
    path: 'course-update/:id',
    loadChildren: () =>
      import('./course-update/course-update.module').then(
        (m) => m.CourseUpdatePageModule
      ),
  },
  {
    path: 'tambah-courses',
    loadChildren: () =>
      import('./tambah-courses/tambah-courses.module').then(
        (m) => m.TambahCoursesPageModule
      ),
  },
  {
    path: 'tabs',
    loadChildren: () =>
      import('./component/tabs/tabs.module').then((m) => m.TabsPageModule),
  },  {
    path: 'create-admin',
    loadChildren: () => import('./create-admin/create-admin.module').then( m => m.CreateAdminPageModule)
  },
  {
    path: 'module',
    loadChildren: () => import('./module/module.module').then( m => m.ModulePageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
