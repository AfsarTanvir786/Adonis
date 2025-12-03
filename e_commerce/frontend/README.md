#React Query
```ts
useQuery({
  queryKey: ["products"],
  queryFn: productService.list,
  retry: 1,
  retryDelay: 2000,
});
```
Or we can try artificial loading
```ts
async list() {
    await delay(2000); 
    const res = await axiosClient.get("/products");
    return res.data;
}
```