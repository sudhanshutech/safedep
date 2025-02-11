"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer,
} from "recharts";
import { Badge } from "../ui/badge";
import { ProjectInsightsProps } from "@/lib/types";

export default function ProjectInsights({
  insights,
}: {
  insights: ProjectInsightsProps;
}) {
  const project = insights?.insight?.projectInsights?.[0]?.project;
  const scorecard = insights?.insight?.projectInsights?.[0]?.scorecard;
  const githubUrl = project?.url;

  const scoreData = scorecard?.checks.map((check) => ({
    name: check.name,
    score: check.score || 0,
  }));

  return (
    <div className="p-4" style={{ width: "600px" }}>
      <Card className="w-full md:w-auto max-w-md  shadow-lg">
        <CardHeader>
          <h3 className="text-xl font-semibold">Project Metrics</h3>
        </CardHeader>
        <CardContent className="p-6">
          <div className="mb-2">
            <div className="mb-2">
              <strong>Project:</strong>{" "}
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {project?.name}
              </a>
            </div>
            <div className="mb-2">
              <strong>Stars:</strong>{" "}
              {insights?.insight?.projectInsights?.[0]?.stars}
            </div>
            <div className="mb-2">
              <strong>Forks:</strong>{" "}
              {insights?.insight?.projectInsights?.[0]?.forks}
            </div>
            <div className="mb-2">
              <strong>Open Issues:</strong>{" "}
              {insights?.insight?.projectInsights?.[0]?.issues.open}
            </div>
            <div className="mb-2 flex items-center">
              <strong>Scorecard Score:</strong>
              <Badge
                variant="outline"
                className="ml-2 text-xs bg-green-500 text-white"
              >
                {scorecard?.score.toFixed(2)}
              </Badge>
            </div>
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
