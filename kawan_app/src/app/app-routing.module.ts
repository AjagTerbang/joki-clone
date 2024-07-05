import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { TabsPage } from './component/tabs/tabs.page';
const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: '',
    redirectTo: 'tabs',
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
    path: '',
    component: TabsPage,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'courses',
      },
      {
        path: 'courses',
        loadChildren: () =>
          import('./courses/courses.module').then((m) => m.CoursesPageModule),
      },
    ],
  },
  {
    path: 'create-admin',
    loadChildren: () =>
      import('./create-admin/create-admin.module').then(
        (m) => m.CreateAdminPageModule
      ),
  },
  {
    path: 'module/:id',
    loadChildren: () =>
      import('./module/module.module').then((m) => m.ModulePageModule),
  },
  {
    path: 'tabs',
    loadChildren: () =>
      import('./component/tabs/tabs.module').then((m) => m.TabsPageModule),
  },
  {
    path: 'module-tambah/:id',
    loadChildren: () =>
      import('./module-tambah/module-tambah.module').then(
        (m) => m.ModuleTambahPageModule
      ),
  },
  {
    path: 'module-update/:id',
    loadChildren: () =>
      import('./module-update/module-update.module').then(
        (m) => m.ModuleUpdatePageModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
