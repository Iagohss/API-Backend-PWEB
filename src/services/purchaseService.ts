import { Purchase } from "../models/purchase";
import { PurchaseDTO } from "../dtos/purchaseDTO";
import PurchaseRepository from "../repositories/purchaseRepository";
import PurchaseConflictError from "../errors/purchaseConflictError";
import CartRepository from "../repositories/cartRepository";
import CartNotFoundError from "../errors/cartNotFoundError";
import { CartResponse } from "../models/cartResponse";
import EmptyCartError from "../errors/emptyCartError";
import ProductRepository from "../repositories/productRepository";
import ProductNotFoundError from "../errors/productNotFoundError";
import PurchaseNotFoundError from "../errors/purchaseNotFoundError";
import UserRepository from "../repositories/userRepository";
import UserNotFoundError from "../errors/userNotFoundError";
import CartConflictError from "../errors/cartConflictError";
import { PaginationDTO } from "../dtos/paginationDTO";
import { UserIdWithPaginationDTO } from "../dtos/userIdWithPaginationDTO";

class PurchaseService {
  private purchaseRepository;
  private cartRepository;
  private productRepository;
  private userRepository;

  constructor() {
    this.purchaseRepository = new PurchaseRepository();
    this.cartRepository = new CartRepository();
    this.productRepository = new ProductRepository();
    this.userRepository = new UserRepository();
  }

  async createPurchase(purchaseDTO: PurchaseDTO) {
    const { cartId, formaPagamento } = purchaseDTO;
    let cart: CartResponse | null = await this.cartRepository.getCartById(
      cartId
    );
    if (!cart) throw new CartNotFoundError();
    if (!cart.isOpen)
      throw new CartConflictError(
        "Não é possível realizar a compra de um carrinho fechado"
      );

    const existingPurchase = await this.purchaseRepository.getPurchaseByCartId(
      cartId
    );
    if (existingPurchase) throw new PurchaseConflictError();
    if (cart.cartProducts.length == 0) throw new EmptyCartError();

    const productIds = cart.cartProducts.map((item) => item.productId);
    const products = await Promise.all(
      productIds.map(async (productId) => {
        const product = await this.productRepository.getProductById(productId);
        if (!product) throw new ProductNotFoundError();
        return product;
      })
    );

    let precoTotal = 0;
    for (let i = 0; i < cart.cartProducts.length; i++) {
      precoTotal += products[i].preco * cart.cartProducts[i].quantidade;
    }

    const purchase = await this.purchaseRepository.createPurchase(
      new Purchase(cartId, precoTotal, formaPagamento)
    );
    await this.cartRepository.closeCart(cartId);
    await this.cartRepository.createCart(cart.userId);
    return purchase;
  }

  async getPurchaseById(id: string) {
    const purchase = await this.purchaseRepository.getPurchaseById(id);
    if (!purchase) throw new PurchaseNotFoundError();
    return purchase;
  }

  async getPurchasesByUserId(
    userIdWithPaginationDTO: UserIdWithPaginationDTO,
    userId: string
  ) {
    const user = await this.userRepository.getUser(userId);
    if (!user) throw new UserNotFoundError();

    const carts = await this.cartRepository.getAllCartsByUser(userId);
    const cartsIds = carts.map((cart) => cart.id);
    return await this.purchaseRepository.getPurchaseByCartsIds(
      userIdWithPaginationDTO.offset,
      userIdWithPaginationDTO.limit,
      cartsIds
    );
  }

  async getAllPurchases(paginationDTO: PaginationDTO) {
    return await this.purchaseRepository.getAllPurchases(
      paginationDTO.offset,
      paginationDTO.limit
    );
  }

  async deletePurchase(id: string) {
    const purchase = await this.purchaseRepository.getPurchaseById(id);
    if (!purchase) throw new PurchaseNotFoundError();
    return await this.purchaseRepository.deletePurchase(id);
  }
}

export default PurchaseService;
