import { handleRecievedMessage } from "../models/saga";

describe("WebSocket saga test", () => {
  test("func is done", () => {
    const generator = handleRecievedMessage({ 
      payload: "word"
    });

    generator.next();
    expect(generator.return().done).toEqual(true);
  });
})