import Image from 'next/image'

export function LogoNavbar() {
  return (
    <div className="w-full py-4 px-6 border-b">
      <div className="max-w-7xl mx-auto flex items-center">
        <Image
          src="/google.svg"
          alt="EasyToVideo Logo"
          width={32}
          height={32}
          className="mr-2"
        />
        <span className="text-xl font-semibold">EasyToVideo</span>
      </div>
    </div>
  );
}
