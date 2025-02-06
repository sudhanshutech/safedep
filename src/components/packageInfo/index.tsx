import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PackageDetails({ insights }) {
    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>Package Information</CardTitle>
                </CardHeader>
                <CardContent>
                    <section className="mb-8">
                        <div className="space-y-2">
                            <p className="text-gray-700">
                                <span className="font-bold">📦 Name:</span> {insights.packageVersion?.package?.name || "N/A"}
                            </p>
                            <p className="text-gray-700">
                                <span className="font-bold">🏷️ Version:</span> {insights.packageVersion?.version || "N/A"}
                            </p>
                        </div>
                    </section>
                </CardContent>
            </Card>
        </div>
    );
}
