import React from "react";
import {
  Box,
  Text,
  TextInput,
  Select,
  Group,
  Switch,
  RangeSlider,
  Button,
  Stack,
  Paper,
  NumberInput,
  Divider,
  Radio,
} from "@mantine/core";
import { IconSearch, IconX, IconFilter } from "@tabler/icons-react";
import classes from "./ProductFilters.module.css";

const SORT_OPTIONS = [
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
  { value: "name", label: "Name A–Z" },
];

function getPricePresets(bounds) {
  const [min, max] = bounds;
  const step = Math.max(Math.round((max - min) / 3), 10);
  const low = min + step;
  const high = min + step * 2;
  return [
    { label: "All prices", min, max },
    { label: `Under $${low}`, min, max: low },
    { label: `$${low} – $${high}`, min: low, max: high },
    { label: `$${high}+`, min: high, max },
  ];
}

const ProductFilters = ({
  search,
  category,
  categories,
  sort,
  popularOnly,
  priceBounds,
  priceMin,
  priceMax,
  onSearchChange,
  onCategoryChange,
  onSortChange,
  onPopularChange,
  onPriceChange,
  onClearFilters,
  hasActiveFilters,
  showSort = false,
}) => {
  const presets = getPricePresets(priceBounds);
  const activePreset = presets.findIndex(
    (p) => p.min === priceMin && p.max === priceMax
  );

  return (
    <Stack gap="lg" className={classes.filters}>
      <Group justify="space-between" align="center">
        <Group gap="xs">
          <IconFilter size={18} color="#ea580c" />
          <Text fw={600} size="sm">
            Filters
          </Text>
        </Group>
        {hasActiveFilters && (
          <Button
            variant="subtle"
            color="gray"
            size="compact-xs"
            leftSection={<IconX size={14} />}
            onClick={onClearFilters}
          >
            Clear
          </Button>
        )}
      </Group>

      <TextInput
        placeholder="Search products..."
        leftSection={<IconSearch size={16} />}
        value={search}
        onChange={(e) => onSearchChange(e.currentTarget.value)}
        radius="md"
      />

      {showSort && (
        <Select
          label="Sort by"
          data={SORT_OPTIONS}
          value={sort}
          onChange={onSortChange}
          radius="md"
        />
      )}

      <Box>
        <Text size="sm" fw={500} mb="xs">
          Category
        </Text>
        <Radio.Group value={category} onChange={onCategoryChange}>
          <Stack gap={6}>
            {categories.map((cat) => (
              <Radio
                key={cat}
                value={cat}
                label={cat === "all" ? "All categories" : cat}
                color="orange"
                size="sm"
              />
            ))}
          </Stack>
        </Radio.Group>
      </Box>

      <Paper className={classes.priceCard} p="md" radius="md">
        <Text size="sm" fw={500} mb="md">
          Price range
        </Text>

        <Group grow mb="md" gap="sm">
          <NumberInput
            label="Min"
            prefix="$"
            value={priceMin}
            min={priceBounds[0]}
            max={priceMax}
            step={10}
            thousandSeparator=","
            onChange={(value) => {
              const next = typeof value === "number" ? value : priceBounds[0];
              onPriceChange([Math.min(next, priceMax), priceMax]);
            }}
            radius="md"
            size="sm"
            hideControls
          />
          <NumberInput
            label="Max"
            prefix="$"
            value={priceMax}
            min={priceMin}
            max={priceBounds[1]}
            step={10}
            thousandSeparator=","
            onChange={(value) => {
              const next = typeof value === "number" ? value : priceBounds[1];
              onPriceChange([priceMin, Math.max(next, priceMin)]);
            }}
            radius="md"
            size="sm"
            hideControls
          />
        </Group>

        <RangeSlider
          min={priceBounds[0]}
          max={priceBounds[1]}
          step={10}
          value={[priceMin, priceMax]}
          onChange={onPriceChange}
          color="orange"
          label={(value) => `$${value}`}
          marks={[
            { value: priceBounds[0], label: `$${priceBounds[0]}` },
            { value: priceBounds[1], label: `$${priceBounds[1]}` },
          ]}
          mb="md"
        />

        <Divider mb="sm" />

        <Group gap={6}>
          {presets.map((preset, index) => (
            <Button
              key={preset.label}
              size="compact-xs"
              variant={activePreset === index ? "filled" : "light"}
              color="orange"
              radius="xl"
              onClick={() => onPriceChange([preset.min, preset.max])}
            >
              {preset.label}
            </Button>
          ))}
        </Group>
      </Paper>

      <Switch
        label="Popular products only"
        checked={popularOnly}
        onChange={(e) => onPopularChange(e.currentTarget.checked)}
        color="orange"
      />
    </Stack>
  );
};

export { SORT_OPTIONS };
export default ProductFilters;
