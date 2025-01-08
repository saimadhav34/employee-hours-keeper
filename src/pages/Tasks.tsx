import React from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { TimeEntryForm } from "@/components/TimeEntryForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Tasks = () => {
  // For demo purposes, we'll assume the user is an associate
  const userRole = "associate";

  return (
    <DashboardLayout role={userRole}>
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Time Entries</h1>
        
        <Card>
          <CardHeader>
            <CardTitle>New Time Entry</CardTitle>
          </CardHeader>
          <CardContent>
            <TimeEntryForm />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Tasks;