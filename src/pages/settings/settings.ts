import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';
import { ChangePasswordPage } from '../change-password/change-password';
import { LoginPage } from '../login/login';

import { AuthProvider } from '../../providers/auth/auth';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  profilepage = ProfilePage;
  changepasswordpage = ChangePasswordPage;
  loginpage = LoginPage;
  
  userData: any;
  
  constructor(public navCtrl: NavController, public auth: AuthProvider) {
    console.log(this.auth.user);
    this.userData = this.auth.user;
    console.log(this.userData);
  }
  
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingPage');
    
    //console.log(JSON.stringify(this.userData));
    //console.log(this.userData.__zone_symbol__value);
    //console.log(this.userData.__zone_symbol__value.user_full_name);
    //console.log(this.auth.getStorageVars('user'));
    //console.log(this.auth.getStorageVars('apple'));
    //this.userData = this.auth.getStorageVars('user');
    //console.log(this.auth.user);
    //console.log(this.auth.apiServerPath);
    //console.log(this.auth);
  }
  
  logout(){
    this.auth.logout();
    this.navCtrl.setRoot(this.loginpage);
  }
}
