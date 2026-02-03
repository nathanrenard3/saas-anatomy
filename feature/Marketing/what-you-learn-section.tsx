"use client";

import { DollarSign, Users, Wrench, RefreshCcw, Search, Megaphone, PenLine } from "lucide-react";
import { BlurFade } from "@/components/magicui/blur-fade";
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";
import { motion } from "framer-motion";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { OrbitingCircles } from "@/components/ui/orbiting-circles";
import { ToolIcons } from "@/components/ui/tool-icons";

// Animated Revenue Component - shadcn Chart
const RevenueAnimation = () => {
  const chartData = [
    { month: "Jan", mrr: 5000 },
    { month: "Fev", mrr: 15000 },
    { month: "Mar", mrr: 30000 },
    { month: "Avr", mrr: 50000 },
    { month: "Mai", mrr: 75000 },
    { month: "Jun", mrr: 100000 },
  ];

  const chartConfig = {
    mrr: {
      label: "MRR",
      color: "hsl(142.1 70% 50%)",
    },
  } satisfies ChartConfig;

  return (
    <div className="absolute inset-0 flex items-center justify-center p-6 pt-12 pb-20">
      <div className="w-full">
        <ChartContainer config={chartConfig} className="h-[240px] w-full">
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 20,
              right: 10,
              left: -15,
              bottom: 10,
            }}
          >
            <CartesianGrid vertical={false} strokeDasharray="3 3" opacity={0.2} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))", opacity: 0.7 }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tick={{ fontSize: 9, fill: "hsl(var(--muted-foreground))", opacity: 0.6 }}
              tickFormatter={(value) => `${value / 1000}K`}
            />
            <ChartTooltip
              cursor={{ fill: "hsl(var(--muted))", opacity: 0.15 }}
              content={
                <ChartTooltipContent
                  className="w-[140px]"
                  formatter={(value) => `${(value as number) / 1000}K €`}
                  labelClassName="font-semibold"
                />
              }
            />
            <Bar
              dataKey="mrr"
              fill="hsl(142.1 70% 50%)"
              radius={[6, 6, 0, 0]}
              animationDuration={1500}
              animationBegin={0}
              isAnimationActive={true}
            />
          </BarChart>
        </ChartContainer>
      </div>
    </div>
  );
};

