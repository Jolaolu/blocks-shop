export interface ApiResponse {
  data: IProduct[]
  error?: any
}
export interface IProduct {
  id: string
  displayId: string
  createdAt: string
  updatedAt: string
  createdBy: string | null
  updatedBy: string | null
  name: string
  displayName: string
  description: string
  provider: string
  type: string
  metadata: {
    blockThumbnailUrl: string
    pricingStrategy: IPricingStrategy
    blockPricingStrategy: IBlockPricingStrategy
  }
  version: string
  isPublic: boolean
  isValid: boolean
  isRestricted: boolean
  isAccessGranted: boolean
  isCreditPurchaseRequired: boolean
  tags: string[]
  isPublicVersion: boolean
  manifestVersion: number
}

interface IBlockPricingStrategy {
  name: string
  unit: string
  direction: string
  credits: number
}
interface IPricingStrategy {
  type: string
  credits: number
}

export interface ICartItem {
  product: IProduct
  quantity: number
}

export interface ICart {
  [key: string]: ICartItem
}
