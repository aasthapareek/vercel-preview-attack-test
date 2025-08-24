# Vercel Preview Deployment Security Test

## Overview
This project tests security boundaries between Vercel preview and production deployments.

## API Endpoints
- `/api/production-check` - Check production environment
- `/api/preview-attack` - Test preview environment access

## Test URLs
- Production: `https://[project-name].vercel.app/api/production-check`
- Preview: `https://[project-name]-git-[branch].vercel.app/api/preview-attack`

## Security Test
1. Deploy to production with secrets
2. Create preview branch
3. Check if preview can access production secrets

## Expected Result
Preview deployments should NOT have access to production environment variables.
# Preview Attack Test
