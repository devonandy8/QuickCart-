-- QuickCart seed data (run AFTER schema.sql)
-- Marks first 10 products as popular for the home page section

insert into public.products (name, description, price, offer_price, images, category, rating, is_popular) values
(
  'Apple AirPods Pro 2nd gen',
  'Apple AirPods Pro (2nd Gen) with MagSafe Case (USB-C) provide excellent sound, active noise cancellation, and a comfortable fit.',
  499.99, 399.99,
  array[
    'https://raw.githubusercontent.com/avinashdm/gs-images/main/quickcart/k4dafzhwhgcn5tnoylrw.webp',
    'https://raw.githubusercontent.com/avinashdm/gs-images/main/quickcart/j212frakb8hdrhvhajhg.webp',
    'https://raw.githubusercontent.com/avinashdm/gs-images/main/quickcart/imwuugqxsajuwqpkegb5.webp',
    'https://raw.githubusercontent.com/avinashdm/gs-images/main/quickcart/k1oqaslw5tb3ebw01vvj.webp'
  ],
  'Earphone', 4.5, true
),
(
  'Bose QuietComfort 45',
  'The Bose QuietComfort 45 headphones are engineered for exceptional sound quality and unparalleled noise cancellation.',
  429.99, 329.99,
  array['https://raw.githubusercontent.com/avinashdm/gs-images/main/quickcart/m16coelz8ivkk9f0nwrz.webp'],
  'Headphone', 4.5, true
),
(
  'Samsung Galaxy S23',
  'The Samsung Galaxy S23 offers an all-encompassing mobile experience with its advanced AMOLED display.',
  899.99, 799.99,
  array['https://raw.githubusercontent.com/avinashdm/gs-images/main/quickcart/xjd4eprpwqs7odbera1w.webp'],
  'Smartphone', 4.5, true
),
(
  'Garmin Venu 2',
  'The Garmin Venu 2 smartwatch blends advanced fitness tracking with sophisticated design.',
  399.99, 349.99,
  array['https://raw.githubusercontent.com/avinashdm/gs-images/main/quickcart/hdfi4u3fmprazpnrnaga.webp'],
  'Earphone', 4.5, true
),
(
  'PlayStation 5',
  'The PlayStation 5 takes gaming to the next level with ultra-HD graphics and ray tracing technology.',
  599.99, 499.99,
  array['https://raw.githubusercontent.com/avinashdm/gs-images/main/quickcart/dd3l13vfoartrgbvkkh5.webp'],
  'Accessories', 4.5, true
),
(
  'Canon EOS R5',
  'The Canon EOS R5 is a game-changing mirrorless camera with a 45MP full-frame sensor and 8K video.',
  4199.99, 3899.99,
  array['https://raw.githubusercontent.com/avinashdm/gs-images/main/quickcart/r5h370zuujvrw461c6wy.webp'],
  'Camera', 4.5, true
),
(
  'MacBook Pro 16',
  'The MacBook Pro 16, powered by Apple''s M2 Pro chip, offers outstanding performance with 16GB RAM.',
  2799.99, 2499.99,
  array['https://raw.githubusercontent.com/avinashdm/gs-images/main/quickcart/rzri7kytphxalrm9rubd.webp'],
  'Laptop', 4.5, true
),
(
  'Sony WF-1000XM5',
  'Sony WF-1000XM5 true wireless earbuds deliver immersive sound with Hi-Res Audio and noise cancellation.',
  349.99, 299.99,
  array['https://raw.githubusercontent.com/avinashdm/gs-images/main/quickcart/e3zjaupyumdkladmytke.webp'],
  'Earphone', 4.5, true
),
(
  'Samsung Projector 4k',
  'The Samsung 4K Projector offers an immersive cinematic experience with ultra-high-definition visuals.',
  1699.99, 1499.99,
  array['https://raw.githubusercontent.com/avinashdm/gs-images/main/quickcart/qqdcly8a8vkyciy9g0bw.webp'],
  'Accessories', 4.5, true
),
(
  'ASUS ROG Zephyrus G16',
  'The ASUS ROG Zephyrus G16 gaming laptop is powered by Intel Core i9 and RTX 4070 GPU.',
  2199.99, 1999.99,
  array['https://raw.githubusercontent.com/avinashdm/gs-images/main/quickcart/wig1urqgnkeyp4t2rtso.webp'],
  'Laptop', 4.5, true
);

