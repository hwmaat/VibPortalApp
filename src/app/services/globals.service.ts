import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IAppConfig } from '../models/app-config.model';


@Injectable({
    providedIn: 'root'
  })

  export class Globals {
    static settingsStatic: IAppConfig= <IAppConfig>{};
    public clientIp: BehaviorSubject<string> = new BehaviorSubject<string>('');

    private settingsBehaviourSubject: BehaviorSubject<IAppConfig> = new BehaviorSubject<IAppConfig>(<IAppConfig>{});
    public settings$ : Observable<IAppConfig>;
    private _settingsValue:IAppConfig = <IAppConfig>{};
      set settingsValue(value: IAppConfig) {
        this.settingsBehaviourSubject.next(value);
        this._settingsValue= value;
        }
      get settingsValue() {
        return this._settingsValue;
      }

      constructor() {
        this.settings$ = this.settingsBehaviourSubject.asObservable();
      }
      
  }