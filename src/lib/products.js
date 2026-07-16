import { supabase } from "./supabase";

/** @typedef {import('./types').Product} Product */

/**
 * @param {Record<string, unknown>} row
 * @returns {Product}
 */
export function mapProduct(row) {
  return {
    id: row.id,
    name: row.name,
    description: row.description ?? "",
    price: Number(row.price),
    offerPrice: row.offer_price != null ? Number(row.offer_price) : null,
    image: row.images ?? [],
    category: row.category ?? "General",
    rating: Number(row.rating ?? 4.5),
    isPopular: Boolean(row.is_popular),
    createdAt: row.created_at,
  };
}

/** @param {Product} product */
export function getDisplayPrice(product) {
  return product.offerPrice ?? product.price;
}

/** @param {Product} product */
export function getProductImage(product, index = 0) {
  return product.image?.[index] ?? "https://via.placeholder.com/300";
}

export async function fetchProducts() {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data.map(mapProduct);
}

export async function fetchPopularProducts(limit = 10) {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("is_popular", true)
    .order("rating", { ascending: false })
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data.map(mapProduct);
}

export async function fetchProductById(id) {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  return mapProduct(data);
}

export async function fetchProductsByCategory(category) {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("category", category)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data.map(mapProduct);
}

export async function fetchProductsByIds(ids) {
  if (!ids.length) return [];

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .in("id", ids);

  if (error) throw error;
  return data.map(mapProduct);
}

export async function searchProducts(query) {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .or(`name.ilike.%${query}%,description.ilike.%${query}%`)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data.map(mapProduct);
}
