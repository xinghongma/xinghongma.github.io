import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ExternalLink, Mail, Github, Linkedin, Twitter, ChevronDown, Palette, Sparkles, Cpu, Globe, ChevronLeft, ChevronRight } from "lucide-react";

// --- Types ---
interface Project {
  title: string;
  description: string;
  tags: string[];
  link: string;
}

interface LinkItem {
  name: string;
  url: string;
  icon: "palette" | "sparkles" | "cpu" | "globe";
}

interface VideoItem {
  bvid: string;
  caption: string;
}

interface Experience {
  company: string;
  role: string;
  period: string;
  description: string;
  videos?: VideoItem[];
  links?: LinkItem[];
}

// --- Data ---
const PROJECTS: Project[] = [
  {
    title: "打小人游戏",
    description: "原创老外也上头的打小人游戏，融合传统文化与现代交互",
    tags: ["React", "Next.js", "Tailwind"],
    link: "https://hitthevillain.vercel.app/",
  },
  {
    title: "Github项目挖掘器 ⛏️",
    description: "专为 AI 产品经理设计的 Github 趋势观察工具，洞察技术风向",
    tags: ["Claude", "Python", "Skills"],
    link: "https://xinghongma.github.io/github-trend-observer/examples/",
  },
  {
    title: "Mirofish 伊朗战争对中期选举推演",
    description: "利用 Multi-Agent 与 GraphRAG 技术推演地缘政治对选举的影响。",
    tags: ["Multi-Agent", "GraphRAG", "Agent Tools"],
    link: "/mirofish/",
  },
];

const EXPERIENCES: Experience[] = [
  {
    company: "Insta360 影石科技",
    role: "AI剪辑产品",
    period: "2024/07 — 2025/12",
    description: "设计AI全景剪辑功能",
    videos: [
      { bvid: "BV1hEAUzLEVN", caption: "大模型AI 剪辑视频内容理解升级" },
      { bvid: "BV1iWu8zDEPR", caption: "AI剪辑交互链路优化" }
    ]
  },
  {
    company: "小火车商业进化论播客",
    role: "内容增长负责人",
    period: "2024/12 — 2025/12",
    description: "从0到1内容增长30w+粉丝。",
    videos: [
      { bvid: "BV1DaMgzSERu", caption: "AI创始人深度访谈策划(Insta360/Final Round AI/Ditto AI)" },
      { bvid: "BV1RykxBqEX9", caption: "播客内容AI自动创作流" },
      { bvid: "BV1xKN5zVEwZ", caption: "短视频内容增长" },
      { bvid: "BV1nhv2BHE2i", caption: "用户以及市场研究" }
    ]
  },
  {
    company: "高榕资本",
    role: "AI产品投实习",
    period: "2023/06 — 2023/09",
    description: "投研项目: Leonardo AI / Lovart / Lepton AI",
    videos: [],
    links: [
      { name: "Leonardo AI", url: "https://leonardo.ai/", icon: "palette" },
      { name: "Lovart (Liblib)", url: "https://www.liblib.art/", icon: "sparkles" },
      { name: "Lepton AI", url: "https://github.com/leptonai/leptonai", icon: "cpu" }
    ]
  },
];

const SKILLS = ["产品设计", "Claude Code", "快速学习", "用户研究"];

const PRINCIPLES = [
  "Agency is the superpower",
  "Taste is learnable",
  "Write things down",
  "Do hard things"
];

const WORKFLOW_DATA = [
  {
    category: "Knowledge management",
    items: [
      {
        title: "Claude Code + Obsidian",
        bullets: ["本地markdown = 产品第二大脑", "自动链接笔记、生成每日研究摘要"]
      },
      {
        title: "Claude Code + CLAUDE.md",
        bullets: ["产品定位/用户画像/技术栈 持久记忆", "每次启动自动加载，不重复喂上下文"]
      }
    ]
  },
  {
    category: "Build",
    items: [
      {
        title: "Claude Code + PRD.md",
        bullets: ["spec写完直接生成可交互原型", "过去排需求等两周，现在一个session"]
      },
      {
        title: "Claude Code + Multi-agent team",
        subtitle: "开发小队",
        bullets: ["Builder搭代码 / PM定需求 / Tester找bug / Reviewer审质量", "一个人指挥，四个agent协作交付"]
      }
    ]
  }
];

