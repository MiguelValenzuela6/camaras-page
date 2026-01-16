import { PackageGraphChart } from "@/modules/dashboard/metricas/package-graph-chart";
import { MoneyGraphChart } from "@/modules/dashboard/metricas/money-graph-chart";
import { CustomerGraphChart } from "@/modules/dashboard/metricas/customer-graph-chart";
import { TabMetrics } from "@/modules/dashboard/metricas/tab-metrics";

export default function MetricasPage() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 2xl:grid-cols-3 gap-4">
        {/* <PackageGraphChart />
        <MoneyGraphChart />
        <CustomerGraphChart /> */}
      </div>
      {/* <TabMetrics /> */}
    </div>
  );
}
