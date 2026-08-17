const DUMMY_JSON_BASE = "https://dummyjson.com";
const DUMMY_JSON_LIMIT = "200";

export const fetchDummyJson = async <T,>(
  path: string,
  select?: string,
): Promise<T> => {
  const url = new URL(path, `${DUMMY_JSON_BASE}/`);
  url.searchParams.set("limit", DUMMY_JSON_LIMIT);
  url.searchParams.set("skip", "0");

  if (select) {
    url.searchParams.set("select", select);
  }

  const response = await fetch(
    url,
    typeof window === "undefined"
      ? { next: { revalidate: 300 } }
      : undefined,
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch ${path}`);
  }

  return response.json() as Promise<T>;
};
