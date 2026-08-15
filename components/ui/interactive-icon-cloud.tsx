"use client";

import { useMemo } from "react";
import {
  Cloud,
  ICloud,
  renderSimpleIcon,
  SimpleIcon,
} from "react-icon-cloud";
import {
  siTypescript,
  siJavascript,
  siDart,
  siOpenjdk,
  siReact,
  siFlutter,
  siAndroid,
  siHtml5,
  siCss,
  siNodedotjs,
  siExpress,
  siNextdotjs,
  siPrisma,
  siPostgresql,
  siFirebase,
  siNginx,
  siVercel,
  siTestinglibrary,
  siJest,
  siCypress,
  siDocker,
  siGit,
  siJira,
  siGithub,
  siGitlab,
  siAndroidstudio,
  siPython,
  siFigma,
  siTailwindcss,
  siMongodb,
  siRedis,
  siGraphql,
  siKubernetes,
  siVite,
  siSupabase,
  siLinux,
  siGooglecloud,
  siVscodium,
} from "simple-icons";

// Map slugs & common aliases to local bundled SimpleIcon objects
const iconMap: Record<string, SimpleIcon> = {
  typescript: siTypescript,
  javascript: siJavascript,
  dart: siDart,
  java: siOpenjdk,
  openjdk: siOpenjdk,
  react: siReact,
  flutter: siFlutter,
  android: siAndroid,
  html5: siHtml5,
  css3: siCss,
  css: siCss,
  nodedotjs: siNodedotjs,
  node: siNodedotjs,
  express: siExpress,
  nextdotjs: siNextdotjs,
  nextjs: siNextdotjs,
  prisma: siPrisma,
  amazonaws: siGooglecloud,
  aws: siGooglecloud,
  googlecloud: siGooglecloud,
  postgresql: siPostgresql,
  postgres: siPostgresql,
  firebase: siFirebase,
  nginx: siNginx,
  vercel: siVercel,
  testinglibrary: siTestinglibrary,
  jest: siJest,
  cypress: siCypress,
  docker: siDocker,
  git: siGit,
  jira: siJira,
  github: siGithub,
  gitlab: siGitlab,
  visualstudiocode: siVscodium,
  vscode: siVscodium,
  androidstudio: siAndroidstudio,
  python: siPython,
  figma: siFigma,
  tailwindcss: siTailwindcss,
  mongodb: siMongodb,
  redis: siRedis,
  graphql: siGraphql,
  kubernetes: siKubernetes,
  vite: siVite,
  supabase: siSupabase,
  linux: siLinux,
};

export const cloudProps: Omit<ICloud, "children"> = {
  containerProps: {
    style: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      paddingTop: 10,
    },
  },
  options: {
    reverse: true,
    depth: 1,
    wheelZoom: false,
    imageScale: 2,
    activeCursor: "pointer",
    tooltip: "native",
    initial: [0.1, -0.1],
    clickToFront: 500,
    tooltipDelay: 0,
    outlineColour: "#0000",
    maxSpeed: 0.04,
    minSpeed: 0.02,
  },
};

export const renderCustomIcon = (icon: SimpleIcon, uniqueKey?: string) => {
  return renderSimpleIcon({
    icon,
    bgHex: "#080510",
    fallbackHex: "#ccff00",
    minContrastRatio: 1.2,
    size: 42,
    aProps: {
      key: uniqueKey || icon.slug,
      href: undefined,
      target: undefined,
      rel: undefined,
      onClick: (e: any) => e.preventDefault(),
    },
  });
};

export type DynamicCloudProps = {
  iconSlugs: string[];
};

export function IconCloud({ iconSlugs }: DynamicCloudProps) {
  const renderedIcons = useMemo(() => {
    const rawSlugs = iconSlugs && iconSlugs.length > 0 ? iconSlugs : defaultSlugs;
    return rawSlugs
      .map((slug, index) => {
        const icon = iconMap[slug.toLowerCase()];
        if (!icon) return null;
        return renderCustomIcon(icon, `cloud-icon-${slug.toLowerCase()}-${index}`);
      })
      .filter((el): el is React.ReactElement => Boolean(el));
  }, [iconSlugs]);

  if (!renderedIcons || renderedIcons.length === 0) {
    return (
      <div className="flex items-center justify-center w-full min-h-[300px] text-zinc-500 font-mono text-xs">
        <div className="w-8 h-8 border-2 border-[#ccff00]/20 border-t-[#ccff00] rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    // @ts-ignore
    <Cloud {...cloudProps}>
      {renderedIcons}
    </Cloud>
  );
}

const defaultSlugs = [
  "typescript",
  "javascript",
  "dart",
  "java",
  "react",
  "flutter",
  "android",
  "html5",
  "css3",
  "nodedotjs",
  "express",
  "nextdotjs",
  "prisma",
  "amazonaws",
  "postgresql",
  "firebase",
  "nginx",
  "vercel",
  "testinglibrary",
  "jest",
  "cypress",
  "docker",
  "git",
  "jira",
  "github",
  "gitlab",
  "visualstudiocode",
  "androidstudio",
  "python",
  "figma",
  "tailwindcss",
  "mongodb",
  "redis",
  "graphql",
  "kubernetes",
  "vite",
  "supabase",
  "linux"
];

export function IconCloudDemo() {
  return (
    <div className="relative flex size-full max-w-lg items-center justify-center overflow-hidden rounded-3xl border border-white/10 bg-zinc-950/80 px-6 pb-12 pt-6 shadow-2xl backdrop-blur-2xl">
      <IconCloud iconSlugs={defaultSlugs} />
    </div>
  );
}

export default IconCloud;

