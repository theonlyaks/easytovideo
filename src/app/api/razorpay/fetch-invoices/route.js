import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth" 
import Razorpay from 'razorpay';

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET
});

export async function POST(request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.email) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { customerId } = await request.json();
        if (!customerId) {
            return NextResponse.json({ error: 'Customer ID is required' }, { status: 400 });
        }

        const invoices = await razorpay.invoices.all({
            type: 'invoice',
            customer_id: customerId
        });

        return NextResponse.json({
            success: true,
            invoices: invoices.items
        });

    } catch (error) {
        //console.error('Error fetching invoices:', error);
        return NextResponse.json({
            error: 'Failed to fetch invoices',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        }, { status: 500 });
    }
}
