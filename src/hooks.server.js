import { redirect } from '@sveltejs/kit';

// Centralized redirect configuration
const redirects = [
  {
    // Redirect /blog/category/all to /blog
    from: /^\/blog\/category\/all\/?$/,
    to: '/blog',
    status: 302
  },
  { 
    // Redirect /about to /about/steering-committee
    from: /^\/about\/?$/,
    to: '/about/mission',
    status: 302
  },
  { 
    // Redirect /learn to /learn/what-is-devrel
    from: /^\/learn\/?$/,
    to: '/learn/what-is-devrel',
    status: 302
  },
  {
    // Redirect /join-us to /join
    from: /^\/join-us\/?$/,
    to: '/join',
    status: 302
  }
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
