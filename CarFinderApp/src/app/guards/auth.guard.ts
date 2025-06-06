import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    // Verifica si el usuario está autenticado
    if (this.authService.getUserState()) {
      return true;
    } else {
      this.router.navigate(['/login']);  // Redirige a login si no está autenticado
      return false;
    }
  }
}
