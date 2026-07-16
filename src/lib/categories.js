import {
  IconDeviceMobile,
  IconDeviceLaptop,
  IconHeadphones,
  IconDeviceDesktop,
  IconCamera,
  IconDeviceTv,
  IconKeyboard,
  IconHome,
  IconDeviceWatch,
  IconSpeakerphone,
} from "@tabler/icons-react";

/** @typedef {{ title: string, slug: string, icon: import("@tabler/icons-react").Icon, description: string }} CategoryNavItem */

/** @type {CategoryNavItem[]} */
export const CATEGORY_NAV = [
  {
    title: "Smartphones",
    slug: "Smartphone",
    icon: IconDeviceMobile,
    description: "Latest phones and mobile devices",
  },
  {
    title: "Laptops",
    slug: "Laptop",
    icon: IconDeviceLaptop,
    description: "Powerful laptops for work and gaming",
  },
  {
    title: "Tablets",
    slug: "Tablet",
    icon: IconDeviceDesktop,
    description: "Portable tablets for productivity",
  },
  {
    title: "Headphones",
    slug: "Headphone",
    icon: IconHeadphones,
    description: "Over-ear and on-ear audio",
  },
  {
    title: "Earphones",
    slug: "Earphone",
    icon: IconHeadphones,
    description: "Wireless earbuds and in-ear audio",
  },
  {
    title: "Accessories",
    slug: "Accessories",
    icon: IconDeviceDesktop,
    description: "Controllers, chargers, and more",
  },
  {
    title: "Cameras",
    slug: "Camera",
    icon: IconCamera,
    description: "Cameras and drones for creators",
  },
  {
    title: "Monitors",
    slug: "Monitor",
    icon: IconDeviceTv,
    description: "Ultrawide and productivity displays",
  },
  {
    title: "TVs",
    slug: "TV",
    icon: IconDeviceTv,
    description: "Smart TVs and home entertainment",
  },
  {
    title: "Keyboards",
    slug: "Keyboard",
    icon: IconKeyboard,
    description: "Mechanical and wireless keyboards",
  },
  {
    title: "Speakers",
    slug: "Speaker",
    icon: IconSpeakerphone,
    description: "Portable and home audio speakers",
  },
  {
    title: "Smart Home",
    slug: "Smart Home",
    icon: IconHome,
    description: "Connected devices for your home",
  },
  {
    title: "Smartwatches",
    slug: "Smartwatch",
    icon: IconDeviceWatch,
    description: "Fitness trackers and smart watches",
  },
];

export function getCategoryProductsPath(slug) {
  return `/products?category=${encodeURIComponent(slug)}`;
}
