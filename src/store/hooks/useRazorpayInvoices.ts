import { useState, useEffect, useCallback, useRef } from 'react';
import { useRazorpayCustomer } from './useRazorapyCustomer';
import { useSession } from 'next-auth/react';
import { Invoice } from '@/types';


export const useRazorpayInvoices = () => {
    const [invoices, setInvoices] = useState<Invoice[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { data: session } = useSession();
    const { getOrCreateCustomer } = useRazorpayCustomer();
    const fetchedRef = useRef(false);

    const fetchInvoices = useCallback(async () => {
        // Add check for existing invoices
        if (fetchedRef.current || !session?.user?.id || invoices.length > 0) return;
        
        try {
            setLoading(true);
            setError(null);
            fetchedRef.current = true;
            
            const customerId = await getOrCreateCustomer(session.user.id);
            
            const response = await fetch('/api/razorpay/fetch-invoices', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ customerId })
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.error);

            const sortedInvoices = data.invoices.sort((a: Invoice, b: Invoice) => b.date - a.date);
            setInvoices(sortedInvoices);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch invoices');
            fetchedRef.current = false; // Allow retry on error
        } finally {
            setLoading(false);
        }
    }, [session?.user?.id, getOrCreateCustomer, invoices.length]); // Add invoices.length to dependencies

    useEffect(() => {
        if (!loading && invoices.length === 0) { // Only fetch if we don't have invoices
            fetchInvoices();
        }
        
        return () => {
            fetchedRef.current = false;
        };
    }, [fetchInvoices, loading, invoices.length]);

    // Function to manually refetch invoices
    const refetch = useCallback(() => {
        fetchedRef.current = false;
        setInvoices([]); // Clear existing invoices
        fetchInvoices();
    }, [fetchInvoices]);

    return { 
        invoices, 
        loading, 
        error, 
        refetch
    };
};
