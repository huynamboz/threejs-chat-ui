import { useRef, useState } from "react";
import {
  Camera,
  CameraOff,
  Download,
  Sparkles,
  Settings,
  User,
} from "lucide-react";

export function Avatars() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showTokenInput, setShowTokenInput] = useState(false);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: "user",
        },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCameraOn(true);
      }
    } catch (err) {
      alert("Cannot open camera: " + (err as Error).message);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
      setIsCameraOn(false);
    }
  };

  const capture = () => {
    if (videoRef.current && canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      if (ctx) {
        ctx.drawImage(
          videoRef.current,
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height
        );
        const dataUrl = canvasRef.current.toDataURL("image/jpeg", 0.9);
        setPreview(dataUrl);
      }
    }
  };

  const sendToAPI = async () => {
    if (!preview) {
      alert("Please take a photo first!");
      return;
    }

    setIsLoading(true);
    try {
      const blob = await (await fetch(preview)).blob();
      const formData = new FormData();
      formData.append("image", blob, "capture.jpg");

      const res = await fetch(`${import.meta.env.VITE_API_URL}/edit-image`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      setResult(data.image);
    } catch (error) {
      alert("Error sending image: " + (error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  const downloadImage = (imageSrc: string, filename: string) => {
    const link = document.createElement("a");
    link.href = imageSrc;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-5 mx-auto bg-gray-900 min-h-lvh">

      <div className="grid grid-cols-1 gap-8">
        {/* Camera Section */}
        <div className="flex gap-5">
          <div className="flex flex-col flex-1 p-6 border bg-white/10 backdrop-blur-md rounded-xl border-white/20">
            <div className="flex items-center justify-between mb-4">
              <h2 className="flex items-center gap-2 text-xl font-semibold text-white">
                <Camera className="w-5 h-5" />
                Camera
              </h2>
              <button
                onClick={() => setShowTokenInput(!showTokenInput)}
                className="p-2 text-gray-400 transition-colors hover:text-white"
              >
                <Settings className="w-5 h-5" />
              </button>
            </div>

            {/* Video Preview */}
            <div className="relative flex-auto mb-4 overflow-hidden bg-black rounded-lg">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="object-cover w-full h-full"
              />
              {!isCameraOn && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-900/80">
                  <div className="text-center text-gray-400">
                    <CameraOff className="w-12 h-12 mx-auto mb-2" />
                    <p>Camera not enabled</p>
                  </div>
                </div>
              )}
            </div>

            {/* Camera Controls */}
            <div className="flex gap-3">
              {!isCameraOn ? (
                <button
                  onClick={startCamera}
                  className="flex items-center justify-center flex-1 gap-2 px-4 py-2 text-white transition-colors bg-green-600 rounded-lg hover:bg-green-700"
                >
                  <Camera className="w-4 h-4" />
                  Open Camera
                </button>
              ) : (
                <>
                  <button
                    onClick={capture}
                    className="flex items-center justify-center flex-1 gap-2 px-4 py-2 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
                  >
                    <Camera className="w-4 h-4" />
                    Take Photo
                  </button>
                  <button
                    onClick={stopCamera}
                    className="px-4 py-2 text-white transition-colors bg-red-600 rounded-lg hover:bg-red-700"
                  >
                    <CameraOff className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Preview Section */}
          <div className="flex-1 p-6 border bg-white/10 backdrop-blur-md rounded-xl border-white/20">
            <h3 className="flex items-center gap-2 mb-4 text-lg font-semibold text-white">
              <User className="w-5 h-5" />
              Captured Photo
            </h3>
            <div className="relative">
              {preview ? <img
                src={preview || ""}
                alt="Preview"
                className="w-full rounded-lg"
              /> : <div className="flex items-center justify-center h-64 rounded-lg bg-gray-800/50">
                <div className="text-center text-gray-400">
                  <Sparkles className="w-12 h-12 mx-auto mb-2" />
                  <p>
                    You must take a photo first
                  </p>
                </div>
              </div>}
              <button
                onClick={() => downloadImage(preview || "", "selfie.jpg")}
                className="absolute p-2 text-white transition-colors rounded-lg top-2 right-2 bg-black/50 hover:bg-black/70"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>
            <button
              onClick={sendToAPI}
              disabled={isLoading}
              className="flex items-center justify-center w-full gap-2 px-4 py-2 mt-4 text-white transition-colors bg-purple-600 rounded-lg hover:bg-purple-700 disabled:bg-gray-600"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white rounded-full border-t-transparent animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Create AI Avatar
                </>
              )}
            </button>
          </div>
        </div>

        {/* Result Section */}
        <div className="space-y-6">
          <div className="p-6 border bg-white/10 backdrop-blur-md rounded-xl border-white/20">
            <h3 className="flex items-center gap-2 mb-4 text-lg font-semibold text-white">
              <Sparkles className="w-5 h-5" />
              Avatar AI
            </h3>
            {result ? (
              <div className="relative">
                <img
                  src={result}
                  alt="AI Result"
                  className="object-contain w-full rounded-lg"
                />
                <button
                  onClick={() => downloadImage(result, "avatar-ai.jpg")}
                  className="absolute p-2 text-white transition-colors rounded-lg top-2 right-2 bg-black/50 hover:bg-black/70"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-center h-64 rounded-lg bg-gray-800/50">
                <div className="text-center text-gray-400">
                  <Sparkles className="w-12 h-12 mx-auto mb-2" />
                  <p>AI Avatar will appear here</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Hidden Canvas */}
      <canvas
        ref={canvasRef}
        width="640"
        height="480"
        style={{ display: "none" }}
      />
    </div>
  );
}
