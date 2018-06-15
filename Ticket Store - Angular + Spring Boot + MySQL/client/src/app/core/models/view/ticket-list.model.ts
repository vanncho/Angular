export class TicketListModel {

    constructor(
        private id: number,
        private ticketsCount: number,
        private price: number,
        private priceCategory: string,
        private eventId: number
    ) {}
}
