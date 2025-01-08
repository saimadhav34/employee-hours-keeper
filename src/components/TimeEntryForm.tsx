import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { timeEntryService, TimeEntry } from "../services/timeEntryService";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface TimeEntryFormData extends Omit<TimeEntry, 'id' | 'employeeName'> {}

export const TimeEntryForm = () => {
  const queryClient = useQueryClient();
  
  const createTimeEntryMutation = useMutation({
    mutationFn: (data: TimeEntryFormData) => {
      const timeEntry: TimeEntry = {
        ...data,
        employeeName: "John Doe", // This should come from auth context in the future
      };
      return timeEntryService.createTimeEntry(timeEntry);
    },
    onSuccess: () => {
      toast.success("Time entry saved successfully");
      queryClient.invalidateQueries({ queryKey: ['timeEntries'] });
      form.reset();
    },
    onError: (error) => {
      toast.error("Failed to save time entry");
      console.error("Error saving time entry:", error);
    },
  });

  const form = useForm<TimeEntryFormData>({
    defaultValues: {
      project: "",
      category: "",
      date: new Date().toISOString().split("T")[0],
      startTime: "",
      endTime: "",
      description: "",
    },
  });

  const onSubmit = (data: TimeEntryFormData) => {
    // Validate time duration
    const start = new Date(`${data.date} ${data.startTime}`);
    const end = new Date(`${data.date} ${data.endTime}`);
    const duration = (end.getTime() - start.getTime()) / (1000 * 60 * 60); // hours

    if (duration > 8) {
      toast.error("Task duration cannot exceed 8 hours");
      return;
    }

    if (duration <= 0) {
      toast.error("End time must be after start time");
      return;
    }

    createTimeEntryMutation.mutate(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="project"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a project" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="project1">Project 1</SelectItem>
                    <SelectItem value="project2">Project 2</SelectItem>
                    <SelectItem value="project3">Project 3</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="meeting">Meeting</SelectItem>
                    <SelectItem value="development">Development</SelectItem>
                    <SelectItem value="training">Training</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="startTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Start Time</FormLabel>
                  <FormControl>
                    <Input type="time" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="endTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>End Time</FormLabel>
                  <FormControl>
                    <Input type="time" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe your task..."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button 
          type="submit" 
          className="w-full"
          disabled={createTimeEntryMutation.isPending}
        >
          {createTimeEntryMutation.isPending ? 'Saving...' : 'Save Time Entry'}
        </Button>
      </form>
    </Form>
  );
};