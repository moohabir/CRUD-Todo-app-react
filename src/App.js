import { useEffect, useState } from "react";
import "./styles.css";
import Tasks from "./components/Tasks";
import { db } from "./firebase";
import {
  collection,
  getDocs,
  addDoc,
  //updateDoc,
  deleteDoc,
  doc,
  onSnapshot
} from "firebase/firestore";

export default function App() {
  const [taskname, setTaskname] = useState("");
  const [time, setTime] = useState("");
  const [taskList, setTaskList] = useState([]);

  const usersCollectionRef = collection(db, "todos");

  //below is about fetch and listen data from database when app loads
  //when add new todos or removed
  // lkn waxaan u baahnahay onSnapshot inaan fahmo si automatic u
  //noqoto shaqada
  useEffect(
    () =>
      onSnapshot(collection(db, "todos"), (snapshot) =>
        setTaskList(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      ),
    []
  );

  const addTodo = async () => {
    await addDoc(usersCollectionRef, { taskname: taskname, time: time });
  };

  //const addTasks = (e) => {
  //e.preventDefault();
  // db.collection("todos").add({
  //  todo: taskname
  // });
  //setTaskList([...taskList, { task: taskname, time: time }]);
  //setTaskname("");
  //setTime("");
  //};

  //qaybtaan hoose waa qaabka update lkn waxaan
  //sii baari doona sidaan ugu salayn lahaa
  //databasekayga firesote ee todos kaas oo leh laba string
  //const updateTodo = async (id, age) => {
  //const userDoc = doc(db, "todos", id);
  //newFields = { age: age + 1 };
  //await updateDoc(userDoc, newFields);
  // };

  const deleteTodo = async (id) => {
    const userDoc = doc(db, "todos", id);
    await deleteDoc(userDoc);
  };

  return (
    <div className="App">
      <h1>Todos</h1>
      <input
        type="text"
        placeholder="Write task"
        value={taskname}
        onChange={(e) => setTaskname(e.target.value)}
      />
      <input
        type="text"
        placeholder="time to complete task"
        value={time}
        onChange={(e) => setTime(e.target.value)}
      />
      <button disabled={!taskname} type="submit" onClick={addTodo}>
        Add todo
      </button>
      <button type="reset" onClick={() => setTaskList([])}>
        Reset
      </button>
      {taskList.map((task, index) => (
        <div key={index}>
          <Tasks taskname={task.taskname} time={task.time} />
          <button onClick={() => deleteTodo(task.id)}>Delete Todo</button>
          <button onClick={() => updateTodo(task.id, task.age)}>
            update Todo
          </button>
        </div>
      ))}
    </div>
  );
}
