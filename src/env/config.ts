export const getEnvSafely = (envKey: string) => {
  const envVal = process.env[envKey];
  return envVal;
};
