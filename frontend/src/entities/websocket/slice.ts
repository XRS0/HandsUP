import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';

type WebSocketState = {
  message: string[];     // it's a splited arr of message
  newMessage: string;
  markdown: string;
  isRecording: boolean;
  isEditingNow: boolean;    // if user wants to edit text
}

const initialState: WebSocketState = {
  message: `Lorem ipsum odor amet, consectetuer adipiscing elit. Mollis potenti morbi pellentesque sodales suscipit ultricies. Tellus hac primis vestibulum aliquet platea convallis gravida, quam suspendisse. Praesent consequat`.split(" "),
  newMessage: '',   //проверяться через новое сообщение, если чел отменил то мы откатываемся до сообщения
  markdown: `# Pluto

**Pluto** (minor-planet designation: *134340 Pluto*)
is a
[dwarf planet](https://en.wikipedia.org/wiki/Dwarf_planet)
in the
[Kuiper belt](https://en.wikipedia.org/wiki/Kuiper_belt).
Lorem ipsum odor amet, consectetuer adipiscing elit. Mollis potenti morbi pellentesque sodales suscipit ultricies. Tellus hac primis vestibulum aliquet platea convallis gravida, quam suspendisse. Praesent consequat
***
## History
In the 1840s,
[Urbain Le Verrier](https://wikipedia.org/wiki/Urbain_Le_Verrier)
used Newtonian mechanics to predict the position of the
then-undiscovered planet
[Neptune](https://wikipedia.org/wiki/Neptune)
after analyzing perturbations in the orbit of
[Uranus](https://wikipedia.org/wiki/Uranus).
Lorem ipsum odor amet, consectetuer adipiscing elit. Mollis potenti morbi pellentesque sodales suscipit ultricies. Tellus hac primis vestibulum aliquet platea convallis gravida, quam suspendisse. Praesent consequat

\`\`\`js
console.log('Hi pluto!')
\`\`\`
`,
  isRecording: false,
  isEditingNow: false
};

const socketSlice = createSlice({
  name: "ws",
  initialState,
  reducers: {
    addMessage(state, action: PayloadAction<string>) {
      state.message.push(action.payload);
    },
    editMessage(state, action: PayloadAction<string>) {
      state.newMessage = action.payload;
    },
    setMessage(state) {
      state.message = state.newMessage.split(" ");
      state.newMessage = "";
    },
    handleOpen(state) {
      state.isRecording = true;
    },
    handlePause(state) {
      state.isRecording = false;
    },
    allowEdit(state) {
      state.isEditingNow = !state.isEditingNow;
    },
  }
});

export const socketSliceActions = {
  ...socketSlice.actions,
  handleMessage: createAction<string>(`${socketSlice.name}/handleMessage`),
  handleAvaliableData: createAction<string>(`${socketSlice.name}/handleAvaliableData`)
};

export default socketSlice.reducer;