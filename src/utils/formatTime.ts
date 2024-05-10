export function formatTime(time: string): string {
  const parts = time.split(":").map((part) => parseInt(part, 10));
  const hours = parts[0];
  const minutes = parts[1];
  const seconds = parts[2];

  const hourText = hours > 0 ? `${hours} hour${hours > 1 ? "s" : ""}` : "";
  const minuteText =
    minutes > 0 ? `${minutes} minute${minutes > 1 ? "s" : ""}` : "";
  const secondText =
    seconds > 0 ? `${seconds} second${seconds > 1 ? "s" : ""}` : "";

  const timeParts = [hourText, minuteText, secondText].filter(
    (part) => part !== "",
  );

  return timeParts.join(" ");
}
