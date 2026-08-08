import { useRef, useState } from 'react';
import { TrashIcon } from '../../../components/ui/icons';
import ProductThumb from '../../../components/product/ProductThumb';
import Spinner from '../../../components/ui/Spinner';
import { uploadProductImage } from '../../../api/products';
import { formatPrice } from '../../../utils/format';

const EMPTY_FORM = { name: '', description: '', imageUrl: '', price: '', stockQuantity: '', categoryId: '' };
const ACCEPTED_TYPES = ['image/jpeg', 'image/png'];

export default function ProductsSection({ products, categories, onCreate, onDelete }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const fileInputRef = useRef(null);

  const submit = async (e) => {
    e.preventDefault();
    await onCreate({
      ...form,
      imageUrl: form.imageUrl || null,
      price: Number(form.price),
      stockQuantity: Number(form.stockQuantity),
      categoryId: Number(form.categoryId)
    });
    setForm(EMPTY_FORM);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadError('');

    if (!ACCEPTED_TYPES.includes(file.type)) {
      setUploadError('Only JPEG or PNG images are allowed.');
      e.target.value = '';
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setUploadError('Image must be 5 MB or smaller.');
      e.target.value = '';
      return;
    }

    setUploading(true);
    try {
      const res = await uploadProductImage(file);
      setForm((f) => ({ ...f, imageUrl: res.data.url }));
    } catch (err) {
      setUploadError(err?.response?.data?.message || 'Upload failed.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="card p-5">
        <h3 className="font-bold text-ink-950 dark:text-white">Create product</h3>
        <form onSubmit={submit} className="mt-3 flex flex-col gap-3">
          <input className="input" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <textarea className="input" placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />

          <div>
            <div className="flex items-center gap-3">
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl">
                <ProductThumb name={form.name} src={form.imageUrl} className="h-full w-full rounded-none" />
                {uploading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                    <Spinner className="h-5 w-5 border-white/40 border-t-white" />
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <button
                  type="button"
                  className="btn-secondary !px-3 !py-1.5 text-sm"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                >
                  {form.imageUrl ? 'Replace image' : 'Upload image (JPEG or PNG)'}
                </button>
                <span className="text-xs text-ink-400 dark:text-ink-500">Optional, up to 5 MB</span>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>
            {uploadError && <p className="mt-2 text-sm text-red-600 dark:text-red-400">{uploadError}</p>}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <input className="input" type="number" step="0.01" placeholder="Price" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
            <input className="input" type="number" placeholder="Stock" value={form.stockQuantity} onChange={(e) => setForm({ ...form, stockQuantity: e.target.value })} />
          </div>
          <select className="input" value={form.categoryId} onChange={(e) => setForm({ ...form, categoryId: e.target.value })}>
            <option value="">Select category</option>
            {categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}
          </select>
          <button className="btn-primary self-start" type="submit" disabled={uploading}>Save product</button>
        </form>
      </div>

      <div className="card p-5">
        <h3 className="font-bold text-ink-950 dark:text-white">Products ({products.length})</h3>
        <div className="mt-3 max-h-[28rem] divide-y divide-ink-100 overflow-y-auto dark:divide-ink-800">
          {products.map((product) => (
            <div key={product.id} className="flex items-center justify-between gap-3 py-3">
              <div className="flex min-w-0 items-center gap-3">
                <div className="h-10 w-10 shrink-0 overflow-hidden rounded-lg">
                  <ProductThumb name={product.name} src={product.imageUrl} className="h-full w-full rounded-none" />
                </div>
                <div className="min-w-0">
                  <p className="truncate font-semibold text-ink-900 dark:text-white">{product.name}</p>
                  <p className="text-sm text-ink-500 dark:text-ink-400">{formatPrice(product.price)} · Stock {product.stockQuantity}</p>
                </div>
              </div>
              <button
                type="button"
                className="shrink-0 text-ink-400 hover:text-red-600 dark:text-ink-500 dark:hover:text-red-400"
                aria-label="Delete product"
                onClick={() => onDelete(product.id)}
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
