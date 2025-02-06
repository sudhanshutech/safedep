import React, { useState } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "../ui/sidebar";
import PackageDetails from "../packageInfo";
import DependenciesTable from "../dependencies";
import Vulnerabilities from "../vulnerabilities";
import ProjectInsights from "../projectinsight";
import PackageInfo from "../packages";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import VersionLists from "../versions";

interface InsightData {
  packageVersion?: {
    package?: {
      name: string;
    };
    version: string;
  };
  insight?: {
    dependencies: Array<{
      package: { name: string };
      version: string;
    }>;
    vulnerabilities: Array<{
      id: { value: string };
      summary: string;
    }>;
    projectInsights: Array<{
      project: {
        name: string;
      };
      stars: string;
      forks: string;
      issues: {
        open: string;
      };
    }>;
    licenses: {
      licenses: Array<{
        licenseId: string;
      }>;
    };
  };
}

interface PageProps {
  insights?: InsightData;
  error?: string;
}

const sideBarItems = [
  {
    title: "Express",
    icon: "📦",
    component: "",
  },
];

export default function ChatsHome({ insights, error }: PageProps) {
  const [activeComponent, setActiveComponent] =
    useState<React.ComponentType | null>(null);

  if (error) {
    return <div className="text-red-500 p-4">Error: {error}</div>;
  }

  if (!insights) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <>
      <div className="flex min-h-screen">
        <Sidebar>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Packages</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {sideBarItems.map((item, index) => (
                    <SidebarMenuItem
                      key={index}
                      onClick={() => setActiveComponent(() => item.component)}
                    >
                      <SidebarMenuButton>
                        {item.icon} {item.title}
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        <SidebarTrigger />

        <div className="flex-1 p-8">
          <Tabs defaultValue="account">
            <TabsList>
              <TabsTrigger value="info">Package Info</TabsTrigger>
              <TabsTrigger value="dependencies">Dependencies</TabsTrigger>
              <TabsTrigger value="vulnerabilites">Vulnerabilites</TabsTrigger>
              <TabsTrigger value="versions">Available versions</TabsTrigger>
            </TabsList>
            <TabsContent value="info">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2 p-2">
                <div>
                  <PackageDetails insights={insights} />
                  <PackageInfo insights={insights} />
                </div>
                <div>
                  <ProjectInsights insights={insights} />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="dependencies">
              <DependenciesTable insights={insights} />
            </TabsContent>
            <TabsContent value="vulnerabilites">
              <Vulnerabilities insights={insights} />
            </TabsContent>
            <TabsContent value="versions">
              <VersionLists insights={insights} />
            </TabsContent>
          </Tabs>

          {activeComponent &&
            React.createElement(activeComponent, { insights })}
        </div>
      </div>
    </>
  );
}
