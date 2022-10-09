import type { NextPage } from 'next'
import { format } from 'path';
import { useState } from 'react';

const Home: NextPage = () => {
  const [form, setForm] = useState<{title: string, content:string, id:string}>({title:"", content:"", id:""});

  return (
    <div className="container mx-auto max-w-4xl p-4">
      <h1 className="text-2xl font-bold">Notes</h1>
      <form onSubmit={(e) => {
        e.preventDefault();
      }} className="w-auto max-w-md mx-auto flex flex-col space-y-6">
        <input type="text" 
        placeholder='Title'
        value={form.title}
        onChange={(e) => setForm({...form, title: e.target.value})}
        className="border rounded border-gray-300 p-1"
        />
        <textarea placeholder='Content' value={form.content}
        onChange={(e) => setForm({...form, content: e.target.value})}
        className="border rounded border-gray-300 p-1"
        ></textarea>
      </form>
    </div>
  )
}

export default Home
