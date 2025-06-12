import { mockRootState } from "@/shared/utils/test.utils";
import topicReducer, { initialState, selectCurrentTopic, selectTopics, TopicSliceActions } from "../models/slice";
import { TopicPreview } from "@/features/UserChat/types";

const testData: TopicPreview[] = [
  {topic: "Fellings", created_at: 5},
  {topic: "Ache", created_at: 6},
  {topic: "Legs", created_at: 7}
]

describe("Test for topics slice", () => {
  test("returns initialState for unknown action", () => {
    const state = topicReducer(initialState, { type: "unknown_action" });
    expect(state).toStrictEqual(initialState);
  });

  // reducer test
  test("switchTopic action", () => {
    const state = topicReducer(
      initialState,
      TopicSliceActions.switchTopic("Bubbles")
    );

    expect(state.currentTopic).toBe("Bubbles");
  });

  test("switchTopic handles empty data correctly", () => {
    const state = topicReducer(
      initialState,
      TopicSliceActions.switchTopic("")
    );
    
    expect(state.currentTopic).toBe(initialState.currentTopic);
  });

  test("switchCreatingTopic action", () => {
    const state = topicReducer(
      initialState,
      TopicSliceActions.switchCreatingTopic()
    );

    expect(state.isTopicCreating).not.toBe(initialState.isTopicCreating);
  });

  test("setTopics action", () => {
    const state = topicReducer(
      initialState,
      TopicSliceActions.setTopics(testData)
    );

    expect(state.topics).toStrictEqual(testData);
  });

  test("setTopics handles empty data correctly", () => {
    const state = topicReducer(
      initialState,
      TopicSliceActions.setTopics([])
    );
    
    expect(state.topics).toStrictEqual([...initialState.topics]);
  });

  test("addTopic action", () => {
    let state = topicReducer(initialState, TopicSliceActions.setTopics(testData));
    state = topicReducer(
      state,
      TopicSliceActions.addTopic({topic: "Bubbles", created_at: 9})
    );

    expect(state.topics).toStrictEqual([...testData, {topic: "Bubbles", created_at: 9}]);
  });

  test("addTopic handles empty data correctly", () => {
    const state = topicReducer(
      initialState,
      TopicSliceActions.addTopic({topic: "", created_at: 0})
    );
    
    expect(state.topics).toStrictEqual([...initialState.topics]);
  });

  // action creator test
  test("openTopic action has correct type", () => {
    expect(TopicSliceActions.openTopic.type).toBe("topics/openTopic");
  });

  test("registerTopic action has correct type", () => {
    expect(TopicSliceActions.registerTopic.type).toBe("topics/registerTopic");
  });

  test("getTopics action has correct type", () => {
    expect(TopicSliceActions.getTopics.type).toBe("topics/getTopics");
  });

  // selector test
  test("selectCurrentTopic selector returns correct value", () => {
    const state = mockRootState({ topics: {...initialState, currentTopic: "Bubbles"} });
    expect(selectCurrentTopic(state)).toBe("Bubbles");
  });

  test("selectTopics selector returns correct value", () => {
    const state = mockRootState({ topics: {...initialState, topics: testData} });
    expect(selectTopics(state)).toStrictEqual(testData);
  });
});