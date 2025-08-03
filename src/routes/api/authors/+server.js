import authorsData from '../../../authors/authors.json';
import { json } from '@sveltejs/kit';

export async function GET() {
  return json(authorsData);
}
