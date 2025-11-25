import { ChevronUp, Clipboard, MoreHorizontal, User2 } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import AddProjectForm from "./forms/projects/AddProjectForm";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { signOutAction } from "@/server/auth";
import { getAllProjects } from "@/server/projects/getProjects";
import Link from "next/link";
import { getAllTasks } from "@/server/tasks/getTasks";

export async function AppSidebar() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) return null;
  const projects = await getAllProjects();
  return (
    <div className="flex relative">
      <Sidebar className="pt-5">
        <SidebarContent>
          <SidebarGroup>
            <Link href="/" className="text-black text-xl mt-3">
              <span className="font-bold">T</span>ask{" "}
              <span className="font-bold">N</span>i{" "}
              <span className="font-bold">M</span>acky
            </Link>
            <SidebarGroupLabel className="flex items-center justify-between mt-5">
              Projects
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <MoreHorizontal />
                </DropdownMenuTrigger>
                <DropdownMenuContent side="right" align="start">
                  <Dialog>
                    <DialogTrigger className="w-full focus:bg-accent hover:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:text-destructive! [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50 data-inset:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4">
                      <span className="text-[12px]">Add Project</span>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add Project</DialogTitle>
                        <DialogDescription>
                          If you have new project, just add it here.
                        </DialogDescription>
                      </DialogHeader>
                      <AddProjectForm />
                    </DialogContent>
                  </Dialog>
                  <DropdownMenuItem>
                    <Link href="/projects">
                      <span className="text-[12px]">View All Project</span>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <Collapsible defaultOpen className="group/collapsible">
                  <SidebarMenuItem>
                    {/* Collapsible Trigger */}
                    <CollapsibleTrigger asChild>
                      <div>
                        <SidebarMenuButton asChild>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center justify-start gap-1">
                              <Clipboard width={18} height={18} />
                              <span>Projects</span>
                            </div>
                            <SidebarMenuBadge>
                              {projects.length}
                            </SidebarMenuBadge>
                          </div>
                        </SidebarMenuButton>
                      </div>
                    </CollapsibleTrigger>
                    {/* Collapsible Content */}
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {projects.map(async (project) => {
                          const tasks = await getAllTasks(project.id);
                          return (
                            <SidebarMenuSubItem key={project.id}>
                              <SidebarMenuButton asChild>
                                <Link href={`/projects/${project.id}`}>
                                  <span className="text-[12px]">
                                    {project.title}
                                  </span>
                                </Link>
                              </SidebarMenuButton>
                              <SidebarMenuBadge>
                                <span className="text-[12px]">
                                  {tasks.length}
                                </span>
                              </SidebarMenuBadge>
                            </SidebarMenuSubItem>
                          );
                        })}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton>
                    <User2 /> {session?.user.name}
                    <ChevronUp className="ml-auto" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  side="top"
                  className="w-[--radix-popper-anchor-width]"
                >
                  <DropdownMenuItem>
                    <Link href="/tasks">View All Tasks</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <form action={signOutAction}>
                      <button type="submit">Sign out</button>
                    </form>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarTrigger className="absolute z-10" />
    </div>
  );
}
