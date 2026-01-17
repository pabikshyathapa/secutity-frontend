import axios from 'axios'

export const fetchAllProducts = async () => {
  const res = await axios.get('http://localhost:5050/api/products')
  return res.data
}
