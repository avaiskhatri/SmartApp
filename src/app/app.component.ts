import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { AuthProvider } from '../providers/auth/auth';

import { LoadingController } from 'ionic-angular';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any=LoginPage;
  loader: any;

  constructor(platform: Platform, private splashScreen: SplashScreen, public auth: AuthProvider, public loadingCtrl: LoadingController) {
    platform.ready().then(() => {
      this.splashScreen.hide();
    });

    this.presentLoading();
    this.auth.checkAuthentication().then((isLoggedIn) =>{
      if(isLoggedIn){
        this.rootPage = TabsPage;
      } else {
        this.rootPage = LoginPage;
      }
      this.loader.dismiss();
    });
  }
  
  presentLoading(){
    //console.log("Loading function start");
    this.loader = this.loadingCtrl.create({
      content: "Please Wait..."
    });
    this.loader.present();
  }
  
}
