import { request, gql } from "graphql-request";

const SHOPIFY_DOMAIN = "unibuyinc.myshopify.com";
const STOREFRONT_ACCESS_TOKEN = "da0a4e63485076234966bf09b527558b";
const endpoint = `https://${SHOPIFY_DOMAIN}/api/2023-07/graphql.json`;

const headers = {
  "X-Shopify-Storefront-Access-Token": STOREFRONT_ACCESS_TOKEN,
  "Content-Type": "application/json",
};

const PRODUCTS_QUERY = gql`
  {
    products(first: 10) {
      edges {
        node {
          id
          title
          description
          handle
          images(first: 1) {
            edges {
              node {
                url
              }
            }
          }
          variants(first: 1) {
            edges {
              node {
                price {
                  amount
                }
              }
            }
          }
        }
      }
    }
  }
`;
const POPULAR_PRODUCTS_QUERY = `
{
  collectionByHandle(handle: "popular-products") {
    title
    products(first: 10) {
      edges {
        node {
          id
          title
          handle
          description
          images(first: 1) {
            edges {
              node {
                url
              }
            }
          }
          variants(first: 1) {
            edges {
              node {
                price {
                  amount
                  currencyCode
                }
              }
            }
          }
        }
      }
    }
  }
}
`;

export const fetchProducts = async () => {
  const data = await request(endpoint, PRODUCTS_QUERY, {}, headers);
  return data.products.edges.map((edge) => edge.node);
};
export const fetchPopularProducts = async () => {
  const response = await fetch(
    "https://unibuyinc.myshopify.com/api/2023-07/graphql.json",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": "da0a4e63485076234966bf09b527558b",
      },
      body: JSON.stringify({ query: POPULAR_PRODUCTS_QUERY }),
    }
  );

  const result = await response.json();
  return result.data.collectionByHandle.products.edges.map((edge) => edge.node);
};
