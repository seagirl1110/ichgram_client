import styles from './styles.module.css';
import avatarIcon from './../../assets/icons/avatar.svg';

interface IAvatarProps {
  image: string;
  width?: number;
  active?: boolean;
}

function Avatar({ image, width = 36, active = false }: IAvatarProps) {
  return (
    <div
      style={{ width: width, height: width }}
      className={`${styles.avatar_container} ${
        active && styles['avatar_container_active']
      }`}
    >
      <img
        className={styles.avatar}
        src={image ? image : avatarIcon}
        alt="avatar"
      />
    </div>
  );
}

export default Avatar;
