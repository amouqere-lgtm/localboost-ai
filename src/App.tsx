import React, { useState } from "react";

export default function App() {
  const [activeTab, setActiveTab] = useState("landing");
  const [businessName, setBusinessName] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedOutput, setGeneratedOutput] = useState<any>(null);

  const [reviewsCount, setReviewsCount] = useState(15);
  const [avgBasket, setAvgBasket] = useState(150);
  const estimatedRevenue = Math.round(reviewsCount * avgBasket * 0.4);

  const API_KEY = "AIzaSyBVP_m1d8wdpSuKPBDgN9idf6CeRxqtvO8";

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessName) return;
    setIsGenerating(true);

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `Tu es un expert en marketing local. Génère une réponse courte structurée en français pour l'établissement "${businessName}". 
Fournis :
1. Un titre d'offre accrocheur.
2. Un script court pour Reel/TikTok (15 secondes).
3. Une formule d'accroche pour landing page.`
                  }
                ]
              }
            ]
          })
        }
      );

      const data = await response.json();
      const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text || "Erreur de génération";

      setGeneratedOutput({
        title: `Résultat IA - ${businessName}`,
        script: aiText,
        landingHeadline: `Bienvenue chez ${businessName}`,
        socialPost: `Découvrez nos nouveautés chez ${businessName} !`
      });
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la connexion à l'IA.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500 selection:text-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/80 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-emerald-400 flex items-center justify-center font-black text-white text-lg shadow-lg shadow-indigo-500/20">
              ⚡
            </div>
            <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              LocalBoost <span className="text-indigo-400">AI</span>
            </span>
          </div>

          <div className="flex items-center gap-2 bg-slate-900/90 p-1.5 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveTab("landing")}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === "landing"
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Landing Page
            </button>
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === "dashboard"
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              App Dashboard
            </button>
          </div>
        </div>
      </nav>

      {activeTab === "landing" ? (
        <main className="space-y-24 pb-20">
          {/* Hero Section */}
          <section className="pt-16 sm:pt-24 px-4 max-w-5xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-medium">
              <span>✨ Agent Autonome d'Acquisition Locale</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Transformez vos avis clients et vos opportunités en{" "}
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent">
                clients locaux fidèles
              </span>.
            </h1>

            <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
              L'agent IA autonome pensé pour les agences immobilières et commerces locaux. Générez des landing pages haute conversion et des scripts Reels/TikTok en 1 clic.
            </p>

            {/* Démo Interactive */}
            <div className="max-w-2xl mx-auto bg-slate-900/90 border border-slate-800 rounded-2xl p-6 text-left space-y-4 shadow-2xl">
              <form onSubmit={handleGenerate} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Nom de votre établissement ou agence
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Ex: Agence Immo Breteuil"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                    />
                    <button
                      type="submit"
                      disabled={isGenerating}
                      className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium px-5 py-2.5 rounded-xl text-sm transition-all shadow-lg shadow-indigo-600/30 disabled:opacity-50"
                    >
                      {isGenerating ? "IA en réflexion..." : "Tester l'IA ⚡"}
                    </button>
                  </div>
                </div>
              </form>

              {generatedOutput && (
                <div className="p-4 bg-slate-950/80 rounded-xl border border-indigo-500/30 space-y-3">
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Résultat IA Généré par Gemini</span>
                  <h4 className="font-bold text-white text-sm">{generatedOutput.title}</h4>
                  <pre className="text-xs text-slate-300 whitespace-pre-wrap font-sans bg-slate-900 p-3 rounded-lg border border-slate-800">
                    {generatedOutput.script}
                  </pre>
                </div>
              )}
            </div>
          </section>

          {/* Calculateur de ROI */}
          <section className="max-w-4xl mx-auto px-4">
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
              <h2 className="text-2xl font-bold text-center text-white">Calculateur d'Impact Mensuel</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs font-medium text-slate-400">Nouveaux Avis / Biens par mois: {reviewsCount}</label>
                  <input
                    type="range"
                    min="5"
                    max="50"
                    value={reviewsCount}
                    onChange={(e) => setReviewsCount(Number(e.target.value))}
                    className="w-full mt-2 accent-indigo-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-400">Valeur moyenne d'un client (€): {avgBasket} €</label>
                  <input
                    type="range"
                    min="50"
                    max="1000"
                    step="50"
                    value={avgBasket}
                    onChange={(e) => setAvgBasket(Number(e.target.value))}
                    className="w-full mt-2 accent-indigo-500"
                  />
                </div>
              </div>

              <div className="p-4 bg-indigo-950/40 border border-indigo-500/20 rounded-xl text-center space-y-1">
                <span className="text-xs text-indigo-300">Estimation du chiffre d'affaires additionnel / mois</span>
                <div className="text-3xl font-extrabold text-emerald-400">+{estimatedRevenue.toLocaleString()} € / mois</div>
              </div>
            </div>
          </section>

          {/* Pricing */}
          <section className="max-w-5xl mx-auto px-4 space-y-8">
            <div className="text-center space-y-3">
              <h2 className="text-3xl font-bold text-white">Tarifs Simples & Transparent</h2>
              <p className="text-slate-400 text-sm">Rentabilisé dès le premier client généré par l'IA.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { name: "Starter", price: "29€", desc: "Pour les indépendants", features: ["1 Établissement", "15 générations IA / mois", "Landing Pages Illimitées"] },
                { name: "Pro", price: "69€", desc: "Pour les agences actives", features: ["3 Établissements", "Générations IA Illimitées", "Scripts Reels & TikTok", "Support Prioritaire"], popular: true },
                { name: "Réseau", price: "149€", desc: "Pour les franchises & groupes", features: ["Multi-comptes illimités", "API & Automatisations", "Account Manager Dédié"] }
              ].map((tier, idx) => (
                <div key={idx} className={`bg-slate-900/80 border p-6 rounded-2xl flex flex-col justify-between space-y-6 ${tier.popular ? "border-indigo-500 shadow-xl shadow-indigo-500/10" : "border-slate-800"}`}>
                  <div className="space-y-4">
                    {tier.popular && <span className="bg-indigo-600 text-white text-[10px] font-bold uppercase px-2.5 py-1 rounded-full">Plus Populaire</span>}
                    <h3 className="text-lg font-bold text-white">{tier.name}</h3>
                    <div className="text-3xl font-extrabold text-white">{tier.price} <span className="text-xs font-normal text-slate-400">/mois</span></div>
                    <p className="text-xs text-slate-400">{tier.desc}</p>
                    <ul className="space-y-2 text-xs text-slate-300">
                      {tier.features.map((f, i) => (
                        <li key={i} className="flex items-center gap-2">✓ {f}</li>
                      ))}
                    </ul>
                  </div>
                  <a 
  href={
    tier.name === "Starter" 
      ? "https://buy.stripe.com/test_28E4gzav2fPb0jv4NtbjW00" 
      : tier.name === "Pro" 
      ? "https://buy.stripe.com/test_6oU3cvcDabyV0jv4NtbjW01" 
      : "https://buy.stripe.com/test_28E6oH1YwbyV6HTfs7bjW02"
  } 
  target="_blank" 
  rel="noopener noreferrer" 
  className="w-full text-center block py-2.5 rounded-xl text-xs font-semibold transition-all bg-indigo-600 hover:bg-indigo-500 text-white"
>
  Commencer l'essai gratuit
</a>
                </div>
              ))}
            </div>
          </section>
        </main>
      ) : (
        /* Dashboard App View */
        <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-4">
            <div className="font-bold text-sm text-slate-200">Agence Immo Breteuil</div>
            <div className="text-xs text-emerald-400 font-medium">● Statut : Plan Pro Actif</div>
            <hr className="border-slate-800" />
            <nav className="space-y-1 text-xs text-slate-400">
              <div className="px-3 py-2 bg-indigo-600/10 text-indigo-400 font-semibold rounded-lg">📊 Vue d'ensemble</div>
              <div className="px-3 py-2 hover:bg-slate-800 rounded-lg cursor-pointer">📄 Landing Pages</div>
              <div className="px-3 py-2 hover:bg-slate-800 rounded-lg cursor-pointer">🎬 Studio Reels / TikTok</div>
              <div className="px-3 py-2 hover:bg-slate-800 rounded-lg cursor-pointer">⚙️ Paramètres</div>
            </nav>
          </div>

          <div className="md:col-span-3 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { title: "Landing Pages Actives", val: "12" },
                { title: "Leads Générés ce mois", val: "48" },
                { title: "Scripts Reels Validés", val: "19" }
              ].map((card, i) => (
                <div key={i} className="bg-slate-900/80 border border-slate-800 p-4 rounded-xl space-y-1">
                  <div className="text-xs text-slate-400">{card.title}</div>
                  <div className="text-2xl font-bold text-white">{card.val}</div>
                </div>
              ))}
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-6 space-y-4">
              <h3 className="font-bold text-white text-sm">Dernières Contenus Générés par l'IA</h3>
              <div className="space-y-3">
                {[
                  { name: "Appartement 3 Pièces - Vue Parc", type: "Landing Page", status: "Publié" },
                  { name: "Avis Client 5⭐ - M. Dupont", type: "Script Reel TikTok", status: "En attente" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-slate-950 rounded-lg border border-slate-800 text-xs">
                    <div>
                      <div className="font-medium text-white">{item.name}</div>
                      <div className="text-slate-500">{item.type}</div>
                    </div>
                    <span className={`px-2 py-1 rounded text-[10px] font-semibold ${item.status === "Publié" ? "bg-emerald-500/10 text-emerald-400" : "bg-amber-500/10 text-amber-400"}`}>
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}