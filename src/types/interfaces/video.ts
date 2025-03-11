export interface VideoTime {
    start: number;
    end: number;
}

export interface ITrackProps {
    style?: React.CSSProperties;
    ref?: React.RefObject<any>;
    [key: string]: any;
}

export interface IThumbProps {
    style?: React.CSSProperties;
    ref?: React.RefObject<any>;
    [key: string]: any;
}

export interface VideoRangeProps {
    min: number;
    max: number;
    values: number[];
    onChange: (values: number[]) => void;
    formatValue?: (value: number) => string;
  }

export interface VideoPlayerProps {
    source: string;
    onDuration: (duration: number, videoElement: HTMLVideoElement) => void;
    [key: string]: any; // Allow additional props for the video element (e.g., HTML video attributes)
}