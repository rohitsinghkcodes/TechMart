import {useEffect,useState} from 'react';
import axios from 'axios';

export default function useCategory(){
    const [categories, setCategories] = useState([])

    //get Categories
    const getAllCategories = async () => {
        try {
          const { data } = await axios.get("/api/v1/category/get-categories");
          if (data?.success) {
            setCategories(data?.category);
          }
        } catch (err) {
          console.log(err);
        }
      };

      useEffect(() => {
        getAllCategories();
        // eslint-disable-next-line
      }, []);

      return categories;
}
