import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecordViewComponent } from './record-view/record-view.component';
import { FedoraConfigComponent } from './fedora-config/fedora-config.component';

const routes: Routes = [
  {path: 'configure-gui-client', component: FedoraConfigComponent},
  {path: 'path/:path', component: RecordViewComponent},
  {path: '', redirectTo: '/path/info%3Afedora', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    // {enableTracing: true} // <-- debugging purposes only
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
