import { useLocation, useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Copy, Check, ArrowLeft, Twitter, Heart, Repeat2, Share, BarChart2 } from "lucide-react";
import { useState } from "react";
import type { GenerateResult } from "@/lib/api";

const styleHandles: Record<string, string> = {
  conversational: "💬 Conversational",
  promotional: "📢 Promotional",
  witty: "😏 Witty",
  informative: "💡 Informative",
};

function getRandomTime() {
  const hours = Math.floor(Math.random() * 12) + 1;
  const mins = Math.floor(Math.random() * 60);
  const ampm = Math.random() > 0.5 ? "AM" : "PM";
  return `${hours}:${mins.toString().padStart(2, "0")} ${ampm}`;
}

function getRandomStats() {
  return {
    replies: Math.floor(Math.random() * 50) + 1,
    retweets: Math.floor(Math.random() * 200) + 5,
    likes: Math.floor(Math.random() * 800) + 10,
    views: `${(Math.random() * 50 + 1).toFixed(1)}K`,
  };
}

function TweetCard({ text, style, index, brandName }: { text: string; style: string; index: number; brandName: string }) {
  const [copied, setCopied] = useState(false);
  const [liked, setLiked] = useState(false);
  const stats = useState(() => getRandomStats())[0];
  const time = useState(() => getRandomTime())[0];
  const initials = brandName.slice(0, 2).toUpperCase();

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="border border-border rounded-2xl bg-card p-4 hover:bg-muted/30 transition-colors fade-in"
      style={{ animationDelay: `${index * 60}ms`, animationFillMode: "backwards" }}
    >
      {/* Tweet header */}
      <div className="flex gap-3">
        <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
          <span className="text-xs font-bold text-primary-foreground">{initials}</span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="text-sm font-bold text-foreground">{brandName}</span>
            <svg className="h-4 w-4 text-primary" viewBox="0 0 22 22" fill="currentColor">
              <path d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.69-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.636.433 1.221.878 1.69.47.446 1.055.752 1.69.883.635.13 1.294.083 1.902-.141.27.587.7 1.086 1.24 1.44.54.354 1.167.551 1.813.568.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.222 1.26.271 1.893.14.634-.131 1.22-.437 1.69-.882.445-.47.749-1.055.878-1.691.13-.634.08-1.29-.144-1.896.587-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z" />
            </svg>
            <span className="text-sm text-muted-foreground">@{brandName.toLowerCase().replace(/\s+/g, "")}</span>
            <span className="text-sm text-muted-foreground">·</span>
            <span className="text-sm text-muted-foreground">{time}</span>
          </div>

          {/* Tweet text */}
          <p className="text-[15px] text-foreground leading-relaxed mt-1">{text}</p>

          {/* Style badge */}
          <div className="mt-2">
            <span className="text-xs text-muted-foreground">{styleHandles[style] || style}</span>
          </div>

          {/* Tweet actions */}
          <div className="flex items-center justify-between mt-3 max-w-[420px]">
            <button className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors group">
              <div className="p-1.5 rounded-full group-hover:bg-primary/10 transition-colors">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M1.751 10c.118-3.87 3.37-7 7.249-7 3.03 0 5.592 1.86 6.67 4.5h2.08c4.01 0 7.25 3.24 7.25 7.25s-3.24 7.25-7.25 7.25H8.5c-4.14 0-7.5-3.36-7.5-7.5 0-.61.07-1.2.21-1.77" strokeLinecap="round" /></svg>
              </div>
              <span className="text-xs">{stats.replies}</span>
            </button>
            <button className="flex items-center gap-1.5 text-muted-foreground hover:text-emerald-500 transition-colors group">
              <div className="p-1.5 rounded-full group-hover:bg-emerald-500/10 transition-colors">
                <Repeat2 className="h-4 w-4" />
              </div>
              <span className="text-xs">{stats.retweets}</span>
            </button>
            <button
              onClick={() => setLiked(!liked)}
              className={`flex items-center gap-1.5 transition-colors group ${liked ? "text-pink-500" : "text-muted-foreground hover:text-pink-500"}`}
            >
              <div className="p-1.5 rounded-full group-hover:bg-pink-500/10 transition-colors">
                <Heart className={`h-4 w-4 ${liked ? "fill-current" : ""}`} />
              </div>
              <span className="text-xs">{liked ? stats.likes + 1 : stats.likes}</span>
            </button>
            <button className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors group">
              <div className="p-1.5 rounded-full group-hover:bg-primary/10 transition-colors">
                <BarChart2 className="h-4 w-4" />
              </div>
              <span className="text-xs">{stats.views}</span>
            </button>
            <button
              onClick={handleCopy}
              className="text-muted-foreground hover:text-primary transition-colors group"
              title="Copy tweet"
            >
              <div className="p-1.5 rounded-full group-hover:bg-primary/10 transition-colors">
                {copied ? <Check className="h-4 w-4 text-primary" /> : <Share className="h-4 w-4" />}
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as { result: GenerateResult; brandName: string } | null;

  if (!state) {
    navigate("/");
    return null;
  }

  const { result, brandName } = state;
  const { voiceSummary, tweets } = result;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="w-full max-w-[1440px] mx-auto px-12 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => navigate("/")} className="gap-1.5 text-muted-foreground hover:text-foreground -ml-2">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <div className="h-5 w-px bg-border" />
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-md bg-primary flex items-center justify-center">
                <Twitter className="h-3.5 w-3.5 text-primary-foreground" />
              </div>
              <span className="font-semibold text-foreground">Results for <span className="text-primary">{brandName}</span></span>
            </div>
          </div>
          <Button size="sm" onClick={() => navigate("/")}>Generate New</Button>
        </div>
      </header>

      {/* Content — fixed two-column desktop layout */}
      <div className="flex-1 w-full max-w-[1440px] mx-auto px-12 py-10">
        <div className="grid grid-cols-12 gap-10">

          {/* Left — Brand Voice (4 cols) */}
          <aside className="col-span-4">
            <div className="sticky top-10 space-y-6">
              <h2 className="text-lg font-semibold text-foreground">Brand Voice</h2>

              <div className="bg-card border border-border rounded-xl p-6 space-y-5">
                <InfoRow label="Tone" value={voiceSummary.tone} />
                <InfoRow label="Style" value={voiceSummary.communicationStyle} />
                <InfoRow label="Target Audience" value={voiceSummary.targetAudience} />
                <InfoRow label="Emoji Usage" value={voiceSummary.emojiStyle} />

                <div className="pt-4 border-t border-border">
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Themes</span>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {voiceSummary.contentThemes.map((theme) => (
                      <Badge key={theme} variant="secondary" className="text-xs font-normal">{theme}</Badge>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Keywords</span>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {voiceSummary.keywords.map((kw) => (
                      <Badge key={kw} variant="outline" className="text-xs font-normal text-primary border-primary/30">{kw}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Right — Tweets (8 cols) */}
          <section className="col-span-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-foreground">Generated Tweets</h2>
              <span className="text-sm text-muted-foreground">{tweets.length} tweets</span>
            </div>
            <div className="space-y-3">
              {tweets.map((tweet, i) => (
                <TweetCard key={i} text={tweet.text} style={tweet.style} index={i} brandName={brandName} />
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{label}</span>
      <p className="text-sm text-foreground mt-1 leading-relaxed">{value}</p>
    </div>
  );
}

export default Results;
