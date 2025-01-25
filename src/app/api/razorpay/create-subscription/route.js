import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import Razorpay from 'razorpay';

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET
});

export async function POST(request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.email || !session?.user?.id) {
            return NextResponse.json({
                error: 'Please sign in to continue.',
            }, { status: 401 });
        }

        const { customerId, planId, nextStart,subscriptionId ,amount} = await request.json();
        const subscriptionData = {
            plan_id: planId,
            customer_id: customerId,
            quantity: 1,
            total_count: 360,
            notes : {
                amount:amount
            }
        };

        if (nextStart) {
            subscriptionData.start_at = nextStart;
            subscriptionData.notes['previousSubscriptionId']=  subscriptionId;
        }
        

        console.log('subscriptionData:', subscriptionData);

        const subscription = await razorpay.subscriptions.create(subscriptionData);

        return NextResponse.json({
            subscription,
            razorpayKeyId: process.env.RAZORPAY_KEY_ID,
            message: 'Subscription created successfully'
        });

    } catch (error) {
        console.error('Error creating subscription:', error);
        return NextResponse.json({
            error: 'Failed to create subscription',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        }, { status: 500 });
    }
}
