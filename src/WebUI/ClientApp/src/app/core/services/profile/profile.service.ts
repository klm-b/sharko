import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AppConfig } from 'src/app/config/app-config.interface';
import { APP_CONFIG } from 'src/app/config/app-config.module';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private httpClient: HttpClient) {}

  updateAvatar(file: Blob, fileName: string) {
    const formData = new FormData();
    formData.append('file', file, fileName);

    return this.httpClient.post(`api/profile/avatar`, formData);
  }

  updateProfile(profileData: any) {
    return this.httpClient.put(`api/profile/personal`, profileData);
  }
}
