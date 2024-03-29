// useTimer.ts
import { useEffect, useState } from "react";

const useTimer = (startTime: Date | null, stopTime: Date | null) => {
  const [timeElapsed, setTimeElapsed] = useState<string>("00:00");

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (startTime && !stopTime) {
      interval = setInterval(() => {
        const now = new Date();
        const difference = now.getTime() - startTime.getTime();
        const minutes = Math.floor((difference / (1000 * 60)) % 60);
        const seconds = Math.floor((difference / 1000) % 60);
        setTimeElapsed(
          `${minutes < 10 ? "0" + minutes : minutes}:${
            seconds < 10 ? "0" + seconds : seconds
          }`,
        );
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [startTime, stopTime]);

  return timeElapsed;
};

export default useTimer;
