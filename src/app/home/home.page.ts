import { Component } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { NavController } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  private url: string = 'https://randomuser.me/api';
  // Pour stocker les données
  public userList: Array<any> = [];

  private loadingMode = {
    REPLACE: 0,
    BEFORE: 1,
    AFTER: 2

  }
  constructor(private http: HttpClient, private navCtrl: NavController) {
    // Pour glisser la page et modifier affichage
    this.loadUsers(this.loadingMode.REPLACE, null);
  }


  private loadUsers(mode, callback) {

    const queryParameters = new HttpParams()
    .set('results', '200').set('nat', 'fr').set('gender', 'female').set('seed', '123');
    this.http.get(this.url, {params: queryParameters}).subscribe(
      (response: any) => {
        console.log(response);
        switch (mode) {
            // Si on modifie
          case this.loadingMode.REPLACE:
            this.userList = response.results;
            break;
            // Si on ajoute avant
          case this.loadingMode.BEFORE:
            this.userList = response.results.concat(this.userList);
            break;
            // Si on ajoute après
            case this.loadingMode.AFTER:
              this.userList = this.userList.concat(response.results);
              break;
        }

        if (callback) {
          callback();
        }
    }
  );
}

public doRefresh(even) {
   this.loadUsers(this.loadingMode.BEFORE, () => even.target.complete());

  // even.target.complete();
}

public loadMore(even) {
   this.loadUsers(this.loadingMode.AFTER, () => even.target.complete());
  // even.target.complete();
}

public showDetails(user) {
  console.log(user);
  const extras: NavigationExtras = {
    state: {
      user: user
    }
  };
  this.navCtrl.navigateForward('/user-infos', extras) ;
}
}
