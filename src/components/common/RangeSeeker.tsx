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
        className="w-full h-1.5 md:h-2 rounded-md bg-muted"
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
        className="h-5 w-5 md:h-4 md:w-4 rounded-full bg-primary shadow-md 
                  touch-none focus:outline-none focus:ring-2 focus:ring-primary/50
                  hover:scale-110 transition-transform"
      />
    );
  };

  return (
    <div className="space-y-4 md:space-y-6 p-3 md:p-4 bg-secondary/5 rounded-lg">
      <div className="px-1 md:px-2">
        <div className="flex justify-between mb-2 md:mb-3">
          <span className="text-xs md:text-sm text-muted-text font-medium">
            {formatValue(values[0])}
          </span>
          <span className="text-xs md:text-sm text-muted-text font-medium">
            {formatValue(values[1])}
          </span>
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

        <div className="mt-4 md:mt-3 text-center">
          <div className="text-xs md:text-sm text-muted-text font-medium">
            Selected Duration: {formatValue(values[1] - values[0])}
          </div>
        </div>
      </div>
    </div>
  );
};