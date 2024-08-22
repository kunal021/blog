import axios from "axios";

/**
 * Makes an HTTP request using Axios.
 *
 * @param {string} method - The HTTP method (GET, POST, PUT, DELETE).
 * @param {string} endpoint - The API endpoint.
 * @param {object} [data] - The data to be sent with the request (for POST and PUT).
 * @param {object} [headers] - Additional headers to include in the request.
 * @param {Function} [onLoading] - Callback function to handle loading state.
 * @param {Function} [onLoaded] - Callback function to handle completion of the request.
 * @returns {Promise<any>} - The response data.
 */
async function makeRequest(
  method,
  endpoint,
  data = null,
  headers = {},
  onLoading = () => {},
  onLoaded = () => {}
) {
  try {
    // Set loading state if provided
    onLoading(true);

    // Make the request
    const response = await axios({
      method,
      url: endpoint,
      data,
      headers,
    });

    // Return the response data
    return response.data;
  } catch (error) {
    // Handle errors
    console.error("Error making request:", error);
    throw error;
  } finally {
    // Reset loading state if provided
    onLoading(false);
    // Call the onLoaded callback
    onLoaded();
  }
}

export default makeRequest;
