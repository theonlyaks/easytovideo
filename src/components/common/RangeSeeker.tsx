import React from 'react';
import { Range, getTrackBackground } from 'react-range';
import { VideoRangeProps, ITrackProps, IThumbProps } from '@/types';

export const RangeSeeker: React.FC<VideoRangeProps> = ({
  min,
  max,
  values,
  onChange,
  formatValue = (value) => value.toFixed(2)
}) => {
  const renderTrack = ({ props, children }: { props: ITrackProps, children: React.ReactNode }) => {
    const { key, ...trackProps } = props;
    return (
      <div
        key={key}
        {...trackProps}
        className="w-full h-2 rounded-md bg-muted"
        style={{
          background: getTrackBackground({
            values,
            colors: ["transparent", "#e07a5f", "transparent"],
            min,
            max
          })
        }}
      >
        {children}
      </div>
    );
  };

  const renderThumb = ({ props }: { props: IThumbProps }) => {
    const { key, ...thumbProps } = props;
    return (
      <div
        key={key}
        {...thumbProps}
        className="h-4 w-4 rounded-full bg-primary shadow focus:outline-none"
      />
    );
  };

  return (
    <div className="space-y-6 p-4 bg-secondary/5 rounded-lg">
      <div className="px-2">
        <div className="flex justify-between mb-3">
          <span className="text-sm text-muted-text">{formatValue(values[0])}</span>
          <span className="text-sm text-muted-text">{formatValue(values[1])}</span>
        </div>
        
        <Range
          values={values}
          step={0.01}
          min={min}
          max={max}
          onChange={onChange}
          renderTrack={renderTrack}
          renderThumb={renderThumb}
        />

        <div className="mt-2 text-center">
          <div className="text-sm text-muted-text">
            Selected Duration: {formatValue(values[1] - values[0])}
          </div>
        </div>
      </div>
    </div>
  );
};