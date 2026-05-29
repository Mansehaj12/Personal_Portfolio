import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Play, RotateCcw, AlertCircle } from 'lucide-react';

export default function TechTerminal() {
  const [history, setHistory] = useState([
    { text: 'SYSTEM BOOT SUCCESSFUL...', type: 'sys' },
    { text: 'Welcome to Mansehaj\'s Interactive Terminal Shell v1.4.2', type: 'sys' },
    { text: 'Type "help" to view list of available commands.', type: 'sys' },
    { text: '', type: 'input' }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isTraining, setIsTraining] = useState(false);
  const terminalEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommandSubmit = (e) => {
    e.preventDefault();
    if (isTraining) return;

    const command = inputVal.trim();
    if (!command) return;

    // Append command to history
    const newHistory = [...history];
    // Set the text of the last item (which was the input line)
    newHistory[newHistory.length - 1] = { text: `$ ${command}`, type: 'input' };

    const lower = command.toLowerCase();
    let reply = [];

    switch (lower) {
      case 'help':
        reply = [
          { text: 'Available Commands:', type: 'sys' },
          { text: '  about      - Display background summary', type: 'text' },
          { text: '  skills     - List technical skill arrays', type: 'text' },
          { text: '  projects   - Show catalog of major projects', type: 'text' },
          { text: '  kaggle     - Display Kaggle ranking metrics', type: 'text' },
          { text: '  train      - Execute mock model training simulation', type: 'text' },
          { text: '  clear      - Wipe terminal history logs', type: 'text' },
          { text: '  help       - Show this utility directory', type: 'text' }
        ];
        break;
      case 'about':
        reply = [
          { text: 'STUDENT PATHWAY:', type: 'sys' },
          { text: '  Mansehaj Preet Singh is a Computer Engineering undergraduate student', type: 'text' },
          { text: '  at TIET (2023-2027) with deep focus on software quality testing,', type: 'text' },
          { text: '  predictive modeling pipelines, and full-stack API integrations.', type: 'text' }
        ];
        break;
      case 'skills':
        reply = [
          { text: 'CORE SKILLS STACK:', type: 'sys' },
          { text: '  Languages  :: Python, JavaScript, C/C++, SQL, R, Java', type: 'text' },
          { text: '  ML / AI    :: Pandas, NumPy, Scikit-learn, PyTorch, EDA', type: 'text' },
          { text: '  Backend    :: Flask, FastAPI, Node.js, Express, REST APIs', type: 'text' },
          { text: '  Frontend   :: Next.js, React, Tailwind, Recharts', type: 'text' },
          { text: '  Databases  :: MySQL, PostgreSQL, MongoDB', type: 'text' }
        ];
        break;
      case 'projects':
        reply = [
          { text: 'ENGINEERING CATALOG:', type: 'sys' },
          { text: '  1. PowerMRO - Equipment Health Telemetry (Next.js/TypeScript/Recharts)', type: 'text' },
          { text: '  2. GameIQ   - Player Retention ML Pipeline (Python/Flask/RandomForest)', type: 'text' },
          { text: '  3. Weather  - Asynchronous Location Tracker (Vanilla JS/APIs)', type: 'text' }
        ];
        break;
      case 'kaggle':
        reply = [
          { text: 'KAGGLE STANDING:', type: 'sys' },
          { text: '  Rank       :: Kaggle Expert', type: 'text' },
          { text: '  Progress   :: 80%+ towards Kaggle Master (Datasets & Notebooks)', type: 'text' },
          { text: '  Activities :: Formulating prediction pipelines and cross-validating models.', type: 'text' }
        ];
        break;
      case 'train':
        setInputVal('');
        triggerTrainingSimulation(newHistory);
        return;
      case 'clear':
        setHistory([{ text: 'SYSTEM BOOT SUCCESSFUL...', type: 'sys' }, { text: '', type: 'input' }]);
        setInputVal('');
        return;
      default:
        reply = [
          { text: `bash: command not found: ${command}. Type "help" for a list of commands.`, type: 'err' }
        ];
    }

    setHistory([...newHistory, ...reply, { text: '', type: 'input' }]);
    setInputVal('');
  };

  const triggerTrainingSimulation = (currentHistory) => {
    setIsTraining(true);
    let updatedHistory = [
      ...currentHistory,
      { text: 'Initializing neural network training simulation...', type: 'sys' },
      { text: 'Loading player behavior dataset (90k records)...', type: 'text' },
      { text: 'Configuring RandomForestClassifier hyper-parameters...', type: 'text' },
      { text: 'Epoch 1/5 - Loss: 0.7482 - Accuracy: 64.2%', type: 'text' }
    ];
    setHistory(updatedHistory);

    let epoch = 1;
    const interval = setInterval(() => {
      epoch++;
      if (epoch <= 5) {
        const loss = (0.7482 - (epoch - 1) * 0.165 - Math.random() * 0.05).toFixed(4);
        const accuracy = (64.2 + (epoch - 1) * 7.5 + Math.random() * 2).toFixed(1);
        updatedHistory = [
          ...updatedHistory,
          { text: `Epoch ${epoch}/5 - Loss: ${loss} - Accuracy: ${accuracy}%`, type: 'text' }
        ];
        setHistory(updatedHistory);
      } else {
        clearInterval(interval);
        updatedHistory = [
          ...updatedHistory,
          { text: 'Training completed successfully! Running cross-validation...', type: 'sys' },
          { text: 'Test Accuracy   :: 86.8%', type: 'success' },
          { text: 'F1-Score        :: 0.852', type: 'success' },
          { text: 'ROC-AUC Curve   :: 0.912', type: 'success' },
          { text: 'Model exported successfully (model.pkl).', type: 'success' },
          { text: '', type: 'input' }
        ];
        setHistory(updatedHistory);
        setIsTraining(false);
      }
    }, 800);
  };

  const focusInput = () => {
    inputRef.current?.focus();
  };

  return (
    <div 
      onClick={focusInput}
      className="w-full rounded-xl border border-slate-700 bg-slate-950 font-mono text-xs text-green-400 p-4 shadow-2xl relative overflow-hidden flex flex-col h-[280px]"
    >
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2 select-none">
        <div className="flex items-center gap-1.5">
          <Terminal size={14} className="text-slate-400" />
          <span className="text-slate-400 font-semibold tracking-wider text-[10px] uppercase">
            Interactive ML Training Shell
          </span>
        </div>
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
        </div>
      </div>

      {/* Output Console Logs */}
      <div className="flex-1 overflow-y-auto space-y-1 mb-2 pr-2 scroll-bar">
        {history.slice(0, -1).map((line, i) => (
          <div key={i} className="leading-relaxed whitespace-pre-wrap">
            {line.type === 'sys' && <span className="text-cyan-400">{line.text}</span>}
            {line.type === 'err' && <span className="text-red-400">{line.text}</span>}
            {line.type === 'success' && <span className="text-green-300 font-semibold">{line.text}</span>}
            {line.type === 'input' && <span className="text-indigo-300 font-bold">{line.text}</span>}
            {line.type === 'text' && <span className="text-slate-300">{line.text}</span>}
          </div>
        ))}

        {/* Neural network loader if running */}
        {isTraining && (
          <div className="flex items-center gap-2 text-cyan-400">
            <span className="animate-spin text-xs">⚡</span>
            <span>Optimizing gradient descents...</span>
          </div>
        )}
        <div ref={terminalEndRef} />
      </div>

      {/* Input Shell Form */}
      <form onSubmit={handleCommandSubmit} className="flex items-center border-t border-slate-800 pt-2 select-none">
        <span className="text-indigo-400 font-bold mr-1.5">$</span>
        <input
          ref={inputRef}
          type="text"
          value={inputVal}
          onChange={e => setInputVal(e.target.value)}
          disabled={isTraining}
          placeholder={isTraining ? 'Training in progress...' : 'Type commands (help, train, skills)...'}
          className="flex-1 bg-transparent border-none outline-none focus:ring-0 text-green-400 font-mono caret-green-400"
          autoComplete="off"
        />
        {!isTraining && (
          <button
            type="button"
            onClick={() => triggerTrainingSimulation(history)}
            className="flex items-center gap-1 bg-indigo-600/30 hover:bg-indigo-600 text-indigo-300 hover:text-white px-2 py-0.5 rounded border border-indigo-500/30 text-[9px] transition-colors"
          >
            <Play size={8} /> Run Model
          </button>
        )}
      </form>
    </div>
  );
}
