export default async function handler(req, res) {
    // Only allow GET requests
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        // Check if Claude API key is configured
        const apiKey = process.env.ANTHROPIC_API_KEY;
        
        if (!apiKey) {
            return res.status(200).json({
                apiEnabled: false,
                status: 'Claude API key not configured',
                timestamp: new Date().toISOString()
            });
        }

        // Test API connectivity with a minimal request
        const response = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': apiKey,
                'anthropic-version': '2023-06-01'
            },
            body: JSON.stringify({
                model: 'claude-3-sonnet-20240229',
                max_tokens: 10,
                messages: [{
                    role: 'user',
                    content: 'Hi'
                }]
            })
        });

        if (response.ok) {
            return res.status(200).json({
                apiEnabled: true,
                status: 'Claude AI connected successfully',
                timestamp: new Date().toISOString()
            });
        } else {
            const error = await response.text();
            console.error('Claude API error:', response.status, error);
            
            return res.status(200).json({
                apiEnabled: false,
                status: `Claude API connection failed: ${response.status}`,
                error: error, // Add this temporarily for debugging
                timestamp: new Date().toISOString()
            });
        }

    } catch (error) {
        console.error('Status check error:', error.message, error.stack);
        
        return res.status(200).json({
            apiEnabled: false,
            status: 'Unable to connect to Claude API',
            error: error.message, // Add this temporarily for debugging
            timestamp: new Date().toISOString()
        });
    }
}
