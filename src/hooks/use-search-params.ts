/**
 * Hook to handle search params mutation
 */
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function useSearchParamsMutation() {
  const path = usePathname();
  const currentParams = useSearchParams();
  const router = useRouter();

  function setSearchParams(key: string, value: string) {
    const params = new URLSearchParams(currentParams.toString());
    
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    const newUrl = `${path}?${params.toString()}`;
    router.replace(newUrl);
  }

  // Clear all search params
  function clearSearchParams() {
    router.replace(path);
  }

  return {
    currentParams,
    setSearchParams,
    clearSearchParams,
  };
}
