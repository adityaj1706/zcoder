import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { useTheme } from "../App";
const BackgroundParticles = () => {
  const { theme } = useTheme();
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        fullScreen: { enable: true, zIndex: -1 },
        background: {
          color: theme === "dark" ? "#1e2a8a" : "#e0e7ff",
        },
        particles: {
          number: { value: 40, density: { enable: true, value_area: 800 } },
          color: { value: "#fff" },
          links: {
            enable: true,
            color: "#fff",
            opacity: 0.2,
            width: 1,
            distance: 150,
          },
          move: {
            enable: true,
            speed: 1.2,
            direction: "none",
            random: false,
            straight: false,
            outModes: { default: "out" },
          },
          size: { value: 3 },
          opacity: { value: 0.7 },
        },
        interactivity: {
          events: {
            onHover: { enable: true, mode: "repulse" },
            onClick: { enable: true, mode: "push" },
          },
          modes: {
            repulse: { distance: 100, duration: 0.4 },
            push: { quantity: 4 },
          },
        },
        detectRetina: true,
      }}
    />
  );
};

export default BackgroundParticles;
