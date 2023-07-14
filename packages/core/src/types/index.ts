export interface IMeta {
    createdAt?: number
    createdBy?: {
        id: string
        name: string
        email: string
    }
    updatedAt?: string
    updatedBy?: {
        id: string
        name: string
        email: string
    }
}
