import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";

const DatabaseConnectionTest = () => {
  const [connectionStatus, setConnectionStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const testConnection = async () => {
    setConnectionStatus("loading");
    setErrorMessage(null);

    try {
      // Simple query to test the connection
      const { data, error } = await supabase
        .from("missing_persons")
        .select("count(*)")
        .limit(1);

      if (error) throw error;

      setConnectionStatus("success");
    } catch (error: any) {
      console.error("Database connection error:", error);
      setConnectionStatus("error");
      setErrorMessage(error.message || "Failed to connect to the database");
    }
  };

  useEffect(() => {
    // Test connection on component mount
    testConnection();
  }, []);

  return (
    <div className="p-4 border rounded-lg bg-white shadow-sm">
      <h3 className="text-lg font-semibold mb-2">Database Connection Status</h3>

      <div className="mb-4">
        {connectionStatus === "idle" && (
          <Alert>
            <AlertTitle>Connection not tested</AlertTitle>
            <AlertDescription>
              Click the button below to test the database connection.
            </AlertDescription>
          </Alert>
        )}

        {connectionStatus === "loading" && (
          <Alert>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            <AlertTitle>Testing connection...</AlertTitle>
            <AlertDescription>
              Please wait while we test the connection to Supabase.
            </AlertDescription>
          </Alert>
        )}

        {connectionStatus === "success" && (
          <Alert className="bg-green-50 border-green-200">
            <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
            <AlertTitle className="text-green-700">
              Connection successful
            </AlertTitle>
            <AlertDescription className="text-green-600">
              Successfully connected to the Supabase database.
            </AlertDescription>
          </Alert>
        )}

        {connectionStatus === "error" && (
          <Alert className="bg-red-50 border-red-200">
            <XCircle className="h-4 w-4 mr-2 text-red-500" />
            <AlertTitle className="text-red-700">Connection failed</AlertTitle>
            <AlertDescription className="text-red-600">
              {errorMessage ||
                "Failed to connect to the database. Please check your credentials."}
            </AlertDescription>
          </Alert>
        )}
      </div>

      <Button
        onClick={testConnection}
        disabled={connectionStatus === "loading"}
        className="w-full"
      >
        {connectionStatus === "loading" ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Testing Connection
          </>
        ) : (
          "Test Database Connection"
        )}
      </Button>
    </div>
  );
};

export default DatabaseConnectionTest;
