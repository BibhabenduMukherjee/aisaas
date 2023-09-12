"use client";

import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { Poppins } from "next/font/google";
import { Sparkles } from "lucide-react";

import { cn } from "@/lib/utils";
import { MobileSidebar } from "@/components/mobile-sidebar";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { useProModal } from "@/hooks/use-pro-modal";
import {NavigationMenuDemo} from "./Lists";

const font = Poppins({ weight: "600", subsets: ["latin"] });
interface NavbarProps {
  isPro: boolean;
}

export const Navbar = ({
  isPro
}: NavbarProps) => {
  const proModal = useProModal();
  
  return ( 
    <div className="fixed w-full z-50 flex justify-between items-center py-2 px-4 h-[71px] border-b border-primary/10 bg-secondary">
      <div className="flex items-center">
        <MobileSidebar isPro={isPro} />
        <Link href="/">
          <h1 className={cn("hidden md:block text-xl md:text-3xl font-bold text-primary", font.className)}>
            companion.ai
          </h1>
        </Link>
      </div>
      <div className="flex items-cente space-x-4 ">
        <div className="">
        <NavigationMenuDemo/>
        </div>
        <div className="">
        <ModeToggle />
        </div>
       
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
}
