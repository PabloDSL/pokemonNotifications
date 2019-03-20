import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular'
import { AngularFirestore } from '@angular/fire/firestore'
import { Firebase } from '@ionic-native/firebase/ngx';

@Injectable({
  providedIn: 'root'
})
export class FCMService {
  constructor(
    public firebaseNative: Firebase,
    public afs : AngularFirestore,
    private platform: Platform
  ) { }

  async getToken(){
    if (this.platform.is('android')){
      this.firebaseNative.getToken().then(token =>{
        console.log("Token obtenido: " + token)
        localStorage.setItem("token", token)
        this.saveTokenToFirestore()
        this.suscribe()
        return Promise.resolve(token)
      }).catch(error => {
        console.log("Error en el token")
      })
    }
  }

  private saveTokenToFirestore() {
    let token = localStorage.getItem("token")
  
    const devicesRef = this.afs.collection('devices')
  
    const docData = { 
      token,
      userId: 'Isra',
    }
  
    return devicesRef.doc(token).set(docData)
  }

  public listenToNotifications() {
    return this.firebaseNative.onNotificationOpen()
  }

  public suscribe(){
    this.firebaseNative.subscribe('pokedex').then(data=>{
     
    })
  }
  



}
