import { useEffect, useState } from 'react';

export const useRazorpayScript = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => setLoaded(true);
    
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return loaded;
};
