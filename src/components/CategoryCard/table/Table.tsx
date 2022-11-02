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
      <table>
        <thead>
          <tr>
            <td> Categorias </td>
            <td> Editar</td>
            <td> Excluir</td>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => {
            return (
              <tr key={category.id}>
                <td> {category.name} </td>
                <td>
                  <EditButton
                    fetchCategories={fetchCategories}
                    category={category}
                  />
                </td>
                <td>
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

        <tfoot>
          <tr>
            <td colSpan={3} style={{ width: 300 }}>
              <AddButton fetchCategories={fetchCategories} />
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default CategoryTable;
