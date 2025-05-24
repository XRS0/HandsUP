# Hands Up
Voice to text converter with AI tech

## FrontEnd
FrontEnd based on `React` with `Typescript`. The project builder is `webpack`.

## Libs
**Added some libs.**
- `Redux` for better control of the global state of project and state security
- `Redux-toolkit` to use new tools and easier state management
- `Redux-saga` to use global state async functions

## Types and Api's

**Auth**
- `/register` endpoint
- `post` request
```ts
interface SignUpResponseData {
  username: string;
  email: string;
  password: string;
}
```

- `/login` endpoint
- `post` request
- `headers: { Authorization: `Bearer ${access_token}`}` header

```ts
interface SignInResponseData {
  email: string;
  password: string;
}
```

**Get User**
- `/get_user/:${access_token}` endpoint
- `get` request
- `without data`
- headers: { Authorization: `Bearer ${access_token}`} header


**Get Topic**
- `/get_topic` endpoint
- `post` request
- `headers: { Authorization: `Bearer ${access_token}`}` header
- `string //topic name` data

**Register topic**
- `/create_topic` endpoint
- `post` request
- `headers: { Authorization: `Bearer ${access_token}`}` header

```ts
interface TopicPreview {
  name: string;
  time: number;   //timestamp
}
```

**Generate Summ Conspect**
- `/generate` endpoint
- `post` request
- `headers: { Authorization: `Bearer ${access_token}`}` header

```ts
type MessageForGeneration = {
  message: string;
  prompt?: string;
}
```

*access_token refreshes automaticly*

# Some important types

**WS**
- `PCM 16 bit` from client while s2t works
- `MessageForGeneration` from client when start to summ.
- `string //word or letter` from server

**User**
```ts
export interface IUser extends SignUpResponseData {
  username: string;
  email: string;
  password: string;
  balance: number;
  price_plan: string;
  topics: topicPreview[];
}
```

**Topics**
```ts
export type TopicMessage = {
  from: "user" | "chat";               // can be diff, but only 2 types
  message: string;
};

export type Topic = {
  [topicName: string]: TopicMessage[]; // key is a topic name (string)
}
```