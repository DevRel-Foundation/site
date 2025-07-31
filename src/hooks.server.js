import { redirect } from '@sveltejs/kit';

// Centralized redirect configuration
const redirects = [
  {
    // Redirect /blog/category/all to /blog
    from: /^\/blog\/category\/all\/?$/,
    to: '/blog',
    status: 302
  },
  // Add more redirects here as needed
  // {
  //   from: /^\/old-path\/?$/,
  //   to: '/new-path',
  //   status: 301
  // }
];

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
  const { pathname } = event.url;
  
  // Check for redirects
  for (const redirect_rule of redirects) {
    if (redirect_rule.from.test(pathname)) {
      throw redirect(redirect_rule.status, redirect_rule.to);
    }
  }
  
  return resolve(event);
}
