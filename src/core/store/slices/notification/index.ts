import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Custom Types
import type { NotificationStateProps } from 'components/common/Notification';
import type { AlertColor } from 'components/core/Alert';

interface StoreProps extends NotificationStateProps {
  redirectTitle?: string;
  redirectUrl?: string;
  redirectButtonColor?: AlertColor | '';
}

const initialState: StoreProps = {
  message: '',
  severity: 'success',
  duartion: 2500,
  redirectUrl: '',
  redirectTitle: '',
  redirectButtonColor: '',
};

export const notificationSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    addAlert: (state, action: PayloadAction<StoreProps>) => {
      state = action.payload;
      return state;
    },
    reInitialAlert: (state) => {
      state = initialState;
      return state;
    },
  },
  extraReducers: (builder) => {
    builder.addCase('/nontification/close', (state) => {
      state = initialState;
    });
  },
});

export const { addAlert, reInitialAlert } = notificationSlice.actions;
export default notificationSlice.reducer;
