import { InstanceInfo } from "@/domains/instances/features/InstanceDetails";
import { LinearChart } from "@/domains/insights/features/LinearChart";

export default function Page() {
  return (
    <div className="grid grid-cols-1 gap-6 max-w-6xl w-full mx-auto">
      <InstanceInfo />
      <LinearChart />
    </div>
  );
}
