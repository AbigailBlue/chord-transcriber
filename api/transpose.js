export default async function handler(req, res) {
    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { originalText, fromKey, toKey, options = {} } = req.body;

        // Validate required parameters
        if (!originalText || !toKey) {
            return res.status(400).json({ 
                error: 'Missing required parameters: originalText and toKey are required' 
            });
        }

        // Check if Claude API key is configured
        const apiKey = process.env.ANTHROPIC_API_KEY;
        
        if (!apiKey) {
            return res.status(503).json({
                error: 'Claude API not configured. Please set ANTHROPIC_API_KEY environment variable.'
            });
        }

        // Prepare the prompt for Claude
        const prompt = `You are a professional music theory assistant. Help transpose this song and provide educational insights.

SONG TO TRANSPOSE:
${originalText}

TRANSPOSITION REQUEST:
- From Key: ${fromKey || 'Auto-detect'}
- To Key: ${toKey}
- Options: ${JSON.stringify(options)}

Please provide:
1. The transposed lyrics with chords in the same format as the input
2. Music theory explanation of the transposition
3. Alternative key suggestions that might work well
4. Analysis of the chord progression and any interesting harmonic features

Format your response as JSON with these fields:
{
    "transposedText": "the transposed lyrics with new chords",
    "explanation": "brief explanation of the transposition (e.g., 'up a perfect fourth')",
    "suggestions": ["array of alternative key suggestions with reasons"],
    "chordAnalysis": "analysis of the chord progression and harmonic features"
}

Make sure to preserve the exact formatting and structure of the original lyrics, only changing the chord symbols.`;

        // Call Claude API
        const response = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': apiKey,
                'anthropic-version': '2023-06-01'
            },
            body: JSON.stringify({
                model: 'claude-3-sonnet-20240229',
                max_tokens: 2000,
                messages: [{
                    role: 'user',
                    content: prompt
                }]
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Claude API error:', errorText);
            
            return res.status(500).json({
                error: 'Failed to process transposition with Claude AI',
                details: response.status
            });
        }

        const claudeResult = await response.json();
        const aiResponse = claudeResult.content[0].text;

        // Try to parse the JSON response from Claude
        let parsedResult;
        try {
            // Extract JSON from Claude's response (it might include extra text)
            const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                parsedResult = JSON.parse(jsonMatch[0]);
            } else {
                throw new Error('No JSON found in response');
            }
        } catch (parseError) {
            console.error('Failed to parse Claude response:', parseError);
            
            // Fallback: return a basic response structure
            parsedResult = {
                transposedText: aiResponse,
                explanation: `Transposed from ${fromKey || 'detected key'} to ${toKey}`,
                suggestions: [`Try ${toKey} major for a brighter sound`],
                chordAnalysis: 'AI analysis temporarily unavailable'
            };
        }

        // Validate that we have the required transposed text
        if (!parsedResult.transposedText) {
            return res.status(500).json({
                error: 'AI failed to generate transposed text'
            });
        }

        return res.status(200).json({
            result: {
                transposedText: parsedResult.transposedText,
                explanation: parsedResult.explanation || `Transposed to ${toKey} major`,
                suggestions: parsedResult.suggestions || [],
                chordAnalysis: parsedResult.chordAnalysis || 'Chord progression analysis available'
            },
            timestamp: new Date().toISOString(),
            model: 'claude-3-sonnet-20240229'
        });

    } catch (error) {
        console.error('Transpose endpoint error:', error);
        
        return res.status(500).json({
            error: 'Internal server error during transposition',
            timestamp: new Date().toISOString()
        });
    }
}