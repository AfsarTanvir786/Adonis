# React Query  
## Product List 
```ts
useQuery({
  queryKey: ["products"],
  queryFn: productService.list,
  retry: 1,
  retryDelay: 2000,
});
```
Or we can try artificial loading
## Product Service
```ts
async list() {
    await delay(2000); 
    const res = await axiosClient.get("/products");
    return res.data;
}
```

## Product Details
```ts
const { data: product, isLoading, isError } = useQuery({
  // here data is renamed as product
    queryKey: ['product', productId],
    queryFn: () => productService.get(productId),
    enabled: !!id, // do not run until id is valid
});
```