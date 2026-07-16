/**
 * @typedef {Object} Product
 * @property {string} id
 * @property {string} name
 * @property {string} description
 * @property {number} price
 * @property {number|null} offerPrice
 * @property {string[]} image
 * @property {string} category
 * @property {number} rating
 * @property {boolean} isPopular
 * @property {string} [createdAt]
 */

/**
 * @typedef {Object} Profile
 * @property {string} id
 * @property {string|null} full_name
 * @property {string|null} avatar_url
 */

/**
 * @typedef {Object} CartItem
 * @property {string} productId
 * @property {number} quantity
 * @property {Product} [product]
 */

/**
 * @typedef {Object} Address
 * @property {string} id
 * @property {string} user_id
 * @property {string} full_name
 * @property {string} phone_number
 * @property {string} pincode
 * @property {string} area
 * @property {string} city
 * @property {string} state
 * @property {boolean} is_default
 */

export {};
