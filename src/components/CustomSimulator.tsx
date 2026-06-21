import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Trash2, Cpu, FileSpreadsheet, Link2, Sparkles, RefreshCcw, 
  Camera, Database, AlertCircle, CheckCircle2, Terminal, ArrowRight, 
  ExternalLink, FileText, Settings, Play, CheckCircle, BarChart3, HelpCircle,
  Plus, Edit, Eye, EyeOff, Search, Calendar, Check, AlertTriangle, Shield, ArrowLeft, Clipboard
} from 'lucide-react';

export default function CustomSimulator() {
  const [activeTab, setActiveTab] = useState<'greengrid' | 'data-entry' | 'url-shortener'>('greengrid');

  // --- GreenGrid State ---
  const greenGridItems = [
    { name: 'Plastic Water Bottle', type: 'Recyclable Plastic', icon: '🥤', geminiInsight: 'PET 1 plastic. Rinse out liquid before disposal. Reclaimed fiber can be woven into polyester yarn for clothing or carpets.', carbonOffset: '1.2 kg CO₂', biodegrade: '450 Years', facility: 'Hyderabad Polymer Reclamation' },
    { name: 'Organic Banana Peel', type: 'Compostable Organic', icon: '🍌', geminiInsight: 'Rich in organic nitrogen and potassium. Perfect for anaerobic digestion or native soil enrichment. Decomposes cleanly within weeks.', carbonOffset: '0.8 kg CO₂', biodegrade: '4 Weeks', facility: 'MREC College Campus Compost Core' },
    { name: 'Broken Laptop Display', type: 'E-Waste (Hazardous)', icon: '💻', geminiInsight: 'Contains trace heavy metals and indium tin oxide. Requires specialized hydrometallurgical smelting to extract noble metals.', carbonOffset: '5.6 kg CO₂', biodegrade: 'Non-biodegradable', facility: 'Telangana Electronic Lifecycle Center' },
    { name: 'Tattered Cardboard Box', type: 'Cardboard Paper', icon: '📦', geminiInsight: 'Long-strand cellulose fibers. Can be re-pulped into lower-test shipping cartons up to 7 times before organic degradation.', carbonOffset: '0.4 kg CO₂', biodegrade: '2 Months', facility: 'MREC Local Fiber Pulp Depot' },
    { name: 'Aluminium Beverage Can', type: 'Infinite Recyclable Metal', icon: '🥫', geminiInsight: 'Requires 95% less energy to recycle than smelting virgin bauxite ore. Can go from scrap back to dynamic supermarket shelves within 60 days.', carbonOffset: '3.1 kg CO₂', biodegrade: '200 Years', facility: 'Secunderabad Smelting Co.' }
  ];

  const [selectedWaste, setSelectedWaste] = useState(greenGridItems[0]);
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanLogs, setScanLogs] = useState<string[]>([]);
  const [showWasteResult, setShowWasteResult] = useState(true);

  // Trigger scanning animation
  const handleScanWaste = (item: typeof greenGridItems[0]) => {
    setSelectedWaste(item);
    setIsScanning(true);
    setScanProgress(0);
    setScanLogs([]);
    setShowWasteResult(false);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isScanning) {
      const logs = [
        'Booting GreenGrid neural backend...',
        'Warming up local camera optical stream...',
        'Evaluating visual frame vectors...',
        'Calling Gemini Flash endpoint for waste classification...',
        'Generating optimal disposal instructions...',
        'Calculating carbon offset statistics...'
      ];

      interval = setInterval(() => {
        setScanProgress(p => {
          const next = p + 5;
          
          // Add logs dynamically as progress climbs
          const logIdx = Math.floor((next / 100) * logs.length);
          if (logs[logIdx] && !scanLogs.includes(logs[logIdx])) {
            setScanLogs(l => [...l, logs[logIdx]]);
          }

          if (next >= 100) {
            setIsScanning(false);
            setShowWasteResult(true);
            clearInterval(interval);
            return 100;
          }
          return next;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isScanning, scanLogs]);


  // --- Data Entry Automator State ---
  const [tableData, setTableData] = useState<{ fName: string; sName: string; rollNo: string; marks: string }[]>(() => {
    const saved = localStorage.getItem("tableData");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // use fallback on error
      }
    }
    return [
      { fName: 'Chhaya', sName: 'Sharma', rollNo: 'MREC-14', marks: '98' },
      { fName: 'Sai', sName: 'Varshith', rollNo: 'MREC-101', marks: '85' },
      { fName: 'Rahul', sName: 'Sharma', rollNo: 'MREC-102', marks: '42' },
      { fName: 'Sneha', sName: 'Reddy', rollNo: 'MREC-103', marks: '32' }
    ];
  });

  const saveTableData = (data: typeof tableData) => {
    setTableData(data);
    localStorage.setItem("tableData", JSON.stringify(data));
  };

  // Dialog configurations
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [activeRowIdx, setActiveRowIdx] = useState<number | null>(null);

  // Form states
  const [addFName, setAddFName] = useState('');
  const [addSName, setAddSName] = useState('');
  const [addRollNo, setAddRollNo] = useState('');
  const [addMarks, setAddMarks] = useState('');

  const [editFName, setEditFName] = useState('');
  const [editSName, setEditSName] = useState('');
  const [editRollNo, setEditRollNo] = useState('');
  const [editMarks, setEditMarks] = useState('');

  const handleOpenAdd = () => {
    setAddFName('');
    setAddSName('');
    setAddRollNo('');
    setAddMarks('');
    setIsAddOpen(true);
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!addFName && !addSName && !addRollNo && !addMarks) {
      alert("Please enter at least one detail!");
      return;
    }
    const updated = [...tableData, {
      fName: addFName.trim(),
      sName: addSName.trim(),
      rollNo: addRollNo.trim(),
      marks: addMarks.trim()
    }];
    saveTableData(updated);
    setIsAddOpen(false);
  };

  const handleOpenEdit = (idx: number) => {
    const row = tableData[idx];
    setActiveRowIdx(idx);
    setEditFName(row.fName);
    setEditSName(row.sName);
    setEditRollNo(row.rollNo);
    setEditMarks(row.marks);
    setIsEditOpen(true);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeRowIdx === null) return;
    const updated = [...tableData];
    updated[activeRowIdx] = {
      fName: editFName.trim(),
      sName: editSName.trim(),
      rollNo: editRollNo.trim(),
      marks: editMarks.trim()
    };
    saveTableData(updated);
    setIsEditOpen(false);
    setActiveRowIdx(null);
  };

  const handleOpenDelete = (idx: number) => {
    setActiveRowIdx(idx);
    setIsDeleteOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (activeRowIdx === null) return;
    const updated = tableData.filter((_, idx) => idx !== activeRowIdx);
    saveTableData(updated);
    setIsDeleteOpen(false);
    setActiveRowIdx(null);
  };


  // --- SwiftLink (URL Shortener using Python) State ---
  const [swiftLinks, setSwiftLinks] = useState<{ shortCode: string; originalUrl: string; expiry: string; password?: string; clicks: number; created: string; status: 'Active' | 'Protected' | 'Expired' }[]>(() => {
    const saved = localStorage.getItem("swiftLinks");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // use fallback on error
      }
    }
    return [
      { shortCode: 'greengrid', originalUrl: 'https://github.com/tangadepellysaivarshith/greengrid', expiry: 'Never', clicks: 42, created: '2026-06-15', status: 'Active' },
      { shortCode: 'linkedin-sv', originalUrl: 'https://linkedin.com/in/tangadepelly-sai-varshith', expiry: 'Never', clicks: 108, created: '2026-06-10', status: 'Active' },
      { shortCode: 'mrec-campus', originalUrl: 'https://mrec.ac.in', expiry: 'Never', clicks: 12, created: '2026-06-12', status: 'Active' },
      { shortCode: 'old-deal', originalUrl: 'https://example.com/expired-deal', expiry: '1', clicks: 8, created: '2026-06-19', status: 'Expired' }
    ];
  });

  const saveSwiftLinks = (data: typeof swiftLinks) => {
    setSwiftLinks(data);
    localStorage.setItem("swiftLinks", JSON.stringify(data));
  };

  const [swiftSubTab, setSwiftSubTab] = useState<'shorten' | 'dashboard'>('shorten');

  // Input states for form
  const [destUrl, setDestUrl] = useState('https://github.com/tangadepellysaivarshith/greengrid');
  const [customAlias, setCustomAlias] = useState('');
  const [aliasStatus, setAliasStatus] = useState<'available' | 'taken' | 'too-short' | 'none'>('none');
  const [expirySelection, setExpirySelection] = useState('Never');
  const [passwordProtection, setPasswordProtection] = useState('');
  const [showPasswordRaw, setShowPasswordRaw] = useState(false);
  const [latestShortLink, setLatestShortLink] = useState<string | null>(null);

  // Search filter query
  const [searchQuery, setSearchQuery] = useState('');

  // Redirection tracker interactive simulations
  const [activeTraceLink, setActiveTraceLink] = useState<typeof swiftLinks[0] | null>(null);
  const [traceStage, setTraceStage] = useState<'none' | 'password' | 'preview' | 'landing'>('none');
  const [typedPassInput, setTypedPassInput] = useState('');
  const [passFeedbackErr, setPassError] = useState('');
  const [showSimPassRaw, setShowSimPassRaw] = useState(false);
  const [isTraceRedirecting, setIsTraceRedirecting] = useState(false);
  const [traceRedirectProgress, setTraceRedirectProgress] = useState(0);

  // Check alias availability instantly as typed
  const checkAliasAvailability = (alias: string) => {
    const cleaned = alias.replace(/[^a-zA-Z0-9]/g, "");
    setCustomAlias(cleaned);

    if (cleaned.length < 2) {
      setAliasStatus('too-short');
      return;
    }

    const taken = swiftLinks.some(link => link.shortCode.toLowerCase() === cleaned.toLowerCase());
    setAliasStatus(taken ? 'taken' : 'available');
  };

  const handleShortenLinkSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!destUrl.trim()) return;

    if (customAlias.length >= 2 && aliasStatus === 'taken') {
      alert("Alias is already taken!");
      return;
    }

    const finalCode = customAlias.trim() || Math.random().toString(36).substring(2, 6);
    let initialStatus: 'Active' | 'Protected' | 'Expired' = 'Active';
    
    if (expirySelection !== 'Never' && expirySelection !== 'Never') {
      // simulate standard status or logic
    }
    if (passwordProtection.trim() !== '') {
      initialStatus = 'Protected';
    }

    const newObj = {
      shortCode: finalCode.toLowerCase(),
      originalUrl: destUrl.trim(),
      expiry: expirySelection,
      password: passwordProtection ? passwordProtection.trim() : undefined,
      clicks: 0,
      created: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      status: initialStatus
    };

    const updated = [newObj, ...swiftLinks];
    saveSwiftLinks(updated);
    
    // Set success trace
    const simulatedResultLink = `${window.location.origin}/s/${finalCode.toLowerCase()}`;
    setLatestShortLink(simulatedResultLink);

    // Clear inputs except destination
    setCustomAlias('');
    setAliasStatus('none');
    setPasswordProtection('');
    setShowPasswordRaw(false);
  };

  const handleTraceInitiate = (entry: typeof swiftLinks[0]) => {
    setActiveTraceLink(entry);
    setTraceRedirectProgress(0);
    setTypedPassInput('');
    setPassError('');
    setShowSimPassRaw(false);

    if (entry.status === 'Expired') {
      alert("This link has expired and is no longer accessible!");
      return;
    }

    if (entry.status === 'Protected' && entry.password) {
      setTraceStage('password');
    } else {
      setTraceStage('preview');
    }
  };

  const handleSimPassSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeTraceLink) return;
    if (typedPassInput === activeTraceLink.password) {
      setTraceStage('preview');
    } else {
      setPassError('Incorrect password!');
    }
  };

  const handleConfirmRedirectNav = () => {
    if (!activeTraceLink) return;
    setIsTraceRedirecting(true);
    setTraceRedirectProgress(0);

    // Increment click counts
    const updated = swiftLinks.map(link => {
      if (link.shortCode === activeTraceLink.shortCode) {
        return { ...link, clicks: link.clicks + 1 };
      }
      return link;
    });
    saveSwiftLinks(updated);

    const interval = setInterval(() => {
      setTraceRedirectProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          setIsTraceRedirecting(false);
          setTraceStage('landing');
          return 100;
        }
        return p + 25;
      });
    }, 200);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl relative" id="project-simulators">
      {/* Decorative ambient elements */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header bar */}
      <div className="border-b border-slate-800 p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono text-brand-500 font-semibold uppercase tracking-widest bg-brand-500/10 px-3 py-1 rounded-full border border-brand-500/20">
            Interactive Playgrounds
          </span>
          <h3 className="text-2xl md:text-3xl font-display font-bold text-white mt-2">
            Project Workspace Studio
          </h3>
          <p className="text-slate-400 text-sm mt-1">
            Toggle tabs to live-test automated proof-of-concepts built by Sai Varshith.
          </p>
        </div>
        
        {/* Workspace select tab buttons */}
        <div className="flex bg-slate-950 p-1.5 rounded-2xl border border-slate-800/80 w-full md:w-auto overflow-x-auto scrollbar-hide">
          <button
            onClick={() => setActiveTab('greengrid')}
            className={`px-4 py-2.5 rounded-xl text-xs md:text-sm font-medium font-display transition-all shrink-0 flex items-center gap-2 ${
              activeTab === 'greengrid' 
                ? 'bg-slate-800 text-brand-500 shadow-md border border-slate-700/50' 
                : 'text-slate-400 hover:text-white'
            }`}
            id="tab-sim-greengrid"
          >
            <Cpu className="w-4 h-4" />
            GreenGrid (AI)
          </button>
          
          <button
            onClick={() => setActiveTab('data-entry')}
            className={`px-4 py-2.5 rounded-xl text-xs md:text-sm font-medium font-display transition-all shrink-0 flex items-center gap-2 ${
              activeTab === 'data-entry' 
                ? 'bg-slate-800 text-brand-500 shadow-md border border-slate-700/50' 
                : 'text-slate-400 hover:text-white'
            }`}
            id="tab-sim-data-entry"
          >
            <FileSpreadsheet className="w-4 h-4" />
            Data Entry (Pylib)
          </button>
          
          <button
            onClick={() => setActiveTab('url-shortener')}
            className={`px-4 py-2.5 rounded-xl text-xs md:text-sm font-medium font-display transition-all shrink-0 flex items-center gap-2 ${
              activeTab === 'url-shortener' 
                ? 'bg-slate-800 text-brand-500 shadow-md border border-slate-700/50' 
                : 'text-slate-400 hover:text-white'
            }`}
            id="tab-sim-url-shortener"
          >
            <Link2 className="w-4 h-4" />
            URL Shortener
          </button>
        </div>
      </div>

      {/* Simulator Content panels */}
      <div className="p-6 md:p-8">
        <AnimatePresence mode="wait">
          {/* 1. GREENGRID SIMULATOR */}
          {activeTab === 'greengrid' && (
            <motion.div
              key="greengrid"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8"
              id="greengrid-simulator-panel"
            >
              {/* Left Selector & Instruction Pane */}
              <div className="lg:col-span-5 flex flex-col gap-5">
                <div>
                  <h4 className="text-lg font-display text-white font-semibold flex items-center gap-2">
                    <Trash2 className="w-5 h-5 text-brand-500" />
                    GreenGrid Visualizer
                  </h4>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    GreenGrid evaluates physical refuse via Gemini API neural image inspection prompts, sorting them instantly and drafting local ecological summaries. Select an item below to watch AI classification in real time:
                  </p>
                </div>

                <div className="flex flex-col gap-2 bg-slate-950 p-3 rounded-2xl border border-slate-800">
                  <span className="text-slate-500 text-[10px] font-mono font-semibold uppercase px-2 mb-1">
                    Refuse Sample Chamber
                  </span>
                  {greenGridItems.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleScanWaste(item)}
                      disabled={isScanning}
                      className={`flex items-center justify-between p-3 rounded-xl border transition-all text-left ${
                        selectedWaste.name === item.name
                          ? 'bg-brand-500/10 border-brand-500/50 text-white'
                          : 'bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-300'
                      } ${isScanning ? 'opacity-50 cursor-not-allowed' : ''}`}
                      id={`btn-waste-${idx}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xl" role="img" aria-label={item.name}>{item.icon}</span>
                        <div>
                          <p className="text-xs font-semibold">{item.name}</p>
                          <p className="text-[10px] text-slate-500 font-mono">{item.type}</p>
                        </div>
                      </div>
                      <ArrowRight className={`w-3.5 h-3.5 transition-transform ${selectedWaste.name === item.name ? 'translate-x-1 text-brand-500' : 'text-slate-500'}`} />
                    </button>
                  ))}
                </div>
              </div>

              {/* Right Camera Screen & Result Card */}
              <div className="lg:col-span-7 flex flex-col gap-6">
                <div className="bg-slate-950 rounded-2xl border border-slate-800 aspect-video relative overflow-hidden flex flex-col items-center justify-center">
                  
                  {/* Glowing camera scanning background */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,197,94,0.06)_0%,transparent_70%)]" />
                  
                  {/* Interactive scanning scanline */}
                  {isScanning && (
                    <motion.div 
                      initial={{ top: '0%' }}
                      animate={{ top: '100%' }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                      className="absolute left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-500 to-transparent shadow-[0_0_15px_rgba(34,197,94,0.8)] z-10"
                    />
                  )}

                  {/* Camera icon or animated target */}
                  <div className="text-center z-10 flex flex-col items-center justify-center p-4">
                    {isScanning ? (
                      <div className="relative">
                        <div className="w-16 h-16 rounded-full border-4 border-brand-500/30 border-t-brand-500 animate-spin flex items-center justify-center" />
                        <Camera className="w-6 h-6 text-brand-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                      </div>
                    ) : (
                      <div className="p-4 rounded-full bg-slate-900 border border-slate-800 mb-2">
                        <span className="text-5xl block animate-bounce" role="img" aria-label="Selected Refuse">
                          {selectedWaste.icon}
                        </span>
                      </div>
                    )}
                    
                    <h5 className="text-sm font-semibold font-display text-slate-200 mt-4">
                      {isScanning ? `Analyzing Visual Frame (${scanProgress}%)` : `Waste Material: ${selectedWaste.name}`}
                    </h5>
                    <p className="text-xs text-slate-500 font-mono mt-1">
                      {isScanning ? 'Streaming pixels to Gemini node...' : 'Camera Standby / Ready to Classify'}
                    </p>
                  </div>

                  {/* Overlay logs */}
                  {isScanning && (
                    <div className="absolute bottom-4 left-4 right-4 bg-slate-950/90 border border-slate-800/80 rounded-xl p-3 max-h-24 overflow-y-auto scrollbar-hide text-[10px] font-mono text-emerald-400 text-left">
                      {scanLogs.map((log, i) => (
                        <p key={i} className="flex items-center gap-1.5 leading-relaxed">
                          <span className="text-slate-600">[{new Date().toLocaleTimeString()}]</span> {log}
                        </p>
                      ))}
                    </div>
                  )}
                </div>

                {/* Gemini Output Report */}
                {showWasteResult && !isScanning && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-slate-950 p-6 rounded-2xl border border-brand-500/20 shadow-lg relative overflow-hidden"
                    id="greengrid-result-panel"
                  >
                    <div className="absolute top-0 right-0 p-3 bg-brand-500/10 text-brand-500 rounded-bl-xl font-mono text-[9px] font-bold uppercase tracking-wider flex items-center gap-1 border-l border-b border-brand-500/10">
                      <Sparkles className="w-3 h-3 animate-pulse" /> Verified by Gemini
                    </div>

                    <div className="flex flex-col md:flex-row gap-5 items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{selectedWaste.icon}</span>
                          <h5 className="text-base font-bold font-display text-white">{selectedWaste.name}</h5>
                        </div>
                        <p className="text-[11px] font-mono text-slate-400 mt-1.5 flex items-center gap-1.5">
                          <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500" />
                          Target Category: <strong className="text-white">{selectedWaste.type}</strong>
                        </p>
                      </div>
                    </div>

                    <p className="text-xs text-slate-300 mt-4 leading-relaxed bg-slate-900 p-4 rounded-xl border border-slate-800 italic">
                      " {selectedWaste.geminiInsight} "
                    </p>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-3 gap-2 mt-4 text-center">
                      <div className="bg-slate-900 border border-slate-800 p-2.5 rounded-xl">
                        <span className="text-[10px] text-slate-500 font-mono uppercase block">Carbon Offset</span>
                        <span className="text-xs font-bold text-brand-500 font-mono mt-0.5 block">{selectedWaste.carbonOffset}</span>
                      </div>
                      <div className="bg-slate-900 border border-slate-800 p-2.5 rounded-xl">
                        <span className="text-[10px] text-slate-500 font-mono uppercase block">Biodegrade Time</span>
                        <span className="text-xs font-bold text-slate-300 font-mono mt-0.5 block">{selectedWaste.biodegrade}</span>
                      </div>
                      <div className="bg-slate-900 border border-slate-800 p-2.5 rounded-xl">
                        <span className="text-[10px] text-slate-500 font-mono uppercase block">Facility Destination</span>
                        <span className="text-[10px] font-bold text-slate-300 mt-0.5 block truncate leading-tight" title={selectedWaste.facility}>{selectedWaste.facility}</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}

          {/* 2. DATA ENTRY WORKSPACE */}
          {activeTab === 'data-entry' && (
            <motion.div
              key="data-entry"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-6"
              id="data-entry-sheet-panel"
            >
              <div className="bg-[#101820] text-slate-100 rounded-2xl border border-slate-800 overflow-hidden shadow-xl max-w-full">
                {/* Simulated Desktop Window Bar */}
                <div className="bg-slate-950 border-b border-slate-800 px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="p-2 rounded-lg bg-[#fee715]/10 text-[#fee715]">
                      <FileSpreadsheet className="w-5 h-5" />
                    </span>
                    <div>
                      <h4 className="text-base font-display font-bold text-white">Data Entry Sheet Web Engine</h4>
                      <p className="text-[11px] text-slate-500 font-mono">React rendering sandbox mirroring exp.html structure</p>
                    </div>
                  </div>
                  <button 
                    onClick={handleOpenAdd}
                    className="bg-[#fee715] hover:bg-[#ebd010] active:scale-98 text-slate-950 text-xs font-bold font-mono px-4 py-2 rounded-lg transition-transform flex items-center gap-1.5 shadow-md shadow-[#fee715]/5"
                  >
                    <Plus className="w-4 h-4" /> Enter Data
                  </button>
                </div>

                {/* Table Sheet Area */}
                <div className="p-6 overflow-x-auto">
                  <table className="w-full text-left font-mono text-[11px] border border-slate-800 rounded-xl overflow-hidden bg-[#101820]">
                    <thead>
                      <tr className="bg-[#fbeaeb] text-slate-900 border-b border-slate-800">
                        <th className="p-3.5 pl-5 font-bold uppercase tracking-wider text-center">First Name</th>
                        <th className="p-3.5 font-bold uppercase tracking-wider text-center">Second Name</th>
                        <th className="p-3.5 font-bold uppercase tracking-wider text-center">Roll No</th>
                        <th className="p-3.5 font-bold uppercase tracking-wider text-center">Marks</th>
                        <th className="p-3.5 pr-5 font-bold uppercase tracking-wider text-center select-none w-48">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      {tableData.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="p-8 text-center text-slate-500 font-mono text-xs italic">
                            No records present in local storage. Click "Enter Data" to seed rows.
                          </td>
                        </tr>
                      ) : (
                        tableData.map((row, idx) => (
                          <tr key={idx} className="hover:bg-slate-900/30 transition-colors">
                            <td className="p-3.5 text-center text-slate-300 pl-5">
                              <p className="font-semibold text-slate-100">{row.fName}</p>
                            </td>
                            <td className="p-3.5 text-center text-slate-300">
                              <p className="text-slate-200">{row.sName}</p>
                            </td>
                            <td className="p-3.5 text-center text-slate-400">
                              <p className="text-slate-400 font-bold">{row.rollNo}</p>
                            </td>
                            <td className="p-3.5 text-center font-bold">
                              <p className={parseInt(row.marks) >= 40 ? 'text-[#fee715]' : 'text-rose-500'}>
                                {row.marks}
                              </p>
                            </td>
                            <td className="p-3.5 pr-5 text-center">
                              <div className="flex items-center justify-center gap-2">
                                <button 
                                  onClick={() => handleOpenEdit(idx)}
                                  className="bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg border-none hover:shadow-md transition-all flex items-center gap-1 font-mono cursor-pointer"
                                >
                                  <Edit className="w-3 h-3" /> Edit
                                </button>
                                <button 
                                  onClick={() => handleOpenDelete(idx)}
                                  className="bg-red-600 hover:bg-red-700 active:scale-95 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg border-none hover:shadow-md transition-all flex items-center gap-1 font-mono cursor-pointer"
                                >
                                  <Trash2 className="w-3 h-3" /> Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                  
                  {tableData.length > 0 && (
                    <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-slate-500 font-mono gap-1">
                      <p>✓ Persistent localStorage Sync active ("tableData")</p>
                      <p>Average computed grade: <strong className="text-[#fee715]">
                        {(tableData.reduce((acc, curr) => acc + (parseFloat(curr.marks) || 0), 0) / tableData.length).toFixed(1)}
                      </strong></p>
                    </div>
                  )}
                </div>
              </div>

              {/* DATA ENTRY POPUP DIALOGS */}
              {/* 1. Add Data Entry Form */}
              <AnimatePresence>
                {isAddOpen && (
                  <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
                    <motion.div 
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.95, opacity: 0 }}
                      className="bg-[#101820] border border-slate-800 rounded-2xl w-full max-w-md overflow-hidden relative p-6 shadow-2xl"
                    >
                      <button 
                        onClick={() => setIsAddOpen(false)}
                        className="absolute top-4 right-4 text-rose-500 hover:text-rose-400 font-bold font-mono text-xl focus:outline-none transition-colors"
                      >
                        &times;
                      </button>
                      <h4 className="text-lg font-bold font-display text-white border-b border-slate-800 pb-3 mb-4">Enter Data Record</h4>
                      
                      <form onSubmit={handleAddSubmit} className="flex flex-col gap-4 text-left">
                        <div className="flex flex-col gap-1.5">
                          <label htmlFor="fName" className="text-xs text-slate-400 font-mono font-semibold uppercase">First Name</label>
                          <input 
                            type="text" 
                            id="fName" 
                            value={addFName}
                            onChange={(e) => setAddFName(e.target.value)}
                            className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-[#fee715] font-mono"
                            placeholder="Enter first name"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label htmlFor="secondName" className="text-xs text-slate-400 font-mono font-semibold uppercase">Second Name</label>
                          <input 
                            type="text" 
                            id="secondName" 
                            value={addSName}
                            onChange={(e) => setAddSName(e.target.value)}
                            className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-[#fee715] font-mono"
                            placeholder="Enter second name"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label htmlFor="rollNo" className="text-xs text-slate-400 font-mono font-semibold uppercase">Roll No</label>
                          <input 
                            type="text" 
                            id="rollNo" 
                            value={addRollNo}
                            onChange={(e) => setAddRollNo(e.target.value)}
                            className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-[#fee715] font-mono"
                            placeholder="Enter roll number"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label htmlFor="marks" className="text-xs text-slate-400 font-mono font-semibold uppercase">Marks</label>
                          <input 
                            type="text" 
                            id="marks" 
                            value={addMarks}
                            onChange={(e) => setAddMarks(e.target.value)}
                            className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-[#fee715] font-mono"
                            placeholder="Enter marks"
                          />
                        </div>
                        
                        <div className="flex items-center justify-end gap-3 mt-4 pt-4 border-t border-slate-800">
                          <button 
                            type="button" 
                            onClick={() => setIsAddOpen(false)}
                            className="bg-slate-900 border border-slate-800 px-4 py-2 rounded-lg text-slate-400 text-xs font-bold font-mono hover:text-white"
                          >
                            Cancel
                          </button>
                          <button 
                            type="button" 
                            onClick={() => {
                              if (!addFName && !addSName && !addRollNo && !addMarks) {
                                alert("Please enter at least one detail!");
                                return;
                              }
                              const updated = [...tableData, { fName: addFName, sName: addSName, rollNo: addRollNo, marks: addMarks }];
                              saveTableData(updated);
                              setIsAddOpen(false);
                            }}
                            className="bg-[#fee715] hover:bg-[#ebd010] px-5 py-2 rounded-lg text-slate-950 text-xs font-bold font-mono active:scale-95"
                          >
                            Enter
                          </button>
                        </div>
                      </form>
                    </motion.div>
                  </div>
                )}
              </AnimatePresence>

              {/* 2. Edit Data Entry Modal */}
              <AnimatePresence>
                {isEditOpen && (
                  <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
                    <motion.div 
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.95, opacity: 0 }}
                      className="bg-[#101820] border border-slate-800 rounded-2xl w-full max-w-sm overflow-hidden p-6 shadow-2xl relative text-center"
                    >
                      <button 
                        onClick={() => setIsEditOpen(false)}
                        className="absolute top-4 right-4 text-rose-500 hover:text-rose-400 font-bold font-mono text-xl"
                      >
                        &times;
                      </button>
                      <h4 className="text-base font-bold font-display text-white border-b border-slate-800 pb-3 mb-4">Edit Table Row</h4>
                      
                      <div className="flex flex-col gap-3 text-left">
                        <input 
                          type="text" 
                          value={editFName}
                          onChange={(e) => setEditFName(e.target.value)}
                          placeholder="First Name" 
                          className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-[#fee715] font-mono w-full"
                        />
                        <input 
                          type="text" 
                          value={editSName}
                          onChange={(e) => setEditSName(e.target.value)}
                          placeholder="Second Name" 
                          className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-[#fee715] font-mono w-full"
                        />
                        <input 
                          type="text" 
                          value={editRollNo}
                          onChange={(e) => setEditRollNo(e.target.value)}
                          placeholder="Roll No" 
                          className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-[#fee715] font-mono w-full"
                        />
                        <input 
                          type="text" 
                          value={editMarks}
                          onChange={(e) => setEditMarks(e.target.value)}
                          placeholder="Marks" 
                          className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-[#fee715] font-mono w-full"
                        />
                        
                        <button 
                          onClick={handleEditSubmit}
                          className="w-full bg-[#fee715] hover:bg-[#ebd010] active:scale-95 text-slate-950 text-xs font-bold font-mono py-2.5 rounded-lg border border-slate-800/20 font-bold transition-all mt-2 cursor-pointer"
                        >
                          Save
                        </button>
                      </div>
                    </motion.div>
                  </div>
                )}
              </AnimatePresence>

              {/* 3. Confirm Delete Dialog */}
              <AnimatePresence>
                {isDeleteOpen && (
                  <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
                    <motion.div
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.95, opacity: 0 }}
                      className="bg-[#101820] border border-slate-800 rounded-2xl w-full max-w-sm overflow-hidden p-6 shadow-2xl relative text-center text-[#e7e8d1] font-mono"
                    >
                      <p className="text-sm font-semibold mb-6">Are You Sure?</p>
                      <div className="flex items-center justify-center gap-4">
                        <button 
                          onClick={handleDeleteConfirm}
                          className="ok bg-[#cc313d] text-white hover:bg-red-800 text-xs font-bold py-2 px-6 rounded-lg border border-slate-800/30 transition-transform active:scale-95 cursor-pointer"
                        >
                          Yes
                        </button>
                        <button 
                          onClick={() => { setIsDeleteOpen(false); setActiveRowIdx(null); }}
                          className="no bg-[#a1be95] hover:bg-[#8da37d] text-[#101820] text-xs font-bold py-2 px-6 rounded-lg border border-slate-800/30 transition-transform active:scale-95 cursor-pointer"
                        >
                          No
                        </button>
                      </div>
                    </motion.div>
                  </div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {/* 3. SWIFTLINK URL SHORTENER */}
          {activeTab === 'url-shortener' && (
            <motion.div
              key="url-shortener"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-6"
              id="url-shortener-panel"
            >
              <div className="bg-white text-slate-800 rounded-2xl border border-slate-200 overflow-hidden shadow-xl max-w-full">
                {/* Router OS Header Bar */}
                <div className="bg-[#4f46e5]/10 border-b border-slate-200/80 px-6 py-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 font-sans">
                  <div className="flex items-center gap-3">
                    <span className="p-2 rounded-lg bg-[#4f46e5] text-white">
                      <Link2 className="w-5 h-5" />
                    </span>
                    <div>
                      <h4 className="text-base font-display font-semibold text-[#4f46e5] flex items-center gap-1.5">
                        SwiftLink Router Console
                      </h4>
                      <p className="text-[11px] text-slate-500 font-mono">Python Flask routing engine mapped on client React hooks</p>
                    </div>
                  </div>
                  
                  {/* Swappable Router Tabs */}
                  <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200 select-none">
                    <button 
                      onClick={() => setSwiftSubTab('shorten')}
                      className={`text-xs font-medium font-mono px-4 py-2 rounded-lg transition-colors cursor-pointer ${
                        swiftSubTab === 'shorten' ? 'bg-white text-[#4f46e5] shadow-xs' : 'text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      Shorten
                    </button>
                    <button 
                      onClick={() => setSwiftSubTab('dashboard')}
                      className={`text-xs font-medium font-mono transition-all px-4 py-2 rounded-lg flex items-center gap-1.5 ${
                        swiftSubTab === 'dashboard' ? 'bg-white text-[#4f46e5] shadow-md' : 'text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      Dashboard
                    </button>
                  </div>
                </div>

                {/* Sub Tab: Shorten link view */}
                {swiftSubTab === 'shorten' && (
                  <div className="p-8 max-w-xl mx-auto flex flex-col gap-6 font-sans">
                    <div className="text-center">
                      <h3 className="text-xl font-semibold text-slate-800">Shorten your links</h3>
                      <p className="text-xs text-slate-500 mt-1 font-mono">Convert long hyper-targets into secure short code maps</p>
                    </div>

                    <form onSubmit={handleShortenLinkSubmit} className="flex flex-col gap-4 text-left">
                      <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold text-slate-600">Original Destination URL</label>
                        <input 
                          type="text" 
                          required
                          value={destUrl}
                          onChange={(e) => setDestUrl(e.target.value)}
                          className="w-full bg-[#f8fafc] border border-slate-200 hover:border-slate-350 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#4f46e5] transition-all font-mono"
                          placeholder="https://example.com/very-long-original-url"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1">
                          <label className="text-xs font-semibold text-slate-600 flex items-center justify-between">
                            Custom Alias (optional)
                            {customAlias.length >= 2 && (
                              <span className="text-[10px] font-mono leading-none">
                                {aliasStatus === 'available' && <strong className="text-emerald-600">✓ Available</strong>}
                                {aliasStatus === 'taken' && <strong className="text-red-500">✗ Taken</strong>}
                                {aliasStatus === 'too-short' && <span className="text-slate-400">Min 2</span>}
                              </span>
                            )}
                          </label>
                          <input 
                            type="text" 
                            value={customAlias}
                            onChange={(e) => checkAliasAvailability(e.target.value)}
                            className="bg-[#f8fafc] border border-slate-200 hover:border-slate-350 rounded-lg px-4 ... py-3 text-sm focus:outline-none focus:border-[#4f46e5] transition-all font-mono"
                            placeholder="alias (e.g. my-greengrid)"
                          />
                        </div>

                        <div className="flex flex-col gap-1">
                          <label className="text-xs font-semibold text-slate-600">Link Expiry Limits</label>
                          <select 
                            value={expirySelection}
                            onChange={(e) => setExpirySelection(e.target.value)}
                            className="bg-[#f8fafc] border border-slate-200 hover:border-slate-350 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#4f46e5] transition-all font-mono cursor-pointer"
                          >
                            <option value="Never">Never</option>
                            <option value="1">1 Day</option>
                            <option value="7">7 Days</option>
                            <option value="30">30 Days</option>
                          </select>
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold text-slate-600">Password protection (optional)</label>
                        <div className="relative flex items-center">
                          <input 
                            type={showPasswordRaw ? "text" : "password"}
                            value={passwordProtection}
                            onChange={(e) => setPasswordProtection(e.target.value)}
                            className="w-full bg-[#f8fafc] border border-slate-200 hover:border-slate-350 rounded-lg pl-4 pr-16 py-3 text-sm focus:outline-none focus:border-[#4f46e5] transition-all font-mono"
                            placeholder="Password restriction"
                          />
                          <button 
                            type="button" 
                            onClick={() => setShowPasswordRaw(!showPasswordRaw)}
                            className="absolute right-2 px-3 py-1 bg-slate-200/80 hover:bg-slate-300 rounded text-slate-700 text-[10px] font-mono leading-none border-none cursor-pointer"
                          >
                            {showPasswordRaw ? "Hide" : "Show"}
                          </button>
                        </div>
                        <p className="text-[10px] text-slate-400 font-mono mt-0.5">Visitors must unlock this password before redirection is authorized.</p>
                      </div>

                      <button 
                        type="submit"
                        className="bg-[#4f46e5] hover:bg-[#4338ca] text-white active:scale-98 py-3 rounded-lg text-sm font-semibold transition-transform mt-2 cursor-pointer shadow-lg shadow-[#4f46e5]/10"
                      >
                        Shorten URL
                      </button>
                    </form>

                    {latestShortLink && (
                      <motion.div 
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="border border-[#4f46e5]/20 bg-[#4f46e5]/5 rounded-xl p-5 text-center mt-2"
                      >
                        <p className="text-xs font-semibold text-slate-600">Your shortened link:</p>
                        <div className="mt-2 flex flex-col sm:flex-row items-center justify-center gap-2">
                          <span className="font-mono font-bold text-[#4f46e5] text-sm truncate max-w-full">
                            {latestShortLink}
                          </span>
                          <button 
                            onClick={() => {
                              navigator.clipboard.writeText(latestShortLink);
                              alert("Link copied!");
                            }}
                            className="bg-slate-800 hover:bg-slate-900 text-white border-none py-1.5 px-4 rounded text-xs font-semibold cursor-pointer"
                          >
                            Copy Copy
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </div>
                )}

                {/* Sub Tab: Analytics dashboard view */}
                {swiftSubTab === 'dashboard' && (
                  <div className="p-6 font-sans">
                    {/* Metrics row */}
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                      <div className="bg-white border border-slate-200 p-4 rounded-xl text-center shadow-xs">
                        <h3 className="text-2xl font-bold font-mono text-[#4f46e5] leading-none mb-1">
                          {swiftLinks.length}
                        </h3>
                        <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Total Links</p>
                      </div>
                      <div className="bg-white border border-slate-200 p-4 rounded-xl text-center shadow-xs">
                        <h3 className="text-2xl font-bold font-mono text-emerald-600 leading-none mb-1">
                          {swiftLinks.reduce((acc, curr) => acc + curr.clicks, 0)}
                        </h3>
                        <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Total Clicks</p>
                      </div>
                      <div className="bg-white border border-slate-200 p-4 rounded-xl text-center shadow-xs">
                        <h3 className="text-2xl font-bold font-mono text-cyan-600 leading-none mb-1">
                          {swiftLinks.filter(l => l.status === 'Active').length}
                        </h3>
                        <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Active</p>
                      </div>
                      <div className="bg-white border border-slate-200 p-4 rounded-xl text-center shadow-xs">
                        <h3 className="text-2xl font-bold font-mono text-orange-500 leading-none mb-1">
                          {swiftLinks.filter(l => l.status === 'Protected').length}
                        </h3>
                        <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Protected</p>
                      </div>
                      <div className="bg-white border border-slate-200 p-4 rounded-xl text-center shadow-xs col-span-2 sm:col-span-1">
                        <h3 className="text-2xl font-bold font-mono text-red-500 leading-none mb-1">
                          {swiftLinks.filter(l => l.status === 'Expired').length}
                        </h3>
                        <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Expired</p>
                      </div>
                    </div>

                    {/* Filter row */}
                    <div className="mt-6 flex justify-end">
                      <div className="relative max-w-xs w-full">
                        <input 
                          type="text" 
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          placeholder="Search links..." 
                          className="w-full bg-[#f8fafc] border border-slate-200 hover:border-slate-350 rounded-lg pl-9 pr-4 py-2 text-xs focus:outline-none focus:border-[#4f46e5] font-mono"
                        />
                        <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      </div>
                    </div>

                    {/* Table router listing data */}
                    <div className="overflow-x-auto mt-4 border border-slate-200/80 rounded-xl bg-white shadow-xs">
                      <table className="w-full text-left font-mono text-[11px] border-collapse">
                        <thead>
                          <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 select-none">
                            <th className="p-3.5 pl-4 font-bold uppercase tracking-wider">Short Link</th>
                            <th className="p-3.5 font-bold uppercase tracking-wider">Original URL</th>
                            <th className="p-3.5 font-bold uppercase tracking-wider text-center">Clicks</th>
                            <th className="p-3.5 font-bold uppercase tracking-wider text-center">Created</th>
                            <th className="p-3.5 font-bold uppercase tracking-wider text-center">Status</th>
                            <th className="p-3.5 font-bold uppercase tracking-wider text-center">Copy</th>
                            <th className="p-3.5 pr-4 font-bold uppercase tracking-wider text-center">Action</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-slate-600">
                          {swiftLinks
                            .filter(link => 
                              link.shortCode.toLowerCase().includes(searchQuery.toLowerCase()) || 
                              link.originalUrl.toLowerCase().includes(searchQuery.toLowerCase())
                            )
                            .map((link, idx) => (
                              <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                                <td className="p-3.5 pl-4 font-bold text-[#4f46e5]">
                                  <button 
                                    onClick={() => handleTraceInitiate(link)}
                                    className="bg-transparent border-none text-[#4f46e5] font-bold text-left italic hover:underline cursor-pointer flex items-center gap-1 leading-none text-[11px] font-mono px-0 py-0"
                                  >
                                    /{link.shortCode}
                                  </button>
                                </td>
                                <td className="p-3.5 max-w-sm truncate text-slate-440 font-mono" title={link.originalUrl}>
                                  {link.originalUrl}
                                </td>
                                <td className="p-3.5 text-center font-bold text-slate-700">{link.clicks}</td>
                                <td className="p-3.5 text-center text-slate-400 font-sans">{link.created}</td>
                                <td className="p-3.5 text-center font-semibold">
                                  {link.status === "Expired" && <span className="text-red-500 bg-red-50 px-2 py-0.5 rounded text-[10px]">Expired</span>}
                                  {link.status === "Protected" && <span className="text-orange-500 bg-orange-50 px-2 py-0.5 rounded text-[10px]">Protected</span>}
                                  {link.status === "Active" && <span className="text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded text-[10px]">Active</span>}
                                </td>
                                <td className="p-3.5 text-center">
                                  <button 
                                    onClick={() => {
                                      navigator.clipboard.writeText(`${window.location.origin}/s/${link.shortCode}`);
                                      alert("Link copied!");
                                    }}
                                    className="p-1.5 rounded bg-slate-100 hover:bg-slate-200 border-none font-sans text-xs cursor-pointer shadow-xs"
                                    title="Copy short link"
                                  >
                                    📋
                                  </button>
                                </td>
                                <td className="p-3.5 pr-4 text-center">
                                  <button 
                                    onClick={() => {
                                      if (confirm('Delete this link?')) {
                                        const updated = swiftLinks.filter((_, i) => i !== idx);
                                        saveSwiftLinks(updated);
                                      }
                                    }}
                                    className="bg-transparent border-none text-slate-400 hover:text-red-500 font-sans text-xs font-semibold cursor-pointer"
                                  >
                                    Delete
                                  </button>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>

              {/* OVERLAY INTERACTIVE VISITOR REDIRECT FLOWS */}
              {activeTraceLink && traceStage !== 'none' && (
                <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 font-sans text-slate-800">
                  <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-white rounded-2xl w-full max-w-md overflow-hidden relative shadow-2xl p-6 text-center"
                  >
                    {/* 1. Modal: Password prompt required layout */}
                    {traceStage === 'password' && (
                      <form 
                        onSubmit={handleSimPassSubmit}
                        className="flex flex-col items-center justify-center text-center p-2"
                      >
                        <span className="p-3 rounded-full bg-orange-50 text-orange-500 mb-3 block">
                          <Shield className="w-8 h-8" />
                        </span>
                        <h2 className="text-xl font-bold font-display text-slate-800 mb-1">Password Required</h2>
                        <p className="text-xs text-slate-500 mb-4 font-mono">This link /{activeTraceLink.shortCode} is password-protected by creator</p>

                        <input 
                          type={showSimPassRaw ? "text" : "password"}
                          value={typedPassInput}
                          onChange={(e) => setTypedPassInput(e.target.value)}
                          placeholder="Enter password"
                          className="w-full max-w-xs border border-slate-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#4f46e5] text-center font-mono placeholder:text-slate-400"
                        />

                        <label className="flex items-center gap-2 mt-4 text-xs font-mono text-slate-500 select-none cursor-pointer">
                          <input 
                            type="checkbox" 
                            checked={showSimPassRaw}
                            onChange={() => setShowSimPassRaw(!showSimPassRaw)}
                            className="w-3.5 h-3.5 rounded border-slate-200 focus:ring-[#4f46e5] text-[#4f46e5]"
                          />
                          Show Password
                        </label>

                        {passFeedbackErr && (
                          <p className="text-xs text-red-500 font-semibold font-mono mt-3">❌ {passFeedbackErr}</p>
                        )}

                        <div className="flex items-center gap-3 w-full max-w-xs mt-6">
                          <button 
                            type="button" 
                            onClick={() => { setActiveTraceLink(null); setTraceStage('none'); }}
                            className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold py-2.5 rounded-lg border-none"
                          >
                            Cancel
                          </button>
                          <button 
                            type="submit" 
                            className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-slate-950 text-xs font-bold py-2.5 rounded-lg border-none active:scale-98 shadow-md shadow-emerald-500/10"
                          >
                            Submit
                          </button>
                        </div>
                      </form>
                    )}

                    {/* 2. Modal: Redirect Preview Card layout */}
                    {traceStage === 'preview' && (
                      <div className="flex flex-col items-center justify-center p-2 text-center">
                        <span className="p-3 rounded-full bg-indigo-50 text-[#4f46e5] mb-3 block">
                          <Link2 className="w-8 h-8" />
                        </span>
                        <h2 className="text-xl font-bold font-display text-slate-800">You are about to visit</h2>
                        
                        <p className="text-xs text-[#4f46e5] font-bold font-mono break-all py-3 px-4 bg-indigo-50/50 rounded-xl my-4 select-all border border-indigo-50">
                          {activeTraceLink.originalUrl}
                        </p>

                        {isTraceRedirecting ? (
                          <div className="flex flex-col items-center justify-center py-2 w-full max-w-xs">
                            <RefreshCcw className="w-6 h-6 text-[#4f46e5] animate-spin mb-2" />
                            <p className="text-[11px] text-slate-500 font-mono uppercase tracking-wider">Routing HTTP Redirection Code 301</p>
                            <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden mt-2">
                              <div className="bg-[#4f46e5] h-full transition-all" style={{ width: `${traceRedirectProgress}%` }} />
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center gap-3 mt-4 w-full max-w-xs">
                            <button 
                              onClick={handleConfirmRedirectNav}
                              className="flex-1 bg-[#4f46e5] hover:bg-[#4338ca] text-white active:scale-98 text-xs font-bold py-2.5 rounded-lg border-none shadow-md shadow-[#4f46e5]/10 cursor-pointer"
                            >
                              Continue
                            </button>
                            <button 
                              onClick={() => { setActiveTraceLink(null); setTraceStage('none'); }}
                              className="flex-1 bg-slate-150 hover:bg-slate-200 text-slate-700 text-xs font-bold py-2.5 rounded-lg border-none cursor-pointer"
                            >
                              Go Back
                            </button>
                          </div>
                        )}

                        <p className="text-[10px] text-slate-400 font-mono mt-6 border-t border-slate-100 pt-4 w-full">
                          This link mapping is securely routed via SwiftLink.
                        </p>
                      </div>
                    )}

                    {/* 3. Modal: Landing final destination layout */}
                    {traceStage === 'landing' && (
                      <div className="flex flex-col items-center justify-center p-2 text-center">
                        <span className="p-3 rounded-full bg-emerald-50 text-emerald-500 mb-3 block animate-bounce">
                          <CheckCircle className="w-8 h-8" />
                        </span>
                        <h2 className="text-xl font-bold font-display text-slate-800">Destination Reached Successfully</h2>
                        <p className="text-xs text-slate-500 mt-1 font-mono">Redirect mapping resolved in under 8ms.</p>

                        <div className="text-xs text-rose-500 bg-slate-900 border border-slate-800 text-slate-400 p-4 rounded-xl italic break-all max-w-full font-mono font-semibold my-5 select-all leading-normal">
                          {activeTraceLink.originalUrl}
                        </div>

                        <p className="text-[10px] text-slate-400 font-mono">
                          Visitor tracing logs calculated. Dynamic click mapping indices recalculated instantly inside active databases.
                        </p>

                        <button 
                          onClick={() => { setActiveTraceLink(null); setTraceStage('none'); }}
                          className="mt-6 w-full max-w-xs bg-slate-850 hover:bg-slate-900 text-white font-bold py-2 px-6 rounded-lg border-none active:scale-95 text-xs font-mono cursor-pointer"
                        >
                          Close Stream
                        </button>
                      </div>
                    )}
                  </motion.div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
