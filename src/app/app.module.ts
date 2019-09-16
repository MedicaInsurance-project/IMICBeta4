import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap'
import {HttpClientModule } from '@angular/common/http';

// import {AdminDashboardComponent} from './admin-dashboard/admin-dashboard/admin-dashboard.component';
// import { AdminNavComponent } from './admin-nav/admin-nav.component';
@NgModule({
  declarations: [
    AppComponent
    // AdminDashboardComponent,
    // AdminNavComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
