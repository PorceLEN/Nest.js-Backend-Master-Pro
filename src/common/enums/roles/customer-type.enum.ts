export const CustomerType = {
  User: 'user',
  Admin: 'admin',
} as const;

export type ICustomerType = (typeof CustomerType)[keyof typeof CustomerType];

export const CustomerTypeText = {
  [CustomerType.User]: 'User',
  [CustomerType.Admin]: 'Admin',
} as const satisfies Record<ICustomerType, string>;

export function isCustomerType(value: unknown): value is ICustomerType {
  return Object.values(CustomerType).includes(value as ICustomerType);
}