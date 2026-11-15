import { useEffect, useState } from 'react'

const STORAGE_KEY = 'task-board:tasks'

const loadTasks = () => {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY))
    return Array.isArray(saved) ? saved : []
  } catch {
    return []
  }
}

export default function App() {
  const [tasks, setTasks] = useState(loadTasks)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
    } catch {
      // 保存できない環境（容量超過・プライベートモード等）では無視する
    }
  }, [tasks])
  const [text, setText] = useState('')
  const [closeFailed, setCloseFailed] = useState(false)

  const addTask = (e) => {
    e.preventDefault()
    const title = text.trim()
    if (!title) return
    setTasks([...tasks, { id: crypto.randomUUID(), title, done: false }])
    setText('')
  }

  const toggleTask = (id) =>
    setTasks(tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)))

  const deleteTask = (id) => setTasks(tasks.filter((t) => t.id !== id))

  // ブラウザの制限で、ユーザーが通常の方法で開いたタブは閉じられないことがある
  const exitApp = () => {
    window.close()
    setTimeout(() => setCloseFailed(true), 300)
  }

  return (
    <main className="app">
      <h1>タスクボード</h1>

      <form className="add-form" onSubmit={addTask}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="新しいタスクを入力"
          aria-label="新しいタスク"
        />
        <button type="submit">追加</button>
      </form>

      {tasks.length === 0 ? (
        <p className="empty">タスクがありません</p>
      ) : (
        <ul className="task-list">
          {tasks.map((task) => (
            <li key={task.id} className={task.done ? 'task done' : 'task'}>
              <label>
                <input
                  type="checkbox"
                  checked={task.done}
                  onChange={() => toggleTask(task.id)}
                />
                <span>{task.title}</span>
              </label>
              <button
                type="button"
                className="delete"
                onClick={() => deleteTask(task.id)}
                aria-label={`「${task.title}」を削除`}
              >
                削除
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className="exit-area">
        <button type="button" className="exit" onClick={exitApp}>
          終了
        </button>
        {closeFailed && (
          <p className="exit-message">
            ブラウザの制限でタブを閉じられませんでした。タブを手動で閉じてください。
          </p>
        )}
      </div>
    </main>
  )
}
