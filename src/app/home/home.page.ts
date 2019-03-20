import { Component } from '@angular/core';
import * as firebase from 'firebase';
import { AlertController } from '@ionic/angular';
import { FCMService } from 'src/app/fcm.service';
import { ToastController } from '@ionic/angular';
import { tap } from 'rxjs/operators'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  pokemons: any = [];
  ref = firebase.database().ref();
  
  constructor(
    private alertController: AlertController,
    private toastController: ToastController,
    private fcm: FCMService
    ) { 
    this.ref.on('value', response=> {
      let datos = snapshotToArray(response);
      console.log(response);
      this.pokemons = datos;
    });
  
    firebase.database().ref('-LYe242o_hEa2wgxCnDs').on('value', response=> {
      let datos = snapshotToObject(response);
      console.log(datos);	
    });
  }

  ionViewDidLoad(){
    this.fcm.getToken()
    this.fcm.listenToNotifications().pipe(
      tap(async msg=>{
        const toast = await this.toastController.create({
          message: msg.body,
          duration: 3000
        });
        await toast.present();
      })
    ).subscribe()
  }
  ngOnInit(){
    this.ionViewDidLoad();
  } 

  

  delete(key:any){
    console.log(key);
    firebase.database().ref(key.key).remove();
  }

  async add(){
    const alert = await this.alertController.create({
      header: 'Pokemon',
      inputs:[
        {
          name: 'name',
          type: 'text',
          placeholder: 'Nombre'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (data)=> {
            console.log('Confirm Ok', data);
            let insert = this.ref.push();
            insert.set(data);
          }
        }
      ]
    });
    await alert.present();
  }

  async edit(pokemon: any){
    const alert = await this.alertController.create({
      header: 'Pokemon',
      inputs:[
        {
          name: 'name',
          type: 'text',
          placeholder: 'Nombre',
          value: pokemon.name
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (data)=> {
            console.log('Confirm Ok', data);
            firebase.database().ref(pokemon.key).update(data)
          }
        }
      ]
    });
    await alert.present();
  }

}

export const snapshotToArray = snapshot => {
  let returnArr = [];
  
  snapshot.forEach(childSnapshot => {
    let item = childSnapshot.val();
    item.key = childSnapshot.key;
    returnArr.push(item);
  });
  
  return returnArr;
  }

  export const snapshotToObject = snapshot => {
    let item = snapshot.val();
    item.key = snapshot.key;

    return item;
  }
