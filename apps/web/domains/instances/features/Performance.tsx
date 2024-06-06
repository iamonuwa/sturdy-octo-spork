"use client";

import { useVmInstanceMetrics } from "../api/fetchInstanceMetric";

export const Performance = () => {
  const { data, error, isError, isLoading } = useVmInstanceMetrics();

  return null;
};
