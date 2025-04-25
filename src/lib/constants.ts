export const projects = [
  {
    title: "3D Portal",
    image: "/portal.webp",
    tags: ["React", "Threejs", "Blender"],
    color: "",
    description:
      "Built a 3D portal using blender and React Three Fiber. Project was part of my Threejs Journey course.",
    link: "https://portal-threejs-three.vercel.app/",
    github: "https://github.com/tigeryash/portal-threejs/tree/main",
  },
  {
    title: "Solarite",
    description: `Collaborated with other develoeprs in a CHingu voyage to create a solar panel company website. 
      The Website has a user and admin dashboard which is connected to a database so user can book appointments for installations.
      Admins are able to view all the appointments and can mark them as completed. As well as get routing information for visiting appointments.`,
    link: "https://v52-tier2-team-25.vercel.app/",
    github: "https://github.com/chingu-voyages/v52-tier2-team-25",
  },
  {
    title: "ChatGPT",
    description: `Using Vercel's AI SDK I created a ChatGPT clone that streams responses and can save chats. The web app uses google authentication login and 
      saves chats to a firebase database. Users are able to switch between chats, add on to them or delete them. `,
    link: "https://chatgpt-messenger-five.vercel.app/",
    github: "https://github.com/tigeryash/chatgpt-messenger/tree/master",
  },
  {
    title: "Marble Game",
    description: `The final project of my Threejs Journey course. Built a 3D marble game using React Three Fiber. The game
       uses rapier as the physics renderer to handle gravity collisions.`,
    link: "https://marble-game-rosy.vercel.app/",
    github: "https://github.com/tigeryash/marble-game",
  },
  {
    title: "Spotlight",
    description: `Image Sharing Social media app. Built with React Native and uses Convex as the database. Images, comments and likes are all updated in real time.
      Users are able to create an account and login with google which is authenticated with Clerk.`,
    link: "https://github.com/tigeryash/spotlight",
    github: "https://github.com/tigeryash/spotlight",
  },
  {
    title: "GSAP Landing Page",
    description:
      "Replicating a real landing page using GSAP. Project uses GSAP scroll based animations and CSS masks to create some cool effects. ",
    link: "https://awwwards-jsm-nu.vercel.app/",
    github: "https://github.com/tigeryash/awwwards-jsm/tree/main",
  },
] as const;
