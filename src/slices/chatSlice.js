import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  messageLog: []
}

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    messageAdded(state, action) {
      state.messageLog = action.payload
    }
  }
})

export const { messageAdded } = chatSlice.actions

export default chatSlice.reducer

export const selectAllMessages = (state) => state.messageLog