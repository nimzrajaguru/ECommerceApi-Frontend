import { useState } from 'react';
import { TrashIcon } from '../../../components/ui/icons';

export default function CategoriesSection({ categories, onCreate, onDelete }) {
  const [form, setForm] = useState({ name: '', description: '' });

  const submit = async (e) => {
    e.preventDefault();
    await onCreate(form);
    setForm({ name: '', description: '' });
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="card p-5">
        <h3 className="font-bold text-ink-950 dark:text-white">Create category</h3>
        <form onSubmit={submit} className="mt-3 flex flex-col gap-3">
          <input className="input" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <textarea className="input" placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          <button className="btn-primary self-start" type="submit">Save category</button>
        </form>
      </div>

      <div className="card p-5">
        <h3 className="font-bold text-ink-950 dark:text-white">Categories ({categories.length})</h3>
        <div className="mt-3 divide-y divide-ink-100 dark:divide-ink-800">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center justify-between gap-3 py-3">
              <div className="min-w-0">
                <p className="font-semibold text-ink-900 dark:text-white">{category.name}</p>
                <p className="line-clamp-1 text-sm text-ink-500 dark:text-ink-400">{category.description}</p>
              </div>
              <button
                type="button"
                className="shrink-0 text-ink-400 hover:text-red-600 dark:text-ink-500 dark:hover:text-red-400"
                aria-label="Delete category"
                onClick={() => onDelete(category.id)}
              >
                <TrashIcon className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