// --- Components ---

const Navbar = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 bg-[#fdfdfd]/80 backdrop-blur-md border-b border-gray-100">
    <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
      <a href="#about" className="text-lg font-semibold tracking-tight">Xinghong Ma 马兴泓</a>
      <div className="hidden md:flex space-x-8">
        <a href="#about" className="nav-link">关于</a>
        <a href="#experience" className="nav-link">经历</a>
        <a href="#projects" className="nav-link">项目</a>
        <a href="#contact" className="nav-link">联系</a>
      </div>
      <a href="#contact" className="md:hidden nav-link">联系</a>
    </div>
  </nav>
);

const About = () => (
  <section id="about" className="section-container">
    <div className="grid lg:grid-cols-12 gap-16 items-start">
      {/* Left: About Text */}
      <div className="lg:col-span-5 lg:sticky lg:top-32 space-y-12">
        <div className="space-y-8">
          <h2 className="text-2xl font-bold uppercase tracking-[0.2em] text-gray-900">关于我</h2>
          <div className="space-y-6">
            <p className="text-3xl leading-tight text-gray-900 font-bold tracking-tighter">
              我相信底层思考和判断力留给自己，执行交给 Agent
            </p>
            <p className="text-lg leading-relaxed text-gray-500 font-medium">
              播客以及内容输出是 AI 产品的增长方式，这也是我一直长期在做的事情
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-300">Mantra</h3>
          <div className="space-y-6">
            {PRINCIPLES.map((p, i) => (
              <motion.div 
                key={p}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group/item flex items-start gap-4"
              >
                <div className="flex flex-col items-center">
                  <span className="text-3xl font-black text-gray-100 group-hover/item:text-black transition-colors duration-700 leading-none select-none">
                    {i + 1}
                  </span>
                  <div className="w-[1.5px] h-0 bg-black group-hover/item:h-4 transition-all duration-700 mt-1" />
                </div>
                <div className="pt-0.5">
                  <span className="text-lg font-bold text-gray-900 tracking-tight block group-hover/item:translate-x-2 transition-transform duration-500">
                    {p}
                  </span>
                  <p className="text-[8px] uppercase tracking-widest text-gray-300 mt-1 font-black opacity-0 group-hover/item:opacity-100 transition-opacity duration-700">
                    Core Principle
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Right: Workflow Block */}
      <div className="lg:col-span-7 space-y-12">
        {WORKFLOW_DATA.map((cat) => (
          <div key={cat.category} className="space-y-6">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-300 ml-2">{cat.category}</h3>
            <div className="space-y-3">
              {cat.items.map((item, i) => (
                <div key={i} className="flex flex-col sm:flex-row sm:items-center gap-6 group p-2 rounded-[2rem] hover:bg-gray-50/50 transition-colors duration-500">
                  <div className="flex-none w-full sm:w-64 p-6 rounded-2xl border border-gray-100 bg-white flex flex-col items-center justify-center text-center transition-all duration-500 group-hover:border-gray-200 group-hover:shadow-xl group-hover:-translate-y-1">
                    <span className="font-bold text-sm text-gray-900 tracking-tight">{item.title}</span>
                    {item.subtitle && <span className="text-[9px] mt-2 text-gray-400 font-black uppercase tracking-widest">{item.subtitle}</span>}
                  </div>
                  <div className="flex-1 space-y-2 px-2">
                    {item.bullets.map((bullet, j) => (
                      <div key={j} className="flex items-start gap-3 text-xs text-gray-500 font-medium leading-relaxed">
                        <span className="text-gray-200 mt-0.5">→</span>
                        <span>{bullet}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const VideoSlider = ({ videos }: { videos: VideoItem[] }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const AUTO_ADVANCE_TIME = 3000; // 3 seconds

  const nextVideo = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % videos.length);
    setProgress(0);
  }, [videos.length]);

  const prevVideo = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + videos.length) % videos.length);
    setProgress(0);
  }, [videos.length]);

  useEffect(() => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.offsetWidth * activeIndex;
      scrollRef.current.scrollTo({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  }, [activeIndex]);

  // Auto-advance progress bar and logic
  useEffect(() => {
    if (videos.length <= 1) return;

    const interval = 100; // Update every 100ms
    const step = (interval / AUTO_ADVANCE_TIME) * 100;
    
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          return 100; // Mark as finished
        }
        return prev + step;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [activeIndex, videos.length]);

  // Handle slide transition when progress reaches 100
  useEffect(() => {
    if (progress >= 100) {
      nextVideo();
    }
  }, [progress, nextVideo]);

  return (
    <div className="relative max-w-2xl mx-auto group">
      <div 
        ref={scrollRef}
        className="flex overflow-x-hidden snap-x snap-mandatory scrollbar-hide"
      >
        {videos.map((video, vIndex) => (
          <div 
            key={vIndex}
            className="flex-none w-full snap-center px-1"
          >
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-black shadow-2xl mb-6 border border-gray-800">
              <iframe 
                src={`//player.bilibili.com/player.html?bvid=${video.bvid}&page=1&high_quality=1&danmaku=0`} 
                scrolling="no" 
                border="0" 
                frameBorder="no" 
                framespacing="0" 
                allowFullScreen={true}
                className="absolute inset-0 w-full h-full opacity-95 hover:opacity-100 transition-opacity"
              ></iframe>
            </div>
            <p className="text-xl font-bold text-gray-900 text-center leading-relaxed px-4">
              {video.caption}
            </p>
          </div>
        ))}
      </div>

      {/* Navigation Icons - More Visible */}
      {videos.length > 1 && (
        <>
          <button 
            onClick={prevVideo}
            className="absolute left-[-20px] md:left-[-70px] top-[40%] -translate-y-1/2 p-4 rounded-full bg-white/90 backdrop-blur-md border border-gray-100 shadow-xl hover:bg-black hover:text-white transition-all z-20"
            aria-label="Previous video"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button 
            onClick={nextVideo}
            className="absolute right-[-20px] md:right-[-70px] top-[40%] -translate-y-1/2 p-4 rounded-full bg-white/90 backdrop-blur-md border border-gray-100 shadow-xl hover:bg-black hover:text-white transition-all z-20"
            aria-label="Next video"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </>
      )}

      {/* Progress & Dots */}
      <div className="flex flex-col items-center gap-4 mt-8">
        <div className="flex justify-center gap-2">
          {videos.map((_, dotIndex) => (
            <button
              key={dotIndex}
              onClick={() => {
                setActiveIndex(dotIndex);
                setProgress(0);
              }}
              className={`h-1.5 rounded-full transition-all duration-500 ${activeIndex === dotIndex ? "w-10 bg-black" : "w-2 bg-gray-200 hover:bg-gray-300"}`}
            />
          ))}
        </div>
        
        {/* Auto-advance Progress Bar */}
        <div className="w-32 h-0.5 bg-gray-100 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-black/20"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1, ease: "linear" }}
          />
        </div>
      </div>
    </div>
  );
};

const Experience = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "palette": return <Palette className="w-5 h-5" />;
      case "sparkles": return <Sparkles className="w-5 h-5" />;
      case "cpu": return <Cpu className="w-5 h-5" />;
      default: return <Globe className="w-5 h-5" />;
    }
  };

  return (
    <section id="experience" className="section-container bg-gray-50/50 rounded-[3.5rem] border border-gray-100">
      <h2 className="text-2xl font-bold uppercase tracking-[0.2em] text-gray-900 mb-12">过往经历</h2>
      <div className="space-y-12">
        {EXPERIENCES.map((exp, index) => {
          return (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white border border-gray-100 rounded-[2.5rem] p-10 shadow-sm hover:shadow-xl transition-all duration-500"
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 mb-12">
                <div className="flex-1">
                  <h3 className="text-3xl font-bold text-gray-900 tracking-tight mb-2">{exp.company}</h3>
                  <p className="text-lg text-gray-500 font-medium">{exp.role}</p>
                </div>
                <div className="md:text-right flex flex-col md:items-end">
                  <span className="text-xs font-bold px-4 py-2 rounded-full bg-black text-white mb-4 inline-block shadow-lg shadow-black/10">
                    {exp.period}
                  </span>
                  <p className="text-base text-gray-600 max-w-sm leading-relaxed font-medium">{exp.description}</p>
                </div>
              </div>

              {/* Videos Slider */}
              {exp.videos && exp.videos.length > 0 && (
                <VideoSlider videos={exp.videos} />
              )}

              {/* Links Grid */}
              {exp.links && exp.links.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  {exp.links.map((link, lIndex) => (
                    <a
                      key={lIndex}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-4 rounded-xl border border-gray-100 bg-gray-50/50 hover:bg-white hover:border-gray-200 hover:shadow-sm transition-all group/link"
                    >
                      <div className="p-2 rounded-lg bg-white text-gray-400 group-hover/link:text-black transition-colors shadow-sm">
                        {getIcon(link.icon)}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-gray-900">{link.name}</p>
                        <p className="text-[10px] text-gray-400 truncate max-w-[120px]">{link.url.replace('https://', '')}</p>
                      </div>
                      <ExternalLink className="w-3 h-3 text-gray-300 group-hover/link:text-gray-500" />
                    </a>
                  ))}
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

const Projects = () => (
  <section id="projects" className="section-container">
    <h2 className="text-2xl font-bold uppercase tracking-[0.2em] text-gray-900 mb-12">Vibe Coding 项目</h2>
    <div className="space-y-6">
      {PROJECTS.map((project, index) => (
        <motion.a 
          key={index}
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          className="group block p-8 rounded-[2rem] border border-gray-100 bg-white hover:bg-gray-50/50 hover:border-gray-200 hover:shadow-xl transition-all duration-500"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <h3 className="text-2xl font-bold text-gray-900 tracking-tight group-hover:text-black transition-colors">
                  {project.title}
                </h3>
                <ExternalLink className="w-5 h-5 text-gray-300 group-hover:text-black transition-all transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </div>
              <p className="text-gray-500 text-base font-medium leading-relaxed max-w-3xl">
                {project.description}
              </p>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {project.tags.map(tag => (
                <span key={tag} className="text-[10px] uppercase tracking-[0.15em] font-black text-gray-400 border border-gray-100 px-3 py-1.5 rounded-lg bg-gray-50/50 group-hover:bg-white transition-colors">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </motion.a>
      ))}
    </div>
  </section>
);

const Footer = () => (
  <footer id="contact" className="section-container border-t border-gray-100">
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12">
      <div>
        <h2 className="text-3xl font-semibold mb-4">AI - Context <br /> Not Control</h2>
        <a href="mailto:hello@example.com" className="text-xl text-gray-500 hover:text-black transition-colors flex items-center gap-2">
          <Mail className="w-5 h-5" />
          henghongordon@gmail.com
        </a>
      </div>
      <div className="flex space-x-6">
        <a href="#" className="text-gray-400 hover:text-black transition-colors"><Github className="w-6 h-6" /></a>
        <a href="#" className="text-gray-400 hover:text-black transition-colors"><Linkedin className="w-6 h-6" /></a>
        <a href="#" className="text-gray-400 hover:text-black transition-colors"><Twitter className="w-6 h-6" /></a>
      </div>
    </div>
    <div className="mt-24 pt-8 border-t border-gray-50 flex flex-col md:flex-row justify-between gap-4 text-xs text-gray-400 uppercase tracking-widest font-medium">
      <p>© 2026 </p>
    </div>
  </footer>
);

export default function App() {
  return (
    <div className="font-sans selection:bg-black selection:text-white">
      <Navbar />
      <main className="pt-16">
        <About />
        <Experience />
        <Projects />
        <Footer />
      </main>
    </div>
  );
}
