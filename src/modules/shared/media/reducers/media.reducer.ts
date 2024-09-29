import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IGroupedItemUpdated, IGroupStore } from '../../../vision/interfaces/useCases.interface';
import { useCaseConfig } from '../../../vision/utils/useCase.config';

export interface IMediaData {
  groups: Record<string, IGroupStore>;
}

const mediaSlice = createSlice({
  reducerPath: 'media',
  name: 'media',
  initialState: {} as IMediaData,
  reducers: {
    setMedia: (state, action: PayloadAction<{ groupedData: Array<IGroupedItemUpdated> }>) => {
      // Initialize an empty object for groups
      const groups: Record<string, IGroupStore> = {};
      // const nameCount = {} as Record<string, number>;
      console.log('media reducer', action.payload.groupedData);

      action.payload.groupedData.forEach((item) => {
        if (item.value !== null) {
          const response = useCaseConfig[item.usecase_id].complianceScore(item);
          // const processedItems = item.items.map((currItem, index) => {
          //   const response = useCaseConfig[currItem.usecase_id as UseCase].complianceScore(
          //     currItem as IItemDetail & IData
          //   );
          //   nameCount[currItem.value] = (nameCount[currItem.value] || 0) + 1;
          //   const val = nameCount[currItem.value];
          //   return {
          //     ...currItem,
          //     id: `${item.usecase_id}-${index}`,
          //     heading: `${currItem.value} ${val}`,
          //     logic: response.logic,
          //     response
          //   };
          // });
          // // Aggregate the compliance data for the group
          // let totalCases = 0,
          // compliantCases = 0,
          // aggregatedComplianceScore = 0;
          // if (item.usecase_id === 'fall-prevention' || item.usecase_id === 'first-aid-kit') {
          //   totalCases = processedItems.reduce(
          //     (total, item) => total + item.response.totalUseCases,
          //     0
          //   );
          //   compliantCases = processedItems.reduce(
          //     (total, item) => total + item.response.compliantUseCases,
          //     0
          //   );
          //   totalCases = 3;
          //   compliantCases = compliantCases > 3 ? 3 : compliantCases;
          //   aggregatedComplianceScore =
          //     totalCases > 0 ? Math.round((compliantCases / totalCases) * 100) : 0;
          // } else {
          // totalCases = response.processedItems.reduce(
          //   (total, item) => total + item.response.totalUseCases,
          //   0
          // );
          // compliantCases = processedItems.reduce(
          //   (total, item) => total + item.response.compliantUseCases,
          //   0
          // );
          // aggregatedComplianceScore =
          //   totalCases > 0 ? Math.round((compliantCases / totalCases) * 100) : 0; // Calculate as a percentage

          groups[item.usecase_id] = {
            ...groups[item.usecase_id],
            isVisible: true,
            isCompliant: response.isCompliant,
            complianceScore: Math.round(response.compliantUseCases / response.totalUseCases) * 100,
            response: {
              totalUseCases: response.totalUseCases,
              compliantUseCases: response.compliantUseCases,
              logic: response.logic
            },
            items: response.processedItems,
            usecase_id: item.usecase_id,
            logic: response.logic
          };
        } else {
          groups[item.usecase_id] = {
            isVisible: true,
            isCompliant: false,
            complianceScore: 0,
            response: {
              totalUseCases: 1,
              compliantUseCases: 0,
              logic: ''
            },
            items: [],
            usecase_id: item.usecase_id,
            logic: ''
          };
        }
      });

      state.groups = groups;
    },
    updateMediaById: (state, action: PayloadAction<{ usecaseId: string }>) => {
      const { usecaseId } = action.payload;

      if (state.groups[usecaseId]) {
        state.groups[usecaseId].isVisible = !state.groups[usecaseId].isVisible;
      }
    }
  }
});

export const { setMedia, updateMediaById } = mediaSlice.actions;
export default mediaSlice;
