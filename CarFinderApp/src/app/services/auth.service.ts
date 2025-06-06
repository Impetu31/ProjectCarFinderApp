import { Injectable } from '@angular/core';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) {}

  // Registro de nuevo usuario
  register(email: string, password: string) {
    const auth = getAuth();
    return createUserWithEmailAndPassword(auth, email, password);
  }

  // Iniciar sesión
  login(email: string, password: string) {
    const auth = getAuth();
    return signInWithEmailAndPassword(auth, email, password);
  }

  // Cerrar sesión
  logout() {
    const auth = getAuth();
    return signOut(auth);
  }

  // Obtener estado de usuario
  getUserState() {
    const auth = getAuth();
    return auth.onAuthStateChanged;
  }
}
