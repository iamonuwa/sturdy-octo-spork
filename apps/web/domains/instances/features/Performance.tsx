"use client";

import { Card } from "@machines/ui";
import { useVmInstanceMetrics } from "../api/fetchInstanceMetric";

export const Performance = () => {
  const { data, error, isError, isLoading } = useVmInstanceMetrics();

  return <Card></Card>;
};
