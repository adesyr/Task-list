import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { NavController, ToastController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.page.html',
  styleUrls: ['./form.page.scss']
})
export class FormPage implements OnInit {
  // Etape 4: oncrée l'objet
  public task = {
    taskName: ' ',
    done: false
  };

  constructor(
    private taskService: TaskService,
    private navCtrl: NavController,
    private toastCtrl: ToastController,
    private route: ActivatedRoute
  ) {
    // Etape 10

    // Etape 10: On récupère l'id de l'élément à modifier
    let id = this.route.snapshot.params['id'];
    console.log(id);
    if (id) {
      this.taskService
        .findOne(id)
        .subscribe(
          (data: any) => (this.task = data),
          err => this.manageError(err)
        );
    }
  }

  ngOnInit() {}

  // Pour afficcher toast d'erreur
  private async manageError(err) {
    console.log(err);
    const toast = await this.toastCtrl.create({
      message: 'Une erreur nous empêche d\'acceder à votre demande',
      duration: 1000,
      position: 'middle'
    });
    toast.present();
  }

  // Etape 6: On fait la fonction addTask du bouton  ET
  // Etape 8: on injecte la methode 'insert'
  addTask() {
    if (this.task.taskName && this.task.taskName.trim() != '') {
      if ('id' in this.task) {
        this.updateTask();
      } else {
        this.insertTask();
      }
    }
  }
  private updateTask() {
    this.taskService.update(this.task)
    .subscribe(
      () => this.navCtrl.back(),
      (err) => this.manageError(err)
    );
  }

  private insertTask() {
    this.taskService.insert(this.task).subscribe(
      // callback de succès
      () => this.navCtrl.back(), // Retour à la page mise à jour
      // callback d'erreur
      // Retour à la page mise à jour
      err => this.manageError(err)
    );
  }
}
