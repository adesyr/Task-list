import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthenticationService } from './services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [
    {
      title: 'Login',
      url: '/login',
      icon: 'key'
    },
    {
      title: 'Accueil',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Liste',
      url: '/list',
      icon: 'list'
    },
    {
      title: 'A faire',
      url: '/tasks-list',
      icon: 'create'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthenticationService,
    private router: Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.authService.authenticationState.subscribe(
        (state) => {
          if (state) {
            this.router.navigate( ['tasks-list']); // Si etat ok on repart à la liste
          } else {
            this.router.navigate( ['login']); // sinon retour à la page login
          }
        }
      );
    });
  }
}
