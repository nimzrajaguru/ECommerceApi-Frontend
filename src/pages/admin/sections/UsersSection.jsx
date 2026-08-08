import { TrashIcon } from '../../../components/ui/icons';
import { formatDate } from '../../../utils/format';

const ROLES = ['Customer', 'Admin'];

export default function UsersSection({ users, currentUserEmail, onChangeRole, onDelete }) {
  return (
    <div className="card p-5">
      <h3 className="font-bold text-ink-950 dark:text-white">Users ({users.length})</h3>
      <div className="mt-3 divide-y divide-ink-100 dark:divide-ink-800">
        {users.map((user) => {
          const isSelf = user.email === currentUserEmail;
          const role = user.roles.includes('Admin') ? 'Admin' : 'Customer';

          return (
            <div key={user.id} className="flex flex-wrap items-center justify-between gap-3 py-3">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <strong className="text-ink-900 dark:text-white">{user.firstName} {user.lastName}</strong>
                  {isSelf && <span className="badge bg-ink-100 text-ink-500 dark:bg-ink-800 dark:text-ink-400">You</span>}
                </div>
                <p className="text-sm text-ink-500 dark:text-ink-400">{user.email}</p>
                <p className="text-xs text-ink-400 dark:text-ink-500">
                  Joined {formatDate(user.createdAt)} · {user.orderCount} order{user.orderCount === 1 ? '' : 's'}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <select
                  className="input w-auto !py-1.5 text-sm"
                  value={role}
                  disabled={isSelf}
                  onChange={(e) => onChangeRole(user.id, e.target.value)}
                >
                  {ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
                </select>
                <button
                  type="button"
                  className="shrink-0 text-ink-400 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-30 dark:text-ink-500 dark:hover:text-red-400"
                  aria-label="Delete user"
                  disabled={isSelf}
                  onClick={() => onDelete(user.id)}
                >
                  <TrashIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
