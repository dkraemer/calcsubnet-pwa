import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { CalculatorInputComponent } from './calculator-input/calculator-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SubnetInfoComponent } from './subnet-info/subnet-info.component';
import { IPAddressListComponent } from './ipaddress-list/ipaddress-list.component';

const swRegOpts = {
  enabled: environment.production,
};

@NgModule({
  declarations: [
    AppComponent,
    CalculatorInputComponent,
    SubnetInfoComponent,
    IPAddressListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', swRegOpts),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
