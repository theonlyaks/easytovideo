import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth";
import Razorpay from 'razorpay';
import { PLAN_TOP_UP } from '@/constants/types/plans';

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET
});

export async function POST(request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.email || !session?.user?.id) {
            return NextResponse.json({
                error: 'Please sign in to purchase.',
            }, { status: 401 });
        }

        const { planName } = await request.json();
        
        // Get top-up plan details
        const planDetails = PLAN_TOP_UP[planName];
        const planDisplayName = planDetails?.name || planName;
        
        // Validate plan details exist
        if (!planDetails) {
            return NextResponse.json({
                error: 'Plan pricing information not found.'
            }, { status: 400 });
        }

        try {
            const order = await razorpay.orders.create({
                amount: planDetails.amount,
                currency: planDetails.currency,
                receipt: `order-${Date.now()}`,
                notes: {
                    planName: planDisplayName,
                    userEmail: session.user.email,
                    // userId: session.user.id
                }
            });

            return NextResponse.json({
                keyId: process.env.RAZORPAY_KEY_ID,
                order_id: order.id,
                amount: order.amount,
                currency: order.currency,
                credits: planDetails.credits,
                planName: planName,
                planDisplayName: planDisplayName,
                order
            });
        } catch (error) {
            return NextResponse.json({
                error: 'Unable to create your order at this time. Please try again in a few minutes.'
            }, { status: 500 });
        }

    } catch (error) {
        console.error('Order creation error:', error);
        return NextResponse.json({
            error: 'Something went wrong while processing your request. Please try again or contact support if the issue persists.',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        }, { status: 500 });
    }
}
