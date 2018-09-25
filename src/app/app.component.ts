import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  //title = 'app';
  //file:any;

  /*fileChanged(e) {
      this.file = e.target.files[0];
      console.log('capturado');
      let fileReader = new FileReader();
      fileReader.onload = (e) => {
        console.log(fileReader.result);
      }
      fileReader.readAsText(this.file);
  }*/
}
