import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { SidebarLeftComponent } from 'src/app/components/sidebar-left/sidebar-left.component';
import { SidebarRightComponent } from 'src/app/components/sidebar-right/sidebar-right.component';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { FooterComponent } from 'src/app/components/footer/footer.component';
import { AvatarModule }from 'src/app/components/avatar/avatar.module';
import { MessageModule } from 'src/app/components/message/message.module';





@NgModule({
  declarations: [
    DashboardComponent ,
    SidebarLeftComponent,
    SidebarRightComponent,
    HeaderComponent,
    FooterComponent
    
  ],
  imports: [
    CommonModule,
    RouterModule,
    AvatarModule,
    MessageModule
  ],
  exports: [
    DashboardComponent 
  ],
  providers: []
})
export class DashboardModule { }