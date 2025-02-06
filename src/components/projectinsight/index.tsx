import { Card, CardContent } from "@/components/ui/card";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer,
} from "recharts";

interface Insights {
  insight: {
    projectInsights: {
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
    }[];
  };
}

export default function ProjectInsights({ insights }: { insights: Insights }) {
  const project = insights?.insight?.projectInsights?.[0]?.project;
  const scorecard = insights?.insight?.projectInsights?.[0]?.scorecard;
  const githubUrl = project?.url;

  const scoreData = scorecard?.checks.map((check) => ({
    name: check.name,
    score: check.score || 0,
  }));

  return (
    <div className="p-4" style={{ width: "600px" }}>
      <Card className="w-full md:w-auto max-w-md mb-6 shadow-lg">
        <CardContent className="p-6">
          <div className="mb-4">
            <p className="mb-2">
              <strong>Project:</strong>{" "}
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {project?.name}
              </a>
            </p>
            <p className="mb-2">
              <strong>Stars:</strong>{" "}
              {insights?.insight?.projectInsights?.[0]?.stars}
            </p>
            <p className="mb-2">
              <strong>Forks:</strong>{" "}
              {insights?.insight?.projectInsights?.[0]?.forks}
            </p>
            <p className="mb-2">
              <strong>Open Issues:</strong>{" "}
              {insights?.insight?.projectInsights?.[0]?.issues.open}
            </p>
            <p className="mb-2">
              <strong>Scorecard Score:</strong> {scorecard?.score.toFixed(2)}
            </p>
          </div>
          {/* <ResponsiveContainer width="100%" height={300}></ResponsiveContainer> */}
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart cx="50%" cy="50%" outerRadius={100} data={scoreData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="name" tick={{ fontSize: 12 }} />
              <Radar
                name="Score"
                dataKey="score"
                stroke="#8884d8"
                fill="#8884d8"
                fillOpacity={0.6}
              />
            </RadarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
