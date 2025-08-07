# Contributing to the DevRel Foundation Site

Welcome to the DevRel Foundation website project! We're excited to have you contribute to our mission.

## Table of Contents

- [Getting Started](#getting-started)
- [Code of Conduct](#code-of-conduct)
- [Ways to Contribute](#ways-to-contribute)
- [Blog Contribution Guidelines](#blog-contribution-guidelines)
- [Development Setup](#development-setup)
- [Support](#support)

## Getting Started

The DevRel Foundation website serves as the central hub for our community, hosting resources, blog content, and information about our working groups and projects. All contributions should align with our mission to provide valuable, vendor-neutral resources for the Developer Relations community.

### Prerequisites

Before contributing, please ensure you have:
- A [GitHub account](https://github.com/signup)
- Basic familiarity with Git and GitHub workflows
- Node.js and npm installed (for development contributions)

## Code of Conduct

All contributors are expected to adhere to the [DevRel Foundation Code of Conduct](https://github.com/DevRel-Foundation/governance/blob/main/code-of-conduct.md). By participating in this project, you agree to maintain a respectful, inclusive, and collaborative environment.

## Ways to Contribute

### 🖊️ Blog Posts
Share insights, tutorials, and perspectives on Developer Relations topics that benefit our community.

### 🐛 Bug Reports
Found an issue with the website? Report it through our [GitHub Issues](https://github.com/DevRel-Foundation/site/issues).

### ✨ Feature Requests
Suggest new features or improvements to enhance the site's functionality.

### 📝 Documentation
Help improve our documentation, guides, and resources.

### 🎨 Design & UX
Contribute to the visual design and user experience of the site.

### 💻 Code Contributions
Help develop new features, fix bugs, or improve the site's technical implementation.


## Blog Contribution Guidelines

You may be interested in contributing to our community blog but any contributions must be in alignment with our mission and the open-source spirit of the foundation we belong.

Here's what you need to know:

### Content We Welcome

Blog posts should:
- ✅ Focus on Developer Relations best practices, frameworks, or insights
- ✅ Be applicable to our [community personas](https://github.com/DevRel-Foundation/persona-library) 
- ✅ Provide practical value to DevRel professionals as a resource
- ✅ Share knowledge about foundation resources and projects
- ✅ Present vendor-neutral perspectives and solutions
- ✅ Include original insights, case studies, or research

### Content We Don't Publish

We will not publish:
- ❌ Direct promotional content or sales pitches
- ❌ Job postings or recruitment content
- ❌ Backlink farming or SEO-focused content
- ❌ Promoted events without broader community value
- ❌ Content primarily advertising third-party commercial products
- ❌ Personal opinions without broader applicability or incorporation into foundation resources
- ❌ Content that violates our Code of Conduct

### Blog Post Structure

All blog posts must include frontmatter with the following fields:

```markdown
---
title: "Your Blog Post Title"
excerpt: "A brief description (1-2 sentences) that will appear in listings"
author: "@your-github-username"
date: "YYYY-MM-DD"
category: "exec|early-ic|pro-lead|exec"
tags: ["tag1", "tag2", "tag3"]
---
```

**Field Descriptions:**
- `title`: Clear, descriptive title (recommended: 60 characters or less)
- `excerpt`: Brief summary for social sharing and listings
- `author`: Your GitHub username (prefixed with @)
- `date`: Publication date in YYYY-MM-DD format
- `category`: Primary audience (exec, dev, marketing, community, product)
- `tags`: 2-5 relevant tags for categorization

### Content Guidelines

#### Writing Style
- Write in a clear, accessible manner
- Use active voice where possible
- Include practical examples and actionable insights
- Structure content with clear headings and subheadings
- Keep paragraphs concise and scannable

#### Attribution and Sources
- Properly cite all sources and references
- Include links to relevant foundation resources where applicable
- Give appropriate credit to community members and organizations
- Avoid claiming ownership of community-wide ideas or practices

#### Images and Media
- Use high-quality, relevant images
- Ensure you have rights to use any images included
- Optimize images for web (recommended: under 500KB)
- Include descriptive alt text for accessibility
- Store images in `/static/images/blog/` directory

## Blog Submission Process

1. **Fork the Repository**: Create a fork of the [site repository](https://github.com/DevRel-Foundation/site)

2. **Create a New Branch**: 
   ```bash
   git checkout -b blog/your-github-username
   ```

3. **Create Your Blog Post**: 
   - Add your markdown file to `/src/blog/`
   - Use the naming convention: `YYYY-MM-DD-your-post-slug.md`
   - Include all required frontmatter fields and please match the date

4. **Add Images** (if applicable):
   - Place images in `/static/images/blog/`
   - Reference them in your post as `/images/blog/your-image.png`

Avoid third-party image hosting, include it directly in the repository.

5. **Test Locally**: Run the development server to ensure your post renders correctly

Corrections may be necessary, but understand that it can be a burden and we are volunteers should there be multiple review cycles.

6. **Submit Pull Request**: 
   - Push your changes to your fork
   - Create a pull request against the main repository
   - Include a clear description of your contribution

## Blog Review

All blog posts go through a community review process:

1. **Community Review**: Anyone can provide feedback and suggestions on your pull request
2. **Leadership Approval**: At least one foundation leader must approve the content
3. **Technical Review**: Ensure the post renders correctly and follows our formatting standards
4. **Final Approval**: Once approved, your post will be merged and published

### Review Criteria

Posts are evaluated based on:
- Alignment with foundation values and mission
- Relevance and value to the DevRel community
- Technical accuracy and clarity
- Vendor neutrality and independence
- Originality and uniqueness of insights

### Feedback and Revisions

If changes are requested:
- Reviewers will provide specific, constructive feedback
- Authors can update their pull requests with revisions
- Additional review rounds may be necessary for complex changes

### Publication Timeline

- **Standard Timeline**: 5-10 business days from submission to publication
- **Expedited Review**: Available for time-sensitive content (contact site maintainers)
- **Publication Date**: Posts are typically published immediately upon approval

## Content Guidelines

### Inclusivity and Accessibility

- Use inclusive language that welcomes all community members
- Avoid jargon without proper explanation
- Include alt text for images
- Use proper heading structure for screen readers
- Consider diverse perspectives and experiences

### Technical Standards

- Code examples should be tested and functional
- Include language specifications for code blocks
- Provide context for technical concepts
- Link to official documentation where appropriate

### Community Standards

- Respect different viewpoints and approaches
- Encourage constructive discussion
- Avoid inflammatory or divisive language
- Focus on practical solutions and shared learning

## Cross-Posting Policy

We encourage cross-posting content to amplify diverse voices:

- **Timing**: Cross-posts must be published to our platform within 7 days of original publication
- **Attribution**: Include links to the original post if published elsewhere first
- **Coordination**: Contact maintainers if you need a specific publication window
- **Originality**: Content published elsewhere more than 7 days prior may be rejected

### Disclaimer

All blog posts include the following disclaimer:

*"This blog post represents the viewpoint of its author(s) and does not necessarily reflect an official position or perspective of the DevRel Foundation or any subsidiary working group. Authors' current workplace or affiliated products, if mentioned, are disclosed for transparency."*

## Development Contributions

1. **Check Existing Issues**: Look for related issues or create a new one to discuss your contribution
2. **Fork and Branch**: Create a descriptive branch for your changes
3. **Make Changes**: Implement your contribution following our coding standards
4. **Test**: Ensure all tests pass and the site builds correctly
5. **Submit PR**: Create a pull request with a clear description

### Development Setup

To run the site locally for development:

#### 1. Clone the Repository
```bash
git clone https://github.com/DevRel-Foundation/site.git
cd site
```

#### 2. Install Dependencies
```bash
npm install
```

#### 3. Start Development Server
```bash
npm run dev -- --open
```

The site will be available at `http://localhost:5173`

#### 4. Build for Production
```bash
npm run build
```

#### 5. Preview Production Build
```bash
npm run preview
```

All PRs will get a Netlify preview and URL so that it can be shared and tested before merge.

## Support

Need help with your contribution?

- **Discord**: Join our [community Discord](https://discord.gg/kfJkJ3Xd) for real-time support
- **GitHub Issues**: Create an issue for technical problems
- **Mailing List**: Subscribe to [community@dev-rel.org](https://lists.dev-rel.org/g/community) for announcements
- **Working Groups**: Attend [working group meetings](https://github.com/DevRel-Foundation/site/blob/main/src/routes/about/working-groups/+page.svelte) for collaborative discussions

## Questions?

If you have questions about contributing or need clarification on any guidelines:

1. Search existing [GitHub Issues](https://github.com/DevRel-Foundation/site/issues)
2. Ask in our [Discord community](https://discord.gg/kfJkJ3Xd)
3. Contact us at [info@dev-rel.org](mailto:info@dev-rel.org)

---

Thank you for contributing to the DevRel Foundation! Your participation helps strengthen our community and advance the professional practice of Developer Relations worldwide.

*This contributing guide is subject to updates as our community and projects evolve. Contributors will be notified of significant changes through our usual communication channels.*