// Animated User Acquisition Component - Simple and Clean
const UserAcquisitionAnimation = () => {
  const channels = [
    {
      name: "SEO",
      Icon: Search,
      color: "from-blue-400 to-blue-600",
      bgColor: "bg-blue-500",
    },
    {
      name: "Ads",
      Icon: Megaphone,
      color: "from-purple-400 to-purple-600",
      bgColor: "bg-purple-500",
    },
    {
      name: "Content",
      Icon: PenLine,
      color: "from-orange-400 to-orange-600",
      bgColor: "bg-orange-500",
    },
  ];

  // Fixed offsets for particles (for variety without Math.random)
  const particleOffsets = {
    top: [-3, 2, -1, 4, 0, -4],
    right: [3, -2, 1, -3, 2],
    left: [2, -3, 1, -2, 3],
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center p-6 pt-12 pb-16">
      <div className="relative w-full max-w-[280px] aspect-square">
        {/* Central Circle with User Icon */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-14 h-14 rounded-full bg-linear-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-lg"
          >
            <Users className="w-7 h-7 text-white" />
          </motion.div>

          {/* Pulse Ring */}
          <motion.div
            animate={{
              scale: [1, 1.8],
              opacity: [0.6, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeOut",
            }}
            className="absolute inset-0 rounded-full border-2 border-blue-400"
          />
        </div>

        {/* Channel Cards - Positioned at 4 corners */}
        {/* Top */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0, duration: 0.5 }}
          className="absolute top-0 left-1/2 -translate-x-1/2"
        >
          {(() => {
            const ChannelIcon = channels[0].Icon;
            return (
              <>
                <div className={`w-11 h-11 rounded-xl bg-linear-to-br ${channels[0].color} flex items-center justify-center shadow-lg`}>
                  <ChannelIcon className="w-5 h-5 text-white" />
                </div>
                <div className="text-center mt-1">
                  <span className="text-[9px] font-semibold text-foreground/60">{channels[0].name}</span>
                </div>
              </>
            );
          })()}
        </motion.div>

        {/* Right */}
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="absolute right-0 top-1/2 -translate-y-1/2"
        >
          {(() => {
            const ChannelIcon = channels[1].Icon;
            return (
              <>
                <div className={`w-11 h-11 rounded-xl bg-linear-to-br ${channels[1].color} flex items-center justify-center shadow-lg`}>
                  <ChannelIcon className="w-5 h-5 text-white" />
                </div>
                <div className="text-center mt-1">
                  <span className="text-[9px] font-semibold text-foreground/60">{channels[1].name}</span>
                </div>
              </>
            );
          })()}
        </motion.div>

        {/* Left */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="absolute left-0 top-1/2 -translate-y-1/2"
        >
          {(() => {
            const ChannelIcon = channels[2].Icon;
            return (
              <>
                <div className={`w-11 h-11 rounded-xl bg-linear-to-br ${channels[2].color} flex items-center justify-center shadow-lg`}>
                  <ChannelIcon className="w-5 h-5 text-white" />
                </div>
                <div className="text-center mt-1">
                  <span className="text-[9px] font-semibold text-foreground/60">{channels[2].name}</span>
                </div>
              </>
            );
          })()}
        </motion.div>

        {/* Animated Particles - Top to Center */}
        {particleOffsets.top.map((offset, i) => (
          <motion.div
            key={`particle-top-${i}`}
            initial={{ y: -100, x: offset, opacity: 0, scale: 0 }}
            animate={{
              y: 0,
              x: 0,
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              delay: i * 0.3,
              repeat: Infinity,
              repeatDelay: 1,
              ease: "easeInOut",
            }}
            className="absolute top-1/2 left-1/2 w-1.5 h-1.5 rounded-full bg-blue-500"
          />
        ))}

        {/* Animated Particles - Right to Center */}
        {particleOffsets.right.map((offset, i) => (
          <motion.div
            key={`particle-right-${i}`}
            initial={{ x: 100, y: offset, opacity: 0, scale: 0 }}
            animate={{
              x: 0,
              y: 0,
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              delay: 0.5 + i * 0.3,
              repeat: Infinity,
              repeatDelay: 1,
              ease: "easeInOut",
            }}
            className="absolute top-1/2 left-1/2 w-1.5 h-1.5 rounded-full bg-purple-500"
          />
        ))}

        {/* Animated Particles - Left to Center */}
        {particleOffsets.left.map((offset, i) => (
          <motion.div
            key={`particle-left-${i}`}
            initial={{ x: -100, y: offset, opacity: 0, scale: 0 }}
            animate={{
              x: 0,
              y: 0,
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              delay: 1 + i * 0.3,
              repeat: Infinity,
              repeatDelay: 1,
              ease: "easeInOut",
            }}
            className="absolute top-1/2 left-1/2 w-1.5 h-1.5 rounded-full bg-orange-500"
          />
        ))}
      </div>
    </div>
  );
};

// Animated Growth Component - Version Premium
const GrowthAnimation = () => {
  const channels = [
    { name: "SEO", value: 75, icon: "🔍", color: "from-blue-400 to-blue-600", delay: 0 },
    { name: "Content", value: 85, icon: "✍️", color: "from-cyan-400 to-cyan-600", delay: 0.3 },
    { name: "Referral", value: 60, icon: "🔗", color: "from-sky-400 to-sky-600", delay: 0.6 },
  ];

  return (
    <div className="absolute inset-0 flex items-center justify-center p-8 pt-20">
      <div className="w-full space-y-5">
        {channels.map((channel, idx) => (
          <motion.div
            key={channel.name}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              delay: channel.delay,
              duration: 0.5,
              type: "spring",
              stiffness: 200,
              damping: 15,
            }}
            className="relative"
          >
            <div className="flex items-center gap-3">
              <motion.div
                whileHover={{ scale: 1.2, rotate: 360 }}
                transition={{ duration: 0.6 }}
                className={`w-12 h-12 rounded-xl bg-linear-to-br ${channel.color} flex items-center justify-center shadow-lg cursor-pointer`}
              >
                <span className="text-lg">{channel.icon}</span>
              </motion.div>

              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-semibold text-foreground">{channel.name}</span>
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: channel.delay + 0.5 }}
                    className="text-xs font-bold text-blue-500"
                  >
                    {channel.value}%
                  </motion.span>
                </div>

                <div className="h-2.5 bg-muted/50 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${channel.value}%` }}
                    transition={{
                      delay: channel.delay + 0.2,
                      duration: 1.5,
                      ease: [0.4, 0, 0.2, 1],
                    }}
                    className={`h-full bg-gradient-to-r ${channel.color} rounded-full relative`}
                  >
                    <motion.div
                      animate={{
                        x: ["0%", "100%", "0%"],
                        opacity: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-white/60 to-transparent"
                    />
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1 }}
          className="pt-4 flex justify-center"
        >
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
            className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30 backdrop-blur-sm"
          >
            <span className="text-xs font-semibold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              +2.5k visiteurs/mois
            </span>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

// Animated Tools Component - Orbiting Ecosystem
const ToolsAnimation = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden pb-12">
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Inner Orbit - Development Tools (Fast rotation) */}
        <OrbitingCircles radius={20} duration={20} iconSize={40}>
        </OrbitingCircles>

        <OrbitingCircles radius={60} duration={20} iconSize={40}>
        <ToolIcons.supabase />
        </OrbitingCircles>

        {/* Middle Orbit - Infrastructure (Medium rotation, reverse) */}
        <OrbitingCircles radius={100} duration={25} reverse iconSize={40}>
          <ToolIcons.stripe />
        </OrbitingCircles>

        {/* Outer Orbit - Marketing & Analytics (Slower rotation) */}
        <OrbitingCircles radius={140} duration={30} iconSize={35}>
          <ToolIcons.posthog />
        </OrbitingCircles>
      </div>
    </div>
  );
};

