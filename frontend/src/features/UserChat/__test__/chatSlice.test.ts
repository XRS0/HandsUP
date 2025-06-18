import { ChatSliceActions, initialState } from "../models/slice";
import chatReducer from "../models/slice";
import { Topic, TopicMessage } from "../types";

const testData: Topic = {
  "Bubbles": [
    { from: false, text: "println"}, 
    { from: true, text: "hello word"}
  ]
}

describe("Test for chat slice", () => {
  test("returns initialState for unknown action", () => {
    const state = chatReducer(initialState, { type: "unknown_action" });
    expect(state).toStrictEqual(initialState);
  });

  test("cashTopic action", () => {
    const state = chatReducer(
      initialState,
      ChatSliceActions.cashTopic(testData)
    );

    expect(state.cachedChats).toStrictEqual([testData]);
  });

  test("cashTopic handles empty data correctly", () => {
    const state = chatReducer(
      initialState,
      ChatSliceActions.cashTopic({"": [{ from: false, text: "" }]})
    );
    
    expect(state.cachedChats).toStrictEqual([...initialState.cachedChats]);
  });

  // test("switchChat action", () => {
  //   let state = chatReducer(initialState, ChatSliceActions.cashTopic(testData));
  //   state = chatReducer(state, ChatSliceActions.switchChat("Bubbles")); //используем уже обновленное состояне state

  //   expect(state.chatMessages).toStrictEqual(testData["Bubbles"]);
  // });

  // test("switchChat handles empty data correctly", () => {
  //   const state = chatReducer(
  //     initialState,
  //     ChatSliceActions.switchChat("")
  //   );
    
  //   expect(state.chatMessages).toStrictEqual([...initialState.chatMessages ]);
  // });

  test("addMessage action", () => {
    const newMessage: TopicMessage = { from: false, text: "no, no-no-no"}
    const state = chatReducer(
      initialState,
      ChatSliceActions.addMessage(newMessage)
    );

    expect(state.chatMessages.at(-1)).toStrictEqual(newMessage);
  });

  test("addMessage handles empty data correctly", () => {
    const state = chatReducer(
      initialState,
      ChatSliceActions.addMessage({} as TopicMessage)
    );
    
    expect(state.chatMessages).toStrictEqual([ ...initialState.chatMessages ]);
  });

  test("generateMessage action has correct type", () => {
    expect(ChatSliceActions.generateMessage.type).toBe("chat/generateMessage");
  });

  test("setMessage action has correct type", () => {
    expect(ChatSliceActions.setSumMessage.type).toBe("chat/setSumMessage");
  });
});