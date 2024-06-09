"use client";

import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@machines/ui";
import { CPU_CORES, DISK_SIZES, MEMORY_SIZES, REGIONS } from "@/config";
import { CreateVm, createVmSchema } from "@machines/model/vm";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@machines/ui";
import { Loader2, PlusIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@machines/ui";

import { Input } from "@machines/ui";
import { useCreateInstance } from "../api/create-instance";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export const CreateInstance = () => {
  const { mutateAsync: createInstance, isPending } = useCreateInstance();

  const form = useForm<CreateVm>({
    defaultValues: {},
    mode: "all",
    resolver: zodResolver(createVmSchema),
  });

  const isLoading = isPending || form.formState.isSubmitting;

  const disabled = isLoading || Object.values(form.formState.errors).length > 0;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <PlusIcon className="h-4 w-4" />
          <span className="text-sm">New Instance</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Instance</DialogTitle>
          <DialogDescription>
            Create a new instance by providing a name and selecting a plan.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit((data) => createInstance(data))}>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-6">
              <FormField
                control={form.control}
                name="region"
                render={({ field }) => (
                  <FormItem className="sm:col-span-3">
                    <FormLabel>Region</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={String(field.value)}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Region" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {REGIONS.map((region, index) => (
                          <SelectItem key={index} value={region}>
                            {region}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Pick a region for the new instance.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="sm:col-span-full">
                    <FormLabel>Instance name</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormDescription>
                      Provide a name for the new instance. If left empty, a
                      random name will be generated.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cpuCores"
                render={({ field }) => (
                  <FormItem className="sm:col-span-3">
                    <FormLabel>CPU Cores</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={String(field.value)}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select VM CPU Cores" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {CPU_CORES.map((cpuCore, index) => (
                          <SelectItem key={index} value={cpuCore}>
                            {cpuCore}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Choose your machine CPU cores for the new instance.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="memoryGB"
                render={({ field }) => (
                  <FormItem className="sm:col-span-3">
                    <FormLabel>Memory (in GB)</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={String(field.value)}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select VM Memory size" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {MEMORY_SIZES.map((memory_size, index) => (
                          <SelectItem key={index} value={String(memory_size)}>
                            {memory_size}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Choose the amount of memory in GB for the new instance.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="diskSizeGB"
                render={({ field }) => (
                  <FormItem className="sm:col-span-4">
                    <FormLabel>Disk Size (in GB)</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={String(field.value)}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select VM Disk size" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {DISK_SIZES.map((disk_size, index) => (
                          <SelectItem key={index} value={String(disk_size)}>
                            {disk_size}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Choose the amount of disk space in GB for the new
                      instance.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="mt-6 flex items-center justify-end gap-x-3">
              <DialogClose asChild>
                <Button disabled={disabled} variant="outline" type="button">
                  Cancel
                </Button>
              </DialogClose>
              <Button disabled={disabled} type="submit">
                {isLoading ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : null}
                Create Instance
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
