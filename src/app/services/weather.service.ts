import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, pipe, catchError, of } from "rxjs";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  constructor(private http: HttpClient) {}

  getWeatherForCity(citySearch: string): Observable<any> {
    return this.http.get('https://api.openweathermap.org/data/2.5/weather?q=' + citySearch + '&APPID=' + environment.openWeatherKey + '&units=metric');
  }

  getWeatherIcon(code: string): string {
    return 'https://openweathermap.org/img/wn/' + code + '@2x.png';	
  }

}