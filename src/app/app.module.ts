import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { JwtModule } from "@auth0/angular-jwt";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

  import {AccordionModule} from 'primeng/accordion';     //accordion and accordion tab
  import { DividerModule } from "primeng/divider";

  import {DropdownModule} from 'primeng/dropdown';
export function tokenGetter() {
  return sessionStorage.getItem("Token");

}
export function AdmintokenGetter() {
  return sessionStorage.getItem("AdminToken");

}

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent

  ],

  imports: [
    AccordionModule,
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    DividerModule,
    DropdownModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: [""],
        disallowedRoutes: ["http://example.com/examplebadroute/"],
      },
    }),

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
