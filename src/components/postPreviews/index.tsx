import styles from './styles.module.css';

interface IPostPreviewsProps {
  images: string[];
  description: string;
  onClick: () => void;
}

function PostPreviews({ images, description, onClick }: IPostPreviewsProps) {
  return (
    <div className={styles.post} onClick={onClick}>
      <img className={styles.post_image} src={images[0]} alt={description} />
    </div>
  );
}

export default PostPreviews;
