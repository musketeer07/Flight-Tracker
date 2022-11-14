import { Component } from '@angular/core';
import { faMagnifyingGlass, faPlaneDeparture, faPlane, faLandmark} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  track=faMagnifyingGlass
  airplane=faPlane
  airport=faLandmark
  flight=faPlaneDeparture
}
