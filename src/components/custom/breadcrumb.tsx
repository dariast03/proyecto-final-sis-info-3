import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

type BreadCrumbType = {
  title: string;
  link: string;
};

type BreadCrumbPropsType = {
  items: BreadCrumbType[];
};

export default function BreadCrumb({ items }: BreadCrumbPropsType) {
  return (
    <div className="flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5">
      <Link
        to={"/"}
        className="overflow-hidden text-ellipsis whitespace-nowrap hover:text-foreground"
      >
        Inicio
      </Link>
      {items?.map((item: BreadCrumbType, index: number) => (
        <React.Fragment key={item.title}>
          <ChevronRight />
          <Link
            to={item.link}
            className={cn(
              "font-medium hover:text-foreground transition-colors",
              index === items.length - 1
                ? "pointer-events-none text-foreground"
                : "text-muted-foreground"
            )}
          >
            {item.title}
          </Link>
        </React.Fragment>
      ))}
    </div>
  );
}
