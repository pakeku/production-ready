"use client";

import { useState } from "react";
import { Button, useTheme } from "@repo/ui";

export default function ContactPage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [submitted, setSubmitted] = useState(false);

  const colors = {
    background: isDark ? "#1C1B1F" : "#FFFBFE",
    backgroundStrong: isDark ? "#2B2930" : "#F3EDF7",
    text: isDark ? "#E6E1E5" : "#1C1B1F",
    subtle: isDark ? "#938F99" : "#79747E",
    accent: "#6750A4",
    accentLight: isDark ? "#D0BCFF" : "#EADDFF",
    border: isDark ? "#49454F" : "#CAC4D0",
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: colors.background, fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}>
      <style>{`
        .contact-form-card input, .contact-form-card select, .contact-form-card textarea {
          box-sizing: border-box;
        }
        @media (max-width: 768px) {
          .contact-nav { padding: 12px 16px !important; }
          .contact-nav-links { display: none !important; }
          .contact-nav-cta { display: none !important; }
          .contact-mobile-cta { display: flex !important; }
          .contact-main { padding-left: 20px !important; padding-right: 20px !important; padding-top: 100px !important; }
          .contact-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
          .contact-title { font-size: 32px !important; }
          .contact-form-row { grid-template-columns: 1fr !important; }
          .contact-form-card { padding: 24px !important; }
          .footer-grid { flex-direction: column !important; gap: 32px !important; }
          .footer-links { display: none !important; }
          .footer-bottom { flex-direction: column !important; text-align: center !important; }
        }
      `}</style>
      {/* Navigation */}
      <nav className="contact-nav" style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "16px 32px",
        backgroundColor: colors.background + "E6",
        backdropFilter: "blur(10px)",
      }}>
        <a href="/" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
          <span style={{ fontSize: 24, fontWeight: 700, color: colors.accent }}>✦</span>
          <span style={{ fontSize: 20, fontWeight: 700, color: colors.text }}>Self-Service</span>
        </a>
        <div className="contact-nav-links" style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <a href="/#features" style={{ color: colors.subtle, fontSize: 14, cursor: "pointer", textDecoration: "none" }}>Features</a>
          <a href="/contact" style={{ color: colors.text, fontSize: 14, cursor: "pointer", textDecoration: "none", fontWeight: 500 }}>Contact</a>
          <a href="/dashboard" style={{ color: colors.subtle, fontSize: 14, cursor: "pointer", textDecoration: "none" }}>Login</a>
          <a href="/contact" className="contact-nav-cta" style={{ textDecoration: "none" }}><Button variant="primary" size="sm">Get Started</Button></a>
        </div>
        <div className="contact-mobile-cta" style={{ display: "none", alignItems: "center", gap: 16 }}>
          <a href="/dashboard" style={{ color: colors.subtle, fontSize: 14, textDecoration: "none" }}>Login</a>
          <a href="/" style={{ color: colors.accent, fontWeight: 600, fontSize: 14, textDecoration: "none" }}>Home</a>
        </div>
      </nav>

      {/* Main Content */}
      <main className="contact-main" style={{
        paddingTop: 120,
        paddingBottom: 80,
        paddingLeft: 32,
        paddingRight: 32,
        maxWidth: 1200,
        margin: "0 auto",
      }}>
        <div className="contact-grid" style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 64,
          alignItems: "start",
        }}>
          {/* Left Column - Info */}
          <div>
            <div style={{
              backgroundColor: colors.accentLight,
              padding: "8px 16px",
              borderRadius: 20,
              display: "inline-block",
              marginBottom: 24,
            }}>
              <span style={{ color: colors.accent, fontSize: 14, fontWeight: 600 }}>💬 Let's Talk</span>
            </div>

            <h1 className="contact-title" style={{
              fontSize: 48,
              fontWeight: 800,
              color: colors.text,
              lineHeight: 1.1,
              margin: 0,
            }}>
              Get in Touch
            </h1>

            <p style={{
              fontSize: 18,
              color: colors.subtle,
              marginTop: 16,
              lineHeight: 1.6,
            }}>
              Ready to transform your guest experience? Our team is here to answer your questions about pricing, features, and implementation.
            </p>

            {/* Benefits */}
            <div style={{ marginTop: 40 }}>
              {[
                { icon: "📞", title: "Free Consultation", desc: "30-minute call with our team" },
                { icon: "💰", title: "Custom Pricing", desc: "Plans tailored to your property size" },
                { icon: "🚀", title: "Quick Setup", desc: "Go live in as little as 2 weeks" },
              ].map((item) => (
                <div key={item.title} style={{
                  display: "flex",
                  gap: 16,
                  alignItems: "flex-start",
                  marginBottom: 24,
                }}>
                  <div style={{
                    width: 48,
                    height: 48,
                    borderRadius: 12,
                    backgroundColor: colors.backgroundStrong,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 24,
                  }}>
                    {item.icon}
                  </div>
                  <div>
                    <h3 style={{ fontSize: 16, fontWeight: 600, color: colors.text, margin: 0 }}>{item.title}</h3>
                    <p style={{ fontSize: 14, color: colors.subtle, margin: "4px 0 0" }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Contact Info */}
            <div style={{
              marginTop: 40,
              padding: 24,
              backgroundColor: colors.backgroundStrong,
              borderRadius: 16,
            }}>
              <h3 style={{ fontSize: 14, fontWeight: 600, color: colors.subtle, margin: "0 0 16px", textTransform: "uppercase", letterSpacing: 1 }}>
                Or reach us directly
              </h3>
              <p style={{ fontSize: 15, color: colors.text, margin: "8px 0" }}>
                📧 sales@selfservice.io
              </p>
              <p style={{ fontSize: 15, color: colors.text, margin: "8px 0" }}>
                📱 +1 (555) 123-4567
              </p>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="contact-form-card" style={{
            backgroundColor: colors.backgroundStrong,
            borderRadius: 24,
            padding: 40,
          }}>
            {submitted ? (
              <div style={{ textAlign: "center", padding: "40px 0" }}>
                <div style={{ fontSize: 64, marginBottom: 24 }}>✅</div>
                <h2 style={{ fontSize: 28, fontWeight: 700, color: colors.text, margin: 0 }}>
                  Thanks for reaching out!
                </h2>
                <p style={{ fontSize: 16, color: colors.subtle, marginTop: 12 }}>
                  We'll get back to you within 24 hours.
                </p>
                <a href="/" style={{ display: "inline-block", marginTop: 24, textDecoration: "none" }}>
                  <Button variant="secondary" size="md">Back to Home</Button>
                </a>
              </div>
            ) : (
              <>
                <h2 style={{ fontSize: 24, fontWeight: 700, color: colors.text, margin: "0 0 8px" }}>
                  Request a Demo
                </h2>
                <p style={{ fontSize: 14, color: colors.subtle, margin: "0 0 32px" }}>
                  Fill out the form and we'll be in touch shortly.
                </p>

                <form onSubmit={handleSubmit}>
                  <div className="contact-form-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                    <div>
                      <label style={{ fontSize: 14, fontWeight: 500, color: colors.text, display: "block", marginBottom: 8 }}>
                        First Name
                      </label>
                      <input
                        type="text"
                        required
                        style={{
                          width: "100%",
                          padding: "12px 16px",
                          fontSize: 15,
                          border: `1px solid ${colors.border}`,
                          borderRadius: 12,
                          backgroundColor: colors.background,
                          color: colors.text,
                          outline: "none",
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: 14, fontWeight: 500, color: colors.text, display: "block", marginBottom: 8 }}>
                        Last Name
                      </label>
                      <input
                        type="text"
                        required
                        style={{
                          width: "100%",
                          padding: "12px 16px",
                          fontSize: 15,
                          border: `1px solid ${colors.border}`,
                          borderRadius: 12,
                          backgroundColor: colors.background,
                          color: colors.text,
                          outline: "none",
                        }}
                      />
                    </div>
                  </div>

                  <div style={{ marginBottom: 16 }}>
                    <label style={{ fontSize: 14, fontWeight: 500, color: colors.text, display: "block", marginBottom: 8 }}>
                      Work Email
                    </label>
                    <input
                      type="email"
                      required
                      style={{
                        width: "100%",
                        padding: "12px 16px",
                        fontSize: 15,
                        border: `1px solid ${colors.border}`,
                        borderRadius: 12,
                        backgroundColor: colors.background,
                        color: colors.text,
                        outline: "none",
                      }}
                    />
                  </div>

                  <div style={{ marginBottom: 16 }}>
                    <label style={{ fontSize: 14, fontWeight: 500, color: colors.text, display: "block", marginBottom: 8 }}>
                      Property Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., Grand Hotel & Resort"
                      style={{
                        width: "100%",
                        padding: "12px 16px",
                        fontSize: 15,
                        border: `1px solid ${colors.border}`,
                        borderRadius: 12,
                        backgroundColor: colors.background,
                        color: colors.text,
                        outline: "none",
                      }}
                    />
                  </div>

                  <div style={{ marginBottom: 16 }}>
                    <label style={{ fontSize: 14, fontWeight: 500, color: colors.text, display: "block", marginBottom: 8 }}>
                      Number of Rooms
                    </label>
                    <select
                      required
                      style={{
                        width: "100%",
                        padding: "12px 16px",
                        fontSize: 15,
                        border: `1px solid ${colors.border}`,
                        borderRadius: 12,
                        backgroundColor: colors.background,
                        color: colors.text,
                        outline: "none",
                      }}
                    >
                      <option value="">Select...</option>
                      <option value="1-50">1-50 rooms</option>
                      <option value="51-100">51-100 rooms</option>
                      <option value="101-250">101-250 rooms</option>
                      <option value="251-500">251-500 rooms</option>
                      <option value="500+">500+ rooms</option>
                    </select>
                  </div>

                  <div style={{ marginBottom: 24 }}>
                    <label style={{ fontSize: 14, fontWeight: 500, color: colors.text, display: "block", marginBottom: 8 }}>
                      Message (Optional)
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Tell us about your needs..."
                      style={{
                        width: "100%",
                        padding: "12px 16px",
                        fontSize: 15,
                        border: `1px solid ${colors.border}`,
                        borderRadius: 12,
                        backgroundColor: colors.background,
                        color: colors.text,
                        outline: "none",
                        resize: "vertical",
                        fontFamily: "inherit",
                      }}
                    />
                  </div>

                  <button
                    type="submit"
                    style={{
                      width: "100%",
                      padding: "14px 24px",
                      fontSize: 16,
                      fontWeight: 600,
                      backgroundColor: colors.accent,
                      color: "white",
                      border: "none",
                      borderRadius: 12,
                      cursor: "pointer",
                    }}
                  >
                    Request Demo
                  </button>

                  <p style={{ fontSize: 12, color: colors.subtle, textAlign: "center", marginTop: 16 }}>
                    By submitting, you agree to our Privacy Policy and Terms of Service.
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </main>

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
