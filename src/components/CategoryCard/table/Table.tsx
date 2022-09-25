import React from 'react';
import EditButton from '../Buttons/EditButton';
import DeleteButton from '../Buttons/DeleteButton';
import AddButton from '../Buttons/AddButton';
import './index.scss';

const CategoryTable = () => {
  return (
    <div className="mainTable">
      <table>
        <thead>
          <tr>
            <td> Categorias </td>
            <td> Editar</td>
            <td> Excluir</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td> Pizzas </td>
            <td>
              <EditButton />
            </td>
            <td>
              <DeleteButton />
            </td>
          </tr>

          <tr>
            <td colSpan={3} style={{ width: 300 }}>
              <hr />
            </td>
          </tr>

          <tr>
            <td> Lanches </td>
            <td>
              <EditButton />
            </td>
            <td>
              <DeleteButton />
            </td>
          </tr>

          <tr>
            <td colSpan={3} style={{ width: 300 }}>
              <hr />
            </td>
          </tr>

          <tr>
            <td> Bebidas </td>
            <td>
              <EditButton />
            </td>
            <td>
              <DeleteButton />
            </td>
          </tr>

          <tr>
            <td colSpan={3} style={{ width: 300 }}>
              <hr />
            </td>
          </tr>
        </tbody>

        <tfoot>
          <tr>
            <td colSpan={3} style={{ width: 300 }}>
              <AddButton />
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default CategoryTable;
