export interface Product {
    ProductID: number
    ProductName: string
    Description: string
    Price: string
    StockQuantity: number
    CategoryID: number
    PaymentID: number | null
}