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

        const { name, email } = session.user;

        // Create new Razorpay customer using session data
        const customer = await razorpay.customers.create({
            name: name || email,
            email: email
        });

        return NextResponse.json({
            customer_id: customer.id,
            name: name || email,
            email: email,
            message: 'Customer created successfully'
        });

    } catch (error) {
        console.error('Error creating customer:', error);
        return NextResponse.json({
            error: 'Failed to create customer',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        }, { status: 500 });
    }
}
