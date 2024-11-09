export interface Claim {
  id: number;
  filename: string;
  status: ClaimStatus;
  bcbcNotesIds: number[];
  rbtNotesIds: number[];
  content: string;
  createdAt: string;
  updatedAt?: string;
}

export type ClaimStatus = 'pending' | 'sent' | 'rejected';