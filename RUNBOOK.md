# DevRel Foundation Site - Operations Runbook

## 🚀 Quick Reference

- **Production URL**: https://dev-rel.org
- **Repository**: https://github.com/DevRel-Foundation/site
- **Framework**: SvelteKit 2.x with Svelte 5
- **Hosting**: Netlify
- **Technical Contact**: website @ dev-rel.org
- **Business Contact**: info @ dev-rel.org
- **Escalation**: steering-committee @ dev-rel.org

## 📋 Service Dependencies

### Core Infrastructure
- **Netlify**: Primary hosting platform
  - Build automation and deployment
  - CDN and edge functions
  - Form handling and serverless functions
  - Managed by TODO LF team
- **LFX PCC**: Linux Foundation Project Control Center
  - Domain management and DNS
- **PostHog**: Analytics tooling
  - Analytics, heatmaps, and session replay / error tracking
  - Person properties tracking for newsletter signups
  - GDPR-compliant cookie consent management
  - User identification and event tracking
  - Managed by website account

### Development Dependencies
- **GitHub**: Source code repository and CI/CD
- **[Node.js](https://nodejs.org/)** Runtime environment (see `.nvmrc` for version) 
- **[npm](https://www.npmjs.com/)** Package management
- **Vite**: Build tool and development server

### Third-party Integrations
- **Iconoir**: Icon library for UI elements
- **mdsvex**: Markdown processing for blog content
- **PostCSS**: CSS processing and optimization

## 👥 Access Control & Permissions

### GitHub Organization Roles
- **site-admin team**: Full deployment and administrative access
  - Can merge to `main` branch (triggers production deployment)
  - Can modify repository settings and secrets
  - Can manage Netlify deployment settings

### Deployment Authorization
- Only members of the `site-admin` team in the `DevRel-Foundation` GitHub organization can deploy to production
- All deployments require pull request review and approval
- Direct pushes to `main` branch are restricted

## 🚀 Deployment Process

### Production Deployment
1. **Automatic**: Merging to `main` branch triggers automatic Netlify build and deployment
2. **Manual**: Netlify admin can trigger manual deploys from the dashboard
3. **Rollback**: Previous deployments can be restored via Netlify dashboard

### Staging/Preview Environment
1. **Create Pull Request**: Submit PR against `main` branch
2. **Automatic Preview**: Netlify automatically creates preview deployment
3. **Preview URL**: Available in PR checks and Netlify dashboard
4. **Testing**: Test changes on preview URL before merging

### Build Process
```bash
# Install dependencies
npm install

# Development server
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

## 🔧 Configuration Management

### Environment Variables
- Managed through Netlify dashboard
- No sensitive secrets required for current setup
- Build environment uses Node.js version specified in `.nvmrc`

### DNS & Domain Management
- Primary domain: `dev-rel.org`
- Managed through Netlify DNS
- SSL certificates automatically managed by Netlify

## 📊 Monitoring & Observability

### Build Monitoring
- **Netlify Build Logs**: Available in Netlify dashboard
- **GitHub Actions**: Status visible in repository
- **Deploy Notifications**: Configured via Netlify webhooks

### Performance Monitoring
- **Lighthouse CI**: Automated performance testing
- **Core Web Vitals**: Monitored via Netlify Analytics
- **Error Tracking**: Browser console errors (future: consider observability tool)

### Uptime Monitoring
- **Netlify Status**: https://netlifystatus.com
- **Custom Monitoring**: Future enhancement (consider UptimeRobot or similar)

## 🚨 Incident Response

### Emergency Contacts
- **Primary**: website @ dev-rel.org
- **Escalation**: steering-committee @ dev-rel.org
- **GitHub Issues**: https://github.com/DevRel-Foundation/site/issues

### Common Issues & Solutions

#### Build Failures
1. Check Netlify build logs for specific error
2. Verify Node.js version compatibility
3. Check for dependency conflicts in `package.json`
4. Test build locally: `npm run build`

#### Site Downtime
1. Check Netlify status page
2. Verify DNS configuration
3. Check for recent deployments that may have introduced issues
4. Rollback to previous working deployment if necessary

#### Content Issues
1. Blog posts stored in `src/blog/` directory
2. Page content in respective route directories
3. Static assets in `static/` directory
4. Verify markdown syntax and frontmatter

## 🔒 Security Considerations

### Access Security
- GitHub two-factor authentication recommended for all admins
- Netlify admin access limited to authorized personnel

### Content Security
- All user-generated content is reviewed before publishing
- External dependencies reviewed
- Security headers configured via `netlify.toml`

### Privacy & GDPR Compliance
- Cookie consent banner for analytics tracking
- PostHog configured with opt-out by default
- Privacy policy available at `/privacy`
- User consent stored in localStorage
- Analytics only activated after explicit consent

### Deployment Security
- All deployments from trusted source (GitHub)
- No direct FTP or SSH access to production
- Immutable deployments with rollback capability

## 📈 Scaling Considerations

### Performance Optimization
- Static site generation for optimal performance
- CDN distribution via Netlify Edge
- Image optimization (future enhancement)
- Code splitting and lazy loading

### Traffic Scaling
- Netlify handles automatic scaling
- Monitor bandwidth usage in Netlify dashboard
- Consider CDN optimization for global audience

## 🛠 Maintenance Procedures

### Regular Maintenance
- **Dependencies**: Recommend update monthly via `npm update`
- **Security**: Monitor and apply security patches promptly
- **Content**: Regular content audits and updates
- **Performance**: Recommend monthly Lighthouse audits

### Backup Procedures
- **Source Code**: Git repository serves as primary backup
- **Content**: Blog posts and pages version controlled
- **Configuration**: Infrastructure as code via `netlify.toml`
- **Database**: No database currently; static site

## 📚 Documentation

### Technical Documentation
- **README.md**: Development setup and local environment
- **CONTRIBUTING.md**: Contribution guidelines
- **RUNBOOK.md**: This operations guide

### Process Documentation
- **GitHub Issues**: Bug reports and feature requests
- **Pull Request Templates**: Standardized PR descriptions (pending)
- **Release Notes**: Version history and change logs

## 🔮 Future Enhancements

### Monitoring Improvements
- [ ] Implement proper error tracking (observability tools)
- [ ] Add uptime monitoring service and automated alerts (statuspage alerts)
- [ ] Create status page for service status

### Security Enhancements
- [ ] Implement Content Security Policy headers
- [ ] Add automated security scanning (Semgrep)
- [ ] Regular security audits
- [ ] Implement rate limiting for forms

### Operational Improvements
- [ ] Automated dependency updates
- [ ] Enhanced CI/CD pipeline
- [ ] Blue-green deployment strategy (if needed)
- [ ] Database integration (if needed)

---

## 📞 Support & Contact

For operational issues, incidents, or questions about this runbook:

- **Email**: website @ dev-rel.org
- **GitHub Issues**: https://github.com/DevRel-Foundation/site/issues

---

*Last Updated: August 2025*
*Document Owner: DevRel Foundation Steering Committee*
