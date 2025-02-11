//  types for the insights
export interface InsightData {
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
      severities?: Array<{ risk: string }>;
      publishedAt?: string;
      modifiedAt?: string;
      aliases?: Array<{ value: string }>;
    }>;
    projectInsights: Array<{
      project: {
        name: string;
        url: string;
      };
      scorecard: {
        score: number;
        checks: {
          name: string;
          score: number;
        }[];
      };
      stars: number;
      forks: number;
      issues: {
        open: number;
      };
    }>;
    licenses: {
      licenses: Array<{
        licenseId: string;
      }>;
    };
  };
}

//  props type for `Vulnerabilities` component
export interface VulnerabilitiesProps {
  insight?: {
    vulnerabilities: Array<{
      summary: string;
      id: { value: string };
      severities: Array<{ risk: string }>;
      publishedAt: string;
      modifiedAt: string;
      aliases: Array<{ value: string }>;
    }>;
  };
}

//  props type for `ProjectInsights` component
export interface ProjectInsightsProps {
  insight?: {
    projectInsights: {
      project: {
        name: string;
        url?: string;
      };
      scorecard?: {
        score: number;
        checks: { name: string; score: number }[];
      };
      stars: number | string;
      forks: number | string;
      issues: { open: number | string };
    }[];
  };
}

//  structure for `insights` used in the VersionLists component
export interface Version {
  version: string;
  publishedAt: string;
}

//  type for `insights` in `Vulnerabilities` component
export interface Vulnerability {
  summary: string;
  id: { value: string };
  severities?: Array<{ risk: string }>;
  publishedAt?: string;
  modifiedAt?: string;
  aliases?: Array<{ value: string }>;
}

// Insights type that includes the available versions and vulnerabilities
export interface Insights {
  insight?: {
    availableVersions?: Array<Version>;
    vulnerabilities?: Array<Vulnerability>;
  };
}

// Define the structure for `insights` in DependencyGraph
export interface DependencyGraphProps {
  insight?: {
    dependencyGraph?: {
      dependencies?: Array<{
        relation: string;
        packageVersion: {
          package: {
            name: string;
          };
          version: string;
        };
      }>;
      dependencyRelations?: Array<{
        from?: number;
        to: number;
      }>;
    };
    vulnerabilities?: Array<{
      id: { value: string };
      summary: string;
      severities?: Array<{ risk: string }>;
      publishedAt?: string;
      modifiedAt?: string;
      aliases?: Array<{ value: string }>;
    }>;
    projectInsights?: Array<{
      project: {
        name: string;
        url: string;
      };
      scorecard: {
        score: number;
        checks: { name: string; score: number }[];
      };
      stars: number;
      forks: number;
      issues: {
        open: number;
      };
    }>;
    licenses?: {
      licenses: Array<{ licenseId: string }>;
    };
  };
}

// Define the component prop types
export interface PackageDetailsProps {
  insights: InsightData;
}

export interface DependenciesTableProps {
  insights: InsightData;
}

// Union of all component prop types
export type ComponentProps =
  | PackageDetailsProps
  | DependenciesTableProps
  | VulnerabilitiesProps
  | ProjectInsightsProps;
