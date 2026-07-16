import { supabase } from "./supabase";

const GUEST_CART_KEY = "quickcart_guest_cart";

/** @returns {Record<string, number>} */
export function getGuestCart() {
  try {
    return JSON.parse(localStorage.getItem(GUEST_CART_KEY) ?? "{}");
  } catch {
    return {};
  }
}

/** @param {Record<string, number>} cart */
export function setGuestCart(cart) {
  localStorage.setItem(GUEST_CART_KEY, JSON.stringify(cart));
}

export function clearGuestCart() {
  localStorage.removeItem(GUEST_CART_KEY);
}

export async function fetchCartItems(userId) {
  const { data, error } = await supabase
    .from("cart_items")
    .select(`
      id,
      quantity,
      product_id,
      products (*)
    `)
    .eq("user_id", userId);

  if (error) throw error;
  return data;
}

export async function upsertCartItem(userId, productId, quantity) {
  if (quantity <= 0) {
    return removeCartItem(userId, productId);
  }

  const { data, error } = await supabase
    .from("cart_items")
    .upsert(
      { user_id: userId, product_id: productId, quantity },
      { onConflict: "user_id,product_id" }
    )
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function removeCartItem(userId, productId) {
  const { error } = await supabase
    .from("cart_items")
    .delete()
    .eq("user_id", userId)
    .eq("product_id", productId);

  if (error) throw error;
}

export async function mergeGuestCartIntoAccount(userId) {
  const guestCart = getGuestCart();
  const entries = Object.entries(guestCart);
  if (!entries.length) return;

  const existing = await fetchCartItems(userId);
  const existingMap = Object.fromEntries(
    existing.map((row) => [row.product_id, row.quantity])
  );

  for (const [productId, quantity] of entries) {
    const total = (existingMap[productId] ?? 0) + quantity;
    await upsertCartItem(userId, productId, total);
  }

  clearGuestCart();
}
