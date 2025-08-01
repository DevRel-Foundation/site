```svelte
<script>
  import { onMount } from 'svelte';
  
  let githubUsersCache = $state({});
  
  const { posts } = $props();
  
  // Function to fetch GitHub user data
  async function fetchGithubUsers(author) {
    if (!author || githubUsersCache[author]) return githubUsersCache[author] || [];
    
    const authors = author.split(',').map(a => a.trim());
    const userPromises = authors.map(async (authorName) => {
      if (authorName.startsWith('@')) {
        const username = authorName.slice(1);
        try {
          const response = await fetch(`https://api.github.com/users/${username}`);
          if (response.ok) {
            const userData = await response.json();
            return {
              type: 'github',
              username,
              name: userData.name || userData.login || username,
              avatar: userData.avatar_url,
              url: userData.html_url
            };
          }
        } catch (error) {
          console.error('Failed to fetch GitHub user:', error);
        }
        return { type: 'github', username, name: username, avatar: null, url: `https://github.com/${username}` };
      }
      return { type: 'text', name: authorName };
    });
    
    const users = await Promise.all(userPromises);
    githubUsersCache[author] = users;
    return users;
  }
  
  // Pre-fetch author data for all posts on mount
  onMount(async () => {
    const uniqueAuthors = [...new Set(posts.map(post => post.author).filter(Boolean))];
    
    for (const author of uniqueAuthors) {
      if (!githubUsersCache[author]) {
        await fetchGithubUsers(author);
      }
    }
  });
</script>

<!-- ...existing template code... -->

            {#if post.author}
              {#if githubUsersCache[post.author]}
                {#each githubUsersCache[post.author] as user, index}
                  {#if user.type === 'github'}
                    <a href={user.url} target="_blank" rel="noopener noreferrer" class="github-author">
                      {#if user.avatar}
                        <img src={user.avatar} alt={user.name} class="author-avatar" />
                      {/if}
                      {user.name}
                    </a>
                  {:else}
                    <span class="text-author">{user.name}</span>
                  {/if}
                  {#if index < githubUsersCache[post.author].length - 1}
                    <span class="author-separator">, </span>
                  {/if}
                {/each}
              {:else}
                <span class="author">{post.author}</span>
              {/if}
            {/if}

<!-- ...existing code... -->
```