export type Highlight = { term: string; description: string };

export type Box = {
  title: string;
  intro?: string;
  highlights?: Highlight[];
  body?: string;
};

export type ImageGroup = {
  images: string[];
  columns?: number;
  maxWidth?: string;
  gap?: string;
  marginTop?: string;
};

export type Project = {
  title: string;
  category: string;
  slug: string;
  img: string;
  description: string;
  video: string;
  hideVideo?: boolean;
  images?: string[];
  imageGroups?: ImageGroup[];
  boxes?: Box[];
  localVideos?: string[];
};

export const projects: Project[] = [
  {
    title: "medly",
    category: "UI Design",
    slug: "medly",
    img: "/thumbnails/1.png",
    description: '"medly" is a mobile app that helps users find and purchase over-the-counter medicines quickly through a short interactive survey and smart recommendations.',
    video: "",
    hideVideo: true,
    images: ["/projects/medly/1.png", "/projects/medly/2.png", "/projects/medly/3.png"],
    boxes: [
      {
        title: "The Challenge",
        intro: "When feeling unwell, people often seek OTC (over-the-counter) medicines for quick relief, but finding the right one can be frustrating due to:",
        highlights: [
          { term: "Too Many Choices", description: "– Similar products make decisions difficult." },
          { term: "Lack of Knowledge", description: "– Users struggle with ingredients and brand differences." },
          { term: "Inconvenience", description: "– Going to the pharmacy can feel uncomfortable or time-consuming." },
          { term: "Time Sensitivity", description: "– No one wants to research or visit a pharmacy while sick." },
        ],
      },
      {
        title: "The Approach",
        body: '"medly" simplifies OTC medicine shopping by guiding users through a quick, easy-to-understand quiz. Based on their symptoms, the app provides personalized recommendations, helping them find the right medicine with ease. With a simple, user-friendly interface, that ensures a fast, stress-free experience.',
      },
    ],
  },
  {
    title: "Relevant",
    category: "Motion & Design",
    slug: "relevant",
    img: "/thumbnails/2.png",
    description: '"Relevant" is an Israeli television channel that focuses on news, culture and economy. It provides a platform for various programs that cover local and international news, featuring various podcast shows, documentaries, talk shows and more.',
    video: "https://player.vimeo.com/video/990968437",
  },
  {
    title: "How to take care of your plant",
    category: "Animation Project",
    slug: "plant-care",
    img: "/thumbnails/3.png",
    description: '"How to Take Care of Your Plant" is an interactive instructional video I created for my girlfriend — in order to help her learn how to properly care for her new plant. The video blends fun and practical advice, making plant care both informative and enjoyable.',
    video: "https://player.vimeo.com/video/544600417",
  },
  {
    title: "Dare Bear",
    category: "Brand Identity",
    slug: "dare-bear",
    img: "/thumbnails/4.png",
    description: '"Dare Bear" is a conceptual branding project for spicy gummy bears. The challenge was to blend two contrasting worlds – spicy and sweet. The result is a bold, playful brand that balances sweetness with a whole lot of fiery attitude.',
    video: "https://player.vimeo.com/video/1033104448",
    imageGroups: [
      { images: ["/projects/dare-bear/1.png"], columns: 1 },
      { images: ["/projects/dare-bear/2.png"], columns: 1 },
      { images: ["/projects/dare-bear/3.png"], columns: 1 },
      { images: ["/projects/dare-bear/4.png", "/projects/dare-bear/5.png"], columns: 2 },
      { images: ["/projects/dare-bear/6.png"], columns: 1 },
      { images: ["/projects/dare-bear/7.png"], columns: 1 },
    ],
  },
  {
    title: "Uno Motion Branding",
    category: "Motion & Design",
    slug: "uno-motion-branding",
    img: "/thumbnails/5.png",
    description: "To bring UNO's fast-paced, fun, and competitive spirit to life, I designed a motion system aligned with its brand values. This project showcases how motion design can elevate a brand and make its identity pop.",
    video: "https://player.vimeo.com/video/852069672",
    localVideos: [
      "/projects/uno-motion-branding/1.mp4",
      "/projects/uno-motion-branding/2.mp4",
      "/projects/uno-motion-branding/3.mp4",
      "/projects/uno-motion-branding/4.mp4",
    ],
  },
  {
    title: "Waze (for pirates)",
    category: "Motion & Design",
    slug: "waze-for-pirates",
    img: "/thumbnails/6.png",
    description: '"Waze (for Pirates)" is a rebranding project that transforms the Waze app for a new target audience—pirates! The complete overhaul includes a revamped UI, icons, and environment. All infused with a nautical, adventurous vibe, while maintaining the app\'s original functionality.',
    video: "https://player.vimeo.com/video/1033209258",
    imageGroups: [
      { images: ["/projects/waze-for-pirates/1.png", "/projects/waze-for-pirates/2.png"], columns: 2, maxWidth: "700px", gap: "80px" },
      { images: ["/projects/waze-for-pirates/3.png"], columns: 1, maxWidth: "500px", marginTop: "40px" },
    ],
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
