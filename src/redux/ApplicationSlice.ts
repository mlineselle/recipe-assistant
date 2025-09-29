import { createSlice } from '@reduxjs/toolkit'

interface ApplicationState {
  openDialog: string | null;
}

const initialState: ApplicationState = {
  openDialog: null,
}

export const applicationSlice = createSlice({
  name: 'application',
  initialState,
  reducers: {
    onOpenDialog: (state, {payload}) => {
      state.openDialog = payload;
    },
  },
})

export const { onOpenDialog } = applicationSlice.actions

export default applicationSlice.reducer