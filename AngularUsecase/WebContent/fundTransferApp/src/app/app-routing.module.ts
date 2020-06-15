import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogInComponent } from './log-in/log-in.component';
import { HomeComponent } from './home/home.component';
import { AddBeneficiaryComponent } from './add-beneficiary/add-beneficiary.component';
import { MiniStatementComponent } from './mini-statement/mini-statement.component';
import { FundTransferComponent } from './fund-transfer/fund-transfer.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LogInComponent },
  { path: 'home', component: HomeComponent },
  { path: 'addBeneficiary', component: AddBeneficiaryComponent },
  { path: 'ministmt', component: MiniStatementComponent },
  { path: 'fundTranfer', component: FundTransferComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
