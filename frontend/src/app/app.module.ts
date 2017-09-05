import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './components/app.component';
import { ApinaModule } from './apina';
import { TestService } from './services/test.service';
import { FrontpageComponent } from './components/frontpage.component';

const appRoutes: Routes = [
  { path: '', component: FrontpageComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    FrontpageComponent
  ],
  imports: [
    BrowserModule,
    ApinaModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    TestService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
