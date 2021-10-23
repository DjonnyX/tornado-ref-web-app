import { Component, OnInit, OnDestroy, Output, EventEmitter, Input, ViewEncapsulation } from '@angular/core';
import { BaseComponent } from '@components/base/base-component';
import {
  IAccount, IAd, IAppTheme, IBackupInfo, IBusinessPeriod, ICurrency, ILanguage, ILicenseAccount, IOrderType,
  IProduct, IRole, ISelector, IStore, ITag, ITerminal, SelectorTypes, TerminalTypes, UserRights
} from '@djonnyx/tornado-types';
import { IUserProfile } from '@models';
import { LocalizationService } from '@app/services/localization/localization.service';
import moment from 'moment';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'ta-dashboard-component',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DashboardComponent extends BaseComponent implements OnInit, OnDestroy {

  public readonly SelectorTypes = SelectorTypes;

  // profile

  @Input() isProcessProfile: boolean;

  @Input() profile: IUserProfile;

  // employees

  @Input() isProcessEmployees: boolean;

  @Input() accounts: Array<IAccount>;

  @Input() roles: Array<IRole>;

  // menu

  @Input() isProcessMenu: boolean;

  @Input() products: Array<IProduct>;

  @Input() categories: Array<ISelector>;

  @Input() schemesOfModifiers: Array<ISelector>;

  @Input() tags: Array<ITag>;

  // additional

  @Input() isProcessAdditional: boolean;

  currenciesNames: string;

  private _currencies: Array<ICurrency>;
  @Input() set currencies(v: Array<ICurrency>) {
    if (this._currencies !== v) {
      this._currencies = v;

      this.currenciesNames = this._currencies?.map(l => l.name)?.join(", ");
    }
  }
  get currencies() { return this._currencies; }

  languagesNames: string;

  private _languages: Array<ILanguage>;
  @Input() set languages(v: Array<ILanguage>) {
    if (this._languages !== v) {
      this._languages = v;

      this.languagesNames = this._languages?.map(l => l.name)?.join(", ");
    }
  }
  get languages() { return this._languages; }

  orderTypesNames: string;

  private _orderTypes: Array<IOrderType>;
  @Input() set orderTypes(v: Array<IOrderType>) {
    if (this._orderTypes !== v) {
      this._orderTypes = v;

      this.orderTypesNames = this._orderTypes?.map(l => l.contents?.[this.defaultLanguage?.code]?.name)?.join(", ");
    }
  }
  get orderTypes() { return this._orderTypes; }

  businessPeriodsNames: string;

  private _businessPeriods: Array<IBusinessPeriod>;
  @Input() set businessPeriods(v: Array<IBusinessPeriod>) {
    if (this._businessPeriods !== v) {
      this._businessPeriods = v;

      this.businessPeriodsNames = this._businessPeriods?.map(l => l.contents?.[this.defaultLanguage?.code]?.name)?.join(", ");
    }
  }
  get businessPeriods() { return this._businessPeriods; }
  // ads

  @Input() isProcessAds: boolean;

  @Input() splashScreens: Array<IAd>;

  @Input() splashScreensUnavailable: Array<IAd>;

  @Input() banners: Array<IAd>;

  // settings

  @Input() isProcessSettings: boolean;

  licensesKiosk: Array<ILicenseAccount>;

  licensesEq: Array<ILicenseAccount>;

  licensesOrderPicker: Array<ILicenseAccount>;

  private _licenses: Array<ILicenseAccount>;
  @Input() set licenses(v: Array<ILicenseAccount>) {
    if (this._licenses !== v) {
      this._licenses = v;

      this.resetLicenses();
    }
  }
  get licenses() { return this._licenses; }

  private resetLicenses() {
    this.licensesKiosk = this._licenses?.filter(l => this._terminalsDictionary?.[l.terminalId]?.type === TerminalTypes.KIOSK);
    this.licensesEq = this._licenses?.filter(l => this._terminalsDictionary?.[l.terminalId]?.type === TerminalTypes.EQUEUE);
    this.licensesOrderPicker = this._licenses?.filter(l => this._terminalsDictionary?.[l.terminalId]?.type === TerminalTypes.ORDER_PICKER);
  }

  terminalsKiosk: Array<ITerminal>;

  terminalsEq: Array<ITerminal>;

  terminalsOrderPicker: Array<ITerminal>;

  private _terminalsDictionary: { [id: string]: ITerminal } = {};
  private _terminals: Array<ITerminal>;
  @Input() set terminals(v: Array<ITerminal>) {
    if (this._terminals !== v) {
      this._terminals = v;

      this._terminalsDictionary = {};
      for (const terminal of this._terminals) {
        this._terminalsDictionary[terminal.id] = terminal;
      }

      this.terminalsKiosk = this._terminals?.filter(t => t.type === TerminalTypes.KIOSK);

      this.terminalsEq = this._terminals?.filter(t => t.type === TerminalTypes.EQUEUE);

      this.terminalsOrderPicker = this._terminals?.filter(t => t.type === TerminalTypes.ORDER_PICKER);

      this.resetLicenses();
    }
  }
  get terminals() { return this._terminals; }

  storesNames: string;

  private _stores: Array<IStore>;
  @Input() set stores(v: Array<IStore>) {
    if (this._stores !== v) {
      this._stores = v;

      this.storesNames = this._stores?.map(s => s.name)?.join(", ");
    }
  }
  get stores() { return this._stores; }

  backupLastCreate: string;

  private _backupInfo: IBackupInfo;
  @Input() set backupInfo(v: IBackupInfo) {
    if (this._backupInfo !== v) {
      this._backupInfo = v;

      this.backupLastCreate = this._backupInfo?.lastCreate ? moment(this._backupInfo?.lastCreate).format("DD-MM-YYYY") : "---";
    }
  }
  get backupInfo() { return this._backupInfo; }

  // themes

  @Input() isProcessThemes: boolean;

  @Input() kioskThemes: Array<IAppTheme>;

  @Input() eqThemes: Array<IAppTheme>;

  @Input() orderPickerThemes: Array<IAppTheme>;

  @Input() defaultLanguage: ILanguage;

  @Input() rights: Array<UserRights>;

  constructor(
    public readonly localization: LocalizationService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
  ) {
    super();
  }

  ngOnInit(): void { }

  onEditProfile() {
    this._router.navigate(["../profile"], {
      relativeTo: this._activatedRoute,
    });
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }
}
