export type PrivacyItem = {
  title: string;
  content: string;
  listItems?: string[];
};

export const privacyLastUpdated = "February 09, 2025";

export const privacyItems: PrivacyItem[] = [
  {
    title: "1. Information We Collect",
    content: "We collect and process the following information when you use EasyToVideo:",
    listItems: [
      "Account information (email, name, payment details)",
      "Uploaded video content and related metadata",
      "Usage data and interaction with our platform",
      "Technical information including IP address and device data",
      "Payment and subscription information"
    ]
  },
  {
    title: "2. How We Use Your Information",
    content: "Your information is used for the following purposes:",
    listItems: [
      "Providing and improving our video editing services",
      "Processing your uploads and applying effects",
      "Managing your account and subscriptions",
      "Sending service updates and communications",
      "Analyzing platform usage and performance"
    ]
  },
  {
    title: "3. Data Storage and Security",
    content: "We implement industry-standard security measures to protect your data:",
    listItems: [
      "Video content is stored on secure cloud servers",
      "Data is encrypted during transmission and storage",
      "Regular security audits and updates are performed",
      "Access to user data is strictly controlled"
    ]
  },
  {
    title: "4. Data Retention",
    content: "We retain your data according to these guidelines:",
    listItems: [
      "Account information is kept while your account is active",
      "Uploaded content may be deleted after 30 days of inactivity",
      "Payment records are retained as required by law",
      "You can request data deletion subject to legal requirements"
    ]
  },
  {
    title: "5. Third-Party Services",
    content: "We work with trusted third-party services for:",
    listItems: [
      "Payment processing and subscription management",
      "Cloud storage and content delivery",
      "Analytics and performance monitoring",
      "AI processing and effect generation"
    ]
  },
  {
    title: "6. Your Rights",
    content: "You have the following rights regarding your personal data:",
    listItems: [
      "Access your personal information",
      "Request data correction or deletion",
      "Object to data processing",
      "Download your data in a portable format",
      "Withdraw consent for optional processing"
    ]
  },
  {
    title: "7. Cookie Policy",
    content: "We use cookies and similar technologies to:",
    listItems: [
      "Maintain your session and preferences",
      "Analyze platform usage patterns",
      "Improve platform performance",
      "Provide personalized features"
    ]
  },
  {
    title: "8. Children's Privacy",
    content: "Our service is not intended for users under 13 years of age. We do not knowingly collect personal information from children."
  },
  {
    title: "9. Changes to Privacy Policy",
    content: "We may update this privacy policy from time to time. We will notify you of any significant changes via email or platform notification."
  },
  {
    title: "10. Contact Information",
    content: "For privacy-related inquiries, please contact us at support@easytovideo.com"
  }
];
