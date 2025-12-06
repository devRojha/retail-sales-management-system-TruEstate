export default function buildQuery(params) {
  const queryParts = [];

  for (const key in params) {
    const value = params[key];

    // Skip empty values
    if (
      value === "" ||
      value === null ||
      (Array.isArray(value) && value.length === 0)
    ) {
      continue;
    }

    // elements join with comma
    if (Array.isArray(value)) {
      queryParts.push(`${key}=${value.join(',')}`);
    } 
    // Normal values
    else {
      queryParts.push(`${key}=${value}`);
    }
  }

  return queryParts.join('&');
}
