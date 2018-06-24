import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'; // ng bootstrap
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
//components
import { AppComponent } from './app.component';
import { CalculatorComponent } from './calculator/calculator.component';
import { PrintHistoryComponent } from './print-history/print-history.component';


const appRoutes: Routes = [
  { path: '', component: CalculatorComponent },
  { path: 'Print',      component: PrintHistoryComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    CalculatorComponent,
    PrintHistoryComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    Ng2SearchPipeModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
