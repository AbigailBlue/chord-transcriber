# 🎵 Music Transposition Tool

A professional web application that transposes songs to any key with AI-powered chord recognition and music theory insights. Perfect for musicians, music educators, and performers who need to quickly adapt songs for different instruments or vocal ranges.

![Music Transposition Tool](https://img.shields.io/badge/Status-Ready%20for%20Deployment-brightgreen)
![AI Powered](https://img.shields.io/badge/AI-Claude%20Enhanced-blue)
![Responsive](https://img.shields.io/badge/Design-Mobile%20Friendly-orange)

## ✨ Features

### 🎼 Core Functionality
- **Smart Chord Recognition**: Supports multiple formats ([C], C, Cmaj7, F#dim, C/E)
- **Auto Key Detection**: Automatically identifies the current key from chord progressions
- **Professional Transposition**: Accurate 12-tone chromatic scale calculations
- **Export Options**: Copy to clipboard, download as TXT, or print-ready format

### 🤖 AI Enhancement
- **Claude AI Integration**: Advanced chord analysis and music theory explanations
- **Alternative Key Suggestions**: AI recommends optimal keys for different instruments
- **Theory Insights**: Educational explanations of chord relationships and progressions
- **Graceful Fallback**: Works offline with basic transposition when AI unavailable

### 📱 User Experience
- **Mobile-Responsive**: Large touch targets for musicians with instruments
- **Professional Design**: Clean, readable interface optimized for performance use
- **Real-time Preview**: Live chord highlighting and instant transposition preview
- **Sample Songs**: Pre-loaded examples for testing and demonstration

## 🚀 Live Demo

Try the tool with these sample progressions:

**"Let There Be Peace on Earth" (C Major)**
```
[C]Let there be [F]peace on [G]earth
And let it be[C]gin with [Am]me[Dm]
[F]Let there be [G]peace on [Em]earth[Am]
The [F]peace that was [G]meant to [C]be
```

**"Amazing Grace" (G Major)**
```
A[G]mazing [C]grace how [G]sweet the sound
That [Em]saved a [D]wretch like [G]me
I [G]once was [C]lost but [G]now am [Em]found
Was [G]blind but [D]now I [G]see
```

## 🛠️ Technical Architecture

### Frontend
- **Single HTML File**: Embedded CSS/JavaScript for easy deployment
- **Responsive Design**: Mobile-first approach with touch-friendly controls
- **Real-time Processing**: Instant chord parsing and highlighting
- **Progressive Enhancement**: Core functionality works without AI

### Backend (Vercel Serverless)
- **API Endpoints**: `/api/status` and `/api/transpose`
- **Claude AI Integration**: Enhanced chord recognition and theory analysis
- **Error Handling**: Graceful degradation when AI services unavailable
- **Environment Variables**: Secure API key management

### Music Theory Engine
- **Chromatic Scale**: Complete 12-tone transposition support
- **Complex Chords**: 7ths, suspended, diminished, slash chords
- **Enharmonic Equivalents**: Smart handling of C# vs Db notation
- **Key Detection**: Pattern analysis for automatic key identification

## 📋 Supported Chord Formats

| Format | Example | Description |
|--------|---------|-------------|
| Bracket | `[C]`, `[Am]` | Standard lead sheet notation |
| Inline | `A[G]mazing` | Chords within lyrics |
| Complex | `Cmaj7`, `F#dim` | Extended and altered chords |
| Slash | `C/E`, `G/B` | Bass note specifications |
| Suspended | `Csus4`, `G7sus4` | Suspended chords |

## 🎯 Use Cases

### Music Educators
- Transpose songs for different student vocal ranges
- Create practice materials in multiple keys
- Demonstrate music theory concepts visually

### Performers
- Adapt songs for different instruments (guitar, ukulele, piano)
- Quick key changes for live performances
- Accommodate vocalist preferences

### Music Students
- Practice transposition skills with instant feedback
- Learn chord relationships across different keys
- Understand music theory through practical examples

## 🚀 Deployment

### Vercel Deployment (Recommended)
1. Clone this repository
2. Install Vercel CLI: `npm i -g vercel`
3. Set up environment variables:
   ```bash
   vercel env add ANTHROPIC_API_KEY
   ```
4. Deploy: `vercel --prod`

### Local Development
1. Open `music-transposer.html` in a web browser
2. For AI features, set up local API endpoints matching the Vercel pattern
3. Core transposition works immediately without backend setup

## 🔧 API Integration

### Environment Variables
```bash
ANTHROPIC_API_KEY=your_claude_api_key_here
```

### API Endpoints
- `GET /api/status` - Check AI service availability
- `POST /api/transpose` - Enhanced transposition with theory insights

## 📖 Music Theory Background

### Transposition Logic
The tool uses semitone calculations based on the chromatic scale:
```
C → C# → D → D# → E → F → F# → G → G# → A → A# → B
```

### Key Detection Algorithm
Analyzes chord frequency patterns to identify the most likely key:
- Counts root note occurrences
- Applies music theory heuristics
- Suggests probable key centers

## 🎨 Design Philosophy

### Musician-Centered Design
- **High Contrast**: Easy reading during performances
- **Large Touch Targets**: Usable with instruments in hand
- **Clean Typography**: Monospace fonts for chord alignment
- **Printable Output**: Professional sheet music appearance

### Progressive Enhancement
- Core functionality works without internet
- AI features enhance but don't replace basic transposition
- Responsive design adapts to any screen size

## 🤝 Contributing

Contributions are welcome! Areas for enhancement:

- **Additional Chord Types**: Modal interchange, jazz extensions
- **Audio Playback**: Chord progression preview
- **Sheet Music Export**: PDF with standard notation
- **Mobile App**: Native iOS/Android versions

## 📄 License

MIT License - feel free to use this tool for personal or commercial projects.

## 🙏 Acknowledgments

- Built with Claude AI for enhanced music theory analysis
- Inspired by the needs of community music educators
- Designed for real-world performance scenarios

---

**Perfect for musicians, educators, and students who need professional-quality chord transposition with the power of AI-enhanced music theory insights.**