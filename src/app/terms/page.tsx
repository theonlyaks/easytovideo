import Terms from "@/components/features/terms/Terms";

export const metadata = {
  title: "Terms and Conditions | EasyToVideo",
  description: "Terms and conditions for using EasyToVideo services",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-background">
      <Terms />
    </main>
  );
}
