import { InstanceFilter } from "@/domains/instances/features/InstanceFilter";
// import { InstanceList } from "@/domains/instances/features/InstanceList";

export default function Page() {
  return (
    <div className="grid gap-6 max-w-6xl w-full mx-auto">
      <InstanceFilter />
      {/* <InstanceList /> */}
    </div>
  );
}
