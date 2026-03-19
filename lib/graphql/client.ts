import type {
  CollectionWithProductsResponse,
  SponsoredProduct,
  Collection,
} from "./types";

const MOCK_SHOPIFY_URL = "https://mock.shop/graphql";

const COLLECTION_QUERY = `
  query CollectionWithProducts($handle: String!) {
    collection(handle: $handle) {
      id
      title
      handle
      products(first: 10) {
        edges {
          node {
            id
            title
            handle
            availableForSale
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            images(first: 1) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
          }
        }
      }
    }
  }
`;

const PRODUCT_QUERY = `
  query ProductByHandle($handle: String!) {
    product(handle: $handle) {
      id
      title
      handle
      description
      availableForSale
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      images(first: 5) {
        edges {
          node {
            url
            altText
          }
        }
      }
    }
  }
`;

export const SPONSORED_PRODUCTS_TAG = "sponsored-products";

async function fetchGraphQL<T>(
  query: string,
  variables?: Record<string, unknown>,
  options?: RequestInit & { next?: { revalidate?: number | false; tags?: string[] } }
): Promise<T> {
  const start = performance.now();
  try {
    const response = await fetch(MOCK_SHOPIFY_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query, variables }),
      ...options,
    });
    console.log(`[mockShop] fetch products ${(performance.now() - start).toFixed(0)}ms (revalidate: ${options?.next?.revalidate ?? 'default'})`);

    if (!response.ok) {
      console.warn(`[mockShop] request failed: ${response.status}, using mock data`);
      return getMockData<T>();
    }

    const json = await response.json();

    if (json.errors) {
      console.warn(`[mockShop] GraphQL error: ${json.errors[0].message}, using mock data`);
      return getMockData<T>();
    }

    return json.data as T;
  } catch (error) {
    console.warn("[mockShop] fetch failed, using mock data:", error);
    return getMockData<T>();
  }
}

function getMockData<T>(): T {
  const mockCollection: Collection = {
    id: "gid://shopify/Collection/1",
    title: "Sponsored Products",
    handle: "collection-with-products",
    products: {
      edges: [
        {
          node: {
            id: "gid://shopify/Product/sp-1",
            title: "Écouteurs Sans Fil Pro",
            handle: "ecouteurs-sans-fil-pro",
            availableForSale: true,
            priceRange: { minVariantPrice: { amount: "89.99", currencyCode: "EUR" } },
            images: {
              edges: [
                {
                  node: {
                    url: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800",
                    altText: "Écouteurs Sans Fil Pro",
                  },
                },
              ],
            },
          },
        },
        {
          node: {
            id: "gid://shopify/Product/sp-2",
            title: "Montre Fitness Tracker",
            handle: "montre-fitness-tracker",
            availableForSale: true,
            priceRange: { minVariantPrice: { amount: "129.00", currencyCode: "EUR" } },
            images: {
              edges: [
                {
                  node: {
                    url: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=800",
                    altText: "Montre Fitness Tracker",
                  },
                },
              ],
            },
          },
        },
        {
          node: {
            id: "gid://shopify/Product/sp-3",
            title: "Haut-parleur Mini Bluetooth",
            handle: "haut-parleur-mini-bluetooth",
            availableForSale: true,
            priceRange: { minVariantPrice: { amount: "45.00", currencyCode: "EUR" } },
            images: {
              edges: [
                {
                  node: {
                    url: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800",
                    altText: "Haut-parleur Mini Bluetooth",
                  },
                },
              ],
            },
          },
        },
        {
          node: {
            id: "gid://shopify/Product/sp-4",
            title: "Coque iPhone Transparente",
            handle: "coque-iphone-transparente",
            availableForSale: true,
            priceRange: { minVariantPrice: { amount: "19.99", currencyCode: "EUR" } },
            images: {
              edges: [
                {
                  node: {
                    url: "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=800",
                    altText: "Coque iPhone Transparente",
                  },
                },
              ],
            },
          },
        },
        {
          node: {
            id: "gid://shopify/Product/sp-5",
            title: "Chargeur Rapide 65W",
            handle: "chargeur-rapide-65w",
            availableForSale: true,
            priceRange: { minVariantPrice: { amount: "39.99", currencyCode: "EUR" } },
            images: {
              edges: [
                {
                  node: {
                    url: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800",
                    altText: "Chargeur Rapide 65W",
                  },
                },
              ],
            },
          },
        },
      ],
    },
  };

  return { collection: mockCollection } as T;
}

export async function getSponsoredProducts(): Promise<SponsoredProduct[]> {
  const data = await fetchGraphQL<CollectionWithProductsResponse>(
    COLLECTION_QUERY,
    { handle: "collection-with-products" },
    { next: { revalidate: 3600, tags: [SPONSORED_PRODUCTS_TAG] } }
  );

  return data.collection?.products.edges.map((edge) => edge.node) ?? [];
}

export async function getSponsoredProductByHandle(
  handle: string
): Promise<SponsoredProduct | null> {
  try {
    const response = await fetch(MOCK_SHOPIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: PRODUCT_QUERY,
        variables: { handle },
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch product");
    }

    const json = await response.json();
    return json.data?.product ?? null;
  } catch {
    const data = getMockData<CollectionWithProductsResponse>();
    return (
      data.collection?.products.edges.find(
        (edge) => edge.node.handle === handle
      )?.node ?? null
    );
  }
}
