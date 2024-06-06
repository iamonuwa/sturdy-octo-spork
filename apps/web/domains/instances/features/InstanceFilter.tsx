import { CreateInstance } from "../components/CreateInstance";
import { Filter } from "../components/Filter";
import { Regions } from "../components/Region";
import { SearchInput } from "../components/SearchInput";

export const InstanceFilter = () => {
  return (
    <div className="flex flex-col lg:flex-row md:items-center gap-2 md:gap-4">
      <SearchInput />
      <div className="flex flex-wrap items-center gap-4">
        <Filter />
        <Regions />
        <CreateInstance />
      </div>
    </div>
  );
};
