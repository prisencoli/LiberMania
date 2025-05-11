import React from "react";
import { Route, Switch } from "wouter";
import Dashboard from "./pages/dashboard";
import NotFound from "./pages/not-found";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <Router />
      </div>
    </QueryClientProvider>
  );
}