import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire'
import { AngularFirestoreModule } from '@angular/fire/firestore'
import { Firebase } from '@ionic-native/firebase/ngx'
import { FCMService } from 'src/app/fcm.service'

var config = {
  apiKey: "AIzaSyCHwj9mio6U5JOx2adcXkm9b9bpziDMTr4",
  authDomain: "pokemon-a6915.firebaseapp.com",
  databaseURL: "https://pokemon-a6915.firebaseio.com",
  projectId: "pokemon-a6915",
  storageBucket: "",
  messagingSenderId: "166064742041"
};

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule
  ],
  providers: [
    Firebase,
    FCMService,
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
