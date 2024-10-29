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
      title: "Cuotas",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Listado",
          url: "/asociado/cuotas",
        },
        {
          title: "Nuevo",
          url: "/asociado/cuotas/create",
        },
      ],
    },
    {
      title: "Eventos",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Listado",
          url: "/asociado/eventos",
        },
        {
          title: "Nuevo",
          url: "/asociado/eventos/create",
        },
      ],
    },
    {
      title: "Propuestas de Trabajo",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Listado",
          url: "/asociado/propuestas",
        },
        {
          title: "Nuevo",
          url: "/asociado/propuestas/create",
        },
      ],
    },
    {
      title: "Mi Curriculum",
      url: "/asociado/curriculums",
      icon: Bot,
      isActive: true,
      items: [
        {
          title: "Ver",
          url: "/asociado/curriculums/me",
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
