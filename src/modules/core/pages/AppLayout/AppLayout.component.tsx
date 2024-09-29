// import { useEffect } from 'react';
import { useEffect } from 'react';
import { Flex, Layout } from 'antd';
import { Outlet } from 'react-router-dom';

import { useGetMasterDataQuery } from '../../../vision/api/imageAnnotationsApi';
import { IUseCaseData } from '../../../vision/interfaces/imageAnnotation.interface';
import { IPrompt } from '../../../vision/interfaces/masterData.interface';
import { ModelId } from '../../../vision/interfaces/model.interface';
import AppHeader from '../../components/Header/Header.component';
import LeftPane from '../../components/LeftPane/LeftPane.component';

// import appUrlConfigurator from '../../utils/appUrlResolver';

const { Content } = Layout;

const AppLayout: React.FC = () => {
  const { data } = useGetMasterDataQuery();
  // useEffect(() => {
  //   const accessToken: string = localStorage.getItem('accessToken') ?? '';
  //   if (!accessToken?.length) {
  //     window.location.replace(
  //       `${appUrlConfigurator.getAuthUrl()}/login?tenantCode=${appUrlConfigurator.getTenantCode()}`
  //     );
  //   }
  // }, []);

  useEffect(() => {
    if (data) {
      const existingData = localStorage.getItem('useCaseSettings');
      if (!existingData) {
        const transformedData = data.usecases.map((usecase: IUseCaseData) => {
          const prompt = data.prompts?.find((item: IPrompt) => item.id === `${usecase.id}-prompt1`);

          return {
            usecase_id: usecase.id,
            model_id: ModelId.GeminiInference,
            prompt_id: prompt ? prompt.id : null
          };
        });

        localStorage.setItem('useCaseSettings', JSON.stringify(transformedData));
      }
    }
  }, [data]);

  return (
    <Flex className="h-screen w-screen">
      <Layout>
        <LeftPane items={[]} />
        <Layout className="bg-slate-100">
          <AppHeader />
          <Content className="bg-white">
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Flex>
  );
};

export default AppLayout;
