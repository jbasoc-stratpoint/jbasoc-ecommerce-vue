import ApiClient from "@/utils/https.ts";
import p from "@/utils/queryParamBuilder";

interface PRODUCTS_INTERFACE {
  categories?: [];
  price?: [];
  sort?: string;
}

export default {
  async getProducts(query: PRODUCTS_INTERFACE) {
    console.log(query);
    let finalQuery = "";
    if (query && "categories" in query)
      finalQuery += p.paramBuilder(
        "filters[category][name][$in]=",
        query.categories,
      );
    if (query && "price" in query)
      finalQuery += p.paramBuilder("filters[price][$lte]=", query.price);
    if (query && "sort" in query) finalQuery += `&sort[0]=price:${query.sort}`;
    else {
      finalQuery += `&sort[0]=price:asc`;
    }
    if (query && "page" in query)
      finalQuery += `&pagination[page]=${query.page}`;

    if (query && "limit" in query)
      finalQuery += `&pagination[limit]=${query.limit}`;

    return await ApiClient.get(`/api/products?${finalQuery}&populate=*`, {
      Authorization: `Bearer ${import.meta.env.VITE_API_KET}`,
    });
  },
  async getProduct(id) {
    return await ApiClient.get(`/api/products/${id}?populate=*`, {
      Authorization: `Bearer ${import.meta.env.VITE_API_KET}`,
    });
  },
  async getStripeProducts() {
    return await ApiClient.get(
      `/v1/products`,
      {
        Authorization: `Bearer ${import.meta.env.VITE_STRIPE_SK}`,
      },
      `https://api.stripe.com`,
    );
  },
};
