import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EnvioRequest } from '../model/contact.model';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {
  formContacto: FormGroup = this.formBuilder.group({});

  constructor(private formBuilder: FormBuilder) {
    this.formContacto = this.formBuilder.group({
      contactname: ['',[Validators.required, Validators.minLength(5)]],
      contactemail: ['',[Validators.required, Validators.email]],
      contactmessage: ['',[Validators.required]]
    });

  }

  ngOnInit(): void {
  }

  Enviar(): void{
    const nombre = this.formContacto.get("contactname")?.value;
    const email = this.formContacto.get("contactemail")?.value;
    const mensaje = this.formContacto.get("contactmessage")?.value;

    const data = {
      nombre: nombre,
      email: email,
      mensaje: mensaje
    } as EnvioRequest

  }
}
