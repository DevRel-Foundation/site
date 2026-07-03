import { redirect } from '@sveltejs/kit';

const redirects = [
  {
    from: /^\/blog\/category\/all\/?$/,
    to: '/blog',
    status: 302
  },
  { 
    from: /^\/about\/?$/,
    to: '/about/mission',
    status: 302
  },
  { 
    from: /^\/learn\/?$/,
    to: '/learn/what-is-devrel',
    status: 302
  },
  {
    from: /^\/join-us\/?$/,
    to: '/join',
    status: 302
  }
];

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
  const { pathname } = event.url;
  
  for (const redirect_rule of redirects) {
    if (redirect_rule.from.test(pathname)) {
      throw redirect(redirect_rule.status, redirect_rule.to);
    }
  }
  
  return resolve(event);
}
