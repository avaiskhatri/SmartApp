import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

import { TabsPage } from '../tabs/tabs';
import { RegisterPage } from '../register/register';
import { AuthProvider } from '../../providers/auth/auth';


/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  tabspage = TabsPage;
  registerpage = RegisterPage;
  loading: any;
  
  loginCredentials = {userEmail: "", userPassword: ""};
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private auth: AuthProvider, public loadingCtrl: LoadingController) {
  
  }
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  
  login(){
    
    if(this.loginCredentials.userEmail.length == 0 || this.loginCredentials.userPassword.length == 0){
        console.log("All fields are required");
    }else{
        this.showLoader("Loading");
        this.auth.login(this.loginCredentials).then((data) =>{
           console.log(data);
           this.loading.dismiss();
           this.navCtrl.setRoot(this.tabspage);
        }, (err)=>{
            console.log(err);
            this.loading.dismiss();
            alert(err);
        });
    }
    
  }
  
  fbLogin(){
    this.auth.fbLogin();
  }
  
  gotoSignUp(){
    this.navCtrl.push(this.registerpage);
  }
  
  showLoader(data){
    this.loading = this.loadingCtrl.create({
        content: data
    })
    this.loading.present();
  }

}
