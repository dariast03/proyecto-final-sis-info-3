import * as React from "react";
import { Bot, GalleryVerticalEnd, SquareTerminal } from "lucide-react";
import { NavMain } from "@/components/layout/nav-main";
import { NavUser } from "@/components/layout/nav-user";
import { UserInfo } from "@/components/layout/user-info";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

// This is sample data.
const data = {
  user: {
    name: "Dante Arias",
    email: "dante@gmail.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
  ],
  navMain: [
    {
      title: "Usuarios",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Listado",
          url: "/admin/users",
        },
        {
          title: "Nuevo",
          url: "/admin/users/create",
        },
      ],
    },
    {
      title: "Roles",
      url: "#",
      icon: Bot,
      isActive: true,
      items: [
        {
          title: "Listado",
          url: "/admin/roles",
        },
        {
          title: "Nuevo",
          url: "/admin/roles/create",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <UserInfo />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
