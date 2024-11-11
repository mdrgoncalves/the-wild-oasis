import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://vfoisrkxlcvgsvqttfno.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZmb2lzcmt4bGN2Z3N2cXR0Zm5vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzEwNzk3MTMsImV4cCI6MjA0NjY1NTcxM30.aIYYFNoyelpk3P7HXxRcIusSytCH3qpBDuJqzB3vpBE";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
