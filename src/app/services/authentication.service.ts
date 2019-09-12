import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { BehaviorSubject } from 'rxjs'; // Changement d'état

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private collectionName = 'user';

  public authenticationState = new BehaviorSubject(false);

  constructor(private storage: Storage) { }

  // Se loguer
  public login(credentials) {
    this.storage.set(this.collectionName, credentials)
    .then( () => this.authenticationState.next(true)); // next permet de changer la valeur
  }

// Se déloguer
  public logout() {
    this.storage.remove(this.collectionName) // On détruit l'utilisateur enregistré
  .then( () => this.authenticationState.next(false));
  }

  // Pour récupérer l'utilisateur
  public getUser() {
    return this.storage.get(this.collectionName);
  }

  public isLogged() {
    return this.authenticationState.value;
  }
}
