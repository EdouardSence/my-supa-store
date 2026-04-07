"use client";

import { useActionState } from "react";
import { testErrorAction, updateProductAction } from "@/lib/product-actions";
import { PRODUCT_FORM_INITIAL_STATE } from "@/lib/product-schema";

type EditableProduct = {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  stock: number;
  sku: string;
  category: string;
  brand: string;
};

type AdminProductEditFormProps = {
  product: EditableProduct;
};

export default function AdminProductEditForm({ product }: AdminProductEditFormProps) {
  const [state, formAction, pending] = useActionState(updateProductAction, PRODUCT_FORM_INITIAL_STATE);
  const [testState, testFormAction, testPending] = useActionState(testErrorAction, PRODUCT_FORM_INITIAL_STATE);

  const currentState = testState.error || testState.success ? testState : state;
  const isPending = pending || testPending;

  return (
    <form action={formAction} className="space-y-5">
      <input type="hidden" name="id" value={product.id} />

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1 block text-xs font-medium text-zinc-400">Nom</label>
          <input
            id="name"
            name="name"
            defaultValue={currentState.values?.name ?? product.name}
            required
            className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 outline-none transition focus:border-zinc-500"
          />
        </div>

        <div>
          <label htmlFor="slug" className="mb-1 block text-xs font-medium text-zinc-400">Slug</label>
          <input
            id="slug"
            name="slug"
            defaultValue={currentState.values?.slug ?? product.slug}
            required
            className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 outline-none transition focus:border-zinc-500"
          />
        </div>

        <div className="md:col-span-2">
          <label htmlFor="description" className="mb-1 block text-xs font-medium text-zinc-400">Description</label>
          <textarea
            id="description"
            name="description"
            defaultValue={currentState.values?.description ?? product.description}
            rows={4}
            required
            className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 outline-none transition focus:border-zinc-500"
          />
        </div>

        <div>
          <label htmlFor="price" className="mb-1 block text-xs font-medium text-zinc-400">Prix</label>
          <input
            id="price"
            name="price"
            type="number"
            step="0.01"
            min="0"
            defaultValue={currentState.values?.price ?? product.price}
            required
            className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 outline-none transition focus:border-zinc-500"
          />
        </div>

        <div>
          <label htmlFor="stock" className="mb-1 block text-xs font-medium text-zinc-400">Stock</label>
          <input
            id="stock"
            name="stock"
            type="number"
            step="1"
            min="0"
            defaultValue={currentState.values?.stock ?? product.stock}
            required
            className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 outline-none transition focus:border-zinc-500"
          />
        </div>

        <div>
          <label htmlFor="sku" className="mb-1 block text-xs font-medium text-zinc-400">SKU</label>
          <input
            id="sku"
            name="sku"
            defaultValue={currentState.values?.sku ?? product.sku}
            required
            className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 outline-none transition focus:border-zinc-500"
          />
        </div>

        <div>
          <label htmlFor="category" className="mb-1 block text-xs font-medium text-zinc-400">Catégorie</label>
          <input
            id="category"
            name="category"
            defaultValue={currentState.values?.category ?? product.category}
            required
            className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 outline-none transition focus:border-zinc-500"
          />
        </div>

        <div>
          <label htmlFor="brand" className="mb-1 block text-xs font-medium text-zinc-400">Marque</label>
          <input
            id="brand"
            name="brand"
            defaultValue={currentState.values?.brand ?? product.brand}
            required
            className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 outline-none transition focus:border-zinc-500"
          />
        </div>
      </div>

      {currentState.error && <p className="text-sm text-red-400">{currentState.error}</p>}
      {currentState.success && <p className="text-sm text-emerald-400">{currentState.success}</p>}

      <button
        type="submit"
        disabled={isPending}
        className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-zinc-900 transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? "Enregistrement..." : "Enregistrer les modifications"}
      </button>

      <button
        type="submit"
        formAction={testFormAction}
        formNoValidate
        disabled={isPending}
        className="ml-3 rounded-lg border border-red-700 px-4 py-2 text-sm font-medium text-red-300 transition hover:bg-red-900/20 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? "Test..." : "Test d'erreur"}
      </button>
    </form>
  );
}
