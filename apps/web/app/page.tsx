"use client";

import { Button, useTheme, SwitchTheme } from "@repo/ui";

export default function Page() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const colors = {
    background: isDark ? "#1C1B1F" : "#FFFBFE",
    backgroundStrong: isDark ? "#2B2930" : "#F3EDF7",
    text: isDark ? "#E6E1E5" : "#1C1B1F",
    subtle: isDark ? "#938F99" : "#79747E",
    accent: "#6750A4",
    accentLight: isDark ? "#D0BCFF" : "#EADDFF",
    border: isDark ? "#49454F" : "#CAC4D0",
  };

  const features = [
    {
      icon: "📱",
      title: "Mobile Check-In",
      description:
        "Guests check in from their phone. Skip the front desk, go straight to their room.",
    },
    {
      icon: "🛎️",
      title: "Room Service",
      description:
        "Order food, request housekeeping, or call maintenance - all from the app.",
    },
    {
      icon: "🏊",
      title: "Amenities Booking",
      description:
        "Book spa appointments, reserve pool cabanas, or schedule gym sessions.",
    },
    {
      icon: "📍",
      title: "Local Exploration",
      description:
        "Curated recommendations for restaurants, attractions, and experiences.",
    },
  ];

  const stats = [
    { value: "40%", label: "Faster Check-In" },
    { value: "3x", label: "More Upsells" },
    { value: "92%", label: "Guest Satisfaction" },
    { value: "24/7", label: "Self-Service" },
  ];

  const phoneScreens = [
    { emoji: "🏠", title: "Home Screen", subtitle: "Room info & quick actions", color: colors.accent, label: "Welcome & Room Info" },
    { emoji: "🛎️", title: "Room Service", subtitle: "Order & request anything", color: "#7D5260", label: "Service Requests", offset: true },
    { emoji: "🏊", title: "Amenities", subtitle: "Book spa, pool & more", color: "#625B71", label: "Amenities Booking" },
  ];

  return (
    <div style={{ minHeight: "100vh", backgroundColor: colors.background, fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}>
      {/* Mobile-friendly styles */}
      <style>{`
        @media (max-width: 768px) {
          .main-nav { padding: 12px 16px !important; }
          .nav-links { display: none !important; }
          .nav-cta { display: none !important; }
          .mobile-cta { display: flex !important; }
          .hero-title { font-size: 36px !important; }
          .hero-subtitle { font-size: 16px !important; }
          .stats-container { gap: 24px !important; }
          .stat-value { font-size: 28px !important; }
          .phones-container { gap: 24px !important; }
          .phone-mockup { width: 220px !important; height: 440px !important; }
          .phone-offset { margin-top: 0 !important; }
          .section-title { font-size: 28px !important; }
          .feature-grid { gap: 16px !important; }
          .cta-title { font-size: 24px !important; }
          .footer-grid { flex-direction: column !important; gap: 32px !important; }
          .footer-links { display: none !important; }
          .footer-bottom { flex-direction: column !important; text-align: center !important; }
        }
      `}</style>

      {/* Navigation */}
      <nav className="main-nav" style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "16px 24px",
        backgroundColor: colors.background + "E6",
        backdropFilter: "blur(10px)",
      }}>
        <a href="/" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
          <span style={{ fontSize: 24, fontWeight: 700, color: colors.accent }}>✦</span>
          <span style={{ fontSize: 18, fontWeight: 700, color: colors.text }}>Self-Service</span>
        </a>
        <div className="nav-links" style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <a href="#features" style={{ color: colors.subtle, fontSize: 14, cursor: "pointer", textDecoration: "none" }}>Features</a>
          <a href="/contact" style={{ color: colors.subtle, fontSize: 14, cursor: "pointer", textDecoration: "none" }}>Contact</a>
          <a href="/dashboard" style={{ color: colors.subtle, fontSize: 14, cursor: "pointer", textDecoration: "none" }}>Login</a>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <SwitchTheme />
          <a href="/contact" className="nav-cta" style={{ display: "block", textDecoration: "none" }}><Button variant="primary" size="sm">Get Started</Button></a>
          <div className="mobile-cta" style={{ display: "none", alignItems: "center", gap: 16 }}>
            <a href="/dashboard" style={{ color: colors.subtle, fontSize: 14, textDecoration: "none" }}>Login</a>
            <a href="/contact" style={{ color: colors.accent, fontWeight: 600, fontSize: 14, textDecoration: "none" }}>Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{
        paddingTop: 120,
        paddingBottom: 60,
        paddingLeft: 20,
        paddingRight: 20,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}>
        <div style={{
          backgroundColor: colors.accentLight,
          padding: "8px 16px",
          borderRadius: 20,
          marginBottom: 24,
        }}>
          <span style={{ color: colors.accent, fontSize: 14, fontWeight: 600 }}>✨ The future of hospitality</span>
        </div>

        <h1 className="hero-title" style={{
          fontSize: 56,
          fontWeight: 800,
          color: colors.text,
          lineHeight: 1.1,
          maxWidth: 800,
          margin: 0,
        }}>
          Your Hotel, In Every Guest's Pocket
        </h1>

        <p className="hero-subtitle" style={{
          fontSize: 20,
          color: colors.subtle,
          marginTop: 24,
          maxWidth: 600,
          lineHeight: 1.6,
        }}>
          Transform guest experience with our all-in-one hospitality platform.
          Check-in, room service, amenities, and local discovery — seamlessly integrated.
        </p>

        <div style={{ display: "flex", gap: 16, marginTop: 32, flexWrap: "wrap", justifyContent: "center" }}>
          <a href="/contact" style={{ textDecoration: "none" }}><Button variant="primary" size="lg">Request Demo</Button></a>
          <a href="/contact" style={{ textDecoration: "none" }}><Button variant="secondary" size="lg">Contact Sales</Button></a>
        </div>

        {/* Stats */}
        <div className="stats-container" style={{
          display: "flex",
          gap: 48,
          marginTop: 64,
          flexWrap: "wrap",
          justifyContent: "center",
        }}>
          {stats.map((stat) => (
            <div key={stat.label} style={{ textAlign: "center" }}>
              <div className="stat-value" style={{ fontSize: 36, fontWeight: 700, color: colors.accent }}>{stat.value}</div>
              <div style={{ fontSize: 14, color: colors.subtle }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Phone Mockups Section */}
      <section style={{ padding: "48px 20px", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <span style={{
            fontSize: 14,
            fontWeight: 600,
            color: colors.accent,
            textTransform: "uppercase",
            letterSpacing: 1,
          }}>Mobile Experience</span>
          <h2 className="section-title" style={{ fontSize: 40, fontWeight: 700, color: colors.text, marginTop: 8 }}>
            Beautiful. Intuitive. Powerful.
          </h2>
        </div>

        <div className="phones-container" style={{
          display: "flex",
          justifyContent: "center",
          gap: 32,
          flexWrap: "wrap",
          padding: "32px 0",
        }}>
          {phoneScreens.map((screen) => (
            <div key={screen.title} className={screen.offset ? "phone-offset" : ""} style={{ textAlign: "center", marginTop: screen.offset ? 40 : 0 }}>
              <div className="phone-mockup" style={{
                width: 280,
                height: 560,
                borderRadius: 40,
                border: `8px solid ${colors.border}`,
                backgroundColor: colors.backgroundStrong,
                overflow: "hidden",
                position: "relative",
              }}>
                {/* Notch */}
                <div style={{
                  position: "absolute",
                  top: 0,
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: 80,
                  height: 24,
                  backgroundColor: colors.border,
                  borderBottomLeftRadius: 16,
                  borderBottomRightRadius: 16,
                }} />
                {/* Screen Content */}
                <div style={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 12,
                  backgroundColor: screen.color,
                }}>
                  <span style={{ fontSize: 48 }}>{screen.emoji}</span>
                  <span style={{ color: "white", fontWeight: 600 }}>{screen.title}</span>
                  <span style={{ color: "rgba(255,255,255,0.8)", fontSize: 12 }}>{screen.subtitle}</span>
                </div>
              </div>
              <p style={{ color: colors.subtle, fontSize: 14, marginTop: 16 }}>{screen.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section id="features" style={{ backgroundColor: colors.backgroundStrong, padding: "60px 20px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <span style={{
              fontSize: 14,
              fontWeight: 600,
              color: colors.accent,
              textTransform: "uppercase",
              letterSpacing: 1,
            }}>Features</span>
            <h2 className="section-title" style={{ fontSize: 40, fontWeight: 700, color: colors.text, marginTop: 8 }}>
              Everything Your Guests Need
            </h2>
          </div>

          <div className="feature-grid" style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 24,
            justifyContent: "center",
          }}>
            {features.map((feature) => (
              <div key={feature.title} style={{
                flex: "1 1 280px",
                maxWidth: 320,
                padding: 24,
                backgroundColor: colors.background,
                borderRadius: 16,
                border: `1px solid ${colors.border}`,
              }}>
                <div style={{
                  width: 56,
                  height: 56,
                  borderRadius: 16,
                  backgroundColor: colors.accentLight,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 28,
                  marginBottom: 16,
                }}>
                  {feature.icon}
                </div>
                <h3 style={{ fontSize: 20, fontWeight: 600, color: colors.text, margin: 0 }}>
                  {feature.title}
                </h3>
                <p style={{ fontSize: 15, color: colors.subtle, lineHeight: 1.6, marginTop: 8 }}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ padding: "60px 20px", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{
          backgroundColor: colors.accent,
          borderRadius: 24,
          padding: "40px 24px",
          textAlign: "center",
        }}>
          <h2 className="cta-title" style={{ fontSize: 36, fontWeight: 700, color: "white", margin: 0 }}>
            Ready to Transform Your Property?
          </h2>
          <p style={{
            fontSize: 16,
            color: "rgba(255,255,255,0.8)",
            maxWidth: 500,
            margin: "16px auto 0",
          }}>
            Join hundreds of hotels already using Self-Service to delight their guests.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", marginTop: 32, flexWrap: "wrap" }}>
            <a href="/contact" style={{ textDecoration: "none" }}>
              <button style={{
                padding: "12px 24px",
                fontSize: 16,
                fontWeight: 600,
                backgroundColor: "white",
                color: colors.accent,
                border: "none",
                borderRadius: 24,
                cursor: "pointer",
              }}>
                Schedule a Demo
              </button>
            </a>
            <a href="/contact" style={{ textDecoration: "none" }}>
              <button style={{
                padding: "12px 24px",
                fontSize: 16,
                fontWeight: 600,
                backgroundColor: "transparent",
                color: "white",
                border: "2px solid white",
                borderRadius: 24,
                cursor: "pointer",
              }}>
                Contact Sales
              </button>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ backgroundColor: colors.backgroundStrong, padding: "48px 20px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="footer-grid" style={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 48,
          }}>
            <div style={{ maxWidth: 300 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                <span style={{ fontSize: 24, fontWeight: 700, color: colors.accent }}>✦</span>
                <span style={{ fontSize: 20, fontWeight: 700, color: colors.text }}>Self-Service</span>
              </div>
              <p style={{ fontSize: 14, color: colors.subtle, lineHeight: 1.6 }}>
                The modern hospitality platform that puts your hotel in every guest's pocket.
              </p>
            </div>

            {[
              { title: "Product", items: ["Features", "Pricing", "Integrations"] },
              { title: "Company", items: ["About", "Blog", "Careers"] },
              { title: "Support", items: ["Help Center", "Contact", "Status"] },
            ].map((section) => (
              <div key={section.title} className="footer-links">
                <h4 style={{ fontSize: 14, fontWeight: 600, color: colors.text, margin: "0 0 12px" }}>
                  {section.title}
                </h4>
                {section.items.map((item) => (
                  <p key={item} style={{ fontSize: 14, color: colors.subtle, margin: "8px 0", cursor: "pointer" }}>
                    {item}
                  </p>
                ))}
              </div>
            ))}
          </div>

          <div className="footer-bottom" style={{
            borderTop: `1px solid ${colors.border}`,
            marginTop: 32,
            paddingTop: 32,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 16,
          }}>
            <span style={{ fontSize: 13, color: colors.subtle }}>© 2026 Self-Service. All rights reserved.</span>
            <div style={{ display: "flex", gap: 24 }}>
              <span style={{ fontSize: 13, color: colors.subtle, cursor: "pointer" }}>Privacy</span>
              <span style={{ fontSize: 13, color: colors.subtle, cursor: "pointer" }}>Terms</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
