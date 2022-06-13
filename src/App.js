import { useEffect, useState } from "react";
import "./styles.css";
import Tasks from "./components/Tasks";
import { db } from "./firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";

export default function App() {
  const [taskname, setTaskname] = useState("");
  const [time, setTime] = useState("");
  const [taskList, setTaskList] = useState([]);

  const usersCollectionRef = collection(db, "todos");

  const addTodo = async () => {
    await addDoc(usersCollectionRef, { taskname: taskname, time: time });
  };

  //below is about fetch and listen data from database when app loads
  //when add new todos or removed
  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setTaskList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      console.log(data);
    };
    getUsers();
  }, []);

  //const addTasks = (e) => {
  //e.preventDefault();
  // db.collection("todos").add({
  //  todo: taskname
  // });
  //setTaskList([...taskList, { task: taskname, time: time }]);
  //setTaskname("");
  //setTime("");
  //};

  return (
    <div className="App">
      <h1>Todos</h1>
      <input
        type="text"
        value={taskname}
        onChange={(e) => setTaskname(e.target.value)}
      />
      <input
        type="text"
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
        </div>
      ))}
    </div>
  );
}
