import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  // Create a supabase client on the browser with project's credentials
  return createBrowserClient(
    "https://nqzspgzcbmwdwnzdhbrl.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5xenNwZ3pjYm13ZHduemRoYnJsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc1NDUyNTgsImV4cCI6MjA1MzEyMTI1OH0.2SOsuH8TlJ5AFgilPAv7_F2UPqfQ-9WLOLGvQ6X6Rho",
  );
}
