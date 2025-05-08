export interface Weight {
  volumetric: number;
  provided: number;
  unitOfMeasurement: string;
}

export interface Product {
  productName: string;
  productCode: string;
  localProductCode: string;
  localProductCountryCode: string;
  networkTypeCode: string;
  isCustomerAgreement: boolean;
  weight: Weight;
}

export interface TotalPrice {
  currencyType: string;
  priceCurrency: string;
  price: number;
}

export interface PriceBreakdown {
  typeCode: string;
  price: number;
}

export interface DetailedPriceBreakdown {
  currencyType: string;
  priceCurrency: string;
  breakdown: PriceBreakdown[];
}

export interface ServiceCodeGroup {
  serviceCodeRuleName: string;
  description: string;
  serviceCodes: { serviceCode: string }[];
}

export interface PickupCapabilities {
  nextBusinessDay: boolean;
  localCutoffDateAndTime: string;
  pickupEarliest: string;
  pickupLatest: string;
  pickupCutoffSameDayOutboundProcessing: string;
  originServiceAreaCode: string;
  originFacilityAreaCode: string;
  pickupAdditionalDays: number;
  pickupDayOfWeek: number;
}

export interface DeliveryCapabilities {
  deliveryTypeCode: string;
  estimatedDeliveryDateAndTime: string;
  destinationServiceAreaCode: string;
  destinationFacilityAreaCode: string;
  deliveryAdditionalDays: number;
  deliveryDayOfWeek: number;
  totalTransitDays: number;
}

export interface ItemBreakdown {
  name: string;
  serviceCode: string;
  localServiceCode: string;
  typeCode: string;
  serviceTypeCode: string;
  price: number;
  priceCurrency: string;
  isCustomerAgreement: boolean;
  isMarketedService: boolean;
  isBillingServiceIndicator: boolean;
  priceBreakdown: PriceBreakdown[];
  tariffRateFormula: string;
}

export interface Item {
  number: number;
  breakdown: ItemBreakdown[];
}

export interface PricingData {
  exchangeRates: {
    currentExchangeRate: number;
    currency: string;
    baseCurrency: string;
  }[];
  warnings: string[];
}

export interface ResponseData {
  products: Product[];
  totalPrice: TotalPrice[];
  totalPriceBreakdown: PriceBreakdown[];
  detailedPriceBreakdown: DetailedPriceBreakdown[];
  serviceCodeMutuallyExclusiveGroups: ServiceCodeGroup[];
  serviceCodeDependencyRuleGroups: ServiceCodeGroup[];
  pickupCapabilities: PickupCapabilities;
  deliveryCapabilities: DeliveryCapabilities;
  items: Item[];
  pricingDate: string;
}
