import React, { useState, useEffect } from 'react'

export default function Count() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    // 使用浏览器的 API 更新页面标题
    document.title = `You clicked ${count} times`;
  }, [count])
  return (
    <div>
      <button onClick={() => {
        setCount(count + 1)
      }}>click me</button>
    </div>
  )
}