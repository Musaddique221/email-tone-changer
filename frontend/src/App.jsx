import { useState } from "react";

function App() {
  const [text, setText] = useState("");
  const [tone, setTone] = useState("Professional");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  const tones = [
    "Professional",
    "Formal",
    "Casual",
    "Friendly",
    "Polite",
    "Humble",
    "Confident",
    "Assertive",
    "Direct",
    "Serious",
    "Urgent",
    "Apologetic",
    "Grateful",
    "Empathetic",
    "Supportive",
    "Excited",
    "Diplomatic",
    "Convincing",
    "Motivational",
    "Respectful",
  ];

  const BASE_URL = "https://email-tone-changer-1.onrender.com"
  // const BASE_URL = "http://localhost:8000"
 const handleSubmit = async () => {
  setError("");

  if (!text.trim()) {
    setError("Please describe what email you want to write!");
    return;
  }

  setLoading(true);
  try {
    const response = await fetch(`${BASE_URL}/change-tone`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, tone }),
    });
    const data = await response.json();
    if (data.error) {
      setError(data.error);
      setResult("");
    } else {
      setResult(data.rewritten_text);
    }
  } catch (error) {
    setError("Something went wrong. Please try again!");
    console.error(error);
  } finally {
    setLoading(false);
  }
};

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center p-4">

      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-2xl">
        {error && (
          <p className="text-red-500 text-sm mt-1 mb-3 text-center font-bold" >
            ⚠️ {error}
          </p>
        )}
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
          ✉️ AI Email Writer
        </h1>
        <p className="text-center text-gray-500 mb-6">
          Describe your email and AI will write it for you
        </p>

        <textarea
          className="w-full border border-gray-300 rounded-xl p-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4 resize-none"
          rows={4}
          placeholder="e.g. Write a leave request for 3 days, or an appraisal request, or a meeting appointment..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <p className="text-sm font-medium text-gray-600 mb-2">Select Tone:</p>
        <div className="flex gap-2 mb-6 flex-wrap">
          {tones.map((t) => (
            <button
              key={t}
              onClick={() => setTone(t)}
              className={`px-4 py-2 rounded-full capitalize font-medium transition-all ${tone === t
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                }`}
            >
              {t}
            </button>
          ))}
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-xl transition-all disabled:opacity-50"
        >
          {loading ? "Writing Email..." : "✨ Generate Email"}
        </button>

        {result && (
          <div className="mt-6 bg-gray-50 border border-gray-200 rounded-xl p-4">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-semibold text-gray-700">
                Generated Email:
              </h2>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1 text-sm px-3 py-1 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-600 transition-all"
              >
                {copied ? "✅ Copied!" : "📋 Copy"}
              </button>
            </div>
            <pre className="text-gray-600 whitespace-pre-wrap font-sans leading-relaxed">
              {result}
            </pre>
          </div>
        )}
      </div>

    </div>
  );
}

export default App;