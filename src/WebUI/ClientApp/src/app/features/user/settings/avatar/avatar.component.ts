import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import {
  base64ToFile,
  ImageCroppedEvent,
  LoadedImage,
} from 'ngx-image-cropper';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/models/user/user';
import { ProfileService } from 'src/app/core/services/profile/profile.service';
import { UsersService } from 'src/app/core/services/users/users.service';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
})
export class AvatarComponent implements OnInit {
  constructor(
    public oidcSecurityService: OidcSecurityService,
    private profileService: ProfileService,
    private usersService: UsersService,
    private messageService: MessageService,
    private router: Router
  ) {}

  dropzoneHovered: boolean = false;
  user$!: Observable<User | null>;

  ngOnInit() {
    this.user$ = this.usersService.getUser(
      this.oidcSecurityService.getUserData()?.name
    );

    this.croppedImage = this.oidcSecurityService.getUserData()?.picture;
  }

  onSelect(event: any) {
    this.fileChangeEvent(event);
    this.showImageDropDownPanel = false;
  }

  onClear() {
    this.imageFile = null;
    this.showImageDropDownPanel = true;
    this.croppedImage = this.oidcSecurityService.getUserData()?.picture;
    this.dropzoneHovered = false;
  }

  uploadAvatar(elent: any) {
    this.router.navigate([
      '/user',
      this.oidcSecurityService.getUserData()?.name,
    ]);

    this.messageService.add({
      severity: 'info',
      summary: 'Аватар загружается',
      detail: 'Подождите несколько секунд',
    });

    let blob = base64ToFile(this.croppedImage);
    this.profileService.updateAvatar(blob, this.imageFile.name).subscribe(
      () => {
        this.oidcSecurityService.forceRefreshSession().subscribe(() => {
          this.messageService.add({
            severity: 'success',
            summary: 'Файл загружен',
            detail: 'Новый аватар успешно установлен!',
          });
        });
      },
      (error: any) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Ошибка',
          detail: 'При загрузке произошла ошибка.',
        });
      }
    );
  }

  showImageDropDownPanel: boolean = true;

  imageFile: any = '';
  croppedImage: any = '';

  fileChangeEvent(event: any): void {
    this.imageFile = event.files[0];
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }
  imageLoaded(image?: LoadedImage) {
    // show cropper
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message
  }
}
