import * as bcrypt from 'bcrypt';

export async function hashingPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}
