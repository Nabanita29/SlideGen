"use client"; // This directive ensures that the component is treated as a client-side component

import { Loader2, VideoIcon } from "lucide-react";
import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import MaxWidthWrapper from "./common/MaxWidthWrapper";
import { Card } from "./ui/card";
import { CreatePowerpoint } from "@/app/generate/actions";
// import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

export default function GenerateFrom() {
  // const { toast } = useToast();
  // const router = useRouter();
  // Initializing four state variables in a React component using useState hook
  // url: Stores a URL (or an empty value at first), isValid: Tracks whether the URL is valid or not
  // error: Holds any error message (if there is one).
  const [url, setUrl] = useState<string | null>(""); // URL input
  const [isValid, setIsValid] = useState<boolean>(false); // Validity status
  const [error, setError] = useState<string | null>(null); // Error message
  const [isLoading, setIsLoading] = useState<boolean>(false); // Loading state

  // This function validates a YouTube URL using a regular expression pattern
  const validateYouTubeUrl = (url: string) => {
    const pattern =
      /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    return pattern.test(url);
  };

  // This function extracts the video ID from a YouTube URL using a regular expression
  // It returns the video ID if found, or null otherwise.
  const getVideoID = (url: string) => {
    const match = url.match(
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    );
    return match ? match[1] : null;
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // This function handles the URL input change event
    const newUrl = e.target.value.trim();
    setUrl(newUrl);

    if (!newUrl) {
      setError(null);
      setIsValid(false);
      return;
    }

    const videoID = getVideoID(newUrl);
    if (validateYouTubeUrl(newUrl) && videoID) {
      setError(null);
      setIsValid(true);
    } else {
      setError("Invalid YouTube Video");
      setIsValid(false);
    }
  };

  // This function handles the "Create presentation" button click event
  const handleGenerate = async() => {
    if (!url) {
      setError("Please Enter a Valid YouTube URL");
      return;
    }
    
    if(!isValid){ 
      setError("Invalid YouTube Video");
      return;
    }

    setError(null);
    
    const videoID = getVideoID(url || "");
    if (!videoID) {
      setError("Invalid YouTube Video");
      return;
    }

    setIsLoading(true);

    try{
      await CreatePowerPoint();
    }
    catch(error){
      console.error(error);
    }
  
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-violet-100 py-12">
      <MaxWidthWrapper>
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
            Create beautiful Presentations
            <span className="block text-lg font-normal text-gray-600">
              Transform any video into Professional PowerPoint with SlideGen
            </span>
          </h1>
          <Card className="p-8 shadow-xl bg-white/80 backdrop-blur-sm border-0">
          {isValid ? (
            // This block renders a video iframe when the URL is valid.
            <div className="mb-8 aspect-video rounded-xl overflow-hidden shadow-lg">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${getVideoID(url || "")}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="YouTube video player"
              />
            </div>
          ) : (
            // This block provides a placeholder UI when the URL is invalid or not provided.
            <div className="mb-8 aspect-video bg-gradient-to-br from-slate-100 to-slate-50 rounded-xl flex flex-col items-center justify-center text-slate-500 shadow-inner">
              <VideoIcon className="w-16 h-16 mb-4 text-slate-500" />
              <p>Enter a YouTube URL to get started.</p>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3">
            <Input
              type="url"
              placeholder="Enter YouTube URL"
              value={url || ""}
              onChange={handleUrlChange}
              className="flex-1 h-12 px-4 rounded-xl border-slate-200 focus:border-violet-500 focus:ring-violet-500"
              disabled={isLoading}
              aria-label="YouTube URL"
            />

            <Button
              disabled={!isValid || isLoading}
              className="h-12 px-6"
              onClick={handleGenerate}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Creating a presentation
                </>
              ) : (
                "Create presentation"
              )}
            </Button>
          </div>
          <p className="text-center text-sm text-slate-500 mt-4">
            Supported formats: YouTube video URLs (e.g.,
            https://youtube.com/watch?v=...)
          </p>
          </Card>
        </div>
      </MaxWidthWrapper>
    </div>
  );
}

