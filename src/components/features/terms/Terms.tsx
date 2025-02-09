import { termsItems, termsLastUpdated } from "@/constants/types/terms-items";
import Image from "next/image";
import Link from "next/link";

export default function Terms() {
  return (
    <div className="py-16">
      <div className="max-w-3xl mx-auto">
        {/* Logo and Title Section */}
        <div className="text-center space-y-4 mb-12">
          <Link href="/" className="flex justify-center items-center">
            <Image
              src="/logo.svg"
              alt="EasyToVideo"
              width={48}
              height={48}
              className="text-primary mx-auto sm:w-[60px] sm:h-[60px]"
            />
          </Link>
          <p className="text-2xl font-bold text-secondary font-dm-sans">
            EasyToVideo
          </p>
        </div>

        {/* Existing Content */}
        <h1 className="text-4xl font-bold text-background-text mb-8 font-dm-sans">
          Terms and Conditions
        </h1>
        
        <p className="text-sm text-neutral mb-6 font-inter">
          Last Updated: {termsLastUpdated}
        </p>
        
        <div className="space-y-6 text-background-text/90 font-inter">
          {termsItems.map((item, index) => (
            <section key={index} className="space-y-4">
              <h2 className="text-2xl font-bold text-secondary">{item.title}</h2>
              <p>{item.content}</p>
              {item.listItems && (
                <ul className="list-disc pl-6 space-y-2">
                  {item.listItems.map((listItem, listIndex) => (
                    <li key={listIndex}>{listItem}</li>
                  ))} 
                </ul>
              )}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
