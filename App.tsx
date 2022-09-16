import React, { useRef, useState } from 'react';
import './style.css';

const fakeData = [
  {
    id: 1,
    name: 'Maurine',
    age: 13,
  },
  {
    id: 2,
    name: 'Grace',
    age: 56,
  },
  {
    id: 3,
    name: 'Bard',
    age: 64,
  },
  {
    id: 4,
    name: 'Dixie',
    age: 57,
  },
  {
    id: 5,
    name: 'Alvie',
    age: 42,
  },
];

export default function App() {
  const [data, setData] = useState(
    localStorage.getItem('data')
      ? JSON.parse(localStorage.getItem('data'))
      : fakeData
  );
  const [showModal, setShowModal] = useState(false);
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState('');
  const [age, setAge] = useState();
  const [editId, setEditId] = useState(null);

  const inputElement = useRef();

  const handleCreate = () => {
    setShowModal(true);
    setName('');
    setAge(null);
    setTimeout(() => {
      console.log(inputElement);
      inputElement.current.focus();
    }, 50);
  };
  const handleAdd = () => {
    const tempData = [...data];
    if (edit) {
      const newData = tempData.map((item, index) => {
        if (index === editId) {
          return { ...item, name, age };
        } else {
          return item;
        }
      });
      setData(newData);
      localStorage.setItem('data', JSON.stringify(newData));
    } else {
      const newItem = { id: data.length + 1, name, age };
      setData([...tempData, newItem]);
      localStorage.setItem('data', JSON.stringify([...tempData, newItem]));
    }
    setShowModal(false);
  };
  const handleClear = () => {
    setData([]);
  };
  const handleRemove = (i) => {
    const tempData = [...data];
    const newData = tempData.filter((_, index) => index !== i);
    setData(newData);
    localStorage.setItem('data', JSON.stringify(newData));
  };
  const handleEdit = (i) => {
    const tempData = [...data];
    setShowModal(true);
    const newItem = tempData.find((item, index) => index === i);
    const { id, name, age } = newItem;
    setName(name);
    setAge(age);
    setEdit(true);
    setEditId(i);
    // setData(newData);
    // localStorage.setItem('data', JSON.stringify(newData));
  };

  return (
    <div className="container">
      {showModal && (
        <div className="modal">
          <button
            style={{ position: 'absolute', top: '1rem', right: '2rem' }}
            onClick={() => setShowModal(false)}
          >
            {' '}
            close{' '}
          </button>
          <div style={{ padding: '3rem' }}>
            <input
              type="text"
              placeholder="name"
              style={{ marginRight: '1rem', padding: '0.5rem' }}
              value={name}
              onChange={(e) => setName(e.target.value)}
              ref={inputElement}
            />
            <input
              placeholder="age"
              style={{ padding: '0.5rem' }}
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>
          <button style={{ padding: '0.5rem' }} onClick={handleAdd}>
            {edit ? 'update' : 'Add'}{' '}
          </button>
        </div>
      )}
      <input
        style={{ marginBottom: '2rem' }}
        placeholder="search for the person"
      />
      <table className="table">
        <tbody>
          {data?.length &&
            data.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.age}</td>
                  <td className="edit" onClick={() => handleEdit(index)}>
                    {' '}
                    Edit{' '}
                  </td>
                  <td className="remove" onClick={() => handleRemove(index)}>
                    {' '}
                    remove{' '}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <div style={{ marginTop: '2rem' }}>
        <button style={{ marginRight: '2rem' }} onClick={handleCreate}>
          create
        </button>
        <button onClick={handleClear}>clear all</button>
      </div>
    </div>
  );
}
