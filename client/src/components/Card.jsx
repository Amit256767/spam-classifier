import { useState } from "react";
import api from "../api/axios";
import { AlertTriangle, ArrowUpRight, CheckCircle2, LoaderCircle, Shield, Sparkles, X } from "lucide-react";

const Card = () => {
  const [prediction, setPrediction] = useState("");
  const [textMsg, setTextMsg] = useState("");
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");
  const isHam = prediction.toLowerCase() === "ham";

  const handleCheck = async () => {
    if (!textMsg.trim() || processing) return;

    setProcessing(true);
    setPrediction("");
    setError("");

    try {
      const res = await api.post("/predict", {
        message: textMsg,
      });

      setPrediction(res.data.prediction || "");
    } catch (requestError) {
      console.error(requestError);
      setError("We could not reach the analysis service. Please check your connection and try again.");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <section className="analyzer-card" id="analyzer" aria-labelledby="analyzer-title">
      <div className="card-heading"><div className="card-icon"><Shield size={21} /></div><div><p className="section-kicker">Live analysis</p><h2 id="analyzer-title">Analyze a message</h2></div><span className="secure-pill"><span /> Secure scan</span></div>
      <label className="input-label" htmlFor="message">Message content</label>
      <div className={`message-field ${processing ? "is-scanning" : ""}`}><textarea id="message" value={textMsg} onChange={(event) => { setTextMsg(event.target.value); setError(""); }} placeholder="Paste an SMS, email, or chat message here…" rows="7" disabled={processing} aria-describedby="message-hint message-count" />{textMsg && !processing && <button className="clear-button" type="button" onClick={() => { setTextMsg(""); setPrediction(""); setError(""); }} aria-label="Clear message"><X size={16} /></button>}{processing && <div className="scanner" aria-label="Scanning message"><span /><span /><span /></div>}</div>
      <div className="field-meta"><span id="message-hint">No message is stored by this interface.</span><span id="message-count">{textMsg.length.toLocaleString()} characters</span></div>
      <button className="analyze-button" type="button" onClick={handleCheck} disabled={!textMsg.trim() || processing}>{processing ? <><LoaderCircle className="spin" size={19} /> Scanning message</> : <><Sparkles size={18} /> Analyze message <ArrowUpRight size={18} /></>}</button>
      {error && <div className="error-state" role="alert"><AlertTriangle size={20} /><div><strong>Analysis unavailable</strong><p>{error}</p></div></div>}
      {prediction && <div className={`result-card ${isHam ? "result-safe" : "result-threat"}`} role="status" aria-live="polite"><div className="result-icon">{isHam ? <CheckCircle2 size={27} /> : <AlertTriangle size={27} />}</div><div className="result-copy"><p>Classification result</p><h3>{isHam ? "Safe message" : "Potential threat"}</h3><span className="verdict-badge">{isHam ? "HAM / LEGITIMATE" : "SPAM / SUSPICIOUS"}</span></div><p className="result-explanation">{isHam ? "This message appears consistent with legitimate communication." : "This message contains patterns associated with unwanted or suspicious content. Avoid unknown links and requests."}</p></div>}
    </section>
  );
};

export default Card;
