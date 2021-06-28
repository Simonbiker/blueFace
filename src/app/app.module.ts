import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ProfileSettingsComponent } from './profile-settings/profile-settings/profile-settings.component';

@NgModule({
  declarations: [
    AppComponent,
    ProfileSettingsComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
