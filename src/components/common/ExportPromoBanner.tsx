"use client"

interface SubscriptionPromptProps {
  isCreditsExhausted?: boolean;
}
export function SubscriptionPrompt({ isCreditsExhausted = false }: SubscriptionPromptProps) {

  return (
    <div className="overflow-hidden rounded-xl bg-white">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary via-red-500 to-primary">
          {isCreditsExhausted 
            ? "You've Run Out of Credits" 
            : "Subscribe for Just $2/month!"}
        </h2>
        {isCreditsExhausted && (
          <p className="mt-2 text-gray-600">
            You need at least 1 credit to export a watermark-free video
          </p>
        )}
      </div>

      {/* Options Comparison */}
      <div className="mt-8 grid gap-8 md:grid-cols-2">
        {/* Subscription Option */}
        <div className="rounded-lg border border-pink-500 bg-primary/5 p-6">
          <h3 className="text-xl font-bold text-primary">Unlock with Subscription:</h3>
          <ul className="mt-4 space-y-3">
            <li className="flex items-start">
              <span className="mr-2 text-primary">✔</span>
              <span>Subtitles in 14+ Languages</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-primary">✔</span>
              <span>Translate to English</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-primary">✔</span>
              <span>Stunning Animations</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-primary">✔</span>
              <span>Watermark-Free Quality Exports</span>
            </li>
          </ul>
        </div>

        {/* Free Option */}
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-6">
          <h3 className="text-xl font-bold text-gray-700">Or Export for Free:</h3>
          <ul className="mt-4 space-y-3">
            <li className="flex items-start">
              <span className="mr-2 text-gray-500">✔</span>
              <span>Includes "Made with EasytoVideo" Watermark</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-gray-500">✔</span>
              <span>Shareable but Branded Output</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Promotional Deal */}
      <div className="mt-8 rounded-lg bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-2 text-center text-white">
        <p className="text-lg font-semibold">
          {isCreditsExhausted
            ? "Launch Deal: 90% OFF – $2/month for limited time!"
            : "90% OFF – $2/month"}
        </p>
      </div>
    </div>
  )
}

