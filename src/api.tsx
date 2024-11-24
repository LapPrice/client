export const fetchAvailableOptions = async () => {
    const response = await fetch("https://your-api-endpoint/options");
    if (!response.ok) {
      throw new Error("Failed to fetch available options");
    }
    return await response.json();
  };