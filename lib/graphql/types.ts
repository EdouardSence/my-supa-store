export type Money = {
  amount: string;
  currencyCode: string;
};

export type Image = {
  url: string;
  altText: string | null;
};

export type SponsoredProduct = {
  id: string;
  title: string;
  handle: string;
  availableForSale: boolean;
  priceRange: {
    minVariantPrice: Money;
  };
  images: {
    edges: {
      node: Image;
    }[];
  };
};

export type Collection = {
  id: string;
  title: string;
  handle: string;
  products: {
    edges: {
      node: SponsoredProduct;
    }[];
  };
};

export type CollectionWithProductsResponse = {
  collection: Collection | null;
};
