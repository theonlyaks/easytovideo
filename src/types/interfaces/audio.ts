export interface GenerateTextToSfxOptions {
  duration?: number;
  isAutoDuration?: boolean;
  version?: number;

}

export interface GenerateTextToSpeechOptions {
  voiceId?: string;
}

export interface AudioFile {
  url: string;
  fileName: string;
}