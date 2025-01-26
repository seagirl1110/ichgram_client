import styles from './styles.module.css';

interface IPostPreviewsProps {
  images: string[];
  description: string;
  onClick: () => void;
  width?: number;
  height?: number;
}

function PostPreviews({
  images,
  description,
  onClick,
  width = 308,
  height = 308,
}: IPostPreviewsProps) {
  return (
    <div
      style={{ width: width, height: height }}
      className={styles.post}
      onClick={onClick}
    >
      <img className={styles.post_image} src={images[0]} alt={description} />
    </div>
  );
}

export default PostPreviews;
