// import { Navigate } from 'react-router-dom';

// import checkIfLogin from '../authentication/utils/LoginHelper';

import { RootError } from '../shared/components/route-error';
import Demo from './pages/Demo/Demo.component';

// import appUrlConfigurator from './utils/appUrlResolver';

export const CoreRoutes = [
  {
    path: '',
    element: <Demo />,
    errorElement: <RootError />,
    loader: () => {
      // await checkIfLogin();
      return null;
    }
  }
];
