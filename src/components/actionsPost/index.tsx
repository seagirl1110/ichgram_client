import styles from './styles.module.css';
import axiosWithToken from '../../utils/axiosWithToken';

interface IActionsPostProps {
  postId: string;
  deleteFunc: () => void;
}

interface IAction {
  name: string;
  action?: () => void;
}

function ActionsPost({ postId, deleteFunc }: IActionsPostProps) {
  const deletePost = async (): Promise<void> => {
    try {
      await axiosWithToken.delete(`/post/${postId}`);
      deleteFunc();
    } catch (error) {
      console.log(error);
    }
  };

  const actionsList: IAction[] = [
    { name: 'Delete', action: deletePost },
    { name: 'Edit' },
    { name: 'Go to post' },
    { name: 'Copy link' },
    { name: 'Cancel' },
  ];

  return (
    <div className={styles.actions_post_container}>
      {actionsList.map((item, index) => (
        <div className={styles.post_action} key={index} onClick={item.action}>
          {item.name}
        </div>
      ))}
    </div>
  );
}

export default ActionsPost;
