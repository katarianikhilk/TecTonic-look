import appUrlConfigurator from '../../core/utils/appUrlResolver';

const logOut = () => {
  const tenantId = localStorage.getItem('am_tenantId');
  window.location.replace(`${appUrlConfigurator.getAuthUrl()}/logout?tenantId=${tenantId}`); // add https:// for local testing
  localStorage.clear();
};
export default logOut;
