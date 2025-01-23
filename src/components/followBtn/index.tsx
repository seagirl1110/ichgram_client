import Button from '../button';

interface IFollowBtnProps {
  isFollow: boolean;
  onClick: () => void;
  typeStyle?: 'text' | 'primary' | 'secondary';
  minWidth?: number;
}

function FollowBtn({
  isFollow,
  onClick,
  typeStyle = 'text',
  minWidth = 80,
}: IFollowBtnProps) {
  return (
    <Button
      name={isFollow ? 'Unfollow' : 'Follow'}
      typeStyle={typeStyle}
      minWidth={minWidth}
      onClick={onClick}
    />
  );
}

export default FollowBtn;
