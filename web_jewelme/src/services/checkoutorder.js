import api from "../api/api";

/**
 * @param {Object} orderData
 * @returns {Promise} 
 */
export const createOrder = async (orderData) => {
  try {
    const response = await api.post("/order/create", orderData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Get user's orders
 * @returns {Promise} 
 */
export const getMyOrders = async () => {
  try {
    const response = await api.get("/order/my-orders");
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Get all orders (Admin only)
 * @returns {Promise} 
 */
export const getAllOrders = async () => {
  try {
    const response = await api.get("/order/all");
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Submit eSewa payment form
 * @param {Object} paymentData - eSewa payment parameters
 */
export const submitEsewaPayment = (paymentData) => {
  const form = document.createElement("form");
  form.method = "POST";
  form.action = paymentData.esewa_url;

  const fields = {
    amount: paymentData.amount,
    tax_amount: paymentData.tax_amount, 
    total_amount: paymentData.total_amount,
    transaction_uuid: paymentData.transaction_uuid,
    product_code: paymentData.product_code,
    product_service_charge: paymentData.product_service_charge,
    product_delivery_charge: paymentData.product_delivery_charge,
    success_url: paymentData.success_url,
    failure_url: paymentData.failure_url,
    signed_field_names: paymentData.signed_field_names,
    signature: paymentData.signature,
  };

  Object.entries(fields).forEach(([key, value]) => {
    const input = document.createElement("input");
    input.type = "hidden";
    input.name = key;
    input.value = value;
    form.appendChild(input);
  });

  document.body.appendChild(form);
  form.submit();
};

export default {
  createOrder,
  getMyOrders,
  getAllOrders,
  submitEsewaPayment,
};