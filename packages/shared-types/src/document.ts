/**
 * Document entity types.
 * Placeholder — schemas will be defined in the upload phase.
 */

export interface Document {
  id: string;
  workspaceId: string;
  uploadedBy: string;
  fileName: string;
  fileType: DocumentFileType;
  fileSize: number;
  fileUrl: string;
  status: DocumentStatus;
  createdAt: string;
  updatedAt: string;
}

export type DocumentFileType = "pdf" | "docx" | "txt" | "md" | "csv";

export type DocumentStatus =
  | "uploading"
  | "processing"
  | "ready"
  | "failed";
