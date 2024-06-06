"use client";

import { Instance } from "../components/Instance";
import { LoadingInstance } from "../components/LoadingInstance";
import { Vm } from "@/models/vm";
import { useSearchContext } from "@/providers/search.provider";
import { useVmInstances } from "../api/fetchInstances";

export const InstanceList = () => {
  const { isLoading, isError, error } = useVmInstances();
  const { state } = useSearchContext<Vm>();

  if (isLoading)
    return Array.from({ length: 5 }, (_, index) => (
      <LoadingInstance key={index} />
    ));

  if (isError) return <p>Error: {error.message}</p>;

  return state.results.map((instance, index) => (
    <Instance key={index} {...instance} />
  ));
};
