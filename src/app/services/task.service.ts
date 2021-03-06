import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  static readonly URL = 'http://localhost:3000/tasks';

  constructor(private http: HttpClient) {}
  // Pour retourner l'intégralité des taches
  public findAll() {
    return this.http.get(TaskService.URL);
  }

  // Etape 7: On insère une tâche à la liste avec 'post'
  public insert(task) {
    return this.http.post(TaskService.URL, task);
  }

  public update(task) {
    return this.http.put(TaskService.URL + '/' + task.id, task);
  }

  public delete(taskId) {
    return this.http.delete(TaskService.URL + '/' + taskId);
  }

  findOne(id: any) {
    return this.http.get(TaskService.URL + '/' + id);
  }
}
