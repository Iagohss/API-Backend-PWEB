export class Cart {
    id: string;
    userId: string;
    isOpen: boolean;

    constructor(userId: string, isOpen: boolean = true) {
        this.id = "";
        this.userId = userId;
        this.isOpen = isOpen;
    }
}