-- Additional catalog items (safe to re-run: skips if name already exists)
insert into public.products (name, description, price, offer_price, images, category, rating, is_popular)
select * from (values
(
  'iPhone 15 Pro',
  'The iPhone 15 Pro features a titanium design, A17 Pro chip, and an advanced camera system for stunning photos and video.',
  1199.99, 1099.99,
  array['https://raw.githubusercontent.com/avinashdm/gs-images/main/quickcart/xjd4eprpwqs7odbera1w.webp'],
  'Smartphone', 4.8, true
),
(
  'Google Pixel 8',
  'Google Pixel 8 delivers pure Android, intelligent AI features, and an excellent camera in a compact, comfortable design.',
  699.99, 599.99,
  array['https://raw.githubusercontent.com/avinashdm/gs-images/main/quickcart/xjd4eprpwqs7odbera1w.webp'],
  'Smartphone', 4.6, false
),
(
  'Beats Studio Pro',
  'Beats Studio Pro over-ear headphones offer rich, balanced sound, active noise cancellation, and up to 40 hours of battery life.',
  349.99, 299.99,
  array['https://raw.githubusercontent.com/avinashdm/gs-images/main/quickcart/m16coelz8ivkk9f0nwrz.webp'],
  'Headphone', 4.7, true
),
(
  'JBL Flip 6',
  'The JBL Flip 6 portable Bluetooth speaker delivers powerful sound, IP67 waterproof protection, and 12 hours of playtime.',
  129.99, 109.99,
  array['https://raw.githubusercontent.com/avinashdm/gs-images/main/quickcart/qqdcly8a8vkyciy9g0bw.webp'],
  'Speaker', 4.4, false
),
(
  'iPad Air M2',
  'iPad Air with M2 chip offers a stunning Liquid Retina display, all-day battery life, and Apple Pencil support for creativity on the go.',
  799.99, 749.99,
  array['https://raw.githubusercontent.com/avinashdm/gs-images/main/quickcart/rzri7kytphxalrm9rubd.webp'],
  'Tablet', 4.7, false
),
(
  'Dell XPS 13',
  'The Dell XPS 13 ultrabook combines a sleek InfinityEdge display with Intel Core performance in an incredibly portable form factor.',
  1299.99, 1149.99,
  array['https://raw.githubusercontent.com/avinashdm/gs-images/main/quickcart/wig1urqgnkeyp4t2rtso.webp'],
  'Laptop', 4.5, false
),
(
  'LG UltraWide Monitor 34"',
  'This 34-inch ultrawide monitor features QHD resolution, HDR10, and USB-C connectivity for an immersive productivity setup.',
  499.99, 449.99,
  array['https://raw.githubusercontent.com/avinashdm/gs-images/main/quickcart/rzri7kytphxalrm9rubd.webp'],
  'Monitor', 4.5, false
),
(
  'Logitech MX Master 3S',
  'Logitech MX Master 3S is a precision wireless mouse with quiet clicks, MagSpeed scrolling, and multi-device connectivity.',
  99.99, 89.99,
  array['https://raw.githubusercontent.com/avinashdm/gs-images/main/quickcart/dd3l13vfoartrgbvkkh5.webp'],
  'Accessories', 4.8, false
),
(
  'Razer BlackWidow V4',
  'Razer BlackWidow V4 mechanical gaming keyboard features Razer Green switches, per-key RGB lighting, and a plush wrist rest.',
  189.99, 169.99,
  array['https://raw.githubusercontent.com/avinashdm/gs-images/main/quickcart/dd3l13vfoartrgbvkkh5.webp'],
  'Keyboard', 4.6, false
),
(
  'Xbox Wireless Controller',
  'The Xbox Wireless Controller features textured grips, a refined D-pad, and Bluetooth for gaming on console, PC, and mobile.',
  69.99, 59.99,
  array['https://raw.githubusercontent.com/avinashdm/gs-images/main/quickcart/dd3l13vfoartrgbvkkh5.webp'],
  'Accessories', 4.7, false
),
(
  'Nintendo Switch OLED',
  'Nintendo Switch OLED model features a vibrant 7-inch OLED screen, enhanced audio, and a wide adjustable stand for tabletop play.',
  349.99, 329.99,
  array['https://raw.githubusercontent.com/avinashdm/gs-images/main/quickcart/dd3l13vfoartrgbvkkh5.webp'],
  'Accessories', 4.9, true
),
(
  'Amazon Echo Dot (5th Gen)',
  'Echo Dot is a compact smart speaker with Alexa, improved audio, and smart home controls for lights, locks, and more.',
  49.99, 39.99,
  array['https://raw.githubusercontent.com/avinashdm/gs-images/main/quickcart/qqdcly8a8vkyciy9g0bw.webp'],
  'Smart Home', 4.3, false
),
(
  'DJI Mini 3 Pro',
  'DJI Mini 3 Pro is a lightweight drone with 4K HDR video, tri-directional obstacle sensing, and extended flight time.',
  759.99, 699.99,
  array['https://raw.githubusercontent.com/avinashdm/gs-images/main/quickcart/r5h370zuujvrw461c6wy.webp'],
  'Camera', 4.8, false
),
(
  'Samsung 55" OLED TV',
  'Samsung 55-inch OLED 4K TV delivers perfect blacks, vivid color, and a slim design with smart TV streaming built in.',
  1499.99, 1299.99,
  array['https://raw.githubusercontent.com/avinashdm/gs-images/main/quickcart/qqdcly8a8vkyciy9g0bw.webp'],
  'TV', 4.7, false
),
(
  'Fitbit Charge 6',
  'Fitbit Charge 6 tracks heart rate, GPS workouts, sleep, and stress with a bright AMOLED display and 7-day battery life.',
  159.99, 139.99,
  array['https://raw.githubusercontent.com/avinashdm/gs-images/main/quickcart/hdfi4u3fmprazpnrnaga.webp'],
  'Smartwatch', 4.4, false
),
(
  'Anker PowerCore 20K',
  'Anker PowerCore 20000mAh portable charger keeps phones, tablets, and earbuds powered with dual USB ports and fast charging.',
  59.99, 49.99,
  array['https://raw.githubusercontent.com/avinashdm/gs-images/main/quickcart/e3zjaupyumdkladmytke.webp'],
  'Accessories', 4.5, false
),
(
  'SteelSeries Arctis Nova 7',
  'SteelSeries Arctis Nova 7 wireless gaming headset offers 38-hour battery, simultaneous Bluetooth, and clear mic quality.',
  179.99, 159.99,
  array['https://raw.githubusercontent.com/avinashdm/gs-images/main/quickcart/m16coelz8ivkk9f0nwrz.webp'],
  'Headphone', 4.6, false
),
(
  'Samsung Galaxy Tab S9',
  'Galaxy Tab S9 features a Dynamic AMOLED 2X display, S Pen included, and IP68 water resistance for work and entertainment.',
  899.99, 799.99,
  array['https://raw.githubusercontent.com/avinashdm/gs-images/main/quickcart/rzri7kytphxalrm9rubd.webp'],
  'Tablet', 4.6, false
),
(
  'GoPro HERO12 Black',
  'GoPro HERO12 Black captures 5.3K video, HyperSmooth stabilization, and waterproof durability for action and travel.',
  399.99, 349.99,
  array['https://raw.githubusercontent.com/avinashdm/gs-images/main/quickcart/r5h370zuujvrw461c6wy.webp'],
  'Camera', 4.7, false
),
(
  'Apple Watch Series 9',
  'Apple Watch Series 9 features a bright Always-On Retina display, advanced health sensors, and fast on-device Siri.',
  429.99, 399.99,
  array['https://raw.githubusercontent.com/avinashdm/gs-images/main/quickcart/hdfi4u3fmprazpnrnaga.webp'],
  'Smartwatch', 4.8, true
)) as v(name, description, price, offer_price, images, category, rating, is_popular)
where not exists (
  select 1 from public.products p where p.name = v.name
);
