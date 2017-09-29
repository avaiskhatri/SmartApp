import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { Storage  } from '@ionic/storage';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthProvider {

  public apiServerPath: string = "http://api.smartapp.betalogics.com/public";
  token: any;
  user: any;
  
  constructor(public http: Http, public storage: Storage, private fb:Facebook) {
    console.log('Hello AuthProvider Provider & Storage Provider');
    
    this.storage.get('token').then((value)=>{
        this.token = value;
        console.log("Token value for storage initialize app function: " + value);
    });
    this.storage.get('user').then((value)=>{
        this.user = value;
        console.log("Token value for storage initialize app function: " + value);
    });

    /*console.log(this.token);
    console.log(this.user);*/
    
  }
  
    initializaAppData(){
        
    }

  checkAuthentication(){
    return new Promise((resolve, reject) => {
       //resolve(false);
       this.storage.get('token').then((val) =>{
            console.log('Login storage token: ' +val);
            if(val != null){
                this.token = val;
                resolve(true);
            }else{
                resolve(false);
            }
        }, (err) => {
            reject(err);
        });
    });
  }
  
  login(loginCredentials){
    console.log("checking initially: " + JSON.stringify(this.user));
    
    return new Promise((resolve, reject) => {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
 
        this.http.post(this.apiServerPath + '/login', JSON.stringify(loginCredentials), {headers: headers})
          .subscribe(res => {
            let data = res.json();
            if(data.status.success === true){
                
                console.log(data);
                this.token = data.token;
                this.user = data.user;
                
                console.log("Just after fetching from API: "+this.token);
                console.log("Just after fetching from API: "+this.user);
                
                this.storage.set('token', data.token);
                this.storage.set('user', data.user);
                
                setTimeout(()=>{
                    console.log(this.user);
                    console.log(this.token);
                    console.log(this.apiServerPath);
                    resolve(data);
                },2000);
                
            } else {
                reject(data.error.text);
            }
            
        
          }, (err) => {
            reject(err);
          });
    });
  }
  
  fbLogin(){
    this.fb.login(['public_profile', 'user_friends', 'email'])
        .then((res: FacebookLoginResponse) => console.log('Logged into Facebook!', res))
        .catch(e => console.log('Error logging into Facebook', e));

  }
  
  getStorageVars(sVar){
    let getVal;
    this.storage.get(sVar).then((val) =>{
        
        getVal = val;
        
    });
    console.log('From Get Line 84 ('+sVar+') :'+JSON.stringify(getVal));
    return getVal;
  }
  
  logout(){
    this.storage.remove('token');
    this.storage.remove('user');
    this.user = '';
    this.token = '';
    this.storage.get('token').then((val)=>{
        console.log('After Logout storage: ' +val);
    });
  }
}
