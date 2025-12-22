// A utility function to create a delay for a specified number of milliseconds
export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));
