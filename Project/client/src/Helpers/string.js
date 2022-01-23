export function capitalize(string) {
  return string
    .split(" ")
    .map((subString) => subString.charAt(0).toUpperCase() + subString.slice(1))
    .join(" ");
}
