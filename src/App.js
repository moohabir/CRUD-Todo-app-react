import { useEffect, useState } from "react";
import "./styles.css";
import Tasks from "./components/Tasks";
import db from "./firebase";

export default function App() {
  const [taskname, setTaskname] = useState("");
  const [time, setTime] = useState("");
  const [taskList, setTaskList] = useState([]);

  //below is about fetch and listen data from database when app loads
  //when add new todos or removed
  useEffect(() => {
    db.collection("todos").onSnapshot((snapshot) => {
      setTaskList(snapshot.docs.map((doc) => doc.data().todo));
    });
  }, []);

  const addTasks = () => {
    setTaskList([...taskList, { task: taskname, time: time }]);
    setTaskname("");
    setTime("");
  };

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
      <button disabled={!taskname} type="submit" onClick={addTasks}>
        Add todo
      </button>
      <button type="reset" onClick={() => setTaskList([])}>
        Reset
      </button>
      {taskList.map((task) => (
        <Tasks taskname={task.task} time={task.time} />
      ))}
    </div>
  );
}
