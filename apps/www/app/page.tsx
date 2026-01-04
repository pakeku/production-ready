"use client";

import React from "react";
import { YStack, XStack, Text } from "tamagui";
import { ScreenCenter, Typography, SwitchTheme, Code } from "@repo/ui";

export default function Home() {
  return (
    <YStack background="$background" style={{ minHeight: "100vh", width: "100%" }}>
      {/* Header Navigation */}
      <XStack
        p="$4"
        background="$background"
        borderBottomWidth={1}
        style={{
          borderColor: "rgba(229, 231, 235, 0.5)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          position: "sticky",
          top: 0,
          zIndex: 100,
        }}
      >
        <Typography variant="h3" color="$blue10">
          🚀 PR;
        </Typography>
        <XStack gap="$4" style={{ alignItems: "center" }}>
          <Text fontSize="$3" style={{ cursor: "pointer", color: "#6b7280", display: "none" }} />
          <Text fontSize="$3" style={{ cursor: "pointer", color: "#6b7280", display: "none" }} />
          <SwitchTheme />
        </XStack>
      </XStack>

      {/* Hero Section */}
      <YStack
        p="$6"
        background="$background"
        style={{
          minHeight: "85vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "clamp(24px, 5vw, 96px)",
        }}
      >
        <YStack gap="$7" style={{ maxWidth: "100%", width: "100%", textAlign: "center" }}>
          {/* Main Headline */}
          <YStack gap="$4">
            <Typography variant="h1">
              Share Code. Everywhere.
            </Typography>
            <Text fontWeight="500" color="#4b5563" style={{ fontSize: "clamp(16px, 4vw, 28px)" }}>
              One design system. Web, mobile, native.
            </Text>
          </YStack>

          {/* Subheading */}
          <Typography variant="body">
            production-ready is a comprehensive monorepo setup that lets you
            build and maintain a single design system with Tamagui, documented
            in Storybook, and deployed seamlessly across web and mobile
            platforms.
          </Typography>

          {/* CTA Buttons */}
          <XStack 
            gap="$4" 
            style={{ 
              justifyContent: "center", 
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <YStack
              background="$accent10"
              p="$4"
              style={{
                borderRadius: 10,
                minWidth: "clamp(150px, 40vw, 200px)",
                cursor: "pointer",
                transition: "transform 0.2s",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text fontWeight="600" style={{ color: "white", fontSize: "clamp(14px, 3vw, 16px)", textAlign: "center" }}>
                Get Started →
              </Text>
            </YStack>
            <YStack
              background="$gray1"
              p="$4"
              style={{
                borderRadius: 10,
                minWidth: "clamp(150px, 40vw, 200px)",
                cursor: "pointer",
                borderColor: "$color5",
                borderWidth: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text fontWeight="600" fontSize="$4" style={{ textAlign: "center", fontSize: "clamp(14px, 3vw, 16px)" }}>
                View Storybook
              </Text>
            </YStack>
          </XStack>
        </YStack>
      </YStack>

      {/* Features Section */}
      <YStack gap="$8" p="$4" background="$background" style={{ padding: "clamp(24px, 5vw, 96px)" }}>
        <YStack gap="$3" style={{ maxWidth: "100%" }}>
          <Typography variant="h2">
            Built for Modern Development
          </Typography>
          <Typography variant="body" color="$gray11">
            Everything you need in one place
          </Typography>
        </YStack>

        <YStack gap="$5">
          {/* Feature Grid */}
          <XStack gap="$5" flexWrap="wrap" style={{ justifyContent: "space-between" }}>
            {[
              {
                icon: "📱",
                title: "Cross-Platform",
                desc: "Write once, deploy everywhere. Share components across web, iOS, and Android.",
              },
              {
                icon: "🎨",
                title: "Design System",
                desc: "Document and showcase every component with Storybook stories.",
              },
              {
                icon: "🎯",
                title: "Monorepo",
                desc: "Organized workspace for scalable, maintainable project structure.",
              },
              {
                icon: "🌓",
                title: "Theme Support",
                desc: "Built-in dark and light modes with React Context management.",
              },
            ].map((feature) => (
              <YStack
                key={feature.title}
                gap="$3"
                p="$5"
                background="$gray1"
                style={{
                  borderRadius: 12,
                  flex: 1,
                  minWidth: "clamp(250px, 45vw, 280px)",
                }}
              >
                <Text fontSize="$7" style={{ lineHeight: 1 }}>
                  {feature.icon}
                </Text>
                <Typography variant="h6">
                  {feature.title}
                </Typography>
                <Typography variant="body">
                  {feature.desc}
                </Typography>
              </YStack>
            ))}
          </XStack>
        </YStack>
      </YStack>

      {/* Components Showcase */}
      <YStack gap="$8" p="$4" background="$gray1" style={{ padding: "clamp(24px, 5vw, 96px)" }}>
        <YStack gap="$3" style={{ maxWidth: "100%" }}>
          <Typography variant="h2">
            Component Library
          </Typography>
          <Typography variant="body" color="$gray11">
            Production-ready UI components
          </Typography>
        </YStack>

        <XStack gap="$5" flexWrap="wrap" style={{ justifyContent: "space-between" }}>
          {[
            {
              title: "Switch Component",
              desc: "Toggle component with full TypeScript support. Perfect for theme switching and binary options.",
              code: `<Switch
  checked={theme === "dark"}
  onCheckedChange={setTheme}
/>`,
            },
            {
              title: "Typography System",
              desc: "Semantic heading levels (H1-H6) with consistent styling. Build with proper HTML semantics.",
              code: `<Typography variant="h1">
  Heading 1
</Typography>`,
            },
            {
              title: "Code Display",
              desc: "Display code snippets with language labels. Great for documentation and examples.",
              code: `<Code
  language="javascript"
  showLineNumbers
/>`,
            },
          ].map((component) => (
            <YStack
              key={component.title}
              gap="$4"
              p="$5"
              background="$background"
              style={{
                borderRadius: 12,
                flex: 1,
                minWidth: "clamp(280px, 45vw, 300px)",
                borderWidth: 1,
                borderColor: "$color5",
              }}
            >
              <Typography variant="h5">
                {component.title}
              </Typography>
              <Code language="tsx" showLineNumbers={true}>
                {component.code}
              </Code>
              <Typography variant="body" color="$gray11">
                {component.desc}
              </Typography>
            </YStack>
          ))}
        </XStack>
      </YStack>

      {/* Tech Stack */}
      <YStack gap="$8" p="$4" background="$background" style={{ padding: "clamp(24px, 5vw, 96px)" }}>
        <YStack gap="$3" style={{ maxWidth: "100%" }}>
          <Typography variant="h2">
            Built With
          </Typography>
          <Typography variant="body" color="$gray11">
            Modern tools and frameworks
          </Typography>
        </YStack>

        <XStack gap="$4" flexWrap="wrap" style={{ justifyContent: "center" }}>
          {[
            { name: "Tamagui", icon: "🎨" },
            { name: "React", icon: "⚛️" },
            { name: "Next.js", icon: "▲" },
            { name: "TypeScript", icon: "🔷" },
            { name: "Storybook", icon: "📚" },
            { name: "pnpm", icon: "📦" },
            { name: "Turbo", icon: "⚡" },
            { name: "React Native", icon: "📱" },
          ].map((tech) => (
            <YStack
              key={tech.name}
              background="$gray1"
              p="$4"
              style={{
                borderRadius: 10,
                minWidth: "clamp(120px, 20vw, 140px)",
                justifyContent: "center",
                alignItems: "center",
                gap: 8,
                cursor: "pointer",
                transition: "transform 0.2s",
              }}
            >
              <Text fontSize="$6">{tech.icon}</Text>
              <Text
                fontWeight="500"
                fontSize="$3"
                style={{ textAlign: "center", fontSize: "clamp(12px, 2.5vw, 14px)" }}
              >
                {tech.name}
              </Text>
            </YStack>
          ))}
        </XStack>
      </YStack>

      {/* Project Structure */}
      <YStack gap="$8" p="$4" background="$gray1" style={{ padding: "clamp(24px, 5vw, 96px)" }}>
        <YStack gap="$3" style={{ maxWidth: "100%" }}>
          <Typography variant="h2">
            Project Structure
          </Typography>
          <Typography variant="body" color="#6b7280">
            Organized for scale
          </Typography>
        </YStack>

        <YStack
          background="$background"
          p="$6"
          style={{ borderRadius: 12, padding: "clamp(16px, 4vw, 24px)" }}
          gap="$3"
        >
          <Code language="bash" showLineNumbers={false}>
            {`apps/
  ├── web          # Next.js web application
  ├── mobile       # React Native mobile app
  ├── storybook    # Component documentation
  └── www          # Marketing landing page

packages/
  ├── ui           # Shared UI components
  ├── core         # Core business logic
  └── utils        # Utility functions`}
          </Code>
        </YStack>
      </YStack>

      {/* CTA Section */}
      <YStack
        gap="$8"
        p="$4"
        background="$background"
        style={{ 
          minHeight: "80vh", 
          display: "flex", 
          justifyContent: "center", 
          alignItems: "center",
          padding: "clamp(24px, 5vw, 96px)",
        }}
      >
        <YStack gap="$6" style={{ maxWidth: "100%", textAlign: "center" }}>
          <Typography variant="h2">
            Ready to Build?
          </Typography>
          <Typography variant="body" color="#6b7280">
            Start building your next project with a production-ready design
            system that scales with you.
          </Typography>
          <XStack gap="$4" style={{ justifyContent: "center", flexWrap: "wrap" }}>
              <YStack
                background="$accent10"
                p="$4"
                style={{
                  borderRadius: 10,
                  minWidth: "clamp(150px, 40vw, 220px)",
                  cursor: "pointer",
                  transition: "transform 0.2s",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  fontWeight="600"
                  style={{
                    color: "white",
                    fontSize: "clamp(14px, 3vw, 16px)",
                    textAlign: "center",
                  }}
                >
                  Get Started Now →
                </Text>
              </YStack>
            </XStack>
        </YStack>
      </YStack>

      {/* Footer */}
      <YStack
        p="$8"
        background="$gray1"
        borderTopWidth={1}
        style={{ borderColor: "rgba(229, 231, 235, 0.5)", padding: "clamp(24px, 5vw, 96px)" }}
        gap="$8"
      >
        {/* Footer Content */}
        <YStack gap="$8" style={{ width: "100%" }}>
          {/* Brand Section */}
          <YStack gap="$4" style={{ maxWidth: "100%", paddingBottom: "clamp(16px, 4vw, 24px)", borderBottomWidth: 1, borderColor: "rgba(229, 231, 235, 0.5)" }}>
            <Typography variant="h4">
              🚀 PR;
            </Typography>
            <Typography variant="body" color="$gray11">
              Production Ready App (PR;) is a powerful tool focused on making standard apps with shared UI that look and feel the same. Ready for development, this project provides a launchpad for SaaS applications, handling the basic maintenance and setup so you can focus on building.
            </Typography>
          </YStack>

          {/* Links Sections */}
          <XStack gap="$8" flexWrap="wrap" style={{ justifyContent: "space-between", width: "100%" }}>
            {/* Product Links */}
            <YStack gap="$3" style={{ flex: "0 0 auto", minWidth: "clamp(140px, 15vw, 180px)" }}>
              <Typography variant="h6">
                Product
              </Typography>
              <YStack gap="$3">
                {["Components", "Storybook", "Documentation"].map((link) => (
                  <Text key={link} fontSize="$3" style={{ cursor: "pointer", color: "#6b7280", fontSize: "clamp(13px, 3vw, 15px)", paddingVertical: 6 }}>
                    {link}
                  </Text>
                ))}
              </YStack>
            </YStack>

            {/* Resources Links */}
            <YStack gap="$3" style={{ flex: "0 0 auto", minWidth: "clamp(140px, 15vw, 180px)" }}>
              <Typography variant="h6">
                Resources
              </Typography>
              <YStack gap="$3">
                {["GitHub", "Issues", "Discussions"].map((link) => (
                  <Text key={link} fontSize="$3" style={{ cursor: "pointer", color: "#6b7280", fontSize: "clamp(13px, 3vw, 15px)", paddingVertical: 6 }}>
                    {link}
                  </Text>
                ))}
              </YStack>
            </YStack>

            {/* Legal Links */}
            <YStack gap="$3" style={{ flex: "0 0 auto", minWidth: "clamp(140px, 15vw, 180px)" }}>
              <Typography variant="h6">
                Legal
              </Typography>
              <YStack gap="$3">
                {["License", "Privacy", "Terms"].map((link) => (
                  <Text key={link} fontSize="$3" style={{ cursor: "pointer", color: "#6b7280", fontSize: "clamp(13px, 3vw, 15px)", paddingVertical: 6 }}>
                    {link}
                  </Text>
                ))}
              </YStack>
            </YStack>
          </XStack>
        </YStack>

        {/* Divider */}
        <YStack
          borderTopWidth={1}
          style={{ borderColor: "rgba(229, 231, 235, 0.5)" }}
        />

        {/* Copyright Section */}
        <XStack style={{ justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "clamp(12px, 4vw, 24px)", width: "100%" }}>
          <Text fontSize="$2" style={{ color: "#9ca3af", fontSize: "clamp(12px, 2.5vw, 13px)", flex: "1 1 auto" }}>
            © 2026 production-ready. All rights reserved.
          </Text>
          <Text fontSize="$2" style={{ color: "#9ca3af", fontSize: "clamp(12px, 2.5vw, 13px)", flex: "1 1 auto", textAlign: "right" }}>
            Built with Tamagui, Next.js, and React Native
          </Text>
        </XStack>
      </YStack>
    </YStack>
  );
}
