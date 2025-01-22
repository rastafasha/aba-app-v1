export type DocumentStatus = 'pending' | 'reviewing' | 'yes' | 'no';
export const DOCUMENT_STATUS_MAP: Record<DocumentStatus, string> = {
  pending: 'Pending',
  reviewing: 'Reviewing',
  yes: 'Yes',
  no: 'No',
};
export class DocumentV2 {
  index: number;
  title: string;
  status?: DocumentStatus;
  constructor(data: Partial<DocumentV2>) {
    Object.assign(this, data);
  }
  static getDefault(): DocumentV2 {
    return {
      index: 0,
      title: '',
      status: 'no',
    };
  }
}
