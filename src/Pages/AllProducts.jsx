import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Box, Text, Select, Group, Button } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconAdjustments } from "@tabler/icons-react";
import { fetchProducts, getDisplayPrice } from "../lib/products";
import ProductGrid from "../components/ProductGrid/ProductGrid";
import ProductFilters, { SORT_OPTIONS } from "../components/ProductFilters/ProductFilters";
import classes from "./AllProducts.module.css";

function filterAndSortProducts(products, { search, category, popularOnly, priceRange, sort }) {
  let result = [...products];

  if (search.trim()) {
    const query = search.trim().toLowerCase();
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query)
    );
  }

  if (category && category !== "all") {
    result = result.filter((p) => p.category === category);
  }

  if (popularOnly) {
    result = result.filter((p) => p.isPopular);
  }

  if (priceRange) {
    const [min, max] = priceRange;
    result = result.filter((p) => {
      const price = getDisplayPrice(p);
      return price >= min && price <= max;
    });
  }

  switch (sort) {
    case "price-asc":
      result.sort((a, b) => getDisplayPrice(a) - getDisplayPrice(b));
      break;
    case "price-desc":
      result.sort((a, b) => getDisplayPrice(b) - getDisplayPrice(a));
      break;
    case "rating":
      result.sort((a, b) => b.rating - a.rating);
      break;
    case "name":
      result.sort((a, b) => a.name.localeCompare(b.name));
      break;
    default:
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  return result;
}

const AllProducts = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 62em)");

  const search = searchParams.get("q") ?? "";
  const category = searchParams.get("category") ?? "all";
  const sort = searchParams.get("sort") ?? "newest";
  const popularOnly = searchParams.get("popular") === "true";

  useEffect(() => {
    fetchProducts()
      .then(setProducts)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const categories = useMemo(
    () => ["all", ...new Set(products.map((p) => p.category))].sort(),
    [products]
  );

  const priceBounds = useMemo(() => {
    if (products.length === 0) return [0, 5000];
    const prices = products.map(getDisplayPrice);
    return [Math.floor(Math.min(...prices)), Math.ceil(Math.max(...prices))];
  }, [products]);

  const priceMin = Number(searchParams.get("min") ?? priceBounds[0]);
  const priceMax = Number(searchParams.get("max") ?? priceBounds[1]);

  const filteredProducts = useMemo(
    () =>
      filterAndSortProducts(products, {
        search,
        category,
        popularOnly,
        priceRange: products.length > 0 ? [priceMin, priceMax] : null,
        sort,
      }),
    [products, search, category, popularOnly, priceMin, priceMax, sort]
  );

  const updateParam = (key, value) => {
    const next = new URLSearchParams(searchParams);
    if (!value || value === "all" || (key === "sort" && value === "newest")) {
      next.delete(key);
    } else {
      next.set(key, String(value));
    }
    setSearchParams(next, { replace: true });
  };

  const updatePriceRange = ([min, max]) => {
    const next = new URLSearchParams(searchParams);
    if (min === priceBounds[0]) next.delete("min");
    else next.set("min", String(min));
    if (max === priceBounds[1]) next.delete("max");
    else next.set("max", String(max));
    setSearchParams(next, { replace: true });
  };

  const clearFilters = () => setSearchParams({}, { replace: true });

  const hasActiveFilters =
    search ||
    category !== "all" ||
    popularOnly ||
    sort !== "newest" ||
    priceMin !== priceBounds[0] ||
    priceMax !== priceBounds[1];

  const filterProps = {
    search,
    category,
    categories,
    sort,
    popularOnly,
    priceBounds,
    priceMin,
    priceMax,
    onSearchChange: (value) => updateParam("q", value),
    onCategoryChange: (value) => updateParam("category", value),
    onSortChange: (value) => updateParam("sort", value),
    onPopularChange: (checked) => updateParam("popular", checked ? "true" : ""),
    onPriceChange: updatePriceRange,
    onClearFilters: clearFilters,
    hasActiveFilters,
  };

  return (
    <Box className={classes.page}>
      <Text className={classes.title}>All Products</Text>
      <Text c="dimmed" size="sm" mb="lg">
        Browse our full catalog with search and filters.
      </Text>

      <Box className={classes.layout}>
        {isDesktop && (
          <aside className={classes.sidebar}>
            <ProductFilters {...filterProps} />
          </aside>
        )}

        <Box className={classes.main}>
          {!isDesktop && (
            <Box className={classes.mobileFilters}>
              <Group justify="space-between" mb={mobileFiltersOpen ? "md" : 0}>
                <Button
                  variant="light"
                  color="orange"
                  leftSection={<IconAdjustments size={16} />}
                  onClick={() => setMobileFiltersOpen((open) => !open)}
                  radius="md"
                >
                  {mobileFiltersOpen ? "Hide filters" : "Show filters"}
                  {hasActiveFilters && !mobileFiltersOpen && (
                    <Text component="span" ml={6} size="xs" c="orange" fw={600}>
                      (active)
                    </Text>
                  )}
                </Button>
              </Group>
              {mobileFiltersOpen && (
                <Box className={classes.mobileFiltersPanel}>
                  <ProductFilters {...filterProps} showSort />
                </Box>
              )}
            </Box>
          )}

          <Group justify="space-between" align="center" mb="lg" wrap="wrap" gap="md">
            <Text size="sm" c="dimmed">
              {loading
                ? "Loading products..."
                : `${filteredProducts.length} of ${products.length} products`}
            </Text>
            {isDesktop && (
              <Select
                data={SORT_OPTIONS}
                value={sort}
                onChange={(value) => updateParam("sort", value)}
                style={{ width: 200 }}
                radius="md"
                placeholder="Sort by"
              />
            )}
          </Group>

          <ProductGrid
            products={filteredProducts}
            loading={loading}
            error={error}
            emptyMessage={
              hasActiveFilters
                ? "No products match your filters. Try adjusting your search."
                : "No products yet. Run supabase/seed.sql in your Supabase project."
            }
          />
        </Box>
      </Box>
    </Box>
  );
};

export default AllProducts;
