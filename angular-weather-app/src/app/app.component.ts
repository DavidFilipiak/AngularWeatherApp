import { Component } from '@angular/core';
import { WeatherService } from './services/weather.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public citySearch: string = '';
  public city: any;

  constructor(
    private weatherService: WeatherService
  ) { }

  ngOnInit() {

  }

  searchCity() {
    this.weatherService.getWeatherForCity(this.citySearch).subscribe({
      next: (data: any) => {
        console.log(data);
        data.weather[0].iconUrl = this.weatherService.getWeatherIcon(data.weather[0].icon);
        this.city = data;
      },
      error: (error) => {
        alert(error.error.message);
      }
    });
  }

}
