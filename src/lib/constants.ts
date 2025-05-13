export type Project = {
  name: string;
  title: string;
  image: string;
  tags?: string[]; // Optional
  color: string;
  background: string;
  description: string;
  link?: string;    // Optional
  github?: string;  // Optional
}

export const projects: Project[] = [
  {
    name: "portal",
    title: "3D Portal",
    image: "/portal.webp",
    tags: ["React", "Threejs", "Blender", "GLSL"],
    color: "#5D00FF",
    background:
      "linear-gradient(180deg,rgba(0, 0, 0, 0) 0%, rgba(93, 0, 255, 0.28) 20%, rgba(93, 0, 255, 0.47) 37%, rgba(93, 0, 255, 0.56) 52%, rgba(93, 0, 255, 0.67) 61%, rgba(93, 0, 255, 0.88) 79%)",
    description:
      "Built a 3D portal using blender and React Three Fiber. Project was part of my Threejs Journey course.",
    link: "https://portal-threejs-three.vercel.app/",
    github: "https://github.com/tigeryash/portal-threejs/tree/main",
  },
  {
    name: "solarite",
    title: "Solarite",
    image: "/solarite.webp",
    tags: ["React", "TailWind", "Mapbox", "Supabase", "Zod"],
    color: "#00FF2A",
    background:
      "linear-gradient(180deg,rgba(0, 0, 0, 0) 0%, rgba(0, 255, 42, 0.28) 20%, rgba(0, 255, 42, 0.47) 37%, rgba(0, 255, 42, 0.56) 52%, rgba(0, 255, 42, 0.67) 61%, rgba(0, 255, 42, 0.88) 79%)",
    description: `Collaborated with other develoeprs in a CHingu voyage to create a solar panel company website. 
      The Website has a user and admin dashboard which is connected to a database so user can book appointments for installations.
      Admins are able to view all the appointments and can mark them as completed. As well as get routing information for visiting appointments.`,
    link: "https://v52-tier2-team-25.vercel.app/",
    github: "https://github.com/chingu-voyages/v52-tier2-team-25",
  },
  {
    name: "chatgpt",
    title: "ChatGPT",
    image: "/chatgpt.webp",
    tags: ["Nextjs", "TailWind", "AI SDK", "Firebase", "Authjs"],
    color: "#575757",
    background:
      "linear-gradient(180deg,rgba(0, 0, 0, 0) 0%, rgba(87, 87, 87, 0.28) 20%, rgba(87, 87, 87, 0.47) 37%, rgba(87, 87, 87, 0.56) 52%, rgba(87, 87, 87, 0.67) 61%, rgba(87, 87, 87, 0.88) 79%)",
    description: `Using Vercel's AI SDK I created a ChatGPT clone that streams responses and can save chats. The web app uses google authentication login and 
      saves chats to a firebase database. Users are able to switch between chats, add on to them or delete them. `,
    link: "https://chatgpt-messenger-five.vercel.app/",
    github: "https://github.com/tigeryash/chatgpt-messenger/tree/master",
  },
  {
    name: "marble",
    title: "Marble Game",
    image: "/marble.webp",
    tags: ["React", "Rapier", "Zustand", "R3F"],
    color: "#FF2A00",
    background:
      "linear-gradient(180deg,rgba(0, 0, 0, 0) 0%, rgba(255, 42, 0, 0.28) 20%, rgba(255, 42, 0, 0.47) 37%, rgba(255, 42, 0, 0.56) 52%, rgba(255, 42, 0, 0.67) 61%, rgba(255, 42, 0, 0.88) 79%)",
    description: `The final project of my Threejs Journey course. Built a 3D marble game using React Three Fiber. The game
       uses rapier as the physics renderer to handle gravity collisions.`,
    link: "https://marble-game-rosy.vercel.app/",
    github: "https://github.com/tigeryash/marble-game",
  },
  {
    name: "spotlight",
    title: "Spotlight",
    image: "/spotlight.webp",
    tags: ["React Native", "Expo", "Clerk", "Convex", "TypeScript"],
    color: "#00FF84",
    background:
      "linear-gradient(180deg,rgba(0, 0, 0, 0) 0%, rgba(0, 255, 132, 0.28) 20%, rgba(0, 255, 132, 0.47) 37%, rgba(0, 255, 132, 0.56) 52%, rgba(0, 255, 132, 0.67) 61%, rgba(0, 255, 132, 0.88) 79%)",
    description: `Image Sharing Social media app. Built with React Native and uses Convex as the database. Images, comments and likes are all updated in real time.
      Users are able to create an account and login with google which is authenticated with Clerk.`,
    link: "https://github.com/tigeryash/spotlight",
    github: "https://github.com/tigeryash/spotlight",
  },
  {
    name: "awwwards",
    title: "GSAP Landing Page",
    image: "/awwwards.webp",
    tags: ["React", "TailWind", "TypeScript", "GSAP"],
    color: "#00D4FF",
    background:
      "linear-gradient(180deg,rgba(0, 0, 0, 0) 0%, rgba(0, 212, 255, 0.28) 20%, rgba(0, 212, 255, 0.47) 37%, rgba(0, 212, 255, 0.56) 52%, rgba(0, 212, 255, 0.67) 61%, rgba(0, 212, 255, 0.88) 79%)",
    description:
      "Replicating a real landing page using GSAP. Project uses GSAP scroll based animations and CSS masks to create some cool effects. ",
    link: "https://awwwards-jsm-nu.vercel.app/",
    github: "https://github.com/tigeryash/awwwards-jsm/tree/main",
  },
  {
    name: "gym",
    title: "Gym",
    image: "/gym.webp",
    tags: ["React", "TailWind", "TypeScript", "GSAP"],
    color: "#00D4FF",
    background:
      "linear-gradient(180deg,rgba(0, 0, 0, 0) 0%, rgba(0, 212, 255, 0.28) 20%, rgba(0, 212, 255, 0.47) 37%, rgba(0, 212, 255, 0.56) 52%, rgba(0, 212, 255, 0.67) 61%, rgba(0, 212, 255, 0.88) 79%)",
    description:
      "Exercise and health are important to me. I have gymnastics rings which I perform calisthenics exercises on. I like them because they're a complete gym replacement and I can do them at home.",

  },
  {
    name: "gaming",
    title: "Gaming",
    image: "/gaming.webp",
    color: "#00D4FF",
    background:
      "linear-gradient(180deg,rgba(0, 0, 0, 0) 0%, rgba(0, 212, 255, 0.28) 20%, rgba(0, 212, 255, 0.47) 37%, rgba(0, 212, 255, 0.56) 52%, rgba(0, 212, 255, 0.67) 61%, rgba(0, 212, 255, 0.88) 79%)",
    description:
      "I like to game a lot. The image on the TV is The Finals an FPS game. I've recently been into aim training and this is one game I like test my aim in and get better in. I usually play on PC but I made models of consoles I own/owned.",

  },
  {
    name: "ichiraku",
    title: "Ichiraku",
    image: "/ichiraku.jpg",
    color: "#00D4FF",
    background:
      "linear-gradient(180deg,rgba(0, 0, 0, 0) 0%, rgba(0, 212, 255, 0.28) 20%, rgba(0, 212, 255, 0.47) 37%, rgba(0, 212, 255, 0.56) 52%, rgba(0, 212, 255, 0.67) 61%, rgba(0, 212, 255, 0.88) 79%)",
    description:
      "Growing up my favorite anime was Naruto and he'd always eat at a ramen shop called Ichiraku Ramen. I though it'd be fun to make a building to practice blender so I made this. ",

  },
] 
