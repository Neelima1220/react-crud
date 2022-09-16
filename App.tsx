import * as React from 'react';
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
  const [data, setData] = React.useState(
    localStorage.getItem('data')
      ? JSON.parse(localStorage.getItem('data'))
      : fakeData
  );
  const [showModal, setShowModal] = React.useState(false);
  const [edit, setEdit] = React.useState(false);
  const [name, setName] = React.useState('');
  const [age, setAge] = React.useState('');

  const inputRef = React.useRef();

  const handleCreate = () => {
    setShowModal(true);
    // if (inputRef) {
    //   inputRef.current.focus();
    // }
    console.log(inputRef);
  };
  const handleAdd = () => {
    const tempData = [...data];
    const newItem = { id: data.length + 1, name, age };
    setData([...tempData, newItem]);
    localStorage.setItem('data', JSON.stringify([...tempData, newItem]));
    setShowModal(false);
  };

  return (
    <div className="container">
      {showModal && (
        <div className="modal">
          <button style={{ position: 'absolute', top: '1rem', right: '2rem' }}>
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
              ref={inputRef}
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
            {edit ? 'edit' : 'Add'}{' '}
          </button>
        </div>
      )}
      <input
        style={{ marginBottom: '2rem' }}
        placeholder="search for the person"
      />
      <table className="table">
        {data &&
          data.map((item, index) => {
            return (
              <tr>
                <td>{item.name}</td>
                <td>{item.age}</td>
                <td className="edit"> Edit </td>
                <td className="remove"> remove </td>
              </tr>
            );
          })}
      </table>
      <div style={{ marginTop: '2rem' }}>
        <button style={{ marginRight: '2rem' }} onClick={handleCreate}>
          create
        </button>
        <button>clear all</button>
      </div>
    </div>
  );
}