// Animated Reuse Component - Simple List
const ReuseAnimation = () => {
  const items = [
    { text: "Stratégies pricing", delay: 0 },
    { text: "Templates landing page", delay: 0.15 },
    { text: "Frameworks SEO", delay: 0.3 },
    { text: "Tactiques growth", delay: 0.45 },
  ];

  return (
    <div className="absolute inset-0 flex items-center justify-center p-8 pt-20">
      <div className="w-full space-y-3">
        {items.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: item.delay, duration: 0.4 }}
            className="flex items-center gap-3 p-4 rounded-lg bg-primary/5 border border-primary/10"
          >
            <div className="flex-shrink-0 w-2 h-2 rounded-full bg-primary" />
            <span className="text-sm font-medium text-foreground">{item.text}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const features = [
  {
    Icon: DollarSign,
    name: "Comment ces SaaS gagnent de l'argent",
    description: "Modèles économiques, pricing, upsells.",
    href: "/blog",
    cta: "Voir les analyses",
    className: "col-span-3 lg:col-span-2",
    background: <RevenueAnimation />,
  },
  {
    Icon: Users,
    name: "Comment ils trouvent leurs utilisateurs",
    description: "SEO, contenu, pub, affiliations, etc.",
    href: "/blog",
    cta: "Voir les analyses",
    className: "col-span-3 lg:col-span-1",
    background: <UserAcquisitionAnimation />,
  },
  {
    Icon: Wrench,
    name: "Les outils qu'ils utilisent",
    description: "Stack no-code, marketing, automatisation, support.",
    href: "/blog",
    cta: "Voir les analyses",
    className: "col-span-3 lg:col-span-1",
    background: <ToolsAnimation />,
  },
  {
    Icon: RefreshCcw,
    name: "Ce que tu peux réutiliser pour ton projet",
    description: "Stratégies concrètes applicables même en solo.",
    href: "/blog",
    cta: "Voir les analyses",
    className: "col-span-3 lg:col-span-2",
    background: <ReuseAnimation />,
  },
];

export function WhatYouLearnSection() {
  return (
    <section className="relative px-4 py-24 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <BlurFade delay={0.1} inView>
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight">
              Ce que tu vas{" "}
              <span className="bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
                vraiment apprendre
              </span>{" "}
              ici
            </h2>
          </div>
        </BlurFade>

        {/* Bento Grid */}
        <BlurFade delay={0.2} inView>
          <BentoGrid className="auto-rows-[20rem]">
            {features.map((feature, idx) => (
              <BentoCard key={idx} {...feature} />
            ))}
          </BentoGrid>
        </BlurFade>

        {/* Bottom Message */}
        <BlurFade delay={0.6} inView>
          <div className="mt-12 text-center">
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              👉 SaaS Anatomy est fait pour être{" "}
              <span className="font-semibold text-foreground">utile</span>, pas juste
              informatif.
            </p>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
