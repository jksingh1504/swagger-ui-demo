"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const swaggerAutogen = require("swagger-autogen");
const swaggerAG = swaggerAutogen({ openapi: "3.0.0" });
const doc = {
    info: {
        title: "E-Commerce API using node.js",
        description: "This API provides endpoints for managing an e-commerce platform, enabling users to browse products, manage their carts and wishlists, and administrators to handle product creation and authentication.\n\n**Features include:**\n- **Add to Cart**: Users can add products to their shopping carts for future purchase.\n- **Create Product (Admin)**: Administrators have the ability to create new products for the platform.\n- **Add to Wishlist**: Users can add products to their wishlists for later consideration or purchase.\n- **Product Order Management**: Users can create orders for purchasing products and track their order status.\n- **User Address**: Users can manage their addresses for shipping and billing purposes.\n- **User Authentication API**: Endpoints for user registration, login, and authentication token generation.\n- **Admin Authentication API**: Endpoints for administrator login and authentication token generation. \n\n\n**Contact Information**:\n- **Name:** Omkar Sathe\n- **Email:** [satheomkar143@gmail.com](mailto:satheomkar143@gmail.com)\n- **Phone:** [7058919412](tel:7058919412)\n- **Designation:** Software Developer\n- **Portfolio:** [https://visionnaire.netlify.app/](https://visionnaire.netlify.app/)",
    },
    servers: [
        {
            url: "https://ecommerce-rest-api-omkar.vercel.app/",
            description: "Production Server",
        },
        {
            url: "https://fancy-yeot-9566be.netlify.app/.netlify/functions/index/",
            description: "Production Server (netlify)",
        },
        {
            url: "https://e-commerce-omkar.netlify.app/.netlify/functions/index/",
            description: "Production Server (netlify)",
        },
        {
            url: "http://localhost:8000/",
            description: "Local server",
        },
    ],
    tags: [
        { name: "User Authentication" },
        { name: "Admin Authentication" },
        {
            name: "User",
            description: "Before the api call it checked if user cookie token (userToken) is present or not. and user fetched from the id decoded from token.",
        },
        {
            name: "User Address",
            description: "Before the api call it checked if user cookie token (userToken) is present or not. and address fetched from the id of user decoded from token.",
        },
        { name: "Products" },
        {
            name: "User Cart",
            description: "Before the api call it checked if user cookie token (userToken) is present or not. and cart fetched from the id of user decoded from token.",
        },
        { name: "User Products Order" },
        { name: "User Products Wishlist" },
    ],
    components: {
        schemas: {
            UserSchema: {
                $name: "John Doe",
                $email: "johndoe",
                $password: "jahn@123",
            },
            UserSchemaRes: {
                message: "Resister successful",
                user: {
                    name: "John Doe",
                    email: "johndoe",
                    _id: "6623adae3fd349bd06b525d8",
                    createdAt: "2024-04-20T11:57:34.826Z",
                    updatedAt: "2024-04-20T11:57:34.826Z",
                },
            },
            currentUser: {
                user: {
                    name: "John Doe",
                    email: "johndoe",
                    _id: "6623adae3fd349bd06b525d8",
                    createdAt: "2024-04-20T11:57:34.826Z",
                    updatedAt: "2024-04-20T11:57:34.826Z",
                },
            },
            alreadyExists: {
                message: "already exists",
            },
            notFound: {
                message: "not found",
            },
            internalError: {
                message: "Internal server error",
            },
            incorrectPassword: {
                message: "Incorrect password",
            },
            loginSchema: { $email: "johndoe", $password: "jahn@123" },
            successfullLogin: {
                message: "Login successful",
                user: {
                    name: "John Doe",
                    email: "johndoe",
                    _id: "6623adae3fd349bd06b525d8",
                    createdAt: "2024-04-20T11:57:34.826Z",
                    updatedAt: "2024-04-20T11:57:34.826Z",
                },
            },
            logout: {
                message: "Logout successful",
            },
            unauthorized: {
                message: "Unauthorized user",
            },
            successfulUpdate: {
                message: "Update successful",
                user: {
                    name: "John Doe",
                    email: "johndoe",
                    _id: "6623adae3fd349bd06b525d8",
                    createdAt: "2024-04-20T11:57:34.826Z",
                    updatedAt: "2024-04-20T11:57:34.826Z",
                },
            },
            successfulDelete: {
                message: "Delete successful",
                user: {
                    name: "John Doe",
                    email: "johndoe",
                    _id: "6623adae3fd349bd06b525d8",
                    createdAt: "2024-04-20T11:57:34.826Z",
                    updatedAt: "2024-04-20T11:57:34.826Z",
                },
            },
            idSchema: "6623c3233a6eca1c26865321",
            addressSchema: {
                $addressLine1: "shanivar peth",
                addressLine2: "near shanivar wada",
                $city: "pune",
                $state: "maharashtra",
                $country: "india",
                $postalCode: 416235,
            },
            addressRes: {
                message: "Address created",
                address: {
                    user: "6623c12dcc74103d450d2c97",
                    addressLine1: "shanivar peth",
                    addressLine2: "near shanivar wada",
                    city: "pune",
                    state: "maharashtra",
                    country: "india",
                    postalCode: "416235",
                    _id: "6623c3233a6eca1c26865321",
                    createdAt: "2024-04-20T13:29:07.242Z",
                    updatedAt: "2024-04-20T13:29:07.242Z",
                    __v: 0,
                },
            },
            addressUpdateSchema: {
                $user: "6623c12dcc74103d450d2c56",
                $addressLine1: "shanivar peth (updated)",
                addressLine2: "near shanivar wada",
                $city: "pune",
                $state: "maharashtra",
                $country: "india",
                $postalCode: 416235,
            },
            addressUpdateRes: {
                message: "Address updated",
                address: {
                    _id: "6623c3233a6eca1c26865321",
                    user: "6623c12dcc74103d450d2c97",
                    addressLine1: "shanivar peth (updated)",
                    addressLine2: "near shanivar wada",
                    city: "pune",
                    state: "maharashtra",
                    country: "india",
                    postalCode: "416235",
                    createdAt: "2024-04-20T13:29:07.242Z",
                    updatedAt: "2024-04-20T14:16:56.921Z",
                    __v: 0,
                },
            },
            addressDeleteRes: {
                message: "Address deleted",
                addres: {
                    _id: "6623d1f8172e960b094597dd",
                    user: "6623c12dcc74103d450d2c97",
                    addressLine1: "main road 2",
                    addressLine2: "near bus stand",
                    city: "kolhapur 2",
                    state: "maharashtra 2",
                    country: "india 2",
                    postalCode: "416235",
                    createdAt: "2024-04-20T14:32:24.582Z",
                    updatedAt: "2024-04-20T14:32:24.582Z",
                    __v: 0,
                },
            },
            userAddresses: {
                addresses: [
                    {
                        _id: "6623c3233a6eca1c26865321",
                        user: "6623c12dcc74103d450d2c97",
                        addressLine1: "shanivar peth (updated)",
                        addressLine2: "near shanivar wada",
                        city: "pune",
                        state: "maharashtra",
                        country: "india",
                        postalCode: "416235",
                        createdAt: "2024-04-20T13:29:07.242Z",
                        updatedAt: "2024-04-20T14:36:35.273Z",
                        __v: 0,
                    },
                    {
                        _id: "6623d1396010ded83a203d91",
                        user: "6623c12dcc74103d450d2c97",
                        addressLine1: "main road",
                        addressLine2: "near bus stand",
                        city: "kolhapur",
                        state: "maharashtra",
                        country: "india",
                        postalCode: "416235",
                        createdAt: "2024-04-20T14:29:13.842Z",
                        updatedAt: "2024-04-20T14:29:13.842Z",
                        __v: 0,
                    },
                    {
                        _id: "6623d1f8172e960b094597dd",
                        user: "6623c12dcc74103d450d2c97",
                        addressLine1: "main road 2",
                        addressLine2: "near bus stand",
                        city: "kolhapur 2",
                        state: "maharashtra 2",
                        country: "india 2",
                        postalCode: "416235",
                        createdAt: "2024-04-20T14:32:24.582Z",
                        updatedAt: "2024-04-20T14:32:24.582Z",
                        __v: 0,
                    },
                ],
            },
            addressNotFound: {
                message: "Address not found",
            },
            adminSchemaRes: {
                message: "Admin created",
                admin: {
                    name: "John Doe",
                    email: "johndoe",
                    _id: "6623adae3fd349bd06b525d8",
                    createdAt: "2024-04-20T11:57:34.826Z",
                    updatedAt: "2024-04-20T11:57:34.826Z",
                },
            },
            successfullAdminLogin: {
                message: "Login successful",
                admin: {
                    name: "John Doe",
                    email: "johndoe",
                    _id: "6623adae3fd349bd06b525d8",
                    createdAt: "2024-04-20T11:57:34.826Z",
                    updatedAt: "2024-04-20T11:57:34.826Z",
                },
            },
            currentAdmin: {
                admin: {
                    name: "John Doe",
                    email: "johndoe",
                    _id: "6623adae3fd349bd06b525d8",
                    createdAt: "2024-04-20T11:57:34.826Z",
                    updatedAt: "2024-04-20T11:57:34.826Z",
                },
            },
            unauthorizedAdmin: {
                message: "Unauthorized admin",
            },
            productSchema: {
                $name: "shoe",
                $price: 2500,
                $description: "most valuable  sport shoe",
                $image: [
                    {
                        type: "formData",
                        description: "select images to upload",
                    },
                ],
                $category: ["sport", "new brand"],
                $color: ["blue", "blue"],
                $size: [5, 6, 7],
            },
            productSchemaRes: {
                product: {
                    name: "shoe",
                    price: 2500,
                    description: "most valuable  sport shoe",
                    image: [
                        "https://res.cloudinary.com/dsfzlok5j/image/upload/v1713649297/ecommerce/adidas-shoe-top-view.jpg",
                        "https://res.cloudinary.com/dsfzlok5j/image/upload/v1713649297/ecommerce/adidas-shoe.jpg",
                        "https://res.cloudinary.com/dsfzlok5j/image/upload/v1713649297/ecommerce/adidas-shoe-side-view.jpg",
                    ],
                    category: ["sport", "new brand"],
                    color: ["blue", "white"],
                    size: ["5", "6", "7"],
                    _id: "662438e5ad388eaaea71f50d",
                    createdAt: "2024-04-20T21:51:33.393Z",
                    updatedAt: "2024-04-20T21:51:33.393Z",
                    __v: 0,
                },
            },
            productImage: {
                message: "Please provide at least one product image",
            },
            searchProduct: {
                produsts: [
                    {
                        name: "shoe",
                        price: 2500,
                        description: "most valuable  sport shoe",
                        image: [
                            "https://res.cloudinary.com/dsfzlok5j/image/upload/v1713649297/ecommerce/adidas-shoe-top-view.jpg",
                            "https://res.cloudinary.com/dsfzlok5j/image/upload/v1713649297/ecommerce/adidas-shoe.jpg",
                            "https://res.cloudinary.com/dsfzlok5j/image/upload/v1713649297/ecommerce/adidas-shoe-side-view.jpg",
                        ],
                        category: ["sport", "new brand"],
                        color: ["blue", "white"],
                        size: ["5", "6", "7"],
                        _id: "662438e5ad388eaaea71f50d",
                        createdAt: "2024-04-20T21:51:33.393Z",
                        updatedAt: "2024-04-20T21:51:33.393Z",
                        __v: 0,
                    },
                ],
            },
            searchSchema: "new brand",
            cartSchema: {
                $productId: "662438e5ad388eaaea71f50d",
                quantity: 1,
            },
            cartSchemaRes: {
                message: "Product added to the cart",
                cart: {
                    user: "6623c12dcc74103d450d2c97",
                    products: [
                        {
                            product: "662438e5ad388eaaea71f50d",
                            quantity: 1,
                            _id: "6624c561c2d33cf4409e5200",
                        },
                    ],
                    _id: "6624c561c2d33cf4409e51ff",
                    createdAt: "2024-04-21T07:50:57.422Z",
                    updatedAt: "2024-04-21T07:50:57.422Z",
                    __v: 0,
                },
            },
            removeCartSchema: {
                $productId: "662438e5ad388eaaea71f50d",
            },
            cartNotFound: {
                message: "Cart not found",
            },
            cartRemovedSchemaRes: {
                message: "Product removed from the cart",
                cart: {
                    user: "6623c12dcc74103d450d2c97",
                    products: [
                        {
                            product: "662438e5ad388eaaea71f50d",
                            quantity: 1,
                            _id: "6624c561c2d33cf4409e5200",
                        },
                    ],
                    _id: "6624c561c2d33cf4409e51ff",
                    createdAt: "2024-04-21T07:50:57.422Z",
                    updatedAt: "2024-04-21T07:50:57.422Z",
                    __v: 0,
                },
            },
            userCart: {
                cart: {
                    _id: "6624c561c2d33cf4409e51ff",
                    user: "6623c12dcc74103d450d2c97",
                    products: [
                        {
                            product: {
                                _id: "662438e5ad388eaaea71f50d",
                                name: "shoe",
                                price: 2500,
                                description: "most valuable  sport shoe",
                                image: [
                                    "https://res.cloudinary.com/dsfzlok5j/image/upload/v1713649297/ecommerce/adidas-shoe-top-view.jpg",
                                    "https://res.cloudinary.com/dsfzlok5j/image/upload/v1713649297/ecommerce/adidas-shoe.jpg",
                                    "https://res.cloudinary.com/dsfzlok5j/image/upload/v1713649297/ecommerce/adidas-shoe-side-view.jpg",
                                ],
                                category: ["sport", "new brand"],
                                color: ["blue", "white"],
                                size: ["5", "6", "7"],
                                createdAt: "2024-04-20T21:51:33.393Z",
                                updatedAt: "2024-04-20T21:51:33.393Z",
                                __v: 0,
                            },
                            quantity: 1,
                            _id: "6624c561c2d33cf4409e5200",
                        },
                    ],
                    createdAt: "2024-04-21T07:50:57.422Z",
                    updatedAt: "2024-04-21T07:50:57.422Z",
                    __v: 0,
                },
            },
            orderSchema: {
                $products: ["662438e5ad388eaaea71f50d", "6624f27b1016595d9717c881"],
            },
            createOrderSchemaRes: {
                message: "new order created",
                order: {
                    user: "6623c12dcc74103d450d2c97",
                    total_price: 40000,
                    status: "pending",
                    _id: "6624f3336340a5111b99ae23",
                    products: [
                        {
                            product: "662438e5ad388eaaea71f50d",
                            quantity: 4,
                            _id: "6624f3336340a5111b99ae26",
                        },
                        {
                            product: "6624f27b1016595d9717c881",
                            quantity: 2,
                            _id: "6624f3336340a5111b99ae27",
                        },
                    ],
                    createdAt: "2024-04-21T11:06:27.841Z",
                    updatedAt: "2024-04-21T11:06:27.841Z",
                    __v: 0,
                },
            },
            cancleOrderSchemaRes: {
                message: "order cancled",
                order: {
                    _id: "6624f3336340a5111b99ae23",
                    user: "6623c12dcc74103d450d2c97",
                    total_price: 40000,
                    status: "pending",
                    products: [
                        {
                            product: "662438e5ad388eaaea71f50d",
                            quantity: 4,
                            _id: "6624f3336340a5111b99ae26",
                        },
                        {
                            product: "6624f27b1016595d9717c881",
                            quantity: 2,
                            _id: "6624f3336340a5111b99ae27",
                        },
                    ],
                    createdAt: "2024-04-21T11:06:27.841Z",
                    updatedAt: "2024-04-21T11:06:27.841Z",
                    __v: 0,
                },
            },
            userAllOrders: {
                orders: [
                    {
                        _id: "6624f62b6c0a5b24e701f0ae",
                        user: "6623c12dcc74103d450d2c97",
                        total_price: 40000,
                        status: "pending",
                        products: [
                            {
                                product: "662438e5ad388eaaea71f50d",
                                quantity: 4,
                                _id: "6624f62b6c0a5b24e701f0b1",
                            },
                            {
                                product: "6624f27b1016595d9717c881",
                                quantity: 2,
                                _id: "6624f62b6c0a5b24e701f0b2",
                            },
                        ],
                        createdAt: "2024-04-21T11:19:07.311Z",
                        updatedAt: "2024-04-21T11:19:07.311Z",
                        __v: 0,
                    },
                ],
            },
            wishlistSchema: {
                $productId: "662438e5ad388eaaea71f50d",
            },
            productIdNotFound: {
                message: "product id not provided",
            },
            wishlistProductExist: {
                message: "Product already exists in the wishlist",
            },
            wishlistAddedRes: {
                message: "Product added to the wishlist",
                wishlist: {
                    _id: "6624fa66d2236e45c8948622",
                    user: "6623c12dcc74103d450d2c97",
                    products: [
                        {
                            product: "6624f27b1016595d9717c881",
                            _id: "662502db1ccc2873f4f0e0ef",
                        },
                    ],
                    createdAt: "2024-04-21T11:37:10.554Z",
                    updatedAt: "2024-04-21T12:13:15.386Z",
                    __v: 6,
                },
            },
            wishlistProductRemoved: {
                message: "Product removed from the wishlist",
                removedwishlist: {
                    product: "6624f27b1016595d9717c881",
                    _id: "6624fe609372c9ffa17cc26e",
                },
            },
            wishlistNotFound: {
                message: "wishlist not found",
            },
            userWishlist: {
                wishlist: {
                    _id: "6624fa66d2236e45c8948622",
                    user: "6623c12dcc74103d450d2c97",
                    products: [
                        {
                            product: {
                                _id: "6624f27b1016595d9717c881",
                                name: "rolex watch",
                                price: 15000,
                                description: "world best branded watch",
                                image: [
                                    "https://res.cloudinary.com/dsfzlok5j/image/upload/v1713697402/ecommerce/rolex-1.jpg",
                                    "https://res.cloudinary.com/dsfzlok5j/image/upload/v1713697403/ecommerce/rolex-2.jpg",
                                ],
                                category: ["casual", "watch"],
                                color: ["silver", "black"],
                                size: ["5", "6", "7"],
                                createdAt: "2024-04-21T11:03:24.009Z",
                                updatedAt: "2024-04-21T11:03:24.009Z",
                                __v: 0,
                            },
                            _id: "662502db1ccc2873f4f0e0ef",
                        },
                    ],
                    createdAt: "2024-04-21T11:37:10.554Z",
                    updatedAt: "2024-04-21T12:13:15.386Z",
                    __v: 6,
                },
            },
        },
    },
};
const outputFile = "./swagger-output.json";
const routes = ["./routes/routes.ts"];
swaggerAG(outputFile, routes, doc);
