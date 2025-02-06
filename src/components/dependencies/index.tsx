import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
} from "@/components/ui/table";

export default function DependenciesTable({ insights }) {
    return (
        <div>
            <h3 className="text-xl font-semibold mb-4">Dependencies Table</h3>
            <div className="overflow-auto" style={{ maxHeight: '600px' }}>
                <Table className="w-full border border-gray-300 rounded-lg">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[400px]">Name</TableHead>
                            <TableHead className="text-left px-4 py-2 border-b-2 border-gray-200">
                                Version
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {insights.insight?.dependencies.map((dep, index) => (
                            <TableRow
                                key={index}
                                className={`hover:bg-gray-50 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}`}
                            >
                                <TableCell className="font-medium">{dep.package.name}</TableCell>
                                <TableCell>{dep.version}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
