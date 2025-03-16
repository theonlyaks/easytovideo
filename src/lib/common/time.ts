import { Timestamp } from 'firebase/firestore';

export const calculateRemainingTime = (updationTime: Timestamp, duration: number): string => {
  if (!updationTime || !duration) return 'Calculating...';

  const now = new Date().getTime();
  const startTime = updationTime.toMillis();
  const estimatedProcessingTime = 180000; // 3 minutes in milliseconds
  const endTime = startTime + estimatedProcessingTime;
  const remainingTime = endTime - now;

  if (remainingTime <= 0) return 'Completing soon...';

  const minutes = Math.floor(remainingTime / (60 * 1000));
  const seconds = Math.floor((remainingTime % (60 * 1000)) / 1000);

  if (minutes > 0) {
    return `${minutes} minute${minutes > 1 ? 's' : ''} remaining`;
  }
  return `${seconds} second${seconds > 1 ? 's' : ''} remaining`;
};

export const getTimeAgo = (date: Date): string => {
  const now = new Date();
  const diffTime = now.getTime() - date.getTime();
  const diffSeconds = Math.floor(diffTime / 1000);
  const diffMinutes = Math.floor(diffTime / (1000 * 60));
  const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffSeconds < 5) return 'Just now';
  if (diffSeconds < 60) return `${diffSeconds} second${diffSeconds !== 1 ? 's' : ''} ago`;
  if (diffMinutes < 60) return `${diffMinutes} minute${diffMinutes !== 1 ? 's' : ''} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;

  return date.toLocaleString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
};

export const convertToLocalTime = (timestamp: Timestamp | string): string => {
  let date: Date;
  if (timestamp instanceof Timestamp) {
    date = timestamp.toDate();
  } else {
    date = new Date(timestamp);
  }
  
  const time = date.toLocaleString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
  
  const datePart = date.toLocaleString('en-US', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit'
  });
  
  return `${time}, ${datePart}`;
};

export const formatRelativeTime = (formattedDate: string): string => {
  const [time, date] = formattedDate.split(', ');
  const [month, day, year] = date.split('/');
  
  const inputDate = new Date(2000 + parseInt(year), parseInt(month) - 1, parseInt(day));
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (inputDate.getTime() === today.getTime()) {
    return ` ${time}, Today`;
  } else if (inputDate.getTime() === yesterday.getTime()) {
    return ` ${time}, Yest`;
  } else {
    return `${time}, ${month}/${day}/${year}`;
  }
};

export const unixToLocalTime = (unixTimestamp: number | null): string => {
  if (!unixTimestamp) return 'Not available';
  
  const date = new Date(unixTimestamp * 1000); // Convert seconds to milliseconds
  
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
};