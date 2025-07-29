"use client";

import React, {
  useState,
  useRef,
  useEffect,
  createContext,
  useContext,
  ReactNode,
  HTMLAttributes,
} from "react";
import { Slot } from "@radix-ui/react-slot";

type DropdownContextType = {
  isOpen: boolean;
  toggle: () => void;
  close: () => void;
};

interface DropdownMenuProps {
  children: ReactNode;
}

interface DropdownMenuTriggerProps {
  children: ReactNode;

  asChild?: boolean;
}

interface DropdownMenuContentProps {
  children: ReactNode;
  className?: string;
  /** Ochiladigan menyu qaysi tomondan chiqishi */
  side?: "top" | "bottom" | "left" | "right";
 
  align?: "start" | "center" | "end";
}

interface DropdownMenuItemProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}

const DropdownContext = createContext<DropdownContextType | null>(null);

const useDropdown = () => {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error(
      "useDropdown() faqat <DropdownMenu> ichida ishlatilishi kerak"
    );
  }
  return context;
};

const DropdownMenu = ({ children }: DropdownMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggle = () => setIsOpen((prev) => !prev);
  const close = () => setIsOpen(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        close();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <DropdownContext.Provider value={{ isOpen, toggle, close }}>
      <div className="relative" ref={dropdownRef}>
        {children}
      </div>
    </DropdownContext.Provider>
  );
};

const DropdownMenuTrigger = React.forwardRef<
  HTMLButtonElement,
  DropdownMenuTriggerProps & HTMLAttributes<HTMLButtonElement>
>(({ children, asChild = false, ...props }, ref) => {
  const { toggle } = useDropdown();
  const Component = asChild ? Slot : "button";

  return (
    <Component ref={ref} onClick={toggle} {...props}>
      {children}
    </Component>
  );
});
DropdownMenuTrigger.displayName = "DropdownMenuTrigger";

const DropdownMenuContent = ({
  children,
  className = "",
  side = "bottom",
  align = "start",
}: DropdownMenuContentProps) => {
  const { isOpen } = useDropdown();

  if (!isOpen) return null;

  // Pozitsiyani boshqarish uchun klasslar
  const positionClasses = {
    side: {
      top: "bottom-full mb-2",
      bottom: "top-full mt-2",
      left: "right-full mr-2",
      right: "left-full ml-2",
    },
    align: {
      start: {
        top: "left-0",
        bottom: "left-0",
        left: "top-0",
        right: "top-0",
      },
      center: {
        top: "left-1/2 -translate-x-1/2",
        bottom: "left-1/2 -translate-x-1/2",
        left: "top-1/2 -translate-y-1/2",
        right: "top-1/2 -translate-y-1/2",
      },
      end: {
        top: "right-0",
        bottom: "right-0",
        left: "top-0",
        right: "top-0",
      },
    },
  };
  
  const alignClass = align === 'end' ? positionClasses.align.end[side] :
                     align === 'center' ? positionClasses.align.center[side] :
                     positionClasses.align.start[side];

  return (
    <div
      className={`absolute z-50 min-w-[180px] bg-white border border-gray-200 rounded-lg shadow-lg p-1 animate-in fade-in-20 ${positionClasses.side[side]} ${alignClass} ${className}`}
    >
      {children}
    </div>
  );
};

// --- DropdownMenuItem ---

const DropdownMenuItem = ({
  children,
  onClick,
  className = "",
}: DropdownMenuItemProps) => {
  const { close } = useDropdown();

  const handleClick = () => {
    onClick?.(); 
    close();   
  };

  return (
    <div
      onClick={handleClick}
      className={`px-3 py-2 text-sm text-gray-800 hover:bg-gray-100 rounded-md cursor-pointer transition-colors duration-150 ${className}`}
    >
      {children}
    </div>
  );
};

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
};