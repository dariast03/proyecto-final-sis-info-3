import { cn } from "@/lib/utils";
import BreadCrumb from "../custom/breadcrumb";

interface ContentLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  children: React.ReactNode;
  breadcrumbItems?: { title: string; link: string }[];
  navbar?: boolean;
  className?: string;
  classNameContainer?: string;
  filled?: boolean;
  fullWidth?: boolean;
}

export function ContentLayout({
  title = "",
  children,
  breadcrumbItems,
  navbar = true,
  className,
  classNameContainer,
  style,
  filled = false,
  fullWidth = false,
}: ContentLayoutProps) {
  const hasBreadcrumb = breadcrumbItems?.length;
  return (
    <div>
      {/*   {navbar && <Navbar title={title} />} */}
      <div
        className={cn([
          "pb-8 px-4 sm:px-8",
          hasBreadcrumb && " pt-8",
          classNameContainer,
          !fullWidth && "",
        ])}
        style={style}
      >
        {breadcrumbItems && <BreadCrumb items={breadcrumbItems} />}

        {!filled ? (
          <main
            className={cn([
              "p-8 mt-8 rounded-lg border bg-card text-card-foreground shadow-sm h-full",
              className,
            ])}
          >
            {children}
          </main>
        ) : (
          <main className={cn([className])}>{children}</main>
        )}
      </div>
    </div>
  );
}
