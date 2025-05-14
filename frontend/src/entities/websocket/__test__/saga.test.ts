import { handleRecievedMessage } from "../saga";

describe("WebSocket saga test", () => {
  test("func is done", () => {
    const generator = handleRecievedMessage({ 
      payload: {
        socketName: "realtimeTextRender", 
        message: "word"
      }
    });

    generator.next();
    expect(generator.return().done).toEqual(true);
  });
})