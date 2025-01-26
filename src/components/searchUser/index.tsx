import styles from './styles.module.css';
import { ChangeEvent, useState } from 'react';

import axiosWithToken from '../../utils/axiosWithToken';
import Avatar from '../avatar';
import Username from '../username';

interface ISearchUser {
  _id: string;
  username: string;
  image: string;
}

function SearchUser() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResult] = useState<ISearchUser[]>([]);

  const onChangeSearch = async (
    event: ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    const query = event.target.value;
    setSearchQuery(query);

    try {
      const response = await axiosWithToken.get(`/search/users?query=${query}`);
      setSearchResult(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.search_container}>
      <div className={styles.search_title}>Search</div>
      <input
        type="text"
        value={searchQuery}
        onChange={onChangeSearch}
        className={styles.search_input}
        placeholder="Search"
      />
      {searchResults.length > 0 && (
        <div className={styles.results_container}>
          <div className={styles.results_title}>Recent</div>
          <div className={styles.results_list}>
            {searchResults.map((item, index) => (
              <div className={styles.results_item} key={index}>
                <Avatar image={item.image} />
                <Username name={item.username} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchUser;
