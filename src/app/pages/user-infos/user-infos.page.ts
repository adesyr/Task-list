import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-infos',
  templateUrl: './user-infos.page.html',
  styleUrls: ['./user-infos.page.scss'],
})
export class UserInfosPage implements OnInit {

  public user = {
    name: {
      first: '',
      last: ''
    },
    location: {
        street: '',
        postcode: '',
        city: ''
      }

    };


  // pour récupérer info de l'utilisateur
constructor(private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe(
      () => {
        if (router.getCurrentNavigation().extras.state.user) {
             this.user = router.getCurrentNavigation().extras.state.user;
             console.log(this.user);
        }

      }
    );
  }

ngOnInit() { }
}
