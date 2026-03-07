import { useState } from "react";
import { BrandForm } from "@/components/BrandForm";
import { generateTweets, type BrandInput } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { Twitter } from "lucide-react";

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (input: BrandInput) => {
    setIsLoading(true);
    try {
      const data = await generateTweets(input);
      navigate("/results", { state: { result: data, brandName: input.brandName } });
    } catch (err) {
      toast({
        title: "Generation failed",
        description: err instanceof Error ? err.message : "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 h-14 flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
            <Twitter className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="text-base font-semibold text-foreground tracking-tight">BrandTweet Generator</span>
        </div>
      </header>

      {/* Main */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-[480px]">
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight leading-tight">
              Generate on-brand tweets
            </h1>
            <p className="mt-2 text-muted-foreground text-sm sm:text-base max-w-md mx-auto">
              AI-powered tweet generation that matches your brand voice perfectly.
            </p>
          </div>

          <div className="bg-card border border-border rounded-xl p-7 shadow-sm">
            <h2 className="text-base font-semibold text-foreground mb-5">Brand Details</h2>
            <BrandForm onSubmit={handleSubmit} isLoading={isLoading} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
