import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { appRoutes } from './app-routing.module';
import { AppComponent } from './app.component';

import { EmptyModule } from './layouts/empty/empty.module';

import { ExtraOptions, PreloadAllModules, RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {  DashboardModule } from './layouts/dashboard/dashboard.module';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './pages/login/auth.interceptor';


const routerConfig: ExtraOptions = {
  preloadingStrategy: PreloadAllModules,
  scrollPositionRestoration: 'enabled',

};

@NgModule({
  declarations: [
    AppComponent    
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes,routerConfig),
    EmptyModule,
    DashboardModule ,
    BrowserAnimationsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
