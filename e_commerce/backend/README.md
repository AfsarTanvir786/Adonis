# user_controller
## profile
```ts
public async profile({ auth }: HttpContext) {
    await auth.check();
    const user = auth.user!;
    return this.authService.getUser(user);
}
```
or you can write it as 
```ts
public async profile({ response, auth }: HttpContext) {
    const user = await auth.authenticate();
    return response.ok({
        message: 'Successfully',
        data: user,
    });
}
```