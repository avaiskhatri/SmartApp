import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';

import { AuthProvider } from '../../providers/auth/auth';
import { UsersProvider } from '../../providers/users/users';


@IonicPage()
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage {
  loading: any;
  profilepage = ProfilePage;
  userData: any;
  
  editProfileData = {
    userId: null,
    userFullName: "",
    userEmail: "",
    userGender: "",
    userDateOfBirth: ""
  };
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public auth: AuthProvider, public usersauth: UsersProvider, public loadingCtrl: LoadingController) {
    //this.userData = this.auth.user.__zone_symbol__value;
    this.userData = this.auth.user;
    this.editProfileData.userId = this.userData.user_id;
    this.editProfileData.userFullName = this.userData.user_full_name;
    this.editProfileData.userEmail = this.userData.user_email;
    this.editProfileData.userDateOfBirth = this.userData.user_date_of_birth;
    this.editProfileData.userGender = this.userData.user_gender;
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditProfilePage');
  }
  
  updateProfile(){
    this.showLoader("Please hold, until we update your profile.");
    console.log(this.editProfileData);
    this.usersauth.updateProfile(this.editProfileData).then((data)=>{
        this.loading.dismiss();
      //let data = res;
        //console.log(data);
    });
    
    
  
  }
  
  showLoader(data){
    this.loading = this.loadingCtrl.create({
        content: data
    })
    this.loading.present();
  }

}
