import { Button, Input } from 'antd';
import Header from '../Header/Header';
import './MainPage.scss';
import { useEffect, useState } from 'react';
import { v4 } from 'uuid';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase/firebase';
import { setUserId } from 'firebase/analytics';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo } from '../../redux/slices/notesSlice';

const MainPage = () => {
  const [todoInput, setTodoInput] = useState('');
  const [currentUser, setCurrentUser] = useState(null);

  const dispatch = useDispatch();
  const todos = useSelector((state) => state.notes.notes);

  useEffect(() => {
    const subscribe = onAuthStateChanged(auth, (user) =>
      user ? setCurrentUser(user.uid) : setUserId(null),
    );
  }, []);

  const handleAddTodo = () => {
    const newTodo = {
      id: v4(),
      userId: currentUser,
      todo: todoInput,
      completed: false,
    };
    console.log(newTodo);

    dispatch(addTodo(newTodo));
    setTodoInput('');
  };

  return (
    <>
      <Header />
      <main className="main main__page">
        <div className="main__profile">
          <h2>To-do list</h2>
          <div className="main__profile-add">
            <Input
              className="main__profile-input"
              value={todoInput}
              onChange={(e) => setTodoInput(e.target.value)}
            />
            <Button type="primary" onClick={handleAddTodo}>
              Add
            </Button>
          </div>
          {todos.length ? (
            <div>
              <ul className="todos">
                {todos.map((todo) => (
                  <li className="todos__unit" key={todo.id}>
                    {todo.todo}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <span className="main__profile main__profile-nonotes">Nothing to display!</span>
          )}
        </div>
      </main>
    </>
  );
};

export default MainPage;
