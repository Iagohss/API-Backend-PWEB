export const swaggerSchemas = {
  components: {
    schemas: {
      UserDTO: {
        type: "object",
        properties: {
          name: { type: "string" },
          email: { type: "string" },
          password: { type: "string" },
          admin: { type: "boolean" },
        },
        example: {
          name: "Jon Doe",
          email: "jondoe@email.com",
          password: "123",
          admin: false,
        },
      },
      UserResponse: {
        type: "object",
        properties: {
          id: { type: "string", format: "uuid" },
          name: { type: "string" },
          email: { type: "string" },
          admin: { type: "boolean" },
        },
        example: {
          id: "a73c85b6-ac1b-4603-93bf-27e8ea205c48",
          name: "Jon Doe",
          email: "jondoe@email.com",
          admin: false,
        },
      },
      UserResponseWithCartId: {
        type: "object",
        properties: {
          id: { type: "string", format: "uuid" },
          name: { type: "string" },
          email: { type: "string" },
          admin: { type: "boolean" },
          cartId: { type: "string" },
        },
        example: {
          id: "a73c85b6-ac1b-4603-93bf-27e8ea205c48",
          name: "Jon Doe",
          email: "jondoe@email.com",
          admin: false,
          cartId: "e0dee3e3-1054-4dfc-b5e4-a05244570b11",
        },
      },
      ProductDTO: {
        type: "object",
        properties: {
          nome: { type: "string" },
          cor: { type: "string" },
          tipo: { type: "string" },
          caimento: {
            type: "string",
            enum: [
              "Fit",
              "Slim",
              "SlimFit",
              "Regular",
              "Oversized",
              "Baggy",
              "Reta",
            ],
          },
          material: { type: "string" },
          tamanho: {
            type: "string",
            enum: ["PP", "P", "M", "G", "GG"],
          },
          preco: { type: "number" },
        },
        example: {
          nome: "Camiseta Básica",
          cor: "Branca",
          tipo: "Camiseta",
          caimento: "Regular",
          material: "Algodão",
          tamanho: "M",
          preco: 49.99,
        },
      },
      ProductFilterDTO: {
        type: "object",
        properties: {
          nome: { type: "string", example: "Camiseta" },
          cor: { type: "string", example: "Preto" },
          tipo: { type: "string", example: "Camiseta" },
          caimento: {
            type: "string",
            enum: [
              "Fit",
              "Slim",
              "SlimFit",
              "Regular",
              "Oversized",
              "Baggy",
              "Reta",
            ],
            example: "Regular",
          },
          material: { type: "string", example: "Algodão" },
          tamanho: {
            type: "string",
            enum: ["PP", "P", "M", "G", "GG"],
            example: "M",
          },
          minPrice: { type: "number", example: 50.0 },
          maxPrice: { type: "number", example: 150.0 },
        },
        example: {
          nome: "Camiseta Básica",
          cor: "Branca",
          tipo: "Camiseta",
          caimento: "Regular",
          material: "Algodão",
          tamanho: "M",
          minPrice: 50,
          maxPrice: 150,
        },
      },
      CartResponse: {
        type: "object",
        properties: {
          id: { type: "string", format: "uuid" },
          userId: { type: "string", format: "uuid" },
          isOpen: { type: "boolean" },
          cartProducts: {
            type: "array",
            items: {
              type: "object",
              properties: {
                id: { type: "string", format: "uuid" },
                cartId: { type: "string", format: "uuid" },
                productId: { type: "string", format: "uuid" },
                quantidade: { type: "number" },
              },
              example: {
                id: "49041134-c5e9-490d-91e4-e733fa9b51c3",
                cartId: "e0dee3e3-1054-4dfc-b5e4-a05244570b11",
                productId: "596672c3-2f23-4c91-85ea-681c8a21ebcd",
                quantidade: 15,
              },
            },
          },
        },
        example: {
          id: "e0dee3e3-1054-4dfc-b5e4-a05244570b11",
          userId: "ab77a983-ffa7-4df1-8be3-bf969355c98e",
          isOpen: true,
          cartProducts: [
            {
              id: "49041134-c5e9-490d-91e4-e733fa9b51c3",
              cartId: "e0dee3e3-1054-4dfc-b5e4-a05244570b11",
              productId: "596672c3-2f23-4c91-85ea-681c8a21ebcd",
              quantidade: 15,
            },
          ],
        },
      },
      CartProductResponse: {
        type: "object",
        properties: {
          quantidade: { type: "number" },
          product: { $ref: "#/components/schemas/ProductDTO" },
        },
        example: {
          quantidade: 2,
          product: {
            nome: "Camiseta Básica",
            cor: "Branca",
            tipo: "Camiseta",
            caimento: "Regular",
            material: "Algodão",
            tamanho: "M",
            preco: 49.99,
          },
        },
      },
      CartResponseWithUser: {
        type: "object",
        properties: {
          user: { $ref: "#/components/schemas/UserResponse" },
          cartProducts: {
            type: "array",
            items: { $ref: "#/components/schemas/CartProductResponse" },
          },
        },
        example: {
          user: {
            id: "a73c85b6-ac1b-4603-93bf-27e8ea205c48",
            name: "Jon Doe",
            email: "jondoe@email.com",
            admin: false,
          },
          cartProducts: [
            {
              quantidade: 2,
              product: {
                nome: "Camiseta Básica",
                cor: "Branca",
                tipo: "Camiseta",
                caimento: "Regular",
                material: "Algodão",
                tamanho: "M",
                preco: 49.99,
              },
            },
          ],
        },
      },
      PurchaseResponse: {
        type: "object",
        properties: {
          id: { type: "string", format: "uuid" },
          cartId: { type: "string", format: "uuid" },
          precoTotal: { type: "number" },
          formaPagamento: { type: "string" },
          data: { type: "string", format: "date-time" },
          cart: { $ref: "#/components/schemas/CartResponseWithUser" },
        },
        example: {
          id: "123e4567-e89b-12d3-a456-426614174000",
          cartId: "456e7890-b12d-34a5-c678-987654321000",
          precoTotal: 199.99,
          formaPagamento: "Cartão de crédito",
          data: "2025-02-15T12:00:00Z",
          cart: {
            user: {
              id: "a73c85b6-ac1b-4603-93bf-27e8ea205c48",
              name: "Jon Doe",
              email: "jondoe@email.com",
              admin: false,
            },
            cartProducts: [
              {
                quantidade: 2,
                product: {
                  nome: "Camiseta Básica",
                  cor: "Branca",
                  tipo: "Camiseta",
                  caimento: "Regular",
                  material: "Algodão",
                  tamanho: "M",
                  preco: 49.99,
                },
              },
            ],
          },
        },
      },
    },
  },
};
