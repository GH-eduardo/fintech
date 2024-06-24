import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { ProtectedComponent } from './components/protected/protected.component'; // Importe seu componente protegido

const routes: Routes = [
  {
    path: 'protected-route',
    component: ProtectedComponent,
    canActivate: [AuthGuard]
  },
  //rotass
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
