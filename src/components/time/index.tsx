import styles from './styles.module.css';

interface ITimeProps {
  time: string;
}

interface ITimeValue {
  time: string;
  count: number;
}

const getTimeValue = (time: string): ITimeValue => {
  const pastTime: number = new Date(time).getTime();
  const currentTime: number = new Date().getTime();

  const diffTime = currentTime - pastTime;

  const result: ITimeValue = {
    time: '',
    count: 0,
  };

  const seconds: number = Math.floor(diffTime / 1000);
  if (seconds < 60) {
    result.time = 'sec';
    result.count = seconds;
    return result;
  }

  const minutes: number = Math.floor(seconds / 60);
  if (minutes < 60) {
    result.time = 'min';
    result.count = minutes;
    return result;
  }

  const hours: number = Math.floor(minutes / 60);
  if (hours < 24) {
    result.time = 'h';
    result.count = hours;
    return result;
  }

  const days: number = Math.floor(hours / 24);
  if (days < 7) {
    result.time = days === 1 ? 'day' : 'days';
    result.count = days;
    return result;
  }

  const weeks: number = Math.floor(days / 7);
  result.time = weeks === 1 ? 'week' : 'weeks';
  result.count = weeks;
  return result;
};

function Time({ time }: ITimeProps) {
  const timeValue: ITimeValue = getTimeValue(time);
  return (
    <div className={styles.time}>
      {timeValue.count} {timeValue.time}
    </div>
  );
}

export default Time;
