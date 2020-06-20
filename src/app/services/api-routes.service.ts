import { Injectable } from '@angular/core';
import { environment } from "@environments";

@Injectable({
  providedIn: 'root'
})
export class ApiRoutesService {

  public readonly login: string;
  public readonly registration: string;

  constructor() {
    const apiConfig = environment.apiConfig;

    this.login = `${apiConfig.host}/${apiConfig.routes.api.baseUrl}/${apiConfig.routes.api.login}`;
    this.registration = `${apiConfig.host}/${apiConfig.routes.api.baseUrl}/${apiConfig.routes.api.registration}`;
  }
}