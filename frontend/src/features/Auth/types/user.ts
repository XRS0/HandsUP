import { TopicPreview } from "@/features/UserTopics/types/topic";
import { SignUpResponseData } from "./auth";

export interface IUser extends SignUpResponseData {
  balance: number;
  price_plan: string;
  topics: TopicPreview[];
}