export interface TopicPreview {
  topic: string;
  created_at?: string | number;
}

export type MessageForGeneration = {
  fullness: number  //0, 1, 2, 3;
  lang: "ru" | "en"
  topic?: string;
  text: string;
  user_prompt?: string;
}

export type TopicMessage = {
  from: boolean;    // 1 user, 0 chat
  text: string;
};

export type Topic = {
  [topicName: string]: TopicMessage[];    // key is a topic name (string)
}