'use client';
import { useState } from 'react';
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import Image from "next/image";
import Button from '@/components/common/Button';
import { FiPlus, FiTrash2, FiEdit, FiDownload, FiHeart } from 'react-icons/fi';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [apiResponse, setApiResponse] = useState<any>(null);

  const testViralApi = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/viral/create');
      const data = await response.json();
      setApiResponse(data);
    } catch (error) {
      console.error('API Error:', error);
      setApiResponse({ error: 'Failed to fetch' });
    } finally {
      setIsLoading(false);
    }
  };

  const colorPalette = [
    {
      name: "Background",
      color: "bg-background",
      text: "text-background-text",
    },
    { name: "Primary", color: "bg-primary", text: "text-primary-text" },
    { name: "Secondary", color: "bg-secondary", text: "text-secondary-text" },
    { name: "Accent", color: "bg-accent", text: "text-accent-text" },
    { name: "Neutral", color: "bg-neutral", text: "text-neutral-text" },
    { name: "Muted", color: "bg-muted", text: "text-muted-text" },
    {
      name: "Background Text",
      color: "bg-background-text",
      text: "text-background",
    },
    { name: "Primary Text", color: "bg-primary-text", text: "text-primary" },
    {
      name: "Secondary Text",
      color: "bg-secondary-text",
      text: "text-secondary",
    },
    { name: "Accent Text", color: "bg-accent-text", text: "text-accent" },
    { name: "Neutral Text", color: "bg-neutral-text", text: "text-neutral" },
    { name: "Muted Text", color: "bg-muted-text", text: "text-muted" },
  ];

  const apiTestSection = (
    <div className="w-full max-w-md p-4 bg-background rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 text-background-text">API Test Section</h2>
      <Button
        onClick={testViralApi}
        isLoading={isLoading}
        className="w-full mb-4"
      >
        Test Viral API
      </Button>
      {apiResponse && (
        <pre className="bg-black/[.05] p-4 rounded text-sm overflow-auto">
          {JSON.stringify(apiResponse, null, 2)}
        </pre>
      )}
    </div>
  );

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        {apiTestSection}
        <div className="p-8 bg-background">
          <h1 className="text-2xl font-bold mb-6 text-background-text">
            Color Palette
          </h1>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {colorPalette.map((item, index) => (
              <div key={index} className="flex flex-col">
                <div
                  className={`${item.color} ${item.text} h-32 w-full rounded-lg shadow-md flex flex-col items-center justify-center p-4 transition-transform hover:scale-105`}
                >
                  <span className="text-center font-medium">{item.name}</span>
                  <span className="text-center text-sm opacity-80 mt-2">
                    Sample Text
                  </span>
                </div>
                <div className="mt-2 text-sm text-muted-text">
                  <p className="font-mono">{item.color}</p>
                  <p className="font-mono">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <div>
          <Button
            size="lg"
            isLoading={true}
          >
            Click me
          </Button>

          <Button
            variant="secondary"
          >
            Secondary Button
          </Button>

          {/* Outline button */}
          <Button variant="outline" size="sm">
            Outline Button
          </Button>

          {/* Danger button with loading state */}
          <Button
            isLoading={true}
          >
            Delete Item
          </Button>

          {/* Disabled button */}
          <Button disabled>Disabled Button</Button>

          {/* Button with custom className */}
          <Button className="shadow-lg">Custom Class Button</Button>

          <div className="space-x-4 space-y-4">
      {/* Button with left icon */}
      <Button 
        icon={FiPlus}
        // onClick={() => console.log('Add clicked')}
      >
        Add Item
      </Button>

      {/* Button with right icon */}
      <Button 
        icon={FiDownload}
        iconPosition="right"
        variant="secondary"
      >
        Download
      </Button>

      {/* Icon only buttons */}
      <Button 
        icon={FiEdit}
        iconOnly
        variant="outline"
        aria-label="Edit"
      />

      <Button 
        icon={FiTrash2}
        iconOnly
        size="sm"
        aria-label="Delete"
      />

      {/* Icon only with different sizes */}
      <div className="space-x-2">
        <Button 
          icon={FiHeart}
          iconOnly
          size="sm"
          aria-label="Like small"
        />
        <Button 
          icon={FiHeart}
          iconOnly
          size="md"
          aria-label="Like medium"
        />
        <Button 
          icon={FiHeart}
          iconOnly
          size="lg"
          isLoading={true}
          aria-label="Like large"
        />
      </div>

      {/* Loading state with icon */}
      <Button 
        icon={FiDownload}
        isLoading={true}
      >
        Downloading
      </Button>
    </div>
        </div>
        <LoadingSpinner size="md" iconOnly />
        <div className="bg-background text-foreground">
          <p className="font-inter font-light">Light Inter text (300)</p>
          <p className="font-inter font-normal">Regular Inter text (400)</p>
          <p className="font-inter font-medium">Medium Inter text (500)</p>
          <p className="font-inter font-semibold">Semibold Inter text (600)</p>
          <p className="font-inter font-bold">Bold Inter text (700)</p>

          <p className="font-dm-sans font-light">Light DM Sans text (300)</p>
          <p className="font-dm-sans font-normal">Regular DM Sans text (400)</p>
          <p className="font-dm-sans font-medium">Medium DM Sans text (500)</p>
          <p className="font-dm-sans font-semibold">
            Semibold DM Sans text (600)
          </p>
          <p className="font-dm-sans font-bold">Bold DM Sans text (700)</p>
        </div>
        <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2">
            Get started by editing{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
              src/app/page.tsx
            </code>
            .
          </li>
          <li>Save and see your changes instantly.</li>
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Deploy now
          </a>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read our docs
          </a>
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
