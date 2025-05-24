export interface TopicPreview {
  name: string;
  time: number;   //timestamp
}

export type MessageForGeneration = {
  message: string;
  prompt?: string;
}

export type TopicMessage = {
  from: "user" | "chat";    // can be diff, but only 2 types
  message: string;
};

export type Topic = {
  [topicName: string]: TopicMessage[];    // key is a topic name (string)
}