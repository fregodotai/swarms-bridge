export type RegisterAgentResponse = Promise<{
  apiKey: string;
}>;

interface Twitter {
  access_token: string;
  agent_id: number;
  enable_posting: boolean;
  expires_at: number;
  id: number;
  next_tweet: string;
  refresh_token: string;
  task_id: string;
  username: string;
}

interface AlignmentScore {
  agent_id: number;
  date_created: string;
  date_updated: string;
  id: number;
  observation_count: number;
  overall_score_percentage: number;
  platform: string;
}

interface Cognition {
  code: string;
  id: number;
  name: string;
}

export interface AgentFromFrego {
  active: boolean;
  alignment_scores: AlignmentScore[];
  behavior_attrs: string;
  cognition_cadence: Cognition;
  cognition_memory: Cognition;
  cognition_reasoning: Cognition;
  credits_remaining: number;
  date_created: string;
  description: string;
  editor_their_behavior: string;
  editor_their_goal: string;
  editor_who_they_are: string;
  id: number;
  interval_keep_alive_call: number;
  is_nft_based: boolean;
  linked_nft_id: string;
  model_type: string;
  name: string;
  picture_url: string;
  runs: number;
  tool_cals_available: string;
  twitter: Twitter;
}

export type evaluatedAgentsResponse = Promise<AgentFromFrego[]>;
