import React from 'react';

interface IProps {
  interval: number;
  onTimer: () => void;
}
export default function Clock(props: IProps) {
  const [now, setNow] = React.useState(new Date());
  React.useEffect(() => {
    const intervalId = setInterval(() => {
      setNow(new Date());
      props.onTimer();
    }, props.interval);
    return () => { clearInterval(intervalId); };
  }, [now]);
  return (
    <div></div>
  );
};
