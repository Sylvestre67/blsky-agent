import { TokenManager } from '../src/utils/token.manager';
import clipboardy from 'clipboardy';

async function main() {
  const token = await TokenManager.generateToken();
  await clipboardy.write(token);
  console.log('Token generated token and copied to your clipboard !');
}

main().catch(console.error);
