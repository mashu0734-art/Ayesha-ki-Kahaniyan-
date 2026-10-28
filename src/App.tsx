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
  ArrowDown,
  ExternalLink,
  Flame,
  Star
} from 'lucide-react';
import { STORIES, Story } from './storiesData';
import { AdBanner } from './components/AdBanner';
import { NativeBanner } from './components/NativeBanner';

const SMARTLINK_URL = "https://arwf.org/4/85495b432cf927afac8400cd6a98c735";

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
  const [fontSize, setFontSize] = useState<number>(19);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [showBottomAd, setShowBottomAd] = useState<boolean>(true);
  
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
    <div className="min-h-screen w-full bg-[#fff7fa] text-[#482637] selection:bg-[#fbd3e1] selection:text-[#a92f61] pb-16">
      {/* Smartlink Top Notification Ribbon */}
      <div className="bg-gradient-to-r from-[#982255] via-[#d94f83] to-[#742746] text-white text-xs sm:text-sm py-2 px-3 text-center flex items-center justify-center gap-2 shadow-xs">
        <Flame className="w-4 h-4 text-yellow-300 animate-bounce shrink-0" />
        <span className="font-medium">
          {lang === 'urdu' ? 'نئی خصوصی رومانوی کہانیاں اور تازہ اپڈیٹس پڑھیں:' : 'Nayi Khusoosi Romantic Kahaniyan aur Direct Access:'}
        </span>
        <a 
          href={SMARTLINK_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="underline font-bold text-yellow-200 hover:text-white inline-flex items-center gap-1 transition-colors ml-1"
        >
          Yahan Click Karein <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Top Bar Header Navigation */}
      <header className="sticky top-0 z-30 bg-[#d94f83] text-white shadow-md transition-all">
        <div className="max-w-6xl mx-auto px-4 py-3.5 flex flex-wrap items-center justify-between gap-3">
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

            <a
              href={SMARTLINK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 rounded-full bg-yellow-400 hover:bg-yellow-300 text-[#6f2444] font-bold text-xs sm:text-sm transition-all flex items-center gap-1 cursor-pointer shadow-xs"
            >
              <Star className="w-3.5 h-3.5 fill-current" />
              <span>Special Story</span>
            </a>

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
          {/* Top Banner Unit (728x90 for Desktop, 320x50 for Mobile) */}
          <div className="max-w-6xl mx-auto px-4 pt-3 flex justify-center">
            <div className="hidden md:block">
              <AdBanner size="728x90" />
            </div>
            <div className="block md:hidden">
              <AdBanner size="320x50" />
            </div>
          </div>

          {/* Hero Section */}
          <section className="hero relative overflow-hidden bg-gradient-to-br from-[#fbd3e1] via-[#fff0f5] to-[#f6bfd3] px-4 py-10 sm:py-14 border-b border-[#f1cbd9]">
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

              {/* Search Bar + Smartlink Button */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 max-w-2xl">
                <div className="flex-1 flex items-center gap-2 bg-white p-1.5 rounded-full border border-[#efbdd0] shadow-sm focus-within:ring-2 focus-within:ring-[#d94f83]/40 transition-all">
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

                <a
                  href={SMARTLINK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-r from-amber-500 to-pink-600 text-white font-bold text-sm px-6 py-3 rounded-full hover:opacity-95 transition-all text-center flex items-center justify-center gap-1.5 shadow-sm shrink-0"
                >
                  <Flame className="w-4 h-4 text-yellow-300" />
                  <span>VIP Stories Direct</span>
                </a>
              </div>
            </div>
          </section>

          {/* Medium Ad Banner (468x60 / 320x50) */}
          <div className="max-w-5xl mx-auto px-4 pt-6 flex justify-center">
            <div className="hidden sm:block md:hidden">
              <AdBanner size="468x60" />
            </div>
          </div>

          {/* Story Cards List Section */}
          <main id="storySection" className="max-w-6xl mx-auto px-4 py-8 sm:py-10">
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

            {/* Stories Grid with embedded 300x250 Banner Ad */}
            {filteredStories.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredStories.map((story, index) => {
                  const isFav = favorites.includes(story.id);
                  return (
                    <React.Fragment key={story.id}>
                      <article
                        onClick={() => openStory(story)}
                        className="story-card bg-white border border-[#f1cbd9] rounded-2xl overflow-hidden shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-200 cursor-pointer flex flex-col group relative"
                      >
                        <div className={`h-32 w-full bg-gradient-to-r ${getCoverGradient(story.cover)} flex items-center justify-between px-6 relative overflow-hidden`}>
                          <span className="text-4xl filter drop-shadow-sm group-hover:scale-110 transition-transform duration-300">
                            {story.emoji}
                          </span>

                          <div className="text-right">
                            <span className="bg-white/40 backdrop-blur-md text-[#742746] text-[11px] font-bold px-3 py-1 rounded-full border border-white/40">
                              {story.tag}
                            </span>
                          </div>

                          <button
                            onClick={(e) => toggleFavorite(story.id, e)}
                            className="absolute top-3 left-3 w-8 h-8 rounded-full bg-white/70 backdrop-blur-md flex items-center justify-center text-[#d94f83] hover:bg-white shadow-xs transition-all cursor-pointer"
                            title={isFav ? 'Remove from favorites' : 'Add to favorites'}
                          >
                            <Heart className={`w-4 h-4 ${isFav ? 'fill-[#d94f83] text-[#d94f83]' : 'text-gray-600'}`} />
                          </button>
                        </div>

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

                      {/* Natural Ad Unit (300x250) embedded in story cards stream */}
                      {index === 2 && (
                        <div className="col-span-1 bg-white border border-[#f1cbd9] rounded-2xl p-4 flex flex-col items-center justify-center shadow-xs">
                          <span className="text-[10px] tracking-wider text-[#a48695] uppercase mb-2">
                            Sponsored Partner • اسپانسر
                          </span>
                          <AdBanner size="300x250" label={false} />
                        </div>
                      )}

                      {/* Smartlink Featured Card embedded after 5th story */}
                      {index === 4 && (
                        <div className="col-span-1 bg-gradient-to-br from-[#ffe2ec] via-[#fff0f5] to-[#fbd3e1] border-2 border-dashed border-[#e98cac] rounded-2xl p-6 flex flex-col justify-between text-center shadow-xs">
                          <div>
                            <span className="text-3xl mb-2 inline-block">💖✨</span>
                            <h3 className="font-heading text-lg font-bold text-[#6f2444] mb-2">
                              Exclusive Romantic Kahaniyan
                            </h3>
                            <p className="text-xs text-[#896879] leading-relaxed mb-4">
                              Nayi dilkash kahaniyan aur daily romance series direct access ke sath.
                            </p>
                          </div>
                          <a
                            href={SMARTLINK_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-[#d94f83] hover:bg-[#c43f71] text-white text-xs font-bold py-2.5 px-4 rounded-full transition-all inline-flex items-center justify-center gap-1.5 shadow-xs"
                          >
                            <span>Abhi Access Karein</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      )}
                    </React.Fragment>
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

            {/* Native Banner Ad Unit (31957011) */}
            <NativeBanner />

            {/* Romantic Quote Card */}
            <div className="mt-8 bg-gradient-to-r from-[#ffe2ec] via-[#fbd3e1] to-[#ffe2ec] text-[#742746] rounded-3xl p-6 sm:p-8 text-center border border-[#e9a9c2] shadow-xs relative overflow-hidden">
              <div className="absolute top-2 left-4 text-4xl opacity-20">🌸</div>
              <div className="absolute bottom-2 right-4 text-4xl opacity-20">💗</div>
              <p className="font-heading text-lg sm:text-2xl font-bold leading-relaxed mb-1">
                “Mohabbat lafzon ki mohtaaj nahi hoti…”
              </p>
              <span className="text-sm sm:text-base text-[#896879] font-medium">
                kabhi ek nazar, kabhi ek khamoshi sab keh deti hai. 💗
              </span>
            </div>

            {/* Bottom 728x90 Banner */}
            <div className="hidden md:flex justify-center mt-6">
              <AdBanner size="728x90" />
            </div>
          </main>
        </>
      ) : (
        /* Full-Page Complete Story Reader View */
        <main className="max-w-7xl mx-auto px-4 py-6 sm:py-10 animate-in fade-in duration-300">
          {/* Top Bar Actions on Detail Page */}
          <div className="flex items-center justify-between gap-3 mb-6 max-w-4xl mx-auto">
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

              <a
                href={SMARTLINK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 bg-yellow-400 hover:bg-yellow-300 text-[#6f2444] font-bold text-xs sm:text-sm px-3.5 py-2 rounded-full shadow-xs transition-all"
              >
                <Flame className="w-4 h-4" />
                <span className="hidden sm:inline">Exclusive</span> Story
              </a>
            </div>
          </div>

          {/* Top Leaderboard / Mobile Banner on Reader Page */}
          <div className="max-w-4xl mx-auto mb-4 flex justify-center">
            <div className="hidden md:block">
              <AdBanner size="728x90" />
            </div>
            <div className="block md:hidden">
              <AdBanner size="320x50" />
            </div>
          </div>

          {/* Layout Container: Left Skyscraper (160x300) + Story Reader + Right Skyscraper (160x600) */}
          <div className="flex justify-center items-start gap-6">
            {/* Left Skyscraper (160x300) on Extra Large Screens */}
            <aside className="hidden xl:flex flex-col items-center sticky top-24 shrink-0">
              <span className="text-[10px] text-[#a48695] uppercase mb-1">Sponsored</span>
              <AdBanner size="160x300" label={false} />
            </aside>

            {/* Main Story Container */}
            <div className="w-full max-w-4xl">
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

                      <button
                        onClick={handleCopy}
                        className="p-2 rounded-full bg-white text-[#742746] border border-[#f1cbd9] hover:bg-pink-100 cursor-pointer"
                        title="Copy text"
                      >
                        {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                      </button>

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

                    {/* Smartlink In-Content Card */}
                    <div className="mt-8 p-5 rounded-2xl bg-gradient-to-r from-pink-50 via-rose-50 to-pink-50 border border-pink-200 text-center">
                      <p className="font-heading text-lg font-bold text-[#742746] mb-1">
                        Kya aapko yeh kahani pasand aayi? 💖
                      </p>
                      <p className="text-xs text-[#896879] mb-3">
                        Hamari naye romantic afsane aur special stories collection ko abhi parhein:
                      </p>
                      <a
                        href={SMARTLINK_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-[#d94f83] hover:bg-[#c43f71] text-white font-bold text-xs sm:text-sm px-6 py-2.5 rounded-full transition-all shadow-xs"
                      >
                        <Flame className="w-4 h-4 text-yellow-300" />
                        <span>Agli Exclusive Story Parhein</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>

                    {/* In-Article 300x250 Banner Ad */}
                    <div className="my-8 flex justify-center">
                      <AdBanner size="300x250" />
                    </div>
                  </div>

                  {/* Native Banner inside Reader view */}
                  <div className="px-6 pb-4">
                    <NativeBanner />
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

              {/* Back to Stories CTA */}
              <div className="text-center mt-8">
                <button
                  onClick={backToList}
                  className="inline-flex items-center gap-2 bg-[#d94f83] text-white px-6 py-2.5 rounded-full font-semibold text-sm hover:bg-[#c43f71] transition-all shadow-xs cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Sab Kahaniyan Dobara Dekhein
                </button>
              </div>
            </div>

            {/* Right Skyscraper (160x600) on Extra Large Screens */}
            <aside className="hidden xl:flex flex-col items-center sticky top-24 shrink-0">
              <span className="text-[10px] text-[#a48695] uppercase mb-1">Recommended</span>
              <AdBanner size="160x600" label={false} />
            </aside>
          </div>
        </main>
      )}

      {/* Sticky Bottom Mobile Banner (320x50) */}
      {showBottomAd && (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-pink-200 shadow-lg py-1 px-2 flex flex-col items-center justify-center md:hidden">
          <div className="w-full flex items-center justify-between max-w-xs mb-0.5 px-1">
            <span className="text-[9px] text-[#a48695] uppercase">Sponsored</span>
            <button 
              onClick={() => setShowBottomAd(false)}
              className="text-gray-400 hover:text-gray-600 text-xs px-1"
              title="Close Ad"
            >
              ✕
            </button>
          </div>
          <AdBanner size="320x50" label={false} className="my-0" />
        </div>
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
