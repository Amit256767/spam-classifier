import React, { useState } from "react";
import api from "../api/axios";
import { Loader2, ShieldCheck, ShieldAlert } from "lucide-react";

const Card = () => {
  const [prediction, setPrediction] = useState("");
  const [textMsg, setTextMsg] = useState("");
  const [processing, setProcessing] = useState(false);

  const handleCheck = async () => {
    if (!textMsg.trim()) return;

    setProcessing(true);
    setPrediction("");

    try {
      const res = await api.post("/predict", {
        message: textMsg,
      });

      setPrediction(res.data.prediction);
    } catch (error) {
      console.error(error);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-secondary via-[#0d2034] to-secondary px-6 py-10">

      {/* Glow */}
      <div className="absolute w-[450px] h-[450px] bg-primary/20 blur-[180px] rounded-full"></div>

      <div className="relative z-10 w-full max-w-3xl rounded-3xl border border-primary/20 bg-secondary/90 backdrop-blur-xl shadow-[0_0_40px_rgba(0,255,255,0.12)] p-8">

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="font-tech text-5xl text-white tracking-widest">
            Spam Shield
          </h1>

          <p className="font-body text-primary mt-3 text-lg">
            AI Powered Spam Detection
          </p>
        </div>

        {/* Textarea */}
        <textarea
          rows={8}
          value={textMsg}
          onChange={(e) => setTextMsg(e.target.value)}
          placeholder="Paste your SMS, Email or Message here..."
          className="w-full rounded-2xl border border-primary/30 bg-primary/10 p-5 text-white placeholder:text-gray-400 resize-none outline-none transition duration-300 focus:border-primary focus:ring-2 focus:ring-primary/40"
        />

        {/* Counter */}
        <div className="flex justify-end mt-2">
          <p className="text-primary text-sm">
            {textMsg.length} Characters
          </p>
        </div>

        {/* Button */}
        <button
          onClick={handleCheck}
          disabled={processing}
          className="mt-6 w-full rounded-xl bg-gradient-to-r from-primary to-cyan-300 py-4 font-tech text-lg tracking-widest text-secondary transition duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(0,255,255,0.4)] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {processing ? (
            <span className="flex items-center justify-center gap-3">
              <Loader2 className="animate-spin" size={22} />
              SCANNING...
            </span>
          ) : (
            "SCAN MESSAGE"
          )}
        </button>

        {/* Result */}
        {prediction && (
          <div
            className={`mt-8 rounded-2xl border p-6 transition-all duration-300 ${
              prediction === "ham"
                ? "border-green-400 bg-green-500/10"
                : "border-red-400 bg-red-500/10"
            }`}
          >
            <div className="flex items-center gap-4">
              {prediction === "ham" ? (
                <>
                  <ShieldCheck className="text-green-400" size={45} />

                  <div>
                    <h2 className="font-tech text-2xl text-green-400">
                      TRUSTED MESSAGE
                    </h2>

                    <p className="font-body text-gray-300 mt-1">
                      This message appears to be safe and legitimate.
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <ShieldAlert className="text-red-400" size={45} />

                  <div>
                    <h2 className="font-tech text-2xl text-red-400">
                      SPAM DETECTED
                    </h2>

                    <p className="font-body text-gray-300 mt-1">
                      This message looks suspicious. Avoid interacting with unknown links or requests.
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;