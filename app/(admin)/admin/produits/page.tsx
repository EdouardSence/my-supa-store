import Link from "next/link";
import { getAllProducts } from "@/lib/queries";
import { formatPrice } from "@/lib/products";

export default async function AdminProduits() {
    const products = await getAllProducts();

    return (
        <div>
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold text-white">Produits</h1>
                    <p className="mt-1 text-sm text-zinc-400">
                        {products.length} produit{products.length !== 1 ? "s" : ""} dans le catalogue
                    </p>
                </div>
            </div>

            <div className="mt-8 overflow-hidden rounded-xl border border-zinc-800">
                <table className="w-full text-sm">
                    <thead className="border-b border-zinc-800 bg-zinc-900/50">
                        <tr>
                            <th className="px-4 py-3 text-left font-medium text-zinc-400">Produit</th>
                            <th className="px-4 py-3 text-left font-medium text-zinc-400">SKU</th>
                            <th className="px-4 py-3 text-left font-medium text-zinc-400">Catégorie</th>
                            <th className="px-4 py-3 text-right font-medium text-zinc-400">Prix</th>
                            <th className="px-4 py-3 text-right font-medium text-zinc-400">Stock</th>
                            <th className="px-4 py-3 text-right font-medium text-zinc-400">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800">
                        {products.map((product) => {
                            const inStock = product.stock > 0;
                            const lowStock = product.stock > 0 && product.stock <= 10;

                            return (
                                <tr
                                    key={product.id}
                                    className="bg-zinc-900/20 transition hover:bg-zinc-800/30"
                                >
                                    <td className="px-4 py-3">
                                        <div>
                                            <Link
                                                href={`/produits/${product.slug}`}
                                                className="font-medium text-white hover:text-zinc-300 transition-colors"
                                                target="_blank"
                                            >
                                                {product.name}
                                            </Link>
                                            <p className="text-xs text-zinc-500">{product.brand}</p>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 font-mono text-xs text-zinc-400">
                                        {product.sku}
                                    </td>
                                    <td className="px-4 py-3 text-zinc-300">
                                        {product.category}
                                    </td>
                                    <td className="px-4 py-3 text-right font-medium text-white">
                                        {formatPrice(product.price, product.currency)}
                                    </td>
                                    <td className="px-4 py-3 text-right">
                                        <span
                                            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                                !inStock
                                                    ? "bg-zinc-800 text-zinc-400"
                                                    : lowStock
                                                    ? "bg-amber-900/40 text-amber-400"
                                                    : "bg-emerald-900/40 text-emerald-400"
                                            }`}
                                        >
                                            <span
                                                className={`h-1.5 w-1.5 rounded-full ${
                                                    !inStock
                                                        ? "bg-zinc-500"
                                                        : lowStock
                                                        ? "bg-amber-400"
                                                        : "bg-emerald-400"
                                                }`}
                                            />
                                            {product.stock}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-right">
                                        <Link
                                            href={`/admin/produits/${product.id}`}
                                            className="inline-flex items-center rounded-md border border-zinc-700 px-2.5 py-1 text-xs text-zinc-300 transition hover:border-zinc-600 hover:text-white"
                                        >
                                            Modifier
                                        </Link>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
