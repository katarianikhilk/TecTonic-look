import appUrlConfigurator from '../../core/utils/appUrlResolver';

interface AuthInfo {
  tenantId: string | null;
  accessToken: string | null;
  refreshToken: string | null;
}

const checkIfLogin: () => Promise<void> = (): Promise<void> => {
  const { tenantId, accessToken, refreshToken } = getParams();
  replaceSearchParams();
  if (tenantId && accessToken && refreshToken) {
    localStorage.setItem('am_accessToken', accessToken);
    localStorage.setItem('am_refreshToken', refreshToken);
    localStorage.setItem('am_tenantId', tenantId);
  }
  const localAccessToken: string = localStorage.getItem('am_accessToken') ?? '';
  if (!localAccessToken?.length) {
    console.log('window.location.href ', window.location.href);
    window.location.replace(
      `${appUrlConfigurator.getAuthUrl()}/login?tenantCode=${appUrlConfigurator.getTenantCode()}&redirectURL=${
        window.location.href
      }`
    );
  }
  return Promise.resolve();
};

const getParams: () => AuthInfo = (): AuthInfo => {
  const urlParams: URLSearchParams = new URLSearchParams(window.location.search);
  const tenantId: string | null = urlParams.has('tenantId') ? urlParams.get('tenantId') : '';
  const accessToken: string | null = urlParams.has('accessToken')
    ? urlParams.get('accessToken')
    : '';
  const refreshToken: string | null = urlParams.has('refreshToken')
    ? urlParams.get('refreshToken')
    : '';
  return { tenantId, accessToken, refreshToken };
};

const replaceSearchParams: () => void = () => {
  const url = new URL(window.location.href);
  url.searchParams.delete('tenantId');
  url.searchParams.delete('accessToken');
  url.searchParams.delete('refreshToken');
  history.replaceState(history.state, '', url.href);
};

export default checkIfLogin;
