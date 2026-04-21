export const CustomerType = {
  user: 'user',
  admin: 'admin',
} as const;

export type ICustomerType = (typeof CustomerType)[keyof typeof CustomerType];

export const CustomerTypeText = {
  [CustomerType.user]: 'user',
  [CustomerType.admin]: 'admin',
} as const satisfies Record<ICustomerType, string>;

export function isCustomerType(value: unknown): value is ICustomerType {
  return Object.values(CustomerType).includes(value as ICustomerType);
}