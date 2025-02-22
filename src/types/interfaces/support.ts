export interface SupportTicket {
    name: string;
    email: string;
    subject: string;
    message: string;
    userId?: string;
    status: 'new' | 'in-progress' | 'resolved';
    createdAt: any;
}

export interface SupportForm {
    name: string;
    email: string;
    subject: string;
    message: string;
    userId?: string;
}