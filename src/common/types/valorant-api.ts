export interface ValorantAccountResponse {
  status: number;
  data: ValorantAccount;
}

export interface ValorantAccount {
  puuid: string;
  region: string;
  account_level: number;
  name: string;
  tag: string;
  card?: {
    small: string;
    large: string;
    wide: string;
    id: string;
  };
  last_update?: string;
  last_update_raw?: number;
}
