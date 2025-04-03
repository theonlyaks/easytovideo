"use client";

import { FaDownload } from "react-icons/fa";
import { FiChevronRight } from "react-icons/fi";
import { useRouter } from "next/navigation";
import Button from "@/components/common/Button";
import VideoPlayerLatest from "@/components/common/VideoPlayerLatest";

interface ShareProps {
  shareId: string;
  videoUrl: string;
  userName: string;
  type: string;
}

export function Share({ shareId, videoUrl, userName, type }: ShareProps) {
  const router = useRouter();

  // Handle download
  const handleDownload = () => {
    if (!videoUrl) return;

    // Extract filename from URL or use default
    const fileName = "shared-video.mp4";

    const a = document.createElement("a");
    a.href = videoUrl;
    a.download = fileName;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.click();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="">
        <div className="container mx-auto px-4 py-4 flex justify-center items-center">
          <div className="flex items-center">
            <div className="h-10 w-10 bg-primary rounded-lg flex items-center justify-center text-primary-text font-bold text-xl mr-3">
              E
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              EasyToVideo
            </h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          {/* Video Section */}
          <div className="bg-white rounded-xl shadow-xl overflow-hidden mb-8">
            {/* Video Container */}
            <VideoPlayerLatest
              source={videoUrl}
              aspectRatio="9/16"
              showWatermark={true}
              watermarkText="Made with EasyToVideo"
            />

            {/* Video Info */}
            <div className="p-6">
              <div className="flex items-center mb-6">
                <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold mr-3">
                  {userName.charAt(0)}
                </div>
                <div>
                  <p className="font-medium text-background-text">
                    Shared by {userName}
                  </p>
                  <p className="text-xs text-muted-text">
                    {type === "subtitle"
                      ? "Video with Subtitles"
                      : "Shared Content"}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                <Button
                  onClick={handleDownload}
                  className="flex items-center px-4 py-2.5 bg-primary text-primary-text font-medium rounded-lg hover:shadow-lg transition-all"
                >
                  <FaDownload className="h-4 w-4 mr-2" />
                  Download Video
                </Button>
              </div>
            </div>
          </div>

          {/* Promotional Section */}
          <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl p-6 border border-primary/10 mb-8">
            <div className="flex flex-col items-center">
              <div className="mb-6 text-center">
                <h3 className="text-xl font-bold text-background-text mb-2">
                  Create Videos Like This
                </h3>
                <p className="text-muted-text mb-4">
                  Add professional subtitles, animations to your videos in
                  minutes. Join creators who use EasyToVideo.
                </p>
                <ul className="space-y-2 mb-4 text-left">
                  <li className="flex items-center text-background-text">
                    <div className="h-5 w-5 rounded-full bg-accent flex items-center justify-center mr-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3 text-accent-text"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    Automatic subtitles in 14+ languages
                  </li>
                  <li className="flex items-center text-background-text">
                    <div className="h-5 w-5 rounded-full bg-accent flex items-center justify-center mr-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3 text-accent-text"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    Professional subtitle animations.
                  </li>
                  <li className="flex items-center text-background-text">
                    <div className="h-5 w-5 rounded-full bg-accent flex items-center justify-center mr-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3 text-accent-text"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    Translate to english from other langauge.
                  </li>
                </ul>
                <div className="flex flex-col sm:flex-row items-center justify-center mb-4">
                  <div className="text-sm bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500  text-white px-2 py-1 rounded font-medium mb-2 sm:mb-0 sm:mr-3">
                    Get 3 Months for $5!
                  </div>
                  <p className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-red-500   font-bold">
                    Limited Offer!
                  </p>
                </div>
              </div>
              <div>
                <Button
                  className="px-6 py-3 bg-primary font-medium rounded-lg hover:shadow-lg transition-all flex items-center"
                  onClick={() => router.push("/studio/plans")}
                >
                  Try Now for Free
                  <FiChevronRight className="h-5 w-5 ml-1" />
                </Button>
                <p className="text-xs text-center mt-2 text-muted-text">
                  No credit card required
                </p>
              </div>
            </div>
          </div>

          {/* Testimonials */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <h3 className="text-lg font-bold text-background-text mb-4 text-center">
              Trusted by Creators Worldwide
            </h3>
            <div className="space-y-3">
              <div className="p-4 border border-muted/30 rounded-lg">
                <div className="flex items-center mb-3">
                  <div className="h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold mr-2">
                    P
                  </div>
                  <div>
                    <p className="font-medium text-background-text">Priya</p>
                    <p className="text-xs text-muted-text">YouTuber</p>
                  </div>
                </div>
                <p className="text-muted-text text-sm">
                  "Easiest way to add subtitles – love the animations! Saved me
                  hours of editing time."
                </p>
              </div>
              <div className="p-4 border border-muted/30 rounded-lg">
                <div className="flex items-center mb-3">
                  <div className="h-8 w-8 bg-accent/10 rounded-full flex items-center justify-center text-accent font-bold mr-2">
                    M
                  </div>
                  <div>
                    <p className="font-medium text-background-text">Michael</p>
                    <p className="text-xs text-muted-text">Content Creator</p>
                  </div>
                </div>
                <p className="text-muted-text text-sm">
                  "The automatic subtitles are incredibly accurate. My
                  engagement has increased by 40%!"
                </p>
              </div>
              <div className="p-4 border border-muted/30 rounded-lg">
                <div className="flex items-center mb-3">
                  <div className="h-8 w-8 bg-secondary/10 rounded-full flex items-center justify-center text-secondary font-bold mr-2">
                    J
                  </div>
                  <div>
                    <p className="font-medium text-background-text">Jessica</p>
                    <p className="text-xs text-muted-text">TikTok Creator</p>
                  </div>
                </div>
                <p className="text-muted-text text-sm">
                  "Worth every penny! My videos look so much more professional
                  now."
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-background border-t border-muted py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center">
            <div className="flex items-center mb-4">
              <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center text-primary-text font-bold text-sm mr-2">
                E
              </div>
              <p className="text-muted-text text-sm">EasyToVideo 2025.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
