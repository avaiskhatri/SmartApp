import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EditProfilePage } from '../edit-profile/edit-profile';

import { AuthProvider } from '../../providers/auth/auth';
import { UsersProvider } from '../../providers/users/users';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  editprofilepage = EditProfilePage;
  userData: any;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public auth: AuthProvider, public usersauth: UsersProvider) {
    this.userData = this.auth.user;
    console.log(this.userData);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
    this.userData = this.auth.user;
  }

}
