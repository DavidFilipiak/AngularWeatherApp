import { Component } from '@angular/core';
import { WeatherService } from './services/weather.service';
import * as countries_json from '../assets/countries.json';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public citySearch: string = '';
  public city: any;
  public countries = (countries_json as any).default;

  constructor(
    private weatherService: WeatherService,
    private title: Title,
  ) { }

  ngOnInit() {
    this.title.setTitle('World Weather');
  }

  searchCity() {
    if (!this.citySearch) {
      alert('Please enter a city name');
      return;
    }
    this.weatherService.getWeatherForCity(this.citySearch).subscribe({
      next: (data: any) => {
        data.weather[0].iconUrl = this.weatherService.getWeatherIcon(data.weather[0].icon);
        data.countryName = this.getCountryName(data.sys.country);
        data.time = this.getCountryTime(data.timezone);
        this.city = data;
      },
      error: (error) => {
        if (error.status == 404) {
          alert('City not found');
        }
        else {
          alert('An unknown error occurred.');
        }
      }
    });
  }

  getCountryName(code: string) {
    const country = this.countries.find((country: any) => country.code === code);
    return country ? country.name : code;
  }

  getCountryTime(timezone: number) {
    const timeNow = new Date();
    const time = new Date(timeNow.getTime() + (timeNow.getTimezoneOffset() * 60 * 1000) + (timezone * 1000));
    const timeString = time.toLocaleTimeString();
    const dateString = time.toLocaleDateString();
    return timeString + ', ' + dateString;
  }

}
