import React, { useState } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

const QUIZ_QUESTIONS = [
  {
    question: "What is the primary function of your new space?",
    options: ["Entertaining Guests", "Quiet Family Sanctuary", "Work From Home Hub", "Luxury Showpiece"]
  },
  {
    question: "Which material palette speaks to your aesthetic?",
    options: ["Italian Marble & Brass", "Warm Teak & Linen", "Industrial Concrete & Steel", "Minimalist Quartz & Glass"]
  },
  {
    question: "What is your target timeline for handover?",
    options: ["Immediate (45 Days)", "Standard (90 Days)", "Bespoke (120+ Days)"]
  }
];

const InteractiveQuiz: React.FC = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (option: string) => {
    setAnswers([...answers, option]);
    if (step < QUIZ_QUESTIONS.length) {
      setStep(step + 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    await fetch("https://formsubmit.co/ajax/ksdesignstudiopune@gmail.com", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        _honey: "",
        _captcha: "false",
        _subject: "New Interactive Quiz Lead",
        email,
        function: answers[0],
        aesthetic: answers[1],
        timeline: answers[2]
      })
    });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-charcoal text-white p-10 rounded-[3rem] text-center space-y-6">
        <CheckCircle2 size={48} className="text-brass mx-auto" />
        <h3 className="text-3xl ">Design DNA Captured</h3>
        <p className="text-white/60">Our principal architect is reviewing your aesthetic profile. We will email your custom moodboard shortly.</p>
      </div>
    );
  }

  return (
    <div className="bg-stone-50 p-10 rounded-[3rem] border border-stone-200">
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h3 className="text-3xl  text-charcoal mb-2">Discover Your Design DNA</h3>
          <p className="text-charcoal/50 text-sm">Take our 3-step architectural quiz.</p>
        </div>
        <div className="text-[10px] font-black uppercase tracking-[0.3em] text-brass">
          Step {step < QUIZ_QUESTIONS.length ? step + 1 : 3} of 3
        </div>
      </div>

      {step < QUIZ_QUESTIONS.length ? (
        <div className="space-y-6 animate-fade-in">
          <h4 className="text-xl font-medium text-charcoal">{QUIZ_QUESTIONS[step].question}</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {QUIZ_QUESTIONS[step].options.map((opt) => (
              <button
                key={opt}
                onClick={() => handleSelect(opt)}
                className="p-6 text-left border border-stone-200 rounded-2xl hover:border-brass hover:bg-white transition-all group"
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium text-stone-600 group-hover:text-charcoal">{opt}</span>
                  <ArrowRight size={16} className="text-stone-300 group-hover:text-brass" />
                </div>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in">
          <h4 className="text-xl font-medium text-charcoal">Your profile is ready. Where should we send the moodboard?</h4>
          <input
            type="email"
            required
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-6 bg-white border border-stone-200 rounded-2xl outline-none focus:border-brass"
          />
          <button type="submit" className="w-full p-6 bg-charcoal text-white rounded-2xl font-bold uppercase tracking-widest hover:bg-brass transition-colors">
            Reveal My Design DNA
          </button>
        </form>
      )}
    </div>
  );
};

export default InteractiveQuiz;
