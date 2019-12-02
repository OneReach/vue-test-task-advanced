let abortController = new AbortController()

/**
 * Get all countries using API of https://restcountries.eu/
 * Use fetch and abort method for better performance
 * Only last initializations of functions will pending data
 * @param {String} text 
 */
const getItems = async (text) => {
  abortController.abort()
  abortController = new AbortController()

  try {
    const url = `https://restcountries.eu/rest/v2/name/${text}`
    const response = await fetch(
      url, 
      {
        method: 'get',
        signal: abortController.signal
      }
    )
    if (!response.ok) {
      return []
    }

    return await response.json()
  } catch (e) {
    console.warn(e)
  }
}

export default getItems
