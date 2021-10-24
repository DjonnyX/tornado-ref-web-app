import { Component, OnInit } from '@angular/core';
import { AuthService } from '@app/services/auth.service';
import { LocalizationService } from '@app/services/localization/localization.service';
import { DefaultRoleTypes } from '@djonnyx/tornado-types';
import { environment } from '@environments';

@Component({
  selector: 'ta-main-footer',
  templateUrl: './main-footer.component.html',
  styleUrls: ['./main-footer.component.scss']
})
export class MainFooterComponent implements OnInit {
  public readonly isShowDocumentation = ["all", "cms"].indexOf(environment.buildType) > -1 && !this.authService.hasAuthority([DefaultRoleTypes.ADMIN]);

  public readonly isDocumentationMode = ["cms"].indexOf(environment.buildType) > -1;

  host: string;

  constructor(
    public readonly authService: AuthService,
    public readonly localization: LocalizationService,
  ) { }

  ngOnInit(): void {
    this.host = window.location.host.replace(/^(cms\.)/, "");
  }

}
