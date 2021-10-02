import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { OidcSecurityService, UserDataResult } from 'angular-auth-oidc-client';
import { MessageService } from 'primeng/api';
import { Observable, of } from 'rxjs';
import { catchError, delay, filter, map, switchMap, tap } from 'rxjs/operators';
import { User } from 'src/app/core/models/user/user';
import { ProfileService } from 'src/app/core/services/profile/profile.service';
import { UsersService } from 'src/app/core/services/users/users.service';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.scss'],
})
export class PersonalComponent implements OnInit {
  constructor(
    private oidcSecurityService: OidcSecurityService,
    private usersService: UsersService,
    private profileService: ProfileService,
    private messageService: MessageService,
    private router: Router
  ) {}

  profileForm = new FormGroup({
    userName: new FormControl(
      '',
      [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.-]*$'),
        Validators.minLength(3),
        Validators.maxLength(20),
      ],
      [this.usernameValidator()]
    ),
    status: new FormControl(''),
    bio: new FormControl(''),
  });

  userData$!: Observable<UserDataResult>;
  user$!: Observable<User | null>;
  userName!: string;
  isValidationProcess: boolean = false;
  isValidationSucceed: boolean = false;
  disableSubmit: boolean = false;

  ngOnInit(): void {
    this.userData$ = this.oidcSecurityService.userData$;
    this.userName = this.oidcSecurityService.getUserData()?.name;
    this.user$ = this.usersService
      .getUser(this.userName)
      .pipe(tap((user) => this.profileForm.patchValue(user ?? {})));
  }

  submit() {
    this.disableSubmit = true;

    this.messageService.add({
      severity: 'info',
      summary: 'Данные загружаются',
      detail: 'Подождите несколько секунд',
    });

    if (!this.profileForm.invalid) {
      this.profileService.updateProfile(this.profileForm.value).subscribe(
        () => {
          this.oidcSecurityService
            .forceRefreshSession()
            .subscribe(({ userData }) => {
              this.router.navigate(['/user', userData?.name], {
                state: { data: { clearCache: true } },
              });

              this.messageService.add({
                severity: 'success',
                summary: 'Профиль обновлен',
                detail: 'Новые данные успешно загружены!',
              });
            });
        },
        () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Ошибка',
            detail: 'При обновлении произошла ошибка.',
          });
          this.disableSubmit = false;
        }
      );
    }
  }

  usernameValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return of(control.value).pipe(
        tap((value) => {
          if (this.isValidationSucceed) this.isValidationSucceed = false;
          if (!this.isValidationProcess) this.isValidationProcess = true;
          if (value === this.userName) this.isValidationProcess = false;
        }),
        delay(1000),
        filter((value) => value !== this.userName),
        switchMap((username) =>
          this.usersService.checkAvailability(username).pipe(
            map((isAvail) => {
              this.isValidationProcess = false;
              this.isValidationSucceed = isAvail;
              return isAvail ? null : { unavailable: true };
            }),
            catchError((err) =>
              of({
                error: err,
              })
            )
          )
        )
      );
    };
  }
}
