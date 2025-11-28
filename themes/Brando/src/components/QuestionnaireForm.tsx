"use client";

import { useState } from 'react';
import { FaArrowRight, FaCheckCircle } from 'react-icons/fa';

type FormData = {
  name: string;
  currentIncome: string;
  goalIncome: string;
  investment: string;
  email: string;
  phone: string;
};

const QuestionnaireForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    currentIncome: '',
    goalIncome: '',
    investment: '',
    email: '',
    phone: '',
  });

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && step === 1) {
      e.preventDefault();
      handleNext();
    }
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/submit-questionnaire', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStep(7); // Show success message
      } else {
        alert('There was an error submitting your information. Please try again.');
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert('There was an error submitting your information. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const incomeOptions = [
    'Under $1k',
    '$1k - $2k',
    '$2k - $5k',
    '$5k - $10k',
    'Over $10k'
  ];

  const goalIncomeOptions = [
    '$2k - $5k',
    '$5k - $10k',
    '$10k - $15k',
    '$20k and above'
  ];

  const investmentOptions = [
    '$1k - $2k',
    '$2k - $3k',
    '$3k - $5k',
    '$5k - $10k',
    'Over $10k'
  ];

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 py-12">
      <div className="max-w-3xl w-full">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-500 transition-all duration-500"
              style={{ width: `${(step / 6) * 100}%` }}
            />
          </div>
          <p className="text-white/60 text-sm mt-2 text-center">
            Question {Math.min(step, 6)} of 6
          </p>
        </div>

        <div className="bg-blue-900/20 backdrop-blur-sm border-2 border-blue-500/30 rounded-2xl p-8 md:p-12">
          {/* Step 1: Welcome */}
          {step === 1 && (
            <div className="text-center space-y-6 animate-fade-in">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Are you ready to become the best known barber in your town?
              </h1>
              <p className="text-xl text-white/80 leading-relaxed">
                Fill out this quick questionnaire so I know exactly how I can help you reach 
                <span className="text-blue-400 font-bold"> $15k-$20k/mo </span>
                as a barber within the next 90 days using social media.
              </p>
              <p className="text-blue-300 text-lg">
                (also check your email after, I'm sending you something special)
              </p>
              <button
                onClick={handleNext}
                onKeyDown={handleKeyPress}
                className="group relative mt-8 px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-full text-lg transition-all duration-300 hover:scale-105 flex items-center gap-3 mx-auto">
                Continue
                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
              <p className="text-white/40 text-sm mt-4">Press ENTER or click Continue</p>
            </div>
          )}

          {/* Step 2: Name */}
          {step === 2 && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Hey! What's your name?
              </h2>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter your name..."
                className="w-full px-6 py-4 bg-white/10 border-2 border-white/20 rounded-lg text-white text-xl placeholder:text-white/40 focus:border-blue-500 focus:outline-none transition-colors"
                autoFocus
              />
              <button
                onClick={handleNext}
                disabled={!formData.name}
                className="w-full md:w-auto px-8 py-4 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold rounded-full text-lg transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3">
                Next
                <FaArrowRight />
              </button>
            </div>
          )}

          {/* Step 3: Current Income */}
          {step === 3 && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Where is your monthly income at currently? ($USD)
              </h2>
              <p className="text-red-400 text-sm">This question is required.*</p>
              <div className="space-y-3">
                {incomeOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      setFormData({ ...formData, currentIncome: option });
                      setTimeout(() => handleNext(), 300);
                    }}
                    className={`w-full px-6 py-4 rounded-lg text-left text-lg font-medium transition-all duration-300 ${
                      formData.currentIncome === option
                        ? 'bg-blue-500 text-white'
                        : 'bg-white/10 text-white hover:bg-white/20 border-2 border-white/20 hover:border-blue-500/50'
                    }`}>
                    {option}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Goal Income */}
          {step === 4 && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Where would you like to be financially in 3 months time? ($USD)
              </h2>
              <p className="text-red-400 text-sm">This question is required.*</p>
              <div className="space-y-3">
                {goalIncomeOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      setFormData({ ...formData, goalIncome: option });
                      setTimeout(() => handleNext(), 300);
                    }}
                    className={`w-full px-6 py-4 rounded-lg text-left text-lg font-medium transition-all duration-300 ${
                      formData.goalIncome === option
                        ? 'bg-blue-500 text-white'
                        : 'bg-white/10 text-white hover:bg-white/20 border-2 border-white/20 hover:border-blue-500/50'
                    }`}>
                    {option}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 5: Investment */}
          {step === 5 && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Knowing that one successful month as a barber could change your life forever, how much would you have to invest to reach this goal?
              </h2>
              <p className="text-red-400 text-sm">This question is required.*</p>
              <div className="space-y-3">
                {investmentOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      setFormData({ ...formData, investment: option });
                      setTimeout(() => handleNext(), 300);
                    }}
                    className={`w-full px-6 py-4 rounded-lg text-left text-lg font-medium transition-all duration-300 ${
                      formData.investment === option
                        ? 'bg-blue-500 text-white'
                        : 'bg-white/10 text-white hover:bg-white/20 border-2 border-white/20 hover:border-blue-500/50'
                    }`}>
                    {option}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 6: Contact Info */}
          {step === 6 && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
                Almost done! Let's get your contact information
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-white text-lg mb-2">
                    Email Address <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your@email.com"
                    className="w-full px-6 py-4 bg-white/10 border-2 border-white/20 rounded-lg text-white text-xl placeholder:text-white/40 focus:border-blue-500 focus:outline-none transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="block text-white text-lg mb-2">
                    Phone Number <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-6 py-4 bg-white/10 border-2 border-white/20 rounded-lg text-white text-xl placeholder:text-white/40 focus:border-blue-500 focus:outline-none transition-colors"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-8 py-4 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold rounded-full text-lg transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3">
                  {isSubmitting ? 'Submitting...' : 'Submit Application'}
                  {!isSubmitting && <FaArrowRight />}
                </button>
              </form>
            </div>
          )}

          {/* Step 7: Success */}
          {step === 7 && (
            <div className="text-center space-y-6 animate-fade-in">
              <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-4" />
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Thank you, {formData.name}!
              </h2>
              <p className="text-xl text-white/80">
                Your application has been submitted successfully.
              </p>
              <p className="text-blue-300 text-lg">
                Check your email for something special! We'll be in touch soon.
              </p>
              <a
                href="/"
                className="inline-block mt-6 px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-full text-lg transition-all duration-300 hover:scale-105">
                Return to Homepage
              </a>
            </div>
          )}
        </div>

        {/* Back Button */}
        {step > 1 && step < 7 && (
          <button
            onClick={() => setStep(step - 1)}
            className="mt-6 text-white/60 hover:text-white transition-colors flex items-center gap-2 mx-auto">
            ← Back
          </button>
        )}
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default QuestionnaireForm;

