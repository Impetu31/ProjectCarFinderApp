import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AlertController } from '@ionic/angular';  // Importamos el controlador de alertas

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage {

  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertController: AlertController  // Inyectamos el controlador de alertas
  ) {}

  // Registrar nuevo usuario
  async register() {
    if (!this.username || !this.email || !this.password || !this.confirmPassword) {
      this.showAlert('Campos vacíos', 'Por favor, complete todos los campos.');
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.showAlert('Las contraseñas no coinciden', 'Las contraseñas deben ser iguales.');
      return;
    }

    try {
      await this.authService.register(this.email, this.password);  // Registrar el usuario
      this.router.navigate(['/login']);  // Redirige a login después de registrar
    } catch (error) {
      console.error(error);
      this.showAlert('Error de registro', 'Hubo un problema al registrar el usuario.');
    }
  }

  // Función para mostrar alertas
  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });

    await alert.present();
  }
}
