export interface TopicPreview {
  topic: string;
  created_at?: string | number;
}

export type MessageForGeneration = {
  topicName: string;
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