import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function POST(request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.email) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { subscriptionId,status} = await request.json();
        if (!subscriptionId) {
            return NextResponse.json({ error: 'Subscription ID is required' }, { status: 400 });
        }
        console.log(subscriptionId);
        // Call Razorpay API directly with cancel_at_cycle_end parameter
        const response = await fetch(
            `https://api.razorpay.com/v1/subscriptions/${subscriptionId}/cancel`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic ' + Buffer.from(
                        `${process.env.RAZORPAY_KEY_ID}:${process.env.RAZORPAY_SECRET}`
                    ).toString('base64')
                },
                body: JSON.stringify({
                    cancel_at_cycle_end: 0
                })
            }
        );

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Razorpay API error:', errorData);
            return NextResponse.json({
                error: 'Failed to cancel subscription',
                details: process.env.NODE_ENV === 'development' ? errorData : undefined
            }, { status: response.status });
        }

        const cancelledSubscription = await response.json();
        console.log('Subscription cancelled successfully:', cancelledSubscription);

        return NextResponse.json({
            success: true,
            subscription: cancelledSubscription,
            message: 'Subscription cancelled successfully'
        });

    } catch (error) {
        console.error('Error cancelling subscription:', error);
        return NextResponse.json({
            error: 'Failed to cancel subscription',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        }, { status: 500 });
    }
}
