import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useState } from "react";

interface DependencyNodeProps {
  node: {
    packageVersion: {
      package: {
        name: string;
      };
      version: string;
    };
    children?: Array<DependencyNodeProps["node"]>;
  };
}

function DependencyNode({ node }: DependencyNodeProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="ml-4 border-l pl-4">
      <div
        className="cursor-pointer text-blue-600 flex items-center"
        onClick={() => setExpanded((prev) => !prev)}
      >
        <span className="mr-2">{expanded ? "▼" : "▶"}</span>
        {node.packageVersion.package.name} ({node.packageVersion.version})
      </div>
      {expanded && node.children && node.children.length > 0 && (
        <div className="ml-4">
          {node.children.map((child, i) => (
            <DependencyNode key={i} node={child} />
          ))}
        </div>
      )}
    </div>
  );
}

interface Insights {
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
  };
}

export default function DependencyGraph({ insights }: { insights: Insights }) {
  const dependencyGraph =
    insights?.dependencyGraph || insights?.insight?.dependencyGraph || {};

  const dependencies = dependencyGraph.dependencies || [];
  const relations = dependencyGraph.dependencyRelations || [];

  const nodeMap = new Map();
  dependencies.forEach((dep, i) => {
    // new node with an empty children array
    nodeMap.set(i + 1, { ...dep, children: [] });
  });

  // root node index (dependency with relation === "RELATION_SELF")
  const rootIndex =
    dependencies.findIndex((dep) => dep.relation === "RELATION_SELF") + 1;

  if (rootIndex === 0) {
    return <div>No root dependency found.</div>;
  }

  // Process each relation
  relations.forEach((rel) => {
    if (rel.from !== undefined) {
      // Using the "from" field (convert to number) as the parent key.
      const parent = nodeMap.get(rel.from);
      const child = nodeMap.get(rel.to);
      if (parent && child) {
        parent.children.push(child);
      }
    } else {
      // For relations with no "from", assume they attach to the root (if not the root itself)
      if (rel.to !== rootIndex) {
        const rootNode = nodeMap.get(rootIndex);
        const child = nodeMap.get(rel.to);
        if (rootNode && child) {
          // Avoiding duplicate children if already added via another relation
          if (!rootNode.children.includes(child)) {
            rootNode.children.push(child);
          }
        }
      }
    }
  });
  const rootNode = nodeMap.get(rootIndex);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 mt-10">Dependency Hierarchy</h2>
      <Card>
        <CardContent className="p-4">
          {rootNode ? (
            <DependencyNode node={rootNode} />
          ) : (
            <p>No dependencies found.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
