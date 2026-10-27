import React, { useState, useEffect, useRef } from 'react';
import { 
  Heart, 
  Search, 
  X, 
  Volume2, 
  VolumeX, 
  Copy, 
  Check, 
  BookOpen, 
  ChevronLeft, 
  ChevronRight, 
  Share2, 
  ArrowLeft,
  Sparkles,
  AArrowUp,
  AArrowDown,
  ArrowDown
} from 'lucide-react';
import { STORIES, Story } from './storiesData';

export default function App() {
  const [currentCat, setCurrentCat] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeStory, setActiveStory] = useState<Story | null>(null);
  const [view, setView] = useState<'list' | 'detail'>('list');
  const [lang, setLang] = useState<'roman' | 'urdu'>('roman');
  const [favorites, setFavorites] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('ayesha_favs');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [showOnlyFavs, setShowOnlyFavs] = useState<boolean>(false);
  const [fontSize, setFontSize] = useState<number>(19); // default px size
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  
  const synthRef = useRef<SpeechSynthesis | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('ayesha_favs', JSON.stringify(favorites));
    } catch (e) {
      console.error(e);
    }
  }, [favorites]);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;
    }
    return () => {
      if (synthRef.current) {
        synthRef.current.cancel();
      }
    };
  }, []);

  const toggleFavorite = (id: number, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const filteredStories = STORIES.filter(s => {
    const matchesCat = currentCat === 'all' || s.cat === currentCat;
    const matchesFav = !showOnlyFavs || favorites.includes(s.id);
    const q = searchQuery.trim().toLowerCase();
    const matchesSearch = 
      !q ||
      s.title.toLowerCase().includes(q) ||
      s.roman.toLowerCase().includes(q) ||
      s.urdu.includes(q) ||
      s.tag.toLowerCase().includes(q);

    return matchesCat && matchesFav && matchesSearch;
  });

  const openStory = (story: Story) => {
    stopAudio();
    setActiveStory(story);
    setView('detail');
    setCopied(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const backToList = () => {
    stopAudio();
    setView('list');
    setActiveStory(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const stopAudio = () => {
    if (synthRef.current) {
      synthRef.current.cancel();
      setIsPlaying(false);
    }
  };

  const toggleAudio = () => {
    if (!synthRef.current || !activeStory) return;

    if (isPlaying) {
      stopAudio();
    } else {
      const textToRead = lang === 'urdu' ? activeStory.urdu : activeStory.roman;
      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.lang = lang === 'urdu' ? 'ur-PK' : 'hi-IN';
      utterance.rate = 0.9;
      
      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);

      synthRef.current.speak(utterance);
      setIsPlaying(true);
    }
  };

  const handleCopy = () => {
    if (!activeStory) return;
    const textToCopy = `${activeStory.title}\n\n${lang === 'urdu' ? activeStory.urdu : activeStory.roman}\n\n— Ayesha Ki Kahaniyan`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    if (!activeStory) return;
    if (navigator.share) {
      navigator.share({
        title: `${activeStory.title} — Ayesha Ki Kahaniyan`,
        text: activeStory.roman.slice(0, 100) + '...',
        url: window.location.href,
      }).catch(() => {});
    } else {
      handleCopy();
    }
  };

  const nextStory = () => {
    if (!activeStory) return;
    const currentIndex = STORIES.findIndex(s => s.id === activeStory.id);
    const nextIndex = (currentIndex + 1) % STORIES.length;
    openStory(STORIES[nextIndex]);
  };

  const prevStory = () => {
    if (!activeStory) return;
    const currentIndex = STORIES.findIndex(s => s.id === activeStory.id);
    const prevIndex = (currentIndex - 1 + STORIES.length) % STORIES.length;
    openStory(STORIES[prevIndex]);
  };

  const toggleLanguageGlobal = () => {
    setLang(prev => (prev === 'roman' ? 'urdu' : 'roman'));
  };

  const scrollToStories = () => {
    if (view === 'detail') {
      setView('list');
    }
    setTimeout(() => {
      document.getElementById('storySection')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  // Cover background gradient mapping based on story cover type
  const getCoverGradient = (cover: string) => {
    switch (cover) {
      case 'rose':
        return 'from-[#f7d9e8] to-[#c8b0e8] text-[#742746]';
      case 'night':
        return 'from-[#312b55] to-[#b56d9c] text-white';
      case 'sunset':
        return 'from-[#ffdfc7] to-[#e88ca6] text-[#742746]';
      case 'book':
        return 'from-[#f9e6d2] to-[#d7a8ae] text-[#742746]';
      case 'flower':
        return 'from-[#ffe7ed] to-[#efb8cf] text-[#742746]';
      default:
        return 'from-[#ffd9e6] to-[#f6a9c5] text-[#742746]';
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#fff7fa] text-[#482637] selection:bg-[#fbd3e1] selection:text-[#a92f61]">
      {/* Top Bar Header Navigation */}
      <header className="sticky top-0 z-30 bg-[#d94f83] text-white shadow-md transition-all">
        <div className="max-w-5xl mx-auto px-4 py-3.5 flex flex-wrap items-center justify-between gap-3">
          <div 
            onClick={backToList}
            className="brand flex flex-col cursor-pointer group"
          >
            <span className="font-heading text-xl sm:text-2xl font-bold tracking-tight flex items-center gap-1.5 group-hover:opacity-90">
              ♡ Ayesha Ki Kahaniyan
            </span>
            <span className="text-xs opacity-90 font-normal">
              Har kahani mein ek naya ehsaas
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleLanguageGlobal}
              className="px-3.5 py-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white border border-white/40 text-xs sm:text-sm font-medium transition-all flex items-center gap-1.5 cursor-pointer"
              title="Zabaan tabdeel karein"
            >
              <Sparkles className="w-3.5 h-3.5 text-pink-200" />
              {lang === 'roman' ? 'اردو Script' : 'Roman Urdu'}
            </button>

            <button
              onClick={() => {
                setShowOnlyFavs(!showOnlyFavs);
                scrollToStories();
              }}
              className={`px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all flex items-center gap-1.5 cursor-pointer border ${
                showOnlyFavs 
                  ? 'bg-white text-[#d94f83] border-white font-semibold' 
                  : 'bg-white/20 text-white border-white/40 hover:bg-white/30'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${showOnlyFavs ? 'fill-[#d94f83]' : ''}`} />
              <span>Favs ({favorites.length})</span>
            </button>

            {view === 'detail' ? (
              <button
                onClick={backToList}
                className="px-3.5 py-1.5 rounded-full bg-white text-[#d94f83] text-xs sm:text-sm font-semibold transition-all flex items-center gap-1 cursor-pointer hover:bg-pink-50"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Sab Stories
              </button>
            ) : (
              <button
                onClick={scrollToStories}
                className="hidden sm:flex px-3.5 py-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white border border-white/40 text-xs sm:text-sm font-medium transition-all items-center gap-1 cursor-pointer"
              >
                Kahaniyan <ArrowDown className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main View rendering: List OR Full-Page Story Detail */}
      {view === 'list' ? (
        <>
          {/* Hero Section */}
          <section className="hero relative overflow-hidden bg-gradient-to-br from-[#fbd3e1] via-[#fff0f5] to-[#f6bfd3] px-4 py-10 sm:py-14 border-b border-[#f1cbd9]">
            {/* Heart background decoration */}
            <div className="absolute right-4 -top-10 text-[200px] sm:text-[260px] text-[#e98cac] opacity-20 pointer-events-none select-none font-serif">
              ♡
            </div>

            <div className="max-w-5xl mx-auto relative z-10">
              <div className="inline-flex items-center gap-2 text-[#a92f61] text-xs font-bold tracking-widest uppercase mb-2 bg-white/60 px-3 py-1 rounded-full border border-pink-200 shadow-xs">
                <Heart className="w-3 h-3 fill-[#a92f61]" /> Mohabbat • Jazbaat • Kahaniyan
              </div>

              <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#6f2444] leading-tight max-w-2xl my-3">
                {lang === 'urdu' 
                  ? 'دل سے دل تک، عائشہ کی کہانیاں۔' 
                  : 'Dil se dil tak, Ayesha Ki Kahaniyan.'}
              </h1>

              <p className="max-w-xl text-[#78465b] text-base sm:text-lg leading-relaxed mb-6 font-normal">
                {lang === 'urdu'
                  ? 'عائشہ اور ارحم کی دل کو چھو لینے والی 10 رومانوی کہانیاں — بالکل مفت، اردو اور رومن اردو دونوں میں۔'
                  : 'Ayesha aur Arham ki dil ko chhoo lene wali 10 romantic kahaniyan — bilkul muft, Roman Urdu aur Urdu dono mein.'}
              </p>

              {/* Search Bar */}
              <div className="max-w-xl flex items-center gap-2 bg-white p-1.5 rounded-full border border-[#efbdd0] shadow-sm focus-within:ring-2 focus-within:ring-[#d94f83]/40 transition-all">
                <Search className="w-5 h-5 text-[#896879] ml-3 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={lang === 'urdu' ? 'کہانی کا نام یا لفظ تلاش کریں...' : 'Story ka naam search karein...'}
                  className="flex-1 min-w-0 bg-transparent py-2.5 px-2 text-[#482637] placeholder-[#896879] outline-none text-sm sm:text-base"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="p-1 rounded-full text-gray-400 hover:text-gray-600 mr-1 cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={scrollToStories}
                  className="bg-[#d94f83] text-white font-semibold text-sm px-5 py-2.5 rounded-full hover:bg-[#c43f71] transition-all cursor-pointer shrink-0 shadow-xs"
                >
                  Search
                </button>
              </div>
            </div>
          </section>

          {/* Story Cards List Section */}
          <main id="storySection" className="max-w-5xl mx-auto px-4 py-8 sm:py-12">
            {/* Section Header */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
              <div>
                <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#482637] flex items-center gap-2">
                  {showOnlyFavs 
                    ? (lang === 'urdu' ? 'آپ کی پسندیدہ کہانیاں 💖' : 'Aap Ki Pasandeeda Kahaniyan 💖')
                    : (lang === 'urdu' ? 'عائشہ کی کہانیاں 🌸' : 'Ayesha Ki Kahaniyan 🌸')}
                </h2>
                <p className="text-[#896879] text-sm sm:text-base mt-1">
                  {showOnlyFavs 
                    ? 'Har bookmark ki hui kahani yahan maujood hai.'
                    : 'Apni pasand ki kahani par click karein aur poora page parhein.'}
                </p>
              </div>
              <div className="flex items-center gap-2 self-start sm:self-auto">
                <span className="text-xs sm:text-sm font-medium text-[#896879] bg-[#ffe2ec] px-3 py-1.5 rounded-full border border-[#f1cbd9]">
                  10 Mukammal Stories ♡
                </span>
              </div>
            </div>

            {/* Filter Chips */}
            <div className="flex flex-wrap items-center gap-2 mb-8">
              <button
                onClick={() => { setCurrentCat('all'); setShowOnlyFavs(false); }}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all cursor-pointer border ${
                  currentCat === 'all' && !showOnlyFavs
                    ? 'bg-[#ffe2ec] text-[#742746] border-[#e9a9c2] font-bold shadow-xs'
                    : 'bg-white text-[#896879] border-[#f1cbd9] hover:bg-pink-50'
                }`}
              >
                Sab kahaniyan
              </button>
              <button
                onClick={() => { setCurrentCat('romance'); setShowOnlyFavs(false); }}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all cursor-pointer border ${
                  currentCat === 'romance' && !showOnlyFavs
                    ? 'bg-[#ffe2ec] text-[#742746] border-[#e9a9c2] font-bold shadow-xs'
                    : 'bg-white text-[#896879] border-[#f1cbd9] hover:bg-pink-50'
                }`}
              >
                🌹 Romantic
              </button>
              <button
                onClick={() => { setCurrentCat('sad'); setShowOnlyFavs(false); }}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all cursor-pointer border ${
                  currentCat === 'sad' && !showOnlyFavs
                    ? 'bg-[#ffe2ec] text-[#742746] border-[#e9a9c2] font-bold shadow-xs'
                    : 'bg-white text-[#896879] border-[#f1cbd9] hover:bg-pink-50'
                }`}
              >
                🌙 Sad Love
              </button>
              <button
                onClick={() => { setCurrentCat('first'); setShowOnlyFavs(false); }}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all cursor-pointer border ${
                  currentCat === 'first' && !showOnlyFavs
                    ? 'bg-[#ffe2ec] text-[#742746] border-[#e9a9c2] font-bold shadow-xs'
                    : 'bg-white text-[#896879] border-[#f1cbd9] hover:bg-pink-50'
                }`}
              >
                🌧️ Pehla Pyar
              </button>
              <button
                onClick={() => setShowOnlyFavs(!showOnlyFavs)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all cursor-pointer border flex items-center gap-1.5 ${
                  showOnlyFavs
                    ? 'bg-[#d94f83] text-white border-[#d94f83] font-bold shadow-xs'
                    : 'bg-white text-[#896879] border-[#f1cbd9] hover:bg-pink-50'
                }`}
              >
                <Heart className={`w-3.5 h-3.5 ${showOnlyFavs ? 'fill-white' : ''}`} />
                Pasandeeda ({favorites.length})
              </button>
            </div>

            {/* Stories Grid (Clean without image pictures) */}
            {filteredStories.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredStories.map((story) => {
                  const isFav = favorites.includes(story.id);
                  return (
                    <article
                      key={story.id}
                      onClick={() => openStory(story)}
                      className="story-card bg-white border border-[#f1cbd9] rounded-2xl overflow-hidden shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-200 cursor-pointer flex flex-col group relative"
                    >
                      {/* Gradient Header Banner with Emoji */}
                      <div className={`h-32 w-full bg-gradient-to-r ${getCoverGradient(story.cover)} flex items-center justify-between px-6 relative overflow-hidden`}>
                        <span className="text-4xl filter drop-shadow-sm group-hover:scale-110 transition-transform duration-300">
                          {story.emoji}
                        </span>

                        <div className="text-right">
                          <span className="bg-white/40 backdrop-blur-md text-[#742746] text-[11px] font-bold px-3 py-1 rounded-full border border-white/40">
                            {story.tag}
                          </span>
                        </div>

                        {/* Favorite Heart Button */}
                        <button
                          onClick={(e) => toggleFavorite(story.id, e)}
                          className="absolute top-3 left-3 w-8 h-8 rounded-full bg-white/70 backdrop-blur-md flex items-center justify-center text-[#d94f83] hover:bg-white shadow-xs transition-all cursor-pointer"
                          title={isFav ? 'Remove from favorites' : 'Add to favorites'}
                        >
                          <Heart className={`w-4 h-4 ${isFav ? 'fill-[#d94f83] text-[#d94f83]' : 'text-gray-600'}`} />
                        </button>
                      </div>

                      {/* Story Info */}
                      <div className="p-5 flex-1 flex flex-col justify-between">
                        <div>
                          <h3 className="font-heading text-xl font-bold text-[#482637] group-hover:text-[#d94f83] transition-colors mb-2">
                            {story.title}
                          </h3>
                          <p className="text-[#896879] text-xs sm:text-sm line-clamp-3 leading-relaxed mb-4">
                            {lang === 'urdu' ? story.urdu : story.roman}
                          </p>
                        </div>

                        <div className="pt-3 border-t border-[#f1cbd9]/60 flex items-center justify-between text-xs text-[#896879]">
                          <span className="flex items-center gap-1 text-gray-500 font-medium">
                            <BookOpen className="w-3.5 h-3.5" />
                            {story.readTime}
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              openStory(story);
                            }}
                            className="bg-[#ffe2ec] text-[#742746] hover:bg-[#d94f83] hover:text-white px-4 py-1.5 rounded-full font-semibold transition-all cursor-pointer flex items-center gap-1"
                          >
                            Parhein ♡
                          </button>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-16 px-4 bg-white rounded-3xl border border-[#f1cbd9]">
                <Heart className="w-12 h-12 text-[#e9a9c2] mx-auto mb-3 opacity-60" />
                <h3 className="font-heading text-xl font-bold text-[#482637] mb-1">
                  Koi kahani nahi mili ♡
                </h3>
                <p className="text-[#896879] text-sm max-w-sm mx-auto mb-4">
                  {showOnlyFavs 
                    ? 'Aap ne abhi tak koi kahani pasandida nahi ki. Dil wale button se kahani save karein.'
                    : 'Doosra naam ya lafz search karke dekhein.'}
                </p>
                <button
                  onClick={() => { setSearchQuery(''); setCurrentCat('all'); setShowOnlyFavs(false); }}
                  className="bg-[#d94f83] text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-[#c43f71] transition-all cursor-pointer"
                >
                  Sab Kahaniyan Dekhein
                </button>
              </div>
            )}

            {/* Romantic Quote Card */}
            <div className="mt-12 bg-gradient-to-r from-[#ffe2ec] via-[#fbd3e1] to-[#ffe2ec] text-[#742746] rounded-3xl p-6 sm:p-8 text-center border border-[#e9a9c2] shadow-xs relative overflow-hidden">
              <div className="absolute top-2 left-4 text-4xl opacity-20">🌸</div>
              <div className="absolute bottom-2 right-4 text-4xl opacity-20">💗</div>
              <p className="font-heading text-lg sm:text-2xl font-bold leading-relaxed mb-1">
                “Mohabbat lafzon ki mohtaaj nahi hoti…”
              </p>
              <span className="text-sm sm:text-base text-[#896879] font-medium">
                kabhi ek nazar, kabhi ek khamoshi sab keh deti hai. 💗
              </span>
            </div>
          </main>
        </>
      ) : (
        /* Full-Page Complete Story Reader View */
        <main className="max-w-4xl mx-auto px-4 py-6 sm:py-10 animate-in fade-in duration-300">
          {/* Top Bar Actions on Detail Page */}
          <div className="flex items-center justify-between gap-3 mb-6">
            <button
              onClick={backToList}
              className="inline-flex items-center gap-2 bg-white hover:bg-pink-50 text-[#742746] font-semibold text-sm px-4 py-2 rounded-full border border-[#f1cbd9] shadow-xs transition-all cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 text-[#d94f83]" />
              <span>← Wapas Sab Kahaniyon Par</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={(e) => activeStory && toggleFavorite(activeStory.id, e)}
                className="inline-flex items-center gap-1.5 bg-white hover:bg-pink-50 text-[#d94f83] font-semibold text-xs sm:text-sm px-3.5 py-2 rounded-full border border-[#f1cbd9] shadow-xs transition-all cursor-pointer"
              >
                <Heart className={`w-4 h-4 ${activeStory && favorites.includes(activeStory.id) ? 'fill-[#d94f83]' : ''}`} />
                <span className="hidden sm:inline">
                  {activeStory && favorites.includes(activeStory.id) ? 'Pasandeeda' : 'Save Karein'}
                </span>
              </button>
            </div>
          </div>

          {activeStory && (
            <article className="bg-white rounded-3xl border border-[#f1cbd9] shadow-md overflow-hidden">
              {/* Full-Page Header Banner */}
              <div className={`p-6 sm:p-10 bg-gradient-to-r ${getCoverGradient(activeStory.cover)} relative overflow-hidden border-b border-[#f1cbd9]`}>
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                  <span className="bg-white/60 backdrop-blur-md text-[#742746] text-xs font-bold px-3 py-1 rounded-full border border-white/60 flex items-center gap-1.5">
                    <span>{activeStory.emoji}</span> {activeStory.tag}
                  </span>
                  <span className="text-xs font-semibold opacity-90 flex items-center gap-1 bg-white/40 px-3 py-1 rounded-full">
                    <BookOpen className="w-3.5 h-3.5" /> {activeStory.readTime}
                  </span>
                </div>

                <h1 className="font-heading text-3xl sm:text-5xl font-extrabold text-[#482637] leading-tight mb-2">
                  {activeStory.title}
                </h1>
                <p className="text-sm sm:text-base font-medium opacity-80">
                  Ayesha aur Arham ki kahani — Mukammal Page
                </p>
              </div>

              {/* Toolbar Controls: Language, Font size, Speech, Share */}
              <div className="bg-[#fff0f5] px-6 py-3.5 border-b border-[#f1cbd9] flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
                {/* Language Switcher */}
                <div className="flex items-center bg-white rounded-full p-1 border border-[#f1cbd9]">
                  <button
                    onClick={() => setLang('roman')}
                    className={`px-4 py-1.5 rounded-full font-semibold transition-all cursor-pointer ${
                      lang === 'roman'
                        ? 'bg-[#d94f83] text-white shadow-xs'
                        : 'text-[#896879] hover:text-[#482637]'
                    }`}
                  >
                    Roman Urdu
                  </button>
                  <button
                    onClick={() => setLang('urdu')}
                    className={`px-4 py-1.5 rounded-full font-semibold transition-all cursor-pointer font-urdu ${
                      lang === 'urdu'
                        ? 'bg-[#d94f83] text-white shadow-xs'
                        : 'text-[#896879] hover:text-[#482637]'
                    }`}
                  >
                    اردو Script
                  </button>
                </div>

                {/* Reading tools */}
                <div className="flex items-center gap-2">
                  {/* Listen button */}
                  <button
                    onClick={toggleAudio}
                    className={`px-3.5 py-1.5 rounded-full border text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                      isPlaying 
                        ? 'bg-red-500 text-white border-red-500 animate-pulse' 
                        : 'bg-white text-[#742746] border-[#f1cbd9] hover:bg-pink-100'
                    }`}
                    title={isPlaying ? 'Awaaz rokein' : 'Kahani sunein'}
                  >
                    {isPlaying ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    <span>{isPlaying ? 'Sunte hain...' : 'Sunein'}</span>
                  </button>

                  {/* Font Size Adjusters */}
                  <div className="flex items-center bg-white rounded-full border border-[#f1cbd9] p-0.5">
                    <button
                      onClick={() => setFontSize(prev => Math.max(14, prev - 2))}
                      className="p-1.5 rounded-full hover:bg-pink-100 text-[#742746] cursor-pointer"
                      title="Chhota Size"
                    >
                      <AArrowDown className="w-4 h-4" />
                    </button>
                    <span className="text-xs px-1 font-bold text-[#896879]">{fontSize}px</span>
                    <button
                      onClick={() => setFontSize(prev => Math.min(28, prev + 2))}
                      className="p-1.5 rounded-full hover:bg-pink-100 text-[#742746] cursor-pointer"
                      title="Bada Size"
                    >
                      <AArrowUp className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Copy button */}
                  <button
                    onClick={handleCopy}
                    className="p-2 rounded-full bg-white text-[#742746] border border-[#f1cbd9] hover:bg-pink-100 cursor-pointer"
                    title="Copy text"
                  >
                    {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                  </button>

                  {/* Share button */}
                  <button
                    onClick={handleShare}
                    className="p-2 rounded-full bg-white text-[#742746] border border-[#f1cbd9] hover:bg-pink-100 cursor-pointer"
                    title="Share story"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Complete Story Full Text Page Body */}
              <div className="p-6 sm:p-12 min-h-[380px] bg-white">
                <div
                  dir={lang === 'urdu' ? 'rtl' : 'ltr'}
                  style={{ fontSize: `${fontSize}px` }}
                  className={`text-[#361e2b] leading-relaxed whitespace-pre-line ${
                    lang === 'urdu' ? 'font-urdu text-right text-xl sm:text-3xl' : 'text-left font-normal'
                  }`}
                >
                  {lang === 'urdu' ? activeStory.urdu : activeStory.roman}
                </div>
              </div>

              {/* Complete Page Story Navigation Footer */}
              <div className="p-6 bg-[#fff7fa] border-t border-[#f1cbd9] flex flex-wrap items-center justify-between gap-4">
                <button
                  onClick={prevStory}
                  className="px-5 py-2.5 rounded-full bg-white border border-[#f1cbd9] text-[#742746] text-sm font-semibold hover:bg-pink-50 transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <ChevronLeft className="w-4 h-4 text-[#d94f83]" />
                  <span>Pechhli Story</span>
                </button>

                <div className="text-xs text-[#896879] font-semibold bg-[#ffe2ec] px-4 py-1.5 rounded-full">
                  Story {activeStory.id} / {STORIES.length}
                </div>

                <button
                  onClick={nextStory}
                  className="px-5 py-2.5 rounded-full bg-[#d94f83] text-white text-sm font-semibold hover:bg-[#c43f71] transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <span>Aglee Story</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </article>
          )}

          {/* Back to Top / Home button below story */}
          <div className="text-center mt-8">
            <button
              onClick={backToList}
              className="inline-flex items-center gap-2 bg-[#d94f83] text-white px-6 py-2.5 rounded-full font-semibold text-sm hover:bg-[#c43f71] transition-all shadow-xs cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              Sab Kahaniyan Dobara Dekhein
            </button>
          </div>
        </main>
      )}

      {/* Footer */}
      <footer className="border-t border-[#f1cbd9] bg-white py-8 px-4 text-center text-[#896879] text-xs sm:text-sm leading-relaxed mt-12">
        <div className="max-w-5xl mx-auto flex flex-col items-center gap-2">
          <div 
            onClick={backToList}
            className="font-heading font-bold text-base text-[#6f2444] flex items-center gap-1 cursor-pointer hover:opacity-80"
          >
            ♡ Ayesha Ki Kahaniyan
          </div>
          <p className="max-w-md">
            Dil se likhi, dil ke liye kahaniyan. <br />
            10 mukammal romantic kahaniyan — Ayesha aur Arham ke naam.
          </p>
          <div className="text-[11px] text-[#b08ea0] mt-2">
            © {new Date().getFullYear()} Ayesha Ki Kahaniyan. All Rights Reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
