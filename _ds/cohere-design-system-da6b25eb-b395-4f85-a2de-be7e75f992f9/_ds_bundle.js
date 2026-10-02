/* @ds-bundle: {"format":3,"namespace":"CohereDesignSystem_da6b25","components":[{"name":"Button","sourcePath":"components/actions/Button.jsx"},{"name":"Badge","sourcePath":"components/data-display/Badge.jsx"},{"name":"Chip","sourcePath":"components/data-display/Chip.jsx"},{"name":"MonoLabel","sourcePath":"components/data-display/MonoLabel.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"AnnouncementBar","sourcePath":"components/marketing/AnnouncementBar.jsx"},{"name":"TrustLogoStrip","sourcePath":"components/marketing/TrustLogoStrip.jsx"},{"name":"Card","sourcePath":"components/surfaces/Card.jsx"},{"name":"ProductCard","sourcePath":"components/surfaces/ProductCard.jsx"}],"sourceHashes":{"components/actions/Button.jsx":"8164a084ceda","components/data-display/Badge.jsx":"fc238a6f8573","components/data-display/Chip.jsx":"97df24f7bf25","components/data-display/MonoLabel.jsx":"aca249bbb042","components/forms/Input.jsx":"28bc1d9a0bd2","components/marketing/AnnouncementBar.jsx":"4585148a4549","components/marketing/TrustLogoStrip.jsx":"ec7355607960","components/surfaces/Card.jsx":"8debd6d8f318","components/surfaces/ProductCard.jsx":"72236d3330ed","ui_kits/website/App.jsx":"8e701a0e19dd","ui_kits/website/BlogView.jsx":"7681b270a8d9","ui_kits/website/Footer.jsx":"7c8fa6dc6199","ui_kits/website/HomeView.jsx":"9490515e57b4","ui_kits/website/Nav.jsx":"4868193341d1","ui_kits/website/ResearchView.jsx":"e3d0f690c173","ui_kits/website/data.js":"f15c0fe2e830"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.CohereDesignSystem_da6b25 = window.CohereDesignSystem_da6b25 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/actions/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Cohere Button — pill CTA system.
 * variant: 'primary' (filled pill), 'secondary' (underlined text link),
 *          'outline' (transparent pill with thin border — taxonomy/filter style).
 * tone:    'light' (on light surfaces) | 'dark' (on dark product bands).
 * Keep weight light; size + surface contrast carry hierarchy.
 */
function Button({
  children,
  variant = "primary",
  tone = "light",
  size = "md",
  href,
  type = "button",
  disabled = false,
  iconLeft,
  iconRight,
  onClick,
  style,
  ...rest
}) {
  const sizes = {
    sm: {
      padding: "8px 16px",
      fontSize: "14px"
    },
    md: {
      padding: "12px 24px",
      fontSize: "14px"
    },
    lg: {
      padding: "16px 28px",
      fontSize: "16px"
    }
  };
  const base = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    fontFamily: "var(--font-body)",
    fontWeight: "var(--weight-medium)",
    lineHeight: 1.2,
    textDecoration: "none",
    cursor: disabled ? "not-allowed" : "pointer",
    border: "1px solid transparent",
    transition: "opacity .15s ease, background-color .15s ease, border-color .15s ease",
    opacity: disabled ? 0.4 : 1,
    whiteSpace: "nowrap",
    ...sizes[size]
  };
  const variants = {
    primary: {
      light: {
        background: "var(--near-black)",
        color: "#fff",
        borderRadius: "var(--radius-pill)"
      },
      dark: {
        background: "#fff",
        color: "var(--near-black)",
        borderRadius: "var(--radius-pill)"
      }
    },
    secondary: {
      light: {
        background: "transparent",
        color: "var(--ink)",
        borderRadius: 0,
        padding: "2px 0",
        textDecoration: "underline",
        textUnderlineOffset: "3px"
      },
      dark: {
        background: "transparent",
        color: "#fff",
        borderRadius: 0,
        padding: "2px 0",
        textDecoration: "underline",
        textUnderlineOffset: "3px"
      }
    },
    outline: {
      light: {
        background: "transparent",
        color: "var(--ink)",
        borderColor: "var(--near-black)",
        borderRadius: "var(--radius-xl)"
      },
      dark: {
        background: "transparent",
        color: "#fff",
        borderColor: "rgba(255,255,255,0.45)",
        borderRadius: "var(--radius-xl)"
      }
    }
  };
  const composed = {
    ...base,
    ...variants[variant][tone],
    ...style
  };
  const Tag = href ? "a" : "button";
  return /*#__PURE__*/React.createElement(Tag, _extends({
    href: href,
    type: href ? undefined : type,
    disabled: href ? undefined : disabled,
    onClick: disabled ? undefined : onClick,
    style: composed,
    onMouseEnter: e => {
      if (!disabled) e.currentTarget.style.opacity = "0.82";
    },
    onMouseLeave: e => {
      if (!disabled) e.currentTarget.style.opacity = "1";
    }
  }, rest), iconLeft, children, iconRight);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/actions/Button.jsx", error: String((e && e.message) || e) }); }

// components/data-display/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Cohere Badge — small status / integration chip for agent-console mockups.
 * Quiet by default; small accent dot optional. On dark panels use tone="onDark".
 */
function Badge({
  children,
  tone = "neutral",
  dot = false,
  style,
  ...rest
}) {
  const tones = {
    neutral: {
      bg: "var(--stone)",
      fg: "var(--ink)",
      dot: "var(--slate)"
    },
    onDark: {
      bg: "rgba(255,255,255,0.08)",
      fg: "rgba(255,255,255,0.86)",
      dot: "#5ad19a"
    },
    green: {
      bg: "rgba(0,60,51,0.1)",
      fg: "var(--green-deep)",
      dot: "var(--green-deep)"
    },
    coral: {
      bg: "#fff4f1",
      fg: "var(--coral)",
      dot: "var(--coral)"
    },
    blue: {
      bg: "var(--wash-blue)",
      fg: "var(--action-blue)",
      dot: "var(--action-blue)"
    }
  };
  const t = tones[tone];
  const composed = {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    fontFamily: "var(--font-body)",
    fontWeight: "var(--weight-regular)",
    fontSize: "12px",
    lineHeight: 1.4,
    padding: "4px 10px",
    borderRadius: "var(--radius-full)",
    background: t.bg,
    color: t.fg,
    ...style
  };
  return /*#__PURE__*/React.createElement("span", _extends({
    style: composed
  }, rest), dot && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: "50%",
      background: t.dot,
      flexShrink: 0
    }
  }), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data-display/Badge.jsx", error: String((e && e.message) || e) }); }

// components/data-display/Chip.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Cohere blog taxonomy Chip — oversized coral category control.
 * Active chips invert to coral fill with dark text; inactive use coral outline
 * on a pale fill. Typography is deliberately large for a hero-level taxonomy.
 */
function Chip({
  children,
  active = false,
  size = "lg",
  onClick,
  style,
  ...rest
}) {
  const sizes = {
    sm: {
      fontSize: "14px",
      padding: "6px 14px"
    },
    md: {
      fontSize: "16px",
      padding: "8px 18px"
    },
    lg: {
      fontSize: "18px",
      padding: "10px 22px"
    }
  };
  const composed = {
    display: "inline-flex",
    alignItems: "center",
    fontFamily: "var(--font-body)",
    fontWeight: "var(--weight-regular)",
    lineHeight: 1.2,
    borderRadius: "var(--radius-sm)",
    border: "1px solid var(--coral)",
    cursor: "pointer",
    transition: "background-color .15s ease, color .15s ease",
    background: active ? "var(--coral)" : "#fff4f1",
    color: active ? "var(--near-black)" : "var(--ink)",
    ...sizes[size],
    ...style
  };
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    onClick: onClick,
    style: composed
  }, rest), children);
}
Object.assign(__ds_scope, { Chip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data-display/Chip.jsx", error: String((e && e.message) || e) }); }

// components/data-display/MonoLabel.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Cohere MonoLabel — uppercase technical marker in the mono family.
 * Used for category and system labels on product and research surfaces.
 */
function MonoLabel({
  children,
  tone = "default",
  style,
  ...rest
}) {
  const colors = {
    default: "var(--ink)",
    muted: "var(--slate)",
    onDark: "rgba(255,255,255,0.7)",
    coral: "var(--coral)"
  };
  const composed = {
    fontFamily: "var(--font-mono)",
    fontWeight: "var(--weight-regular)",
    fontSize: "var(--mono-label-size)",
    lineHeight: "var(--mono-label-lh)",
    letterSpacing: "var(--mono-label-ls)",
    textTransform: "uppercase",
    color: colors[tone],
    ...style
  };
  return /*#__PURE__*/React.createElement("span", _extends({
    style: composed
  }, rest), children);
}
Object.assign(__ds_scope, { MonoLabel });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data-display/MonoLabel.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Cohere Input — rectangular text field with a thin gray border.
 * Used inside rounded white form cards on dark green / stone sections.
 * Focus border shifts to the violet form-focus color.
 */
function Input({
  label,
  id,
  type = "text",
  placeholder,
  value,
  onChange,
  required = false,
  hint,
  error,
  style,
  ...rest
}) {
  const [focused, setFocused] = React.useState(false);
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);
  const borderColor = error ? "var(--error-red)" : focused ? "var(--focus-violet)" : "var(--hairline)";
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "6px",
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: inputId,
    style: {
      fontFamily: "var(--font-body)",
      fontSize: "14px",
      color: "var(--ink)",
      fontWeight: "var(--weight-medium)"
    }
  }, label, required && /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--coral)"
    }
  }, " *")), /*#__PURE__*/React.createElement("input", _extends({
    id: inputId,
    type: type,
    placeholder: placeholder,
    value: value,
    onChange: onChange,
    required: required,
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
    style: {
      fontFamily: "var(--font-body)",
      fontSize: "16px",
      lineHeight: 1.4,
      color: "var(--ink)",
      padding: "12px 16px",
      background: "#fff",
      border: `1px solid ${borderColor}`,
      borderRadius: "var(--radius-xs)",
      outline: "none",
      transition: "border-color .15s ease",
      width: "100%",
      boxSizing: "border-box"
    }
  }, rest)), (hint || error) && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-body)",
      fontSize: "12px",
      color: error ? "var(--error-red)" : "var(--slate)"
    }
  }, error || hint));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/marketing/AnnouncementBar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Cohere AnnouncementBar — full-width black strip above the nav.
 * 36px tall, centered microcopy with an underlined link and a close control.
 */
function AnnouncementBar({
  children,
  linkLabel,
  href = "#",
  onClose,
  dismissible = true,
  style,
  ...rest
}) {
  const [open, setOpen] = React.useState(true);
  if (!open) return null;
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      position: "relative",
      minHeight: "36px",
      background: "var(--cohere-black)",
      color: "#fff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "8px",
      padding: "0 44px",
      fontFamily: "var(--font-body)",
      fontSize: "14px",
      lineHeight: 1.4,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      textAlign: "center"
    }
  }, children, linkLabel && /*#__PURE__*/React.createElement("a", {
    href: href,
    style: {
      color: "#fff",
      textDecoration: "underline",
      textUnderlineOffset: "3px",
      marginLeft: "8px"
    }
  }, linkLabel)), dismissible && /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-label": "Dismiss",
    onClick: () => {
      setOpen(false);
      onClose && onClose();
    },
    style: {
      position: "absolute",
      right: "16px",
      top: "50%",
      transform: "translateY(-50%)",
      background: "none",
      border: "none",
      color: "#fff",
      cursor: "pointer",
      fontSize: "16px",
      lineHeight: 1,
      padding: "4px"
    }
  }, "\u2715"));
}
Object.assign(__ds_scope, { AnnouncementBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/marketing/AnnouncementBar.jsx", error: String((e && e.message) || e) }); }

// components/marketing/TrustLogoStrip.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Cohere TrustLogoStrip — centered caption above a quiet row of monochrome
 * customer logos. No cards, no borders; wide horizontal spacing. Logos render
 * in a single ink color (or white on dark) for restraint.
 */
function TrustLogoStrip({
  caption,
  logos = [],
  tone = "light",
  style,
  ...rest
}) {
  const color = tone === "dark" ? "rgba(255,255,255,0.82)" : "var(--ink)";
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "40px",
      textAlign: "center",
      ...style
    }
  }, rest), caption && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontFamily: "var(--font-body)",
      fontSize: "16px",
      color: tone === "dark" ? "rgba(255,255,255,0.6)" : "var(--slate)"
    }
  }, caption), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "center",
      gap: "56px"
    }
  }, logos.map((logo, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      fontFamily: "var(--font-body)",
      fontWeight: "var(--weight-medium)",
      fontSize: "22px",
      letterSpacing: "-0.5px",
      color,
      opacity: 0.85
    }
  }, logo))));
}
Object.assign(__ds_scope, { TrustLogoStrip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/marketing/TrustLogoStrip.jsx", error: String((e && e.message) || e) }); }

// components/surfaces/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Cohere Card — flat content container. Depth comes from surface + thin border,
 * never drop shadow. Variants pick the surface; `bordered` adds a hairline.
 * Use for capability cards, media wrappers and grouped blocks.
 */
function Card({
  children,
  surface = "white",
  // 'white' | 'warm' | 'green' | 'navy' | 'dark'
  radius = "lg",
  // token key: xs|sm|md|lg
  bordered = false,
  padding = "28px",
  style,
  ...rest
}) {
  const surfaces = {
    white: {
      background: "var(--canvas)",
      color: "var(--ink)"
    },
    warm: {
      background: "var(--stone)",
      color: "var(--ink)"
    },
    green: {
      background: "var(--green-deep)",
      color: "#fff"
    },
    navy: {
      background: "var(--navy-dark)",
      color: "#fff"
    },
    dark: {
      background: "var(--near-black)",
      color: "#fff"
    }
  };
  const isDark = surface === "green" || surface === "navy" || surface === "dark";
  const composed = {
    boxSizing: "border-box",
    borderRadius: `var(--radius-${radius})`,
    padding,
    border: bordered ? isDark ? "1px solid rgba(255,255,255,0.14)" : "1px solid var(--hairline)" : "1px solid transparent",
    ...surfaces[surface],
    ...style
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    style: composed
  }, rest), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/surfaces/Card.jsx", error: String((e && e.message) || e) }); }

// components/surfaces/ProductCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Cohere ProductCard — warm stone summary card for a product / model.
 * Title, supporting copy, a divider, checkmark bullet rows, and a small pill CTA.
 * Typically laid out 3-up on desktop.
 */
function ProductCard({
  eyebrow,
  title,
  description,
  features = [],
  ctaLabel = "Learn more",
  onCta,
  href,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      boxSizing: "border-box",
      background: "var(--stone)",
      borderRadius: "var(--radius-sm)",
      padding: "32px",
      display: "flex",
      flexDirection: "column",
      gap: "20px",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "12px"
    }
  }, eyebrow && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "14px",
      letterSpacing: "0.28px",
      textTransform: "uppercase",
      color: "var(--slate)"
    }
  }, eyebrow), /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontFamily: "var(--font-body)",
      fontWeight: "var(--weight-regular)",
      fontSize: "32px",
      lineHeight: 1.2,
      letterSpacing: "-0.32px",
      color: "var(--ink)"
    }
  }, title), description && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontFamily: "var(--font-body)",
      fontSize: "16px",
      lineHeight: 1.5,
      color: "var(--ink)"
    }
  }, description)), features.length > 0 && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 1,
      background: "var(--hairline)"
    }
  }), /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: "none",
      margin: 0,
      padding: 0,
      display: "flex",
      flexDirection: "column",
      gap: "12px"
    }
  }, features.map((f, i) => /*#__PURE__*/React.createElement("li", {
    key: i,
    style: {
      display: "flex",
      gap: "10px",
      alignItems: "flex-start",
      fontFamily: "var(--font-body)",
      fontSize: "16px",
      lineHeight: 1.5,
      color: "var(--ink)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": true,
    style: {
      color: "var(--green-deep)",
      flexShrink: 0,
      marginTop: 1
    }
  }, "\u2713"), /*#__PURE__*/React.createElement("span", null, f))))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "auto",
      paddingTop: "8px"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "primary",
    size: "sm",
    href: href,
    onClick: onCta
  }, ctaLabel)));
}
Object.assign(__ds_scope, { ProductCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/surfaces/ProductCard.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/App.jsx
try { (() => {
// Cohere website UI kit — app shell. Announcement bar + nav + routed view + footer.
const {
  AnnouncementBar
} = window.CohereDesignSystem_da6b25;
function App() {
  const [view, setView] = React.useState("home");
  const Views = {
    home: window.HomeView,
    blog: window.BlogView,
    research: window.ResearchView
  };
  const Current = Views[view] || window.HomeView;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--canvas)",
      minHeight: "100vh"
    }
  }, /*#__PURE__*/React.createElement(AnnouncementBar, {
    linkLabel: "Learn more"
  }, "Introducing Command A \u2014 our most efficient model for enterprise agents."), /*#__PURE__*/React.createElement(window.Nav, {
    current: view,
    onNavigate: setView
  }), /*#__PURE__*/React.createElement(Current, null), /*#__PURE__*/React.createElement(window.Footer, null));
}
ReactDOM.createRoot(document.getElementById("root")).render(/*#__PURE__*/React.createElement(App, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/App.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/BlogView.jsx
try { (() => {
// Cohere website — blog index. Oversized coral taxonomy chips over a post grid.
const {
  Chip,
  MonoLabel,
  Badge
} = window.CohereDesignSystem_da6b25;
function PostThumb({
  tone
}) {
  const fills = {
    green: "radial-gradient(120% 120% at 30% 20%, #0a6a59, #003c33)",
    blue: "radial-gradient(120% 120% at 30% 20%, #4c6ee6, #1863dc)",
    navy: "radial-gradient(120% 120% at 30% 20%, #16324d, #071829)",
    stone: "var(--stone)"
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: 168,
      borderRadius: "var(--radius-sm)",
      background: fills[tone] || "var(--stone)"
    }
  });
}
function BlogView() {
  const D = window.CohereData;
  const [active, setActive] = React.useState("All");
  const posts = active === "All" ? D.posts : D.posts.filter(p => p.tag === active);
  return /*#__PURE__*/React.createElement("main", {
    style: {
      maxWidth: 1280,
      margin: "0 auto",
      padding: "64px 24px 100px"
    }
  }, /*#__PURE__*/React.createElement(MonoLabel, {
    tone: "muted"
  }, "Blog"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 400,
      fontSize: 72,
      lineHeight: 1.0,
      letterSpacing: "-1.44px",
      margin: "16px 0 36px",
      color: "var(--ink)"
    }
  }, "The Cohere blog"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 12,
      flexWrap: "wrap",
      marginBottom: 48
    }
  }, D.blogFilters.map(f => /*#__PURE__*/React.createElement(Chip, {
    key: f,
    active: active === f,
    onClick: () => setActive(f)
  }, f))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: 28
    }
  }, posts.map(p => /*#__PURE__*/React.createElement("article", {
    key: p.title,
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 14,
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement(PostThumb, {
    tone: p.tone
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: "coral"
  }, p.tag), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-body)",
      fontSize: 13,
      color: "var(--muted-slate)"
    }
  }, p.read)), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "var(--font-body)",
      fontWeight: 400,
      fontSize: 24,
      lineHeight: 1.3,
      margin: 0,
      color: "var(--ink)"
    }
  }, p.title), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-body)",
      fontSize: 13,
      color: "var(--muted-slate)"
    }
  }, p.date)))));
}
window.BlogView = BlogView;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/BlogView.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Footer.jsx
try { (() => {
// Cohere website — dark footer with coral newsletter label and muted columns.
const {
  MonoLabel,
  Input
} = window.CohereDesignSystem_da6b25;
function Footer() {
  const cols = {
    Products: ["Command", "Embed", "Rerank", "North"],
    Solutions: ["Financial services", "Security", "Customer support", "Enterprise search"],
    Research: ["Publications", "Open science", "Careers"],
    Company: ["About", "Blog", "Newsroom", "Contact"]
  };
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      background: "var(--near-black)",
      color: "#fff"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1280,
      margin: "0 auto",
      padding: "64px 24px 40px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: 40,
      justifyContent: "space-between",
      paddingBottom: 56,
      borderBottom: "1px solid rgba(255,255,255,0.14)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 320,
      display: "flex",
      flexDirection: "column",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(MonoLabel, {
    tone: "coral"
  }, "AI moves fast"), /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontFamily: "var(--font-body)",
      fontWeight: 400,
      fontSize: 24,
      lineHeight: 1.3
    }
  }, "Stay ahead with the latest from Cohere."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      alignItems: "stretch",
      marginTop: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("input", {
    placeholder: "Enter your email",
    style: {
      width: "100%",
      boxSizing: "border-box",
      padding: "12px 16px",
      background: "transparent",
      border: "1px solid rgba(255,255,255,0.28)",
      borderRadius: "var(--radius-xs)",
      color: "#fff",
      fontFamily: "var(--font-body)",
      fontSize: 16,
      outline: "none"
    }
  })), /*#__PURE__*/React.createElement("button", {
    "aria-label": "Subscribe",
    style: {
      width: 48,
      flexShrink: 0,
      background: "#fff",
      color: "var(--near-black)",
      border: "none",
      borderRadius: "var(--radius-xs)",
      cursor: "pointer",
      fontSize: 18
    }
  }, "\u2192"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 56,
      flexWrap: "wrap"
    }
  }, Object.entries(cols).map(([head, links]) => /*#__PURE__*/React.createElement("div", {
    key: head,
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      color: "#fff"
    }
  }, head), links.map(l => /*#__PURE__*/React.createElement("a", {
    key: l,
    href: "#",
    style: {
      fontSize: 14,
      color: "var(--muted-slate)",
      textDecoration: "none"
    }
  }, l)))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      flexWrap: "wrap",
      gap: 16,
      paddingTop: 28
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/cohere-logo-white.svg",
    alt: "Cohere",
    style: {
      height: 22,
      opacity: 0.9
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: "var(--muted-slate)"
    }
  }, "\xA9 2025 Cohere Inc. \xB7 Terms \xB7 Privacy"))));
}
window.Footer = Footer;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Footer.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/HomeView.jsx
try { (() => {
// Cohere website — home view. Centered hero declaration over a two-card media
// composition (agent-console mockup + abstract media), trust strip, dark feature
// band, product cards, and a contact CTA.
const {
  Button,
  Badge,
  MonoLabel,
  ProductCard,
  TrustLogoStrip,
  Input,
  Card
} = window.CohereDesignSystem_da6b25;
function AgentConsole() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--near-black)",
      borderRadius: "var(--radius-lg)",
      padding: 22,
      color: "#fff",
      display: "flex",
      flexDirection: "column",
      gap: 16,
      height: "100%",
      boxSizing: "border-box"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 26,
      height: 26,
      borderRadius: 8,
      background: "var(--green-deep)"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14
    }
  }, "Support Agent")), /*#__PURE__*/React.createElement(Badge, {
    tone: "onDark",
    dot: true
  }, "Active")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: "onDark"
  }, "Salesforce"), /*#__PURE__*/React.createElement(Badge, {
    tone: "onDark"
  }, "Zendesk"), /*#__PURE__*/React.createElement(Badge, {
    tone: "onDark"
  }, "Slack")), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "rgba(255,255,255,0.06)",
      borderRadius: 12,
      padding: 14,
      fontSize: 14,
      lineHeight: 1.5,
      color: "rgba(255,255,255,0.86)"
    }
  }, "Summarize the open tickets for Northwind and draft a reply to the escalation."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: "50%",
      background: "#5ad19a"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: "rgba(255,255,255,0.6)"
    }
  }, "Retrieved 12 tickets \xB7 2 escalations")), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "rgba(255,255,255,0.04)",
      border: "1px solid rgba(255,255,255,0.12)",
      borderRadius: 12,
      padding: 14,
      fontSize: 13,
      lineHeight: 1.6,
      color: "rgba(255,255,255,0.78)"
    }
  }, "Drafted reply with citations to 3 prior cases. Ready to send on your approval.")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "auto",
      display: "flex",
      gap: 8,
      alignItems: "center",
      borderTop: "1px solid rgba(255,255,255,0.12)",
      paddingTop: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: "rgba(255,255,255,0.5)",
      flex: 1
    }
  }, "Ask the agent\u2026"), /*#__PURE__*/React.createElement("button", {
    style: {
      width: 32,
      height: 32,
      borderRadius: "50%",
      background: "#fff",
      color: "var(--near-black)",
      border: "none",
      cursor: "pointer"
    }
  }, "\u2191")));
}
function HomeView() {
  const D = window.CohereData;
  return /*#__PURE__*/React.createElement("main", null, /*#__PURE__*/React.createElement("section", {
    style: {
      maxWidth: 1280,
      margin: "0 auto",
      padding: "80px 24px 40px",
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement(MonoLabel, {
    tone: "muted"
  }, "The enterprise AI platform"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 400,
      fontSize: "clamp(48px, 7vw, 96px)",
      lineHeight: 1.0,
      letterSpacing: "-1.92px",
      margin: "20px auto 0",
      maxWidth: 980,
      color: "var(--ink)"
    }
  }, "Secure AI agents for the modern enterprise"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-body)",
      fontSize: 18,
      lineHeight: 1.4,
      color: "var(--slate)",
      margin: "24px auto 0",
      maxWidth: 600
    }
  }, "Build, deploy, and scale AI that works inside your business \u2014 private, multilingual, and grounded in your data."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 16,
      justifyContent: "center",
      marginTop: 32
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary"
  }, "Request a demo"), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary"
  }, "Explore products"))), /*#__PURE__*/React.createElement("section", {
    style: {
      maxWidth: 1280,
      margin: "0 auto",
      padding: "20px 24px 80px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1.6fr 1fr",
      gap: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      borderRadius: "var(--radius-lg)",
      overflow: "hidden",
      minHeight: 380
    }
  }, /*#__PURE__*/React.createElement(AgentConsole, null)), /*#__PURE__*/React.createElement("div", {
    style: {
      borderRadius: "var(--radius-lg)",
      minHeight: 380,
      background: "radial-gradient(120% 120% at 20% 20%, #ff7759 0%, #b3402c 38%, #071829 100%)",
      position: "relative",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 22,
      bottom: 22,
      color: "#fff"
    }
  }, /*#__PURE__*/React.createElement(MonoLabel, {
    tone: "onDark"
  }, "North"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-body)",
      fontSize: 22,
      lineHeight: 1.2,
      margin: "8px 0 0",
      maxWidth: 220
    }
  }, "One secure workspace for every agent."))))), /*#__PURE__*/React.createElement("section", {
    style: {
      maxWidth: 1280,
      margin: "0 auto",
      padding: "40px 24px 100px"
    }
  }, /*#__PURE__*/React.createElement(TrustLogoStrip, {
    caption: "Trusted by enterprises building with AI",
    logos: D.trust
  })), /*#__PURE__*/React.createElement("section", {
    style: {
      background: "var(--green-deep)",
      color: "#fff"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1280,
      margin: "0 auto",
      padding: "80px 24px",
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 56,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(MonoLabel, {
    tone: "onDark"
  }, "Security first"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "var(--font-body)",
      fontWeight: 400,
      fontSize: 48,
      lineHeight: 1.2,
      letterSpacing: "-0.48px",
      margin: "16px 0 20px"
    }
  }, "Your data never leaves your control"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-body)",
      fontSize: 18,
      lineHeight: 1.4,
      color: "rgba(255,255,255,0.78)",
      margin: "0 0 28px"
    }
  }, "Deploy on-premises, in your VPC, or in the cloud. Cohere models are built for the privacy and compliance requirements of regulated industries."), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    tone: "dark"
  }, "Read the security overview")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 16
    }
  }, [["Private deployment", "On-prem, VPC, or cloud"], ["SOC 2 Type II", "Audited controls"], ["No training on your data", "Ever, by default"], ["Granular access", "Role-based controls"]].map(([h, s], i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      background: "rgba(255,255,255,0.06)",
      border: "1px solid rgba(255,255,255,0.14)",
      borderRadius: "var(--radius-md)",
      padding: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 18,
      marginBottom: 6
    }
  }, h), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      color: "rgba(255,255,255,0.6)"
    }
  }, s)))))), /*#__PURE__*/React.createElement("section", {
    style: {
      maxWidth: 1280,
      margin: "0 auto",
      padding: "100px 24px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 640,
      marginBottom: 56
    }
  }, /*#__PURE__*/React.createElement(MonoLabel, {
    tone: "muted"
  }, "Products"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "var(--font-body)",
      fontWeight: 400,
      fontSize: 48,
      lineHeight: 1.2,
      letterSpacing: "-0.48px",
      margin: "16px 0 0",
      color: "var(--ink)"
    }
  }, "One platform, from model to agent")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: 20
    }
  }, D.products.map(p => /*#__PURE__*/React.createElement(ProductCard, {
    key: p.title,
    eyebrow: p.eyebrow,
    title: p.title,
    description: p.description,
    features: p.features,
    ctaLabel: p.cta
  })))), /*#__PURE__*/React.createElement("section", {
    style: {
      background: "var(--stone)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1280,
      margin: "0 auto",
      padding: "80px 24px",
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 56,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "var(--font-body)",
      fontWeight: 400,
      fontSize: 48,
      lineHeight: 1.2,
      letterSpacing: "-0.48px",
      margin: 0,
      color: "var(--ink)"
    }
  }, "Talk to our team"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-body)",
      fontSize: 18,
      lineHeight: 1.4,
      color: "var(--slate)",
      margin: "20px 0 0",
      maxWidth: 420
    }
  }, "See how Cohere can bring secure, grounded AI to your enterprise. We'll tailor a walkthrough to your stack.")), /*#__PURE__*/React.createElement(Card, {
    surface: "white",
    radius: "md",
    padding: "32px",
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Input, {
    label: "First name",
    placeholder: "Jane"
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Last name",
    placeholder: "Doe"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      gridColumn: "1 / -1"
    }
  }, /*#__PURE__*/React.createElement(Input, {
    label: "Work email",
    type: "email",
    placeholder: "jane@company.com",
    required: true
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      gridColumn: "1 / -1"
    }
  }, /*#__PURE__*/React.createElement(Input, {
    label: "Company",
    placeholder: "Acme Inc."
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      gridColumn: "1 / -1",
      marginTop: 4
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary"
  }, "Request a demo"))))));
}
window.HomeView = HomeView;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/HomeView.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Nav.jsx
try { (() => {
// Cohere website — top nav. Three-zone: logo left, menu centered, actions right.
const {
  Button
} = window.CohereDesignSystem_da6b25;
function Nav({
  current,
  onNavigate
}) {
  const items = [{
    label: "Home",
    key: "home"
  }, {
    label: "Blog",
    key: "blog"
  }, {
    label: "Research",
    key: "research"
  }];
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: "sticky",
      top: 0,
      zIndex: 20,
      background: "rgba(255,255,255,0.9)",
      backdropFilter: "blur(8px)",
      borderBottom: "1px solid var(--card-border)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1280,
      margin: "0 auto",
      height: 64,
      padding: "0 24px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      onNavigate("home");
    },
    style: {
      display: "flex",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/cohere-logo.svg",
    alt: "Cohere",
    style: {
      height: 26
    }
  })), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: "flex",
      gap: 28
    }
  }, items.map(it => /*#__PURE__*/React.createElement("a", {
    key: it.key,
    href: "#",
    onClick: e => {
      e.preventDefault();
      onNavigate(it.key);
    },
    style: {
      fontFamily: "var(--font-body)",
      fontSize: 14,
      textDecoration: "none",
      color: current === it.key ? "var(--ink)" : "var(--slate)",
      borderBottom: current === it.key ? "1px solid var(--ink)" : "1px solid transparent",
      paddingBottom: 2
    }
  }, it.label))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: {
      fontFamily: "var(--font-body)",
      fontSize: 14,
      color: "var(--ink)",
      textDecoration: "none"
    }
  }, "Sign in"), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "sm"
  }, "Request a demo"))));
}
window.Nav = Nav;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Nav.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/ResearchView.jsx
try { (() => {
// Cohere website — research index. Compact outlined topic pills over a
// rule-separated publication list: title left, topic pills center, date right.
const {
  Button,
  MonoLabel
} = window.CohereDesignSystem_da6b25;
function ResearchView() {
  const D = window.CohereData;
  const [topic, setTopic] = React.useState("All");
  const papers = topic === "All" ? D.papers : D.papers.filter(p => p.topics.includes(topic));
  return /*#__PURE__*/React.createElement("main", {
    style: {
      maxWidth: 1280,
      margin: "0 auto",
      padding: "64px 24px 100px"
    }
  }, /*#__PURE__*/React.createElement(MonoLabel, {
    tone: "muted"
  }, "Research"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 400,
      fontSize: 72,
      lineHeight: 1.0,
      letterSpacing: "-1.44px",
      margin: "16px 0 12px",
      color: "var(--ink)"
    }
  }, "Open, applied AI research"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-body)",
      fontSize: 18,
      lineHeight: 1.4,
      color: "var(--slate)",
      maxWidth: 560,
      margin: "0 0 36px"
    }
  }, "Publications from the Cohere research team on foundation models, retrieval, agents, and safety."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10,
      flexWrap: "wrap",
      marginBottom: 12
    }
  }, D.researchTopics.map(t => /*#__PURE__*/React.createElement("button", {
    key: t,
    onClick: () => setTopic(t),
    style: {
      fontFamily: "var(--font-body)",
      fontSize: 14,
      padding: "8px 16px",
      cursor: "pointer",
      borderRadius: "var(--radius-xl)",
      border: "1px solid " + (topic === t ? "var(--near-black)" : "var(--hairline)"),
      background: topic === t ? "var(--near-black)" : "transparent",
      color: topic === t ? "#fff" : "var(--ink)"
    }
  }, t))), /*#__PURE__*/React.createElement("div", null, papers.map((p, i) => /*#__PURE__*/React.createElement("div", {
    key: p.title,
    style: {
      display: "grid",
      gridTemplateColumns: "1fr auto auto",
      gap: 24,
      alignItems: "center",
      padding: "28px 0",
      borderTop: "1px solid var(--hairline)",
      borderBottom: i === papers.length - 1 ? "1px solid var(--hairline)" : "none"
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: {
      fontFamily: "var(--font-body)",
      fontSize: 24,
      lineHeight: 1.3,
      color: "var(--ink)",
      textDecoration: "none"
    }
  }, p.title), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8
    }
  }, p.topics.map(t => /*#__PURE__*/React.createElement("span", {
    key: t,
    style: {
      fontFamily: "var(--font-body)",
      fontSize: 13,
      padding: "4px 12px",
      borderRadius: "var(--radius-xl)",
      border: "1px solid var(--hairline)",
      color: "var(--slate)",
      whiteSpace: "nowrap"
    }
  }, t))), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 13,
      color: "var(--muted-slate)",
      whiteSpace: "nowrap"
    }
  }, p.date)))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 40
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: {
      fontFamily: "var(--font-body)",
      fontSize: 16,
      color: "var(--action-blue)",
      textDecoration: "underline",
      textUnderlineOffset: 3
    }
  }, "View all publications \u2192")));
}
window.ResearchView = ResearchView;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/ResearchView.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/data.js
try { (() => {
// Sample content for the Cohere website UI kit. Placeholder copy only —
// structurally honest, no invented product specifics beyond public positioning.
window.CohereData = {
  nav: ["Products", "Solutions", "Research", "Resources", "Company"],
  trust: ["Oracle", "Fujitsu", "Notion", "Bamboo", "RBC", "Dell"],
  products: [{
    eyebrow: "Model",
    title: "Command",
    description: "A family of scalable, secure models built for agentic enterprise tasks.",
    features: ["Agent-optimized reasoning", "Private deployment", "23 languages"],
    cta: "Explore Command"
  }, {
    eyebrow: "Retrieval",
    title: "Embed & Rerank",
    description: "State-of-the-art search and retrieval across your unstructured data.",
    features: ["Multimodal embeddings", "Enterprise search", "100+ languages"],
    cta: "Explore retrieval"
  }, {
    eyebrow: "Platform",
    title: "North",
    description: "A secure AI workspace that brings agents to your team's daily work.",
    features: ["On-prem or cloud", "Tool integrations", "Granular access control"],
    cta: "Explore North"
  }],
  blogFilters: ["All", "Generative AI", "Research", "Enterprise", "Product", "Company"],
  posts: [{
    tag: "Enterprise",
    title: "Bringing secure AI agents to regulated industries",
    date: "Aug 14, 2025",
    read: "6 min read",
    tone: "green"
  }, {
    tag: "Research",
    title: "Scaling retrieval for multilingual enterprise search",
    date: "Aug 9, 2025",
    read: "8 min read",
    tone: "blue"
  }, {
    tag: "Product",
    title: "What's new in North: workspace agents for every team",
    date: "Aug 2, 2025",
    read: "5 min read",
    tone: "stone"
  }, {
    tag: "Generative AI",
    title: "A practical guide to grounded generation",
    date: "Jul 28, 2025",
    read: "7 min read",
    tone: "navy"
  }, {
    tag: "Company",
    title: "Partnering with enterprises to deploy AI responsibly",
    date: "Jul 21, 2025",
    read: "4 min read",
    tone: "stone"
  }, {
    tag: "Research",
    title: "Evaluating tool use in long-horizon agent tasks",
    date: "Jul 15, 2025",
    read: "9 min read",
    tone: "green"
  }],
  researchTopics: ["All", "Foundation models", "Retrieval", "Agents", "Safety", "Efficiency", "Evaluation"],
  papers: [{
    title: "Command A: an efficient model for enterprise agents",
    topics: ["Foundation models", "Agents"],
    date: "Aug 2025"
  }, {
    title: "Rerank 3.5: precision retrieval across modalities",
    topics: ["Retrieval"],
    date: "Jul 2025"
  }, {
    title: "Grounded generation with verifiable citations",
    topics: ["Safety", "Evaluation"],
    date: "Jun 2025"
  }, {
    title: "Efficient long-context inference for production",
    topics: ["Efficiency"],
    date: "May 2025"
  }, {
    title: "Multilingual embeddings for global enterprise search",
    topics: ["Retrieval", "Foundation models"],
    date: "Apr 2025"
  }]
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/data.js", error: String((e && e.message) || e) }); }

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Chip = __ds_scope.Chip;

__ds_ns.MonoLabel = __ds_scope.MonoLabel;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.AnnouncementBar = __ds_scope.AnnouncementBar;

__ds_ns.TrustLogoStrip = __ds_scope.TrustLogoStrip;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.ProductCard = __ds_scope.ProductCard;

})();
