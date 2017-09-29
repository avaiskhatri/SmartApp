import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Storage  } from '@ionic/storage';
import { AuthProvider } from '../auth/auth';
import 'rxjs/add/operator/map';

@Injectable()
export class UsersProvider {
  
  constructor(public http: Http, public auth: AuthProvider) {
    console.log('Hello UsersProvider Provider');
    console.log(this.auth.apiServerPath);
  }

  updateProfile(profileData){
  
    //console.log(profileData);
    //console.log(this.auth.apiServerPath);
    //console.log(this.auth.token);
    
    return new Promise((resolve, reject) => {
        //resolve(true);
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('x-auth-token', this.auth.token);
        
        console.log(headers);
 
        this.http.post(this.auth.apiServerPath + '/updateProfile', JSON.stringify(profileData), {headers: headers})
          .map(res => res.json())
          .subscribe(res => {
            if(res.status.success === true){
                
                //console.log(profileData);
                console.log(res);
                //this.auth.token = res.token;
                this.auth.user = res.user;
                this.auth.storage.set('user', res.user);
                console.log(this.auth.user);
                
                resolve(res);
            } else {
                reject(res.error.text);
            }
            
        
          }, (err) => {
            reject(err);
          });
          
    });
  }
  
    
}
