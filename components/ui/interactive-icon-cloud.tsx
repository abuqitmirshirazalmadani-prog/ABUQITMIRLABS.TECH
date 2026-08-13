"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Cloud,
  fetchSimpleIcons,
  ICloud,
  renderSimpleIcon,
  SimpleIcon,
} from "react-icon-cloud";

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

export const renderCustomIcon = (icon: SimpleIcon) => {
  return renderSimpleIcon({
    icon,
    bgHex: "#080510",
    fallbackHex: "#ccff00",
    minContrastRatio: 1.2,
    size: 42,
    aProps: {
      key: icon.slug,
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

type IconData = Awaited<ReturnType<typeof fetchSimpleIcons>>;

export function IconCloud({ iconSlugs }: DynamicCloudProps) {
  const [data, setData] = useState<IconData | null>(null);

  useEffect(() => {
    fetchSimpleIcons({ slugs: iconSlugs }).then(setData).catch((err) => {
      console.error("Failed to load cloud icons", err);
    });
  }, [iconSlugs]);

  const renderedIcons = useMemo(() => {
    if (!data || !data.simpleIcons) return null;

    return Object.values(data.simpleIcons).map((icon) =>
      renderCustomIcon(icon)
    );
  }, [data]);

  if (!data || !renderedIcons || renderedIcons.length === 0) {
    return (
      <div className="flex items-center justify-center w-full min-h-[300px] text-zinc-500 font-mono text-xs">
        <div className="w-8 h-8 border-2 border-[#ccff00]/20 border-t-[#ccff00] rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    // @ts-ignore
    <Cloud {...cloudProps}>
      <>{renderedIcons}</>
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
];

export function IconCloudDemo() {
  return (
    <div className="relative flex size-full max-w-lg items-center justify-center overflow-hidden rounded-3xl border border-white/10 bg-zinc-950/80 px-6 pb-12 pt-6 shadow-2xl backdrop-blur-2xl">
      <IconCloud iconSlugs={defaultSlugs} />
    </div>
  );
}

export default IconCloud;
