import { get, set, del, update, keys } from 'idb-keyval'

const STORE_PREFIX = 'travel_planner__'

function keyFor(collection, id) {
  return `${STORE_PREFIX}${collection}__${id}`
}

/**
 * PUBLIC_INTERFACE
 * Save an object to a collection with id.
 * @param {string} collection
 * @param {string} id
 * @param {any} value
 */
export async function saveItem(collection, id, value) {
  return set(keyFor(collection, id), value)
}

/**
 * PUBLIC_INTERFACE
 * Load an object from a collection by id.
 * @param {string} collection
 * @param {string} id
 */
export async function loadItem(collection, id) {
  return get(keyFor(collection, id))
}

/**
 * PUBLIC_INTERFACE
 * Delete an object from a collection by id.
 * @param {string} collection
 * @param {string} id
 */
export async function deleteItem(collection, id) {
  return del(keyFor(collection, id))
}

/**
 * PUBLIC_INTERFACE
 * List all items in a collection.
 * @param {string} collection
 * @returns {Promise<any[]>}
 */
export async function listItems(collection) {
  const allKeys = await keys()
  const collKeys = allKeys.filter(k => typeof k === 'string' && k.startsWith(`${STORE_PREFIX}${collection}__`))
  const results = []
  for (const k of collKeys) {
    const v = await get(k)
    if (v != null) results.push(v)
  }
  // Sort by createdAt if present
  results.sort((a, b) => (b?.createdAt || 0) - (a?.createdAt || 0))
  return results
}

/**
 * PUBLIC_INTERFACE
 * Update an object by id in a collection with a reducer.
 * @param {string} collection
 * @param {string} id
 * @param {(prev:any)=>any} reducer
 */
export async function updateItem(collection, id, reducer) {
  const k = keyFor(collection, id)
  return update(k, prev => reducer(prev))
}
