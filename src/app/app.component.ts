import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import * as firebase from 'firebase';

var config = {
  apiKey: "AIzaSyCHwj9mio6U5JOx2adcXkm9b9bpziDMTr4",
  authDomain: "pokemon-a6915.firebaseapp.com",
  databaseURL: "https://pokemon-a6915.firebaseio.com",
  projectId: "pokemon-a6915",
  storageBucket: "",
  messagingSenderId: "166064742041"
};

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
        this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    firebase.initializeApp(config);
    
  }

  
}
