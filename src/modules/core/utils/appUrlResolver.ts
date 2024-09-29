const APP_ANCHOR_PREFIX: string = import.meta.env.VITE_APP_ANCHOR_PREFIX;
const BASE_URL: string = import.meta.env.VITE_BASE_URL;
const DEFAULT_TENANT: string = import.meta.env.VITE_DEFAULT_TENANT;

export class AppUrlConfigurator {
  private static _appUrlConfiguratorInstance: AppUrlConfigurator;
  baseHref: string;
  tenantCode: string;
  authUrl: string;
  backendUrl: string;
  commonServiceUrl: string;

  static get instance() {
    if (this._appUrlConfiguratorInstance) {
      return this._appUrlConfiguratorInstance;
    } else {
      this._appUrlConfiguratorInstance = new AppUrlConfigurator();
      return this._appUrlConfiguratorInstance;
    }
  }

  constructor() {
    this.baseHref = '/';
    this.tenantCode = DEFAULT_TENANT;
    this.authUrl = '';
    this.backendUrl = '';
    this.commonServiceUrl = '';
  }

  public setBaseHrefAndTenantCode(): void {
    const pathName = window.location.pathname;
    const pathSplit = pathName.split('/');
    const anchorPrefix: string = pathSplit?.[1];
    if (anchorPrefix === APP_ANCHOR_PREFIX) {
      const localTenantCode: string = pathSplit[1];
      this.baseHref = `/${APP_ANCHOR_PREFIX}`;
      this.tenantCode = localTenantCode;
    }
    this.authUrl = `${BASE_URL}/${this.tenantCode}/auth/${APP_ANCHOR_PREFIX}`;
    this.backendUrl = `${BASE_URL}/${this.tenantCode}/api/${APP_ANCHOR_PREFIX}`;
    this.commonServiceUrl = `${BASE_URL}/${this.tenantCode}/api`;

    console.log('App URLs configured for Tenant ---> ', this.tenantCode);
    console.log('Base Href ', this.baseHref);
    console.log('Auth URL ', this.authUrl);
    console.log('Backend URL ', this.backendUrl);
  }

  public getBaseHref(): string {
    return this.baseHref;
  }

  public getTenantCode(): string {
    return this.tenantCode;
  }

  public getAuthUrl(): string {
    return this.authUrl;
  }

  public getBackendUrl(): string {
    return this.backendUrl;
  }

  public getCommonServiceUrl(): string {
    return this.commonServiceUrl;
    // return 'http://127.0.0.1:8003';
  }
}

export default AppUrlConfigurator.instance;
