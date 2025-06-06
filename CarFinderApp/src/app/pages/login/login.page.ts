import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AlertController } from '@ionic/angular';  // Importamos AlertController para mostrar mensajes

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  email: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertController: AlertController  // Inyectamos el controlador de alertas
  ) {}

  async login() {
    if (!this.email || !this.password) {  // Validación simple para verificar que los campos no están vacíos
      this.showAlert('Campos vacíos', 'Por favor ingrese su correo y contraseña.');
      return;
    }

    try {
      await this.authService.login(this.email, this.password);
      this.router.navigate(['/tabs']);  // Redirige a los tabs después de iniciar sesión correctamente
    } catch (error) {
      console.error(error);
      this.showAlert('Error de autenticación', 'Correo o contraseña incorrectos.');
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
