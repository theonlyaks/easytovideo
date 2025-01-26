import { AuthState } from "@/types";
import { useRazorpayInvoices } from "@/store/hooks/useRazorpayInvoices";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { FiExternalLink } from "react-icons/fi";

export function Invoices({user}: AuthState) {
    const { invoices, loading, error } = useRazorpayInvoices();

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <LoadingSpinner color="primary" text="Loading invoices..." size="lg" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center text-red-500 py-16">
                {error}
            </div>
        );
    }

    const formatDate = (timestamp: number) => {
        return new Date(timestamp * 1000).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="max-w-4xl mx-auto py-12 px-4">
            <h1 className="text-3xl font-bold text-background-text mb-8">Payment History</h1>

            {invoices.length === 0 ? (
                <div className="text-center py-16 text-neutral-text">
                    No payment history available
                </div>
            ) : (
                <div className="bg-white rounded-lg border overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-background text-sm">
                            <tr>
                                <th className="text-left p-4 text-background-text">Date</th>
                                <th className="text-left p-4 text-background-text">Description</th>
                                <th className="text-left p-4 text-background-text">Amount</th>
                                <th className="text-left p-4 text-background-text">Status</th>
                                <th className="text-right p-4 text-background-text">Invoice</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {invoices.map((invoice) => (
                                <tr key={invoice.id} className="hover:bg-background/5">
                                    <td className="p-4 text-neutral-text">
                                        {formatDate(invoice.date)}
                                    </td>
                                    <td className="p-4">
                                        <div className="text-background-text">
                                            {invoice.line_items[0]?.name || 'Subscription'}
                                        </div>
                                        <div className="text-sm text-neutral-text">
                                            {invoice.line_items[0]?.description}
                                        </div>
                                    </td>
                                    <td className="p-4 text-background-text">
                                        ${(invoice.amount / 100).toFixed(2)}
                                    </td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded-full text-xs
                                            ${invoice.status === 'paid' ? 'bg-accent/10 text-accent' : 
                                            invoice.status === 'cancelled' ? 'bg-red-100 text-red-500' :
                                            'bg-neutral/10 text-neutral'}
                                        `}>
                                            {invoice.status}
                                        </span>
                                    </td>
                                    <td className="p-4 text-right">
                                        <a 
                                            href={invoice.short_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 text-neutral hover:text-primary transition-colors"
                                        >
                                            <span className="text-sm">View</span>
                                            <FiExternalLink className="w-4 h-4" />
                                        </a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}