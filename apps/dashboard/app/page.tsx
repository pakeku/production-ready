"use client";

import { useTheme } from "@repo/ui";
import { useState } from "react";

export default function DashboardPage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [activeNav, setActiveNav] = useState("overview");

  const colors = {
    background: isDark ? "#1C1B1F" : "#FFFBFE",
    backgroundStrong: isDark ? "#2B2930" : "#F3EDF7",
    sidebar: isDark ? "#141316" : "#F3EDF7",
    text: isDark ? "#E6E1E5" : "#1C1B1F",
    subtle: isDark ? "#938F99" : "#79747E",
    accent: "#6750A4",
    accentLight: isDark ? "#D0BCFF" : "#EADDFF",
    border: isDark ? "#49454F" : "#CAC4D0",
    success: "#4CAF50",
    warning: "#FF9800",
    error: "#F44336",
  };

  const navItems = [
    { id: "overview", icon: "📊", label: "Overview" },
    { id: "reservations", icon: "📅", label: "Reservations" },
    { id: "rooms", icon: "🚪", label: "Rooms" },
    { id: "guests", icon: "👥", label: "Guests" },
    { id: "services", icon: "🛎️", label: "Services" },
    { id: "analytics", icon: "📈", label: "Analytics" },
    { id: "settings", icon: "⚙️", label: "Settings" },
  ];

  const stats = [
    { label: "Total Guests", value: "127", change: "+12%", icon: "👥", color: colors.accent },
    { label: "Rooms Occupied", value: "84/120", change: "70%", icon: "🛏️", color: colors.success },
    { label: "Today's Revenue", value: "$12,450", change: "+8%", icon: "💰", color: "#4CAF50" },
    { label: "Pending Requests", value: "23", change: "-5", icon: "📋", color: colors.warning },
  ];

  const recentActivity = [
    { time: "2 min ago", event: "Room 304 checked in", type: "checkin" },
    { time: "15 min ago", event: "Room service: Room 512", type: "service" },
    { time: "32 min ago", event: "Spa booking: Room 208", type: "booking" },
    { time: "1 hr ago", event: "Room 401 checked out", type: "checkout" },
    { time: "2 hr ago", event: "Maintenance: Room 115", type: "maintenance" },
  ];

  const rooms = [
    { number: "101", status: "occupied", guest: "John Smith", checkout: "Feb 8" },
    { number: "102", status: "available", guest: null, checkout: null },
    { number: "103", status: "cleaning", guest: null, checkout: null },
    { number: "104", status: "occupied", guest: "Sarah Johnson", checkout: "Feb 10" },
    { number: "105", status: "maintenance", guest: null, checkout: null },
    { number: "106", status: "occupied", guest: "Michael Brown", checkout: "Feb 7" },
    { number: "107", status: "available", guest: null, checkout: null },
    { number: "108", status: "occupied", guest: "Emily Davis", checkout: "Feb 9" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "occupied": return colors.success;
      case "available": return colors.accent;
      case "cleaning": return colors.warning;
      case "maintenance": return colors.error;
      default: return colors.subtle;
    }
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: colors.background, fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}>
      <style>{`
        @media (max-width: 768px) {
          .dashboard-sidebar { width: 60px !important; }
          .dashboard-sidebar .nav-label { display: none !important; }
          .dashboard-sidebar .logo-text { display: none !important; }
          .dashboard-main { margin-left: 60px !important; }
          .stats-grid { grid-template-columns: 1fr 1fr !important; }
          .content-grid { grid-template-columns: 1fr !important; }
          .rooms-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>

      {/* Sidebar */}
      <aside className="dashboard-sidebar" style={{
        width: 240,
        backgroundColor: colors.sidebar,
        borderRight: `1px solid ${colors.border}`,
        position: "fixed",
        top: 0,
        left: 0,
        bottom: 0,
        display: "flex",
        flexDirection: "column",
        zIndex: 100,
      }}>
        {/* Logo */}
        <div style={{ padding: 20, borderBottom: `1px solid ${colors.border}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 24, color: colors.accent }}>✦</span>
            <span className="logo-text" style={{ fontSize: 18, fontWeight: 700, color: colors.text }}>Self-Service</span>
          </div>
          <p className="logo-text" style={{ fontSize: 12, color: colors.subtle, margin: "8px 0 0" }}>Admin Dashboard</p>
        </div>

        {/* Navigation */}
        <nav style={{ flex: 1, padding: "16px 12px" }}>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveNav(item.id)}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "12px 16px",
                marginBottom: 4,
                backgroundColor: activeNav === item.id ? colors.accentLight : "transparent",
                border: "none",
                borderRadius: 12,
                cursor: "pointer",
                transition: "background-color 0.2s",
              }}
            >
              <span style={{ fontSize: 18 }}>{item.icon}</span>
              <span className="nav-label" style={{
                fontSize: 14,
                fontWeight: activeNav === item.id ? 600 : 400,
                color: activeNav === item.id ? colors.accent : colors.text,
              }}>{item.label}</span>
            </button>
          ))}
        </nav>

        {/* User */}
        <div style={{ padding: 16, borderTop: `1px solid ${colors.border}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              backgroundColor: colors.accent,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontWeight: 600,
              fontSize: 14,
            }}>
              JD
            </div>
            <div className="logo-text">
              <p style={{ fontSize: 14, fontWeight: 500, color: colors.text, margin: 0 }}>Jane Doe</p>
              <p style={{ fontSize: 12, color: colors.subtle, margin: 0 }}>Manager</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="dashboard-main" style={{ flex: 1, marginLeft: 240, padding: 24 }}>
        {/* Header */}
        <header style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 32,
        }}>
          <div>
            <h1 style={{ fontSize: 28, fontWeight: 700, color: colors.text, margin: 0 }}>
              Good morning, Jane 👋
            </h1>
            <p style={{ fontSize: 14, color: colors.subtle, margin: "4px 0 0" }}>
              Here's what's happening at your property today.
            </p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <button style={{
              padding: "10px 20px",
              backgroundColor: colors.accent,
              color: "white",
              border: "none",
              borderRadius: 10,
              fontSize: 14,
              fontWeight: 600,
              cursor: "pointer",
            }}>
              + New Booking
            </button>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="stats-grid" style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 20,
          marginBottom: 32,
        }}>
          {stats.map((stat) => (
            <div key={stat.label} style={{
              backgroundColor: colors.backgroundStrong,
              borderRadius: 16,
              padding: 24,
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <p style={{ fontSize: 13, color: colors.subtle, margin: 0 }}>{stat.label}</p>
                  <p style={{ fontSize: 28, fontWeight: 700, color: colors.text, margin: "8px 0 0" }}>{stat.value}</p>
                </div>
                <div style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  backgroundColor: stat.color + "20",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 22,
                }}>
                  {stat.icon}
                </div>
              </div>
              <p style={{
                fontSize: 13,
                color: stat.change.startsWith("+") ? colors.success : stat.change.startsWith("-") ? colors.error : colors.subtle,
                margin: "12px 0 0",
              }}>
                {stat.change} from yesterday
              </p>
            </div>
          ))}
        </div>

        {/* Content Grid */}
        <div className="content-grid" style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: 24,
        }}>
          {/* Room Status */}
          <div style={{
            backgroundColor: colors.backgroundStrong,
            borderRadius: 16,
            padding: 24,
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <h2 style={{ fontSize: 18, fontWeight: 600, color: colors.text, margin: 0 }}>Room Status</h2>
              <div style={{ display: "flex", gap: 16 }}>
                {["occupied", "available", "cleaning", "maintenance"].map((status) => (
                  <div key={status} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <div style={{
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      backgroundColor: getStatusColor(status),
                    }} />
                    <span style={{ fontSize: 12, color: colors.subtle, textTransform: "capitalize" }}>{status}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rooms-grid" style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 12,
            }}>
              {rooms.map((room) => (
                <div key={room.number} style={{
                  backgroundColor: colors.background,
                  borderRadius: 12,
                  padding: 16,
                  border: `1px solid ${colors.border}`,
                  cursor: "pointer",
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                    <span style={{ fontSize: 16, fontWeight: 600, color: colors.text }}>{room.number}</span>
                    <div style={{
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      backgroundColor: getStatusColor(room.status),
                    }} />
                  </div>
                  {room.guest ? (
                    <>
                      <p style={{ fontSize: 13, color: colors.text, margin: 0 }}>{room.guest}</p>
                      <p style={{ fontSize: 12, color: colors.subtle, margin: "4px 0 0" }}>Checkout: {room.checkout}</p>
                    </>
                  ) : (
                    <p style={{ fontSize: 13, color: colors.subtle, margin: 0, textTransform: "capitalize" }}>{room.status}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div style={{
            backgroundColor: colors.backgroundStrong,
            borderRadius: 16,
            padding: 24,
          }}>
            <h2 style={{ fontSize: 18, fontWeight: 600, color: colors.text, margin: "0 0 20px" }}>Recent Activity</h2>
            <div>
              {recentActivity.map((activity, i) => (
                <div key={i} style={{
                  display: "flex",
                  gap: 12,
                  padding: "12px 0",
                  borderBottom: i < recentActivity.length - 1 ? `1px solid ${colors.border}` : "none",
                }}>
                  <div style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    backgroundColor: colors.background,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 16,
                  }}>
                    {activity.type === "checkin" ? "🟢" :
                     activity.type === "checkout" ? "🔴" :
                     activity.type === "service" ? "🛎️" :
                     activity.type === "booking" ? "📅" : "🔧"}
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 14, color: colors.text, margin: 0 }}>{activity.event}</p>
                    <p style={{ fontSize: 12, color: colors.subtle, margin: "4px 0 0" }}>{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
