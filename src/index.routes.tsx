import { createElement } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { CoreRoutes } from './modules/core/core.routes';
import appUrlConfigurator from './modules/core/utils/appUrlResolver';

appUrlConfigurator.setBaseHrefAndTenantCode();
console.log('After Base Href Set ', appUrlConfigurator.getBaseHref());
const router = createBrowserRouter([...CoreRoutes], {
  basename: appUrlConfigurator.getBaseHref()
});

export function Router(): JSX.Element {
  return createElement(RouterProvider, { router });
}

// Clean up on module reload (HMR)
// https://vitejs.dev/guide/api-hmr
if (import.meta.hot != null) {
  import.meta.hot.dispose(() => {
    router.dispose();
  });
}
