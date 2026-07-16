import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useAuth } from "./AuthContext";
import {
  fetchCartItems,
  getGuestCart,
  mergeGuestCartIntoAccount,
  removeCartItem,
  setGuestCart,
  upsertCartItem,
} from "../lib/cart";
import { fetchProductsByIds, getDisplayPrice, mapProduct } from "../lib/products";

/** @typedef {import("../lib/types").Product} Product */

/**
 * @typedef {Object} CartLineItem
 * @property {string} productId
 * @property {number} quantity
 * @property {Product} product
 */

const CartContext = createContext(null);

function mapDbCartRow(row) {
  const product = mapProduct(row.products);
  return {
    productId: row.product_id,
    quantity: row.quantity,
    product,
  };
}

export function CartProvider({ children }) {
  const { user, loading: authLoading } = useAuth();
  const [items, setItems] = useState(/** @type {CartLineItem[]} */ ([]));
  const [loading, setLoading] = useState(true);

  const loadGuestCart = useCallback(async () => {
    const guestCart = getGuestCart();
    const productIds = Object.keys(guestCart);

    if (!productIds.length) {
      setItems([]);
      return;
    }

    const products = await fetchProductsByIds(productIds);
    setItems(
      products.map((product) => ({
        productId: product.id,
        quantity: guestCart[product.id] ?? 1,
        product,
      }))
    );
  }, []);

  const loadUserCart = useCallback(async (userId) => {
    const rows = await fetchCartItems(userId);
    setItems(rows.map(mapDbCartRow));
  }, []);

  const refreshCart = useCallback(async () => {
    setLoading(true);
    try {
      if (user) {
        await loadUserCart(user.id);
      } else {
        await loadGuestCart();
      }
    } catch {
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, [user, loadGuestCart, loadUserCart]);

  useEffect(() => {
    if (authLoading) return;

    async function syncCart() {
      setLoading(true);
      try {
        if (user) {
          await mergeGuestCartIntoAccount(user.id);
          await loadUserCart(user.id);
        } else {
          await loadGuestCart();
        }
      } catch {
        setItems([]);
      } finally {
        setLoading(false);
      }
    }

    syncCart();
  }, [user, authLoading, loadGuestCart, loadUserCart]);

  const persistGuestQuantity = useCallback(async (productId, quantity) => {
    const guestCart = getGuestCart();

    if (quantity <= 0) {
      delete guestCart[productId];
    } else {
      guestCart[productId] = quantity;
    }

    setGuestCart(guestCart);
    await loadGuestCart();
  }, [loadGuestCart]);

  const addItem = useCallback(
    async (productId, quantity = 1) => {
      if (user) {
        const existing = items.find((item) => item.productId === productId);
        const nextQuantity = (existing?.quantity ?? 0) + quantity;
        await upsertCartItem(user.id, productId, nextQuantity);
        await loadUserCart(user.id);
        return;
      }

      const guestCart = getGuestCart();
      guestCart[productId] = (guestCart[productId] ?? 0) + quantity;
      setGuestCart(guestCart);
      await loadGuestCart();
    },
    [user, items, loadGuestCart, loadUserCart]
  );

  const updateQuantity = useCallback(
    async (productId, quantity) => {
      if (user) {
        await upsertCartItem(user.id, productId, quantity);
        await loadUserCart(user.id);
        return;
      }

      await persistGuestQuantity(productId, quantity);
    },
    [user, loadUserCart, persistGuestQuantity]
  );

  const removeItem = useCallback(
    async (productId) => {
      if (user) {
        await removeCartItem(user.id, productId);
        await loadUserCart(user.id);
        return;
      }

      await persistGuestQuantity(productId, 0);
    },
    [user, loadUserCart, persistGuestQuantity]
  );

  const itemCount = useMemo(
    () => items.reduce((total, item) => total + item.quantity, 0),
    [items]
  );

  const subtotal = useMemo(
    () =>
      items.reduce(
        (total, item) => total + getDisplayPrice(item.product) * item.quantity,
        0
      ),
    [items]
  );

  const value = {
    items,
    loading,
    itemCount,
    subtotal,
    addItem,
    updateQuantity,
    removeItem,
    refreshCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}
