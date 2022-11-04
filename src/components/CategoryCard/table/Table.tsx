import React, { useEffect, useState } from 'react';
import EditButton from '../Buttons/EditButton';
import DeleteButton from '../Buttons/DeleteButton';
import AddButton from '../Buttons/AddButton';
import './index.scss';
import { Category } from '../../../types/category';
import api from '../../../services/api';
import Alert from '../../Alert';

const CategoryTable = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [alertJSON, setAlertJSON] = useState({
    primaryColor: '',
    secondaryColor: '',
    msg: '',
    className: '',
  });

  function setMessage(msg: any) {
    setAlertJSON(msg);
  }

  async function fetchCategories() {
    await api
      .get('/product-types')
      .then((response) => {
        setCategories(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        throw error;
      });
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="mainTable">
      <Alert
        notice={alertJSON.msg}
        cardColor={alertJSON.primaryColor}
        timeBarColor={alertJSON.secondaryColor}
        className={alertJSON.className}
      />

      <div className="container-categories">
        <div className="page-title">
          <h1>Categorias</h1>
          <AddButton
            setMessage={setMessage}
            fetchCategories={fetchCategories}
          />
        </div>

        <table>
          <tbody>
            {categories.map((category) => {
              return (
                <tr key={category.id}>
                  <td className="category-name"> {category.name} </td>
                  <td className="actions-column" colSpan={2}>
                    <EditButton
                      setMessage={setMessage}
                      fetchCategories={fetchCategories}
                      category={category}
                    />
                    <DeleteButton
                      setMessage={setMessage}
                      fetchCategories={fetchCategories}
                      category={category}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CategoryTable;
