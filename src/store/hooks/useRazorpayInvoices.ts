import { useState, useEffect, useCallback, useRef } from 'react';
import { useRazorpayCustomer } from './useRazorapyCustomer';
import { useSession } from 'next-auth/react';
import { Invoice } from '@/types';


export const useRazorpayInvoices = () => {
    const [invoices, setInvoices] = useState<Invoice[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [initialized, setInitialized] = useState(false);
    const { data: session } = useSession();
    const { getOrCreateCustomer } = useRazorpayCustomer();

    const fetchInvoices = useCallback(async () => {
        if (!session?.user?.id || loading || initialized) return;
        
        try {
            setLoading(true);
            setError(null);
            
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
            setInitialized(true);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch invoices');
        } finally {
            setLoading(false);
        }
    }, [session?.user?.id, getOrCreateCustomer, loading, initialized]);

    useEffect(() => {
        fetchInvoices();
    }, [fetchInvoices]);

    const refetch = useCallback(() => {
        setInitialized(false);
        setInvoices([]);
        fetchInvoices();
    }, [fetchInvoices]);

    return { 
        invoices, 
        loading, 
        error, 
        refetch
    };
};
