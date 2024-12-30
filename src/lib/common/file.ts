import { IconType, IconBaseProps } from 'react-icons';
import { MdAudioFile, MdVideoFile, MdInsertDriveFile } from 'react-icons/md';

export const getFileTypeIcon = (fileType: string): {
  Icon: IconType;
  props: IconBaseProps;
} => {
  const baseProps: IconBaseProps = {
    className: `w-6 h-6 ${
      fileType.startsWith('video/') ? 'text-primary' :
      fileType.startsWith('audio/') ? 'text-accent' :
      'text-neutral'
    }`
  };

  if (fileType.startsWith('video/')) {
    return { Icon: MdVideoFile, props: baseProps };
  } else if (fileType.startsWith('audio/')) {
    return { Icon: MdAudioFile, props: baseProps };
  }
  return { Icon: MdInsertDriveFile, props: baseProps };
};

export const getFileTypeLabel = (fileType: string) => {
  if (fileType.startsWith('video/')) {
    return 'Video';
  } else if (fileType.startsWith('audio/')) {
    return 'Audio';
  }
  return 'File';
};
