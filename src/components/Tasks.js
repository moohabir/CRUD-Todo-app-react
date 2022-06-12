export default function Tasks({ taskname, time }) {
  return (
    <div className="tasks">
      <h1>Task: {taskname}</h1>
      <h1>Time:{time}</h1>
    </div>
  );
}
