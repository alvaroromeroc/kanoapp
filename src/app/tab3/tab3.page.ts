import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactService, Contact } from 'src/app/services/contact.service';
import { ToastController } from '@ionic/angular';
import * as firebase from 'firebase';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  contact: Contact = {
    nombre: '',
    telefono: '',
    correo: '',
    mensaje: '',
    hora: '',
    dispositivo:'',
    sincronizado:''
  };

  constructor(private activatedRoute: ActivatedRoute, private contactService: ContactService,
    private toastCtrl: ToastController, private router: Router) { }

    ngOnInit() { }

    ionViewWillEnter() {
      let id = this.activatedRoute.snapshot.paramMap.get('id');
      if (id) {
        this.contactService.getContact(id).subscribe(contact => {
          this.contact = contact;
        });
      }
    }

    addContact() {
      this.contact.hora = firebase.firestore.FieldValue.serverTimestamp();
      this.contact.dispositivo= 'Android';
      this.contact.sincronizado = false;

      this.contactService.addContact(this.contact).then(() => {
        this.router.navigateByUrl('/');
        this.showToast('Mensaje enviado');
      }, err => {
        this.showToast('Su mensaje no pudo ser enviado :(');
      });
    }

    showToast(msg) {
      this.toastCtrl.create({
        message: msg,
        duration: 2000
      }).then(toast => toast.present());
    }
   

}
