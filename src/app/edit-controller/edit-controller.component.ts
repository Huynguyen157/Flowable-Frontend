import { Component, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-edit-controller',
  templateUrl: './edit-controller.component.html',
  styleUrls: ['./edit-controller.component.css']
})
export class EditControllerComponent {
  editorFactory: Promise<any>;

  constructor(){
    this.editorFactory = new Promise((resolve, reject)=>{
      
    })
  }

}
