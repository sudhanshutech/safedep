import React, { useState } from 'react';
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
import PackageInfo from '../packages';

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
    title: "Package Details",
    icon: "📦",
    component: PackageDetails,
  },
  {
    title: "Dependencies",
    icon: "🔗",
    component: DependenciesTable,
  },
  {
    title: "Licenses",
    icon: "📜",
    component: PackageInfo,
  },
  {
    title: "Vulnerabilities",
    icon: "⚠️",
    component: Vulnerabilities,
  },
  {
    title: "Project Insights",
    icon: "📊",
    component: ProjectInsights,
  },
];

export default function ChatsHome({ insights, error }: PageProps) {
  const [activeComponent, setActiveComponent] = useState<React.ComponentType | null>(null);

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
            <SidebarGroupLabel>Application</SidebarGroupLabel>
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
        {activeComponent && React.createElement(activeComponent, { insights })}
      </div>
    </div>
    </>
  );
}
