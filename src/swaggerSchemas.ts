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
          password: { type: "string" },
          admin: { type: "boolean" },
        },
        example: {
          id: "a73c85b6-ac1b-4603-93bf-27e8ea205c48",
          name: "Jon Doe",
          email: "jondoe@email.com",
          password: "123",
          admin: false,
        },
      },
      ProductDTO: {
        type: "object",
        properties: {
          nome: { type: "string" },
          cor: {type: "string"},
          tipo: { type: "string" },
          caimento: {
            type: "string",
            enum: ["Fit", "Slim", "SlimFit", "Regular", "Oversized", "Baggy", "Reta"],
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
      CartResponse: {
        type: "object",
        properties: {
          id: { type: "string", format: "uuid" },
          userId: { type: "string", format: "uuid" },
          isOpen: { type: "boolean" },
        },
        example: {
          id: "a7wsadsa-ac1b-460o3-9dfbf-27e8efdsdf48",
          userId: "a73c85b6-ac1b-4603-93bf-27e8ea205c48",
          isOpen: false,
        },
      },
    },
  },
};
