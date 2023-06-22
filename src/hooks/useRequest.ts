import { useCallback, useState } from "react";

export function useRequest(handler: () => Promise<any>) {
  const [error, setError] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetch = useCallback(async () => {
    try {
      setIsLoading(true);
      await handler();
    } catch (error) {
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [handler]);

  return { error, isLoading, fetch };
}
