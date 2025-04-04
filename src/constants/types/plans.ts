export const plansData = [
    {
        name: "Basic",
        price: 10,
        description: "Perfect for hobbyists and small projects",
        features: {
            core: [
                { text: "100 Audio Generations Monthly", included: true },
                { text: "Basic Sound Effects Library", included: true },
                { text: "720p Audio Quality", included: true },
                { text: "5 Saved Generations", included: true },
            ],
            advanced: [
                { text: "Advanced Effects", included: false, isPro: true },
                { text: "Priority Processing", included: false },
                { text: "Custom Sound Library", included: false },
            ],
            support: [
                { text: "Community Support", included: true },
                { text: "Email Support", included: true },
                { text: "API Access", included: false },
            ]
        },
        isSubscribed: true
    },
    {
        name: "Professional",
        price: 29,
        description: "Ideal for creators and professionals",
        features: {
            core: [
                { text: "100 Audio Generations Monthly", included: true },
                { text: "Premium Sound Effects", included: true },
                { text: "4K Audio Quality", included: true },
                { text: "Unlimited Saved Generations", included: true },
            ],
            advanced: [
                { text: "Advanced Effects Suite", included: true, isPro: true },
                { text: "Priority Processing", included: true },
                { text: "Custom Sound Library", included: true, isNew: true },
            ],
            support: [
                { text: "Priority Support", included: true },
                { text: "24/7 Email Support", included: true },
                { text: "API Access", included: true },
            ]
        },
        isPopular: true
    },
    {
        name: "Enterprise",
        price: 99,
        description: "For teams and large scale projects",
        features: {
            core: [
                { text: "Unlimited Audio Generations", included: true },
                { text: "Enterprise Sound Effects", included: true },
                { text: "8K Audio Quality", included: true },
                { text: "Unlimited Everything", included: true },
            ],
            advanced: [
                { text: "Advanced Effects Suite", included: true, isPro: true },
                { text: "Dedicated Processing", included: true },
                { text: "Custom Sound Library", included: true },
            ],
            support: [
                { text: "Dedicated Support", included: true },
                { text: "24/7 Priority Support", included: true },
                { text: "Enterprise API Access", included: true },
            ]
        }
    }
];

export const PLAN_TOP_UP:any= {
    'launchOffer': {
        amount: 500,
        credits: 60,
        name: 'Creator Plan',
        durationInDays: 90,
        currency:'USD'
    }
};