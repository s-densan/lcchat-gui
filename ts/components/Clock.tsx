import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../slices/RootStore';

interface IProps {
  interval: number;
  onTimer: () => void;
}
export const Clock = (props: IProps) => {
  const [now, setNow] = React.useState(new Date());
  const message = useSelector((state: RootState) => state.message);
  React.useEffect(() => {
    const intervalId = setInterval(() => {
      setNow(new Date());
      props.onTimer();
    }, props.interval);
    return () => { clearInterval(intervalId); };
  }, [now]);
  return (
    // <div>{now.toString()}</div>
    <div></div>
  );
}
