import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { NavController, AlertController } from '@ionic/angular';
import { AlertButton } from '@ionic/core';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.page.html',
  styleUrls: ['./tasks-list.page.scss']
})
export class TasksListPage implements OnInit {
  // Etape 1: Variable pour stocker les données
  public taskList: Array<{ id: number; taskName: string; done: boolean }> = [];

  constructor(
    private taskService: TaskService,
    private navCtrl: NavController,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {}

  ionViewDidEnter() {
    // Etape 2: appel a l'api
    this.loadTasks();
  }
  private loadTasks() {
    this.taskService.findAll().subscribe((data: any) => {
      this.taskList = data;
    });
  }

  // Etape 9:
  editTask(taskId) {
    this.navCtrl.navigateForward('/form/' + taskId);
  }

  async deleteTask(taskId) {
    const confirm = await this.alertCtrl.create({
      // Fenetre de confiramtion
      message: 'Êtes-vous certain(e) de vouloir supprimer cet élément ?',
      header: 'Confirmation',
      buttons: [
        {
          text: 'Oui',
          handler: () => {
            this.taskService.delete(taskId).subscribe(() => this.loadTasks());
          }
        },
        {
          text: 'Non',
          role: 'cancel'
        }
      ]
    });

    confirm.present();
  }
}
// --------------------- OU -------------------------------
// On crée dabord les boutons et on les rappelle dans le create

// async deleteTask(taskId) {

// const okButton: AlertButton =   {
//           text: 'Oui',
//           handler: () => {
//             this.taskService.delete(taskId)
//             .subscribe(
//               () => this.loadTasks() );
//           }

// const noButton: AlertButton = {
//           text: 'Non',
//           role: 'cancel'
//         }

//   let confirm = await this.alertCtrl.create(
//     {             // Fenetre de confiramtion
//       message: 'Êtes-vous certain(e) de vouloir supprimer cet élément ?',
//       header: 'Confirmation',
//       buttons: [ okButton, noButton ]//
//         },
//     }
//   );
// confirm.present();
