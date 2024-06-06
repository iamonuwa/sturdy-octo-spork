import { FrameIcon } from "lucide-react";
import Link from "next/link";
import { ROUTES } from "@/config";

export const Header = () => {
  return (
    <header className="flex items-center h-16 px-4 border-b shrink-0 md:px-6">
      <Link
        href="#"
        className="flex items-center gap-2 text-lg font-semibold sm:text-base mr-4"
        prefetch={false}
      >
        <FrameIcon className="w-6 h-6" />
        <span className="sr-only">VM Manager</span>
      </Link>
      <nav className="hidden font-medium sm:flex flex-row items-center gap-5 text-sm lg:gap-6">
        {ROUTES.map((route, index) => (
          <Link
            key={index}
            href={route.href}
            className="text-gray-500 dark:text-gray-400"
            prefetch={false}
          >
            {route.title}
          </Link>
        ))}
      </nav>
    </header>
  );
};
