export type Product = {
    id: number;
    title: string;
    description: string;
    price: number;
    stock: number;
    categoryId: number;
    createdAt: Date;
    updatedAt: Date;

    category?: Category;
};

export type User = {
    id: number;
    fullName: string;
    email: string;
    password?: string;
    createdAt: Date;
    updatedAt: Date;

    userType: 'admin' | 'guest' | 'customer' | 'employee';
};

export type Category = {
    id: number;
    name: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
};

export type Cart = {
    id: number;
    userId: number;
    createdAt: Date;
    updatedAt: Date;
};

export type Order = {
    id: number;
    orderItems: number;
    totalPrice: number | string; // fix it only number
    orderStatus: string;
    paymentStatus: string;
    customerId: number;
    createdAt: Date;
    updatedAt: Date;

    customer?: User;
};

export type OrderItem = {
    [key: string]: number;
};

export type CartItem = {
    id: number;
    cartId: number;
    productId: number;
    quantity: number;
    createdAt: Date;
    updatedAt: Date;

    cart?: Cart;
    product?: Product;
};

type AccessToken = {
    type: 'bearer' | string;
    name: any;
    token: string;
    lastUsedAt: any;
    abilities: string[];
};

type Token = {
    accessToken: AccessToken;
    expiresAt: any;
};

export type LoginInfo = {
    message: string;
    token: Token;
    expiresAt: any;
    user: User;
};
