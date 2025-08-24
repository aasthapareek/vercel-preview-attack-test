// api/production-check.js
module.exports = (req, res) => {
  // Add CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  try {
    const response = {
      message: "Production Environment Check",
      timestamp: new Date().toISOString(),
      environment: process.env.VERCEL_ENV || 'unknown',
      deployment_url: process.env.VERCEL_URL || 'unknown',
      
      // Check for production secrets (should be safe to expose existence)
      secrets_check: {
        has_prod_secret: !!process.env.PROD_SECRET,
        has_api_key: !!process.env.API_KEY,
        has_db_url: !!process.env.DATABASE_URL,
        
        // Count secret environment variables
        secret_env_count: Object.keys(process.env).filter(key => 
          key.includes('SECRET') || 
          key.includes('KEY') || 
          key.includes('TOKEN') ||
          key.includes('PASSWORD')
        ).length
      },
      
      // Deployment information
      deployment_info: {
        deployment_id: process.env.VERCEL_DEPLOYMENT_ID || 'unknown',
        project_name: process.env.VERCEL_PROJECT_NAME || 'unknown',
        git_branch: process.env.VERCEL_GIT_COMMIT_REF || 'unknown',
        is_production: process.env.VERCEL_ENV === 'production'
      }
    };
    
    res.json(response);
  } catch (error) {
    res.status(500).json({
      error: error.message,
      stack: error.stack
    });
  }
};
