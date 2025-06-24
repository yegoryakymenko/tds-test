export const payloadToHttpParamsHelper = <T extends {}>(params: T): string => {
  return Object.entries(params).reduce((previousValue, [key, value]) => {
    const prefix = previousValue.length ? '&' : '?';
    return (previousValue += `${prefix}${key}=${value}`);
  }, '')
}
