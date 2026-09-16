"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });

    renderer.setSize(window.innerWidth, window.innerHeight, false);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x05070a);

    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      200
    );
    camera.position.set(0, 2.5, 8);

    const clock = new THREE.Clock();
    let scrollProgress = 0;
    let targetScrollProgress = 0;

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);

    const moonLight = new THREE.DirectionalLight(0xff5a3c, 0.5);
    moonLight.position.set(10, 15, 10);
    scene.add(moonLight);

    const lanternLight1 = new THREE.PointLight(0xff5a3c, 1.5, 15, 2);
    lanternLight1.position.set(-4, 1.5, -3);
    scene.add(lanternLight1);

    const lanternLight2 = new THREE.PointLight(0xff5a3c, 1.5, 15, 2);
    lanternLight2.position.set(4, 1.5, -3);
    scene.add(lanternLight2);

    const groundGeometry = new THREE.PlaneGeometry(50, 50, 50, 50);
    const groundMaterial = new THREE.MeshStandardMaterial({
      color: 0x0a0e12,
      roughness: 0.9,
      metalness: 0,
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.1;
    scene.add(ground);

    const toriiGeometry = new THREE.CylinderGeometry(0.15, 0.15, 6, 8);
    const toriiMaterial = new THREE.MeshStandardMaterial({
      color: 0x1a0c0b,
      roughness: 0.8,
      metalness: 0.1,
    });

    const toriiGroup = new THREE.Group();
    const post1 = new THREE.Mesh(toriiGeometry, toriiMaterial);
    post1.position.set(-2.5, 3, -8);
    const post2 = new THREE.Mesh(toriiGeometry, toriiMaterial);
    post2.position.set(2.5, 3, -8);
    const lintel = new THREE.Mesh(
      new THREE.BoxGeometry(6, 0.4, 0.8),
      toriiMaterial
    );
    lintel.position.set(0, 6, -8);
    const kasagi = new THREE.Mesh(
      new THREE.BoxGeometry(7, 0.2, 1.2),
      toriiMaterial
    );
    kasagi.position.set(0, 6.3, -8);
    toriiGroup.add(post1, post2, lintel, kasagi);
    scene.add(toriiGroup);

    const lanternGeometry = new THREE.CylinderGeometry(0.25, 0.3, 0.8, 8);
    const lanternMaterial = new THREE.MeshStandardMaterial({
      color: 0x1a0c0b,
      roughness: 0.7,
      metalness: 0.1,
    });

    const lantern1 = new THREE.Mesh(lanternGeometry, lanternMaterial);
    lantern1.position.set(-3, 1.5, -5);
    scene.add(lantern1);

    const lantern2 = new THREE.Mesh(lanternGeometry, lanternMaterial);
    lantern2.position.set(3, 1.5, -5);
    scene.add(lantern2);

    const moonGeometry = new THREE.SphereGeometry(1.5, 32, 32);
    const moonMaterial = new THREE.MeshBasicMaterial({
      color: 0xe0231c,
      transparent: true,
      opacity: 0.9,
    });
    const moon = new THREE.Mesh(moonGeometry, moonMaterial);
    moon.position.set(12, 12, -10);
    scene.add(moon);

    const fog = new THREE.FogExp2(0x05070a, 0.035);
    scene.fog = fog;

    const leaves: THREE.Mesh[] = [];
    const leafGeometry = new THREE.PlaneGeometry(0.3, 0.4);
    const leafMaterial = new THREE.MeshBasicMaterial({
      color: 0x8c1410,
      transparent: true,
      opacity: 0.6,
      side: THREE.DoubleSide,
      depthWrite: false,
    });

    for (let i = 0; i < 80; i++) {
      const leaf = new THREE.Mesh(leafGeometry, leafMaterial);
      leaf.position.set(
        (Math.random() - 0.5) * 30,
        Math.random() * 20 + 2,
        (Math.random() - 0.5) * 30
      );
      leaf.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      leaf.userData = {
        fallSpeed: 0.2 + Math.random() * 0.4,
        spinSpeed: 0.5 + Math.random() * 1.5,
        rollSpeed: 0.3 + Math.random() * 1,
        slipAmount: 0.05 + Math.random() * 0.15,
        spinPhase: Math.random() * Math.PI * 2,
      };
      scene.add(leaf);
      leaves.push(leaf);
    }

    const raindrops: THREE.Mesh[] = [];
    const rainGeometry = new THREE.CylinderGeometry(0.01, 0.01, 0.2, 4);
    const rainMaterial = new THREE.MeshBasicMaterial({
      color: 0x8fb4b0,
      transparent: true,
      opacity: 0.3,
      depthWrite: false,
    });

    for (let i = 0; i < 200; i++) {
      const drop = new THREE.Mesh(rainGeometry, rainMaterial);
      drop.position.set(
        (Math.random() - 0.5) * 40,
        Math.random() * 30 + 5,
        (Math.random() - 0.5) * 40
      );
      scene.add(drop);
      raindrops.push(drop);
    }

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      targetScrollProgress = Math.min(scrollY / maxScroll, 1);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight, false);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener("resize", handleResize);

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    function animate() {
      const dt = Math.min(clock.getDelta(), 1 / 30);

      if (!prefersReducedMotion) {
        scrollProgress += (targetScrollProgress - scrollProgress) * 0.05;

        camera.position.y = 2.5 + scrollProgress * 12;
        camera.position.z = 8 + scrollProgress * 30;
        camera.lookAt(0, 2 + scrollProgress * 10, -10 + scrollProgress * 25);

        const time = clock.getElapsedTime();

        moonLight.position.x = 10 + Math.sin(time * 0.1) * 3;
        moonLight.position.z = 10 + Math.cos(time * 0.1) * 3;

        lanternLight1.intensity = 1.5 + Math.sin(time * 2.3) * 0.3;
        lanternLight2.intensity = 1.5 + Math.sin(time * 1.7 + 1) * 0.3;

        leaves.forEach((leaf) => {
          const data = leaf.userData;
          data.spinPhase += data.spinSpeed * dt;
          const spin = data.spinPhase;

          leaf.position.y -= data.fallSpeed * dt * 60;
          leaf.position.x += Math.sin(spin) * data.slipAmount * dt * 60;
          leaf.rotation.z = spin * 0.5;
          leaf.rotation.y += data.rollSpeed * dt;
          leaf.scale.x = Math.max(0.02, Math.cos(spin));

          if (leaf.position.y < -2) {
            leaf.position.y = 25 + Math.random() * 10;
            leaf.position.x = (Math.random() - 0.5) * 30;
            leaf.position.z = (Math.random() - 0.5) * 30;
          }
        });

        raindrops.forEach((drop) => {
          drop.position.y -= 15 * dt * 60;
          if (drop.position.y < -1) {
            drop.position.y = 35 + Math.random() * 10;
            drop.position.x = (Math.random() - 0.5) * 40;
            drop.position.z = (Math.random() - 0.5) * 40;
          }
        });

        moon.rotation.y += 0.0001;
      }

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    }

    animate();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      groundGeometry.dispose();
      groundMaterial.dispose();
      toriiGeometry.dispose();
      toriiMaterial.dispose();
      lanternGeometry.dispose();
      lanternMaterial.dispose();
      moonGeometry.dispose();
      moonMaterial.dispose();
      leafGeometry.dispose();
      leafMaterial.dispose();
      rainGeometry.dispose();
      rainMaterial.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="gl"
      style={{ width: "100%", height: "100%", display: "block" }}
    />
  );
}