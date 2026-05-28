"use client";

/**
 * MilitaryMap.tsx — Production-Grade Next.js Client Component
 *
 * Interactive animated 3D globe (orthographic SVG sphere).
 * Real geographic data (Natural Earth 110m). Drag to rotate, auto-spins when idle.
 * Zero external dependencies — pure SVG + sphere math.
 * 
 * Central Europe & Slovakia focused, featuring premium gold aesthetics and 
 * bidirectional state synchronization with the Ellegance competition planner.
 */

import * as React from "react";

/* ========================================================================== */
/* Types */
/* ========================================================================== */

export interface MarkerItem {
    label: string;
    description: string;
    latitude: number;
    longitude: number;
    color: string;
}

export interface CountryItem {
    code: string;
    name: string;
    enabled: boolean;
}

export interface MapStyleConfig {
    oceanColor: string;
    landFill: string;
    landStroke: string;
    strokeWidth: number;
    hoverColor: string;
    disabledColor: string;
}

export interface TooltipConfig {
    show: boolean;
    background: string;
    textColor: string;
    borderColor: string;
}

export interface GridConfig {
    show: boolean;
    color: string;
    opacity: number;
}

export interface LayoutConfig {
    cornerRadius: number;
    padding: number;
    showBorder: boolean;
    borderColor: string;
}

export interface InteractionConfig {
    autoRotate: boolean;
    autoRotateSpeed: number;
    rotateX: number;
    rotateY: number;
    rotateZ: number;
    enableDrag: boolean;
    dragSensitivity: number;
    glowColor: string;
    glowIntensity: number;
    showStars: boolean;
    showLabels: boolean;
}

interface Props {
    markers?: MarkerItem[];
    countries?: CountryItem[];
    mapStyle?: Partial<MapStyleConfig>;
    tooltip?: Partial<TooltipConfig>;
    grid?: Partial<GridConfig>;
    layout?: Partial<LayoutConfig>;
    interaction?: Partial<InteractionConfig>;
    activeMarkerLabel?: string | null;
    onMarkerSelect?: (label: string | null) => void;
}

interface HoveredMarker {
    screenX: number;
    screenY: number;
    label: string;
    description: string;
}

interface HoveredCountry {
    screenX: number;
    screenY: number;
    name: string;
    code: string;
}

interface ProjectedPoint {
    sx: number; // screen x
    sy: number; // screen y
    rx: number; // rotated 3D x (depth)
    ry: number; // rotated 3D y
    rz: number; // rotated 3D z
    v: boolean; // visible (depth >= 0)
}

interface CountryEntry {
    id: string;
    name: string;
    type: string;
    coords: any;
    rings: number[][][]; // flat list of rings for hit-testing
    bbox: { minLng: number; maxLng: number; minLat: number; maxLat: number };
}

/* ========================================================================== */
/* Country Data — ISO numeric → [ISO3, name] */
/* ========================================================================== */

const CD: Record<string, [string, string]> = {
    "004": ["AFG", "Afghanistan"],
    "008": ["ALB", "Albania"],
    "012": ["DZA", "Algeria"],
    "024": ["AGO", "Angola"],
    "032": ["ARG", "Argentina"],
    "036": ["AUS", "Australia"],
    "040": ["AUT", "Austria"],
    "031": ["AZE", "Azerbaijan"],
    "050": ["BGD", "Bangladesh"],
    "056": ["BEL", "Belgium"],
    "204": ["BEN", "Benin"],
    "064": ["BTN", "Bhutan"],
    "068": ["BOL", "Bolivia"],
    "070": ["BIH", "Bosnia and Herz."],
    "072": ["BWA", "Botswana"],
    "076": ["BRA", "Brazil"],
    "096": ["BRN", "Brunei"],
    "100": ["BGR", "Bulgaria"],
    "854": ["BFA", "Burkina Faso"],
    "108": ["BDI", "Burundi"],
    "116": ["KHM", "Cambodia"],
    "120": ["CMR", "Cameroon"],
    "124": ["CAN", "Canada"],
    "140": ["CAF", "Central African Rep."],
    "148": ["TCD", "Chad"],
    "152": ["CHL", "Chile"],
    "156": ["CHN", "China"],
    "170": ["COL", "Colombia"],
    "178": ["COG", "Congo"],
    "180": ["COD", "Dem. Rep. Congo"],
    "188": ["CRI", "Costa Rica"],
    "384": ["CIV", "Côte d'Ivoire"],
    "191": ["HRV", "Croatia"],
    "192": ["CUB", "Cuba"],
    "196": ["CYP", "Cyprus"],
    "203": ["CZE", "Czechia"],
    "208": ["DNK", "Denmark"],
    "262": ["DJI", "Djibouti"],
    "214": ["DOM", "Dominican Rep."],
    "218": ["ECU", "Ecuador"],
    "818": ["EGY", "Egypt"],
    "222": ["SLV", "El Salvador"],
    "226": ["GNQ", "Eq. Guinea"],
    "232": ["ERI", "Eritrea"],
    "233": ["EST", "Estonia"],
    "748": ["SWZ", "Eswatini"],
    "231": ["ETH", "Ethiopia"],
    "242": ["FJI", "Fiji"],
    "246": ["FIN", "Finland"],
    "250": ["FRA", "France"],
    "266": ["GAB", "Gabon"],
    "270": ["GMB", "Gambia"],
    "268": ["GEO", "Georgia"],
    "276": ["DEU", "Germany"],
    "288": ["GHA", "Ghana"],
    "300": ["GRC", "Greece"],
    "304": ["GRL", "Greenland"],
    "320": ["GTM", "Guatemala"],
    "324": ["GIN", "Guinea"],
    "624": ["GNB", "Guinea-Bissau"],
    "328": ["GUY", "Guyana"],
    "332": ["HTI", "Haiti"],
    "340": ["HND", "Honduras"],
    "348": ["HUN", "Hungary"],
    "352": ["ISL", "Iceland"],
    "356": ["IND", "India"],
    "360": ["IDN", "Indonesia"],
    "364": ["IRN", "Iran"],
    "368": ["IRQ", "Iraq"],
    "372": ["IRL", "Ireland"],
    "376": ["ISR", "Israel"],
    "380": ["ITA", "Italy"],
    "388": ["JAM", "Jamaica"],
    "392": ["JPN", "Japan"],
    "400": ["JOR", "Jordan"],
    "398": ["KAZ", "Kazakhstan"],
    "404": ["KEN", "Kenya"],
    "408": ["PRK", "North Korea"],
    "410": ["KOR", "South Korea"],
    "414": ["KWT", "Kuwait"],
    "417": ["KGZ", "Kyrgyzstan"],
    "418": ["LAO", "Laos"],
    "428": ["LVA", "Latvia"],
    "422": ["LBN", "Lebanon"],
    "426": ["LSO", "Lesotho"],
    "430": ["LBR", "Liberia"],
    "434": ["LBY", "Libya"],
    "440": ["LTU", "Lithuania"],
    "442": ["LUX", "Luxembourg"],
    "450": ["MDG", "Madagascar"],
    "454": ["MWI", "Malawi"],
    "458": ["MYS", "Malaysia"],
    "466": ["MLI", "Mali"],
    "478": ["MRT", "Mauritania"],
    "484": ["MEX", "Mexico"],
    "498": ["MDA", "Moldova"],
    "496": ["MNG", "Mongolia"],
    "499": ["MNE", "Montenegro"],
    "504": ["MAR", "Morocco"],
    "508": ["MOZ", "Mozambique"],
    "104": ["MMR", "Myanmar"],
    "516": ["NAM", "Namibia"],
    "524": ["NPL", "Nepal"],
    "528": ["NLD", "Netherlands"],
    "554": ["NZL", "New Zealand"],
    "558": ["NIC", "Nicaragua"],
    "562": ["NER", "Niger"],
    "566": ["NGA", "Nigeria"],
    "578": ["NOR", "Norway"],
    "512": ["OMN", "Oman"],
    "586": ["PAK", "Pakistan"],
    "591": ["PAN", "Panama"],
    "598": ["PNG", "Papua New Guinea"],
    "600": ["PRY", "Paraguay"],
    "604": ["PER", "Peru"],
    "608": ["PHL", "Philippines"],
    "616": ["POL", "Poland"],
    "620": ["PRT", "Portugal"],
    "634": ["QAT", "Qatar"],
    "642": ["ROU", "Romania"],
    "643": ["RUS", "Russia"],
    "646": ["RWA", "Rwanda"],
    "682": ["SAU", "Saudi Arabia"],
    "686": ["SEN", "Senegal"],
    "688": ["SRB", "Serbia"],
    "694": ["SLE", "Sierra Leone"],
    "702": ["SGP", "Singapore"],
    "703": ["SVK", "Slovakia"],
    "705": ["SVN", "Slovenia"],
    "706": ["SOM", "Somalia"],
    "710": ["ZAF", "South Africa"],
    "728": ["SSD", "South Sudan"],
    "724": ["ESP", "Spain"],
    "144": ["LKA", "Sri Lanka"],
    "729": ["SDN", "Sudan"],
    "740": ["SUR", "Suriname"],
    "752": ["SWE", "Sweden"],
    "756": ["CHE", "Switzerland"],
    "760": ["SYR", "Syria"],
    "158": ["TWN", "Taiwan"],
    "762": ["TJK", "Tajikistan"],
    "834": ["TZA", "Tanzania"],
    "764": ["THA", "Thailand"],
    "626": ["TLS", "Timor-Leste"],
    "768": ["TGO", "Togo"],
    "780": ["TTO", "Trinidad and Tobago"],
    "788": ["TUN", "Tunisia"],
    "792": ["TUR", "Turkey"],
    "795": ["TKM", "Turkmenistan"],
    "800": ["UGA", "Uganda"],
    "804": ["UKR", "Ukraine"],
    "784": ["ARE", "UAE"],
    "826": ["GBR", "United Kingdom"],
    "840": ["USA", "United States"],
    "858": ["URY", "Uruguay"],
    "860": ["UZB", "Uzbekistan"],
    "862": ["VEN", "Venezuela"],
    "704": ["VNM", "Vietnam"],
    "887": ["YEM", "Yemen"],
    "894": ["ZMB", "Zambia"],
    "716": ["ZWE", "Zimbabwe"],
    "275": ["PSE", "Palestine"],
    "807": ["MKD", "North Macedonia"],
    "051": ["ARM", "Armenia"],
    "112": ["BLR", "Belarus"],
    "174": ["COM", "Comoros"],
    "084": ["BLZ", "Belize"],
    "090": ["SLB", "Solomon Islands"],
    "540": ["NCL", "New Caledonia"],
    "548": ["VUT", "Vanuatu"],
    "010": ["ATA", "Antarctica"],
    "-99": ["XKX", "Kosovo"],
};

/* ========================================================================== */
/* 3D Sphere Math */
/* ========================================================================== */

const D2R = Math.PI / 180;
const R2D = 180 / Math.PI;

function clamp(v: number, lo: number, hi: number) {
    return v < lo ? lo : v > hi ? hi : v;
}

/**
 * Project a (longitude, latitude) point onto the screen using orthographic
 * projection, with three independent rotations applied in order:
 *
 *   1. lambda — rotation around Z axis (polar/spin axis), pre-baked into (lng - lambda)
 *   2. phi    — rotation around Y axis (screen-right), tilts north pole toward camera
 *   3. gamma  — rotation around X axis (camera/depth axis), rolls the view
 */
function project(
    lng: number,
    lat: number,
    lambda: number,
    phi: number,
    gamma: number,
    R: number,
    cx: number,
    cy: number
): ProjectedPoint {
    const lr = (lng - lambda) * D2R;
    const la = lat * D2R;
    const cl = Math.cos(la);
    // Unrotated unit-sphere position (post-Z-rotation by lambda)
    const x0 = cl * Math.cos(lr);
    const y0 = cl * Math.sin(lr);
    const z0 = Math.sin(la);
    // Rotate around Y by phi (tilts north pole forward)
    const cp = Math.cos(phi * D2R);
    const sp = Math.sin(phi * D2R);
    const x1 = x0 * cp + z0 * sp;
    const y1 = y0;
    const z1 = -x0 * sp + z0 * cp;
    // Rotate around X by gamma (rolls around the viewer-facing axis)
    const cg = Math.cos(gamma * D2R);
    const sg = Math.sin(gamma * D2R);
    const rx = x1;
    const ry = y1 * cg - z1 * sg;
    const rz = y1 * sg + z1 * cg;
    return {
        sx: cx + R * ry,
        sy: cy - R * rz,
        rx,
        ry,
        rz,
        v: rx >= 0,
    };
}

/**
 * Inverse projection: screen (px, py) → (lng, lat), or null if outside globe.
 */
function unproject(
    px: number,
    py: number,
    lambda: number,
    phi: number,
    gamma: number,
    R: number,
    cx: number,
    cy: number
): { lng: number; lat: number } | null {
    const Ry = (px - cx) / R;
    const Rz = -(py - cy) / R;
    const r2 = Ry * Ry + Rz * Rz;
    if (r2 > 1) return null;
    // Inverse X rotation (roll): undo gamma in the (y, z) plane
    const cg = Math.cos(gamma * D2R);
    const sg = Math.sin(gamma * D2R);
    const y1 = Ry * cg + Rz * sg;
    const z1 = -Ry * sg + Rz * cg;
    // Visible-side depth (rotation preserves length, so y1²+z1² == r2)
    const x1 = Math.sqrt(Math.max(0, 1 - r2));
    // Inverse Y rotation: undo phi in the (x, z) plane
    const cp = Math.cos(phi * D2R);
    const sp = Math.sin(phi * D2R);
    const x0 = x1 * cp - z1 * sp;
    const y0 = y1;
    const z0 = x1 * sp + z1 * cp;
    const lat = Math.asin(clamp(z0, -1, 1)) * R2D;
    let lng = Math.atan2(y0, x0) * R2D + lambda;
    lng = ((((lng + 180) % 360) + 360) % 360) - 180;
    return { lng, lat };
}

/**
 * Find limb intersection between visible point a and invisible point b.
 */
function limbIntersect(
    a: ProjectedPoint,
    b: ProjectedPoint,
    R: number,
    cx: number,
    cy: number
): ProjectedPoint | null {
    const dr = a.rx - b.rx;
    if (Math.abs(dr) < 1e-12) return null;
    const t = a.rx / dr;
    if (t < 0 || t > 1) return null;
    let ry = a.ry + t * (b.ry - a.ry);
    let rz = a.rz + t * (b.rz - a.rz);
    const norm = Math.sqrt(ry * ry + rz * rz);
    if (norm < 1e-9) return null;
    ry /= norm;
    rz /= norm;
    return {
        sx: cx + R * ry,
        sy: cy - R * rz,
        rx: 0,
        ry,
        rz,
        v: true,
    };
}

/**
 * Clip a closed ring to the visible hemisphere.
 */
function ringToSegments(
    ring: number[][],
    lambda: number,
    phi: number,
    gamma: number,
    R: number,
    cx: number,
    cy: number
): ProjectedPoint[][] {
    const n = ring.length;
    if (n < 3) return [];
    const proj: ProjectedPoint[] = new Array(n);
    let visCount = 0;
    for (let i = 0; i < n; i++) {
        const p = ring[i];
        proj[i] = project(p[0], p[1], lambda, phi, gamma, R, cx, cy);
        if (proj[i].v) visCount++;
    }
    if (visCount === 0) return [];
    if (visCount === n) return [proj.slice()];

    let startIdx = -1;
    for (let i = 0; i < n; i++) {
        if (!proj[i].v && proj[(i + 1) % n].v) {
            startIdx = i;
            break;
        }
    }
    if (startIdx === -1) return [proj.slice()];

    const segments: ProjectedPoint[][] = [];
    let cur: ProjectedPoint[] = [];

    for (let k = 0; k < n; k++) {
        const i = (startIdx + k) % n;
        const j = (startIdx + k + 1) % n;
        const A = proj[i];
        const B = proj[j];

        if (A.v && B.v) {
            cur.push(B);
        } else if (A.v && !B.v) {
            const inter = limbIntersect(A, B, R, cx, cy);
            if (inter) cur.push(inter);
            if (cur.length >= 2) segments.push(cur);
            cur = [];
        } else if (!A.v && B.v) {
            const inter = limbIntersect(A, B, R, cx, cy);
            if (inter) cur.push(inter);
            cur.push(B);
        }
    }

    return segments;
}

function segmentsToPath(segs: ProjectedPoint[][]): string {
    if (segs.length === 0) return "";
    let out = "";
    for (const seg of segs) {
        for (let i = 0; i < seg.length; i++) {
            const p = seg[i];
            out += (i === 0 ? "M" : "L") + p.sx.toFixed(1) + "," + p.sy.toFixed(1);
        }
        out += "Z";
    }
    return out;
}

function buildSphericalPath(
    type: string,
    coords: any,
    lambda: number,
    phi: number,
    gamma: number,
    R: number,
    cx: number,
    cy: number
): string {
    if (!coords) return "";
    if (type === "Polygon") {
        let out = "";
        for (const ring of coords) {
            out += segmentsToPath(ringToSegments(ring, lambda, phi, gamma, R, cx, cy));
        }
        return out;
    }
    if (type === "MultiPolygon") {
        let out = "";
        for (const poly of coords) {
            for (const ring of poly) {
                out += segmentsToPath(ringToSegments(ring, lambda, phi, gamma, R, cx, cy));
            }
        }
        return out;
    }
    return "";
}

/**
 * Builds the lat/lng grid lines (graticule) projected onto the visible hemisphere
 */
function buildGraticule(
    lambda: number,
    phi: number,
    gamma: number,
    R: number,
    cx: number,
    cy: number
): string {
    let d = "";
    // Draw meridians every 30 degrees
    for (let lng = -180; lng < 180; lng += 30) {
        let inSegment = false;
        for (let lat = -80; lat <= 80; lat += 2) {
            const p = project(lng, lat, lambda, phi, gamma, R, cx, cy);
            if (p.v) {
                d += (inSegment ? " L" : " M") + p.sx.toFixed(1) + "," + p.sy.toFixed(1);
                inSegment = true;
            } else {
                inSegment = false;
            }
        }
    }
    // Draw parallels every 30 degrees
    for (let lat = -60; lat <= 60; lat += 30) {
        let inSegment = false;
        for (let lng = -180; lng <= 180; lng += 2) {
            const p = project(lng, lat, lambda, phi, gamma, R, cx, cy);
            if (p.v) {
                d += (inSegment ? " L" : " M") + p.sx.toFixed(1) + "," + p.sy.toFixed(1);
                inSegment = true;
            } else {
                inSegment = false;
            }
        }
    }
    return d;
}

/* ========================================================================== */
/* TopoJSON Decoder */
/* ========================================================================== */

function decArcs(t: any): number[][][] {
    const tf = t.transform;
    if (!tf) return t.arcs;
    const sx = tf.scale[0],
        sy = tf.scale[1],
        dx = tf.translate[0],
        dy = tf.translate[1];
    return t.arcs.map((a: number[][]) => {
        let x = 0,
            y = 0;
        return a.map((p: number[]) => {
            x += p[0];
            y += p[1];
            return [x * sx + dx, y * sy + dy];
        });
    });
}

function resolveRing(idx: number[], arcs: number[][][]): number[][] {
    const out: number[][] = [];
    for (const i of idx) {
        const a = i >= 0 ? arcs[i] : arcs[~i].slice().reverse();
        for (let j = out.length > 0 ? 1 : 0; j < a.length; j++) out.push(a[j]);
    }
    return out;
}

function extractFeatures(t: any): any[] {
    const arcs = decArcs(t);
    const gs = t.objects.countries?.geometries;
    if (!gs) return [];
    return gs.map((g: any) => {
        let c: any = null;
        if (g.type === "Polygon")
            c = g.arcs.map((r: number[]) => resolveRing(r, arcs));
        else if (g.type === "MultiPolygon")
            c = g.arcs.map((p: number[][]) =>
                p.map((r: number[]) => resolveRing(r, arcs))
            );
        return { id: String(g.id ?? ""), type: g.type, coords: c };
    });
}

/* ========================================================================== */
/* Hover hit-test (point-in-polygon over lng/lat) */
/* ========================================================================== */

function pointInRing(x: number, y: number, ring: number[][]): boolean {
    let inside = false;
    const n = ring.length;
    for (let i = 0, j = n - 1; i < n; j = i++) {
        const xi = ring[i][0],
            yi = ring[i][1];
        const xj = ring[j][0],
            yj = ring[j][1];
        if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi)
            inside = !inside;
    }
    return inside;
}

function findCountryAt(
    lng: number,
    lat: number,
    index: CountryEntry[]
): CountryEntry | null {
    for (const c of index) {
        if (lng < c.bbox.minLng || lng > c.bbox.maxLng) continue;
        if (lat < c.bbox.minLat || lat > c.bbox.maxLat) continue;
        let inside = false;
        for (const ring of c.rings) {
            if (pointInRing(lng, lat, ring)) inside = !inside;
        }
        if (inside) return c;
    }
    return null;
}

/* ========================================================================== */
/* Utilities */
/* ========================================================================== */

function rgba(c: string, a: number): string {
    if (typeof c !== "string" || !c) return "rgba(0,0,0," + a + ")";
    const s = c.trim();
    if (s.indexOf("rgb") === 0) {
        const m = s.match(/-?[\d.]+/g);
        if (m && m.length >= 3) {
            return "rgba(" + m[0] + "," + m[1] + "," + m[2] + "," + a + ")";
        }
        return "rgba(0,0,0," + a + ")";
    }
    if (s.indexOf("hsl") === 0) {
        const m = s.match(/-?[\d.]+/g);
        if (m && m.length >= 3) {
            return "hsla(" + m[0] + "," + m[1] + "%," + m[2] + "%," + a + ")";
        }
        return "rgba(0,0,0," + a + ")";
    }
    const h = s.replace("#", "");
    if (h.length !== 3 && h.length !== 6 && h.length !== 8) {
        return "rgba(0,0,0," + a + ")";
    }
    const f =
        h.length === 3
            ? h
                  .split("")
                  .map((x) => x + x)
                  .join("")
            : h.slice(0, 6);
    return (
        "rgba(" +
        parseInt(f.slice(0, 2), 16) +
        "," +
        parseInt(f.slice(2, 4), 16) +
        "," +
        parseInt(f.slice(4, 6), 16) +
        "," +
        a +
        ")"
    );
}

function mulberry32(seed: number) {
    let s = seed >>> 0;
    return () => {
        s = (s + 0x6d2b79f5) >>> 0;
        let t = s;
        t = Math.imul(t ^ (t >>> 15), t | 1);
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

const DATA_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

/* ========================================================================== */
/* Default Configurations matching TK Ellegance gold design system */
/* ========================================================================== */

const DEFAULT_MAP_STYLE: MapStyleConfig = {
    oceanColor: "#050505",   // Sleek obsidian black
    landFill: "#14171c",     // Deep luxury space charcoal
    landStroke: "rgba(212, 175, 55, 0.25)", // Soft elegant gold country borders
    strokeWidth: 0.5,
    hoverColor: "#d4af37",   // Glowing bright gold on hover
    disabledColor: "#0a0c0f"
};

const DEFAULT_TOOLTIP: TooltipConfig = {
    show: true,
    background: "rgba(5, 5, 5, 0.85)", // Obsidian transparent blur
    textColor: "#ffffff",
    borderColor: "rgba(212, 175, 55, 0.35)"
};

const DEFAULT_GRID: GridConfig = {
    show: true,
    color: "rgba(212, 175, 55, 0.15)", // Muted gold grid lines
    opacity: 0.35
};

const DEFAULT_LAYOUT: LayoutConfig = {
    cornerRadius: 32,
    padding: 16,
    showBorder: true,
    borderColor: "rgba(255, 255, 255, 0.08)"
};

const DEFAULT_INTERACTION: InteractionConfig = {
    autoRotate: false,
    autoRotateSpeed: 1.5,
    rotateX: 0,
    rotateY: 48.5,    // Tilt focused on Slovakia (48.5° N)
    rotateZ: 19.5,   // Polar spin focused on Slovakia (19.5° E)
    enableDrag: true,
    dragSensitivity: 0.22,
    glowColor: "#d4af37", // Elegant gold atmosphere glow
    glowIntensity: 0.75,
    showStars: true,
    showLabels: true
};

const DEFAULT_MARKERS: MarkerItem[] = [
    {
        label: "Košice",
        description: "Grand Prix Košice 2026 (TK Ellegance)",
        latitude: 48.7164,
        longitude: 21.2611,
        color: "#d4af37"
    },
    {
        label: "Bratislava",
        description: "Majstrovstvá SR v 10 tancoch 2026",
        latitude: 48.1486,
        longitude: 17.1077,
        color: "#d4af37"
    },
    {
        label: "Banská Bystrica",
        description: "Pohár primátora mesta Banská Bystrica",
        latitude: 48.7363,
        longitude: 19.1462,
        color: "#d4af37"
    },
    {
        label: "Poprad",
        description: "Tatranský Pohár 2026",
        latitude: 49.0556,
        longitude: 20.3008,
        color: "#d4af37"
    },
    {
        label: "Žilina",
        description: "Žilinská tanečná jeseň 2026",
        latitude: 49.2232,
        longitude: 18.7397,
        color: "#d4af37"
    }
];

/* ========================================================================== */
/* Component Implementation */
/* ========================================================================== */

export default function MilitaryMap(props: Props) {
    // Merge props with luxury defaults
    const markers = props.markers || DEFAULT_MARKERS;
    const countries = props.countries || [];
    const mapStyle = { ...DEFAULT_MAP_STYLE, ...props.mapStyle };
    const tooltip = { ...DEFAULT_TOOLTIP, ...props.tooltip };
    const grid = { ...DEFAULT_GRID, ...props.grid };
    const layout = { ...DEFAULT_LAYOUT, ...props.layout };
    const interaction = { ...DEFAULT_INTERACTION, ...props.interaction };
    const { activeMarkerLabel, onMarkerSelect } = props;

    const containerRef = React.useRef<HTMLDivElement>(null);
    const svgRef = React.useRef<SVGSVGElement>(null);
    const pathRefs = React.useRef<Map<string, SVGPathElement>>(new Map());
    const ghostPathRefs = React.useRef<Map<string, SVGPathElement>>(new Map());
    const markerRefs = React.useRef<Map<number, SVGGElement>>(new Map());
    const gridPathRef = React.useRef<SVGPathElement>(null);

    const [isClient, setIsClient] = React.useState(false);
    const [dims, setDims] = React.useState({ w: 600, h: 420 });
    const [feats, setFeats] = React.useState<any[] | null>(null);
    const [err, setErr] = React.useState(false);
    const [hM, setHM] = React.useState<HoveredMarker | null>(null);
    const [hC, setHC] = React.useState<HoveredCountry | null>(null);
    const [zoom, setZoom] = React.useState(16.0); // Starts beautifully zoomed in on Slovakia!

    // Live rotation state held in refs to avoid React reconciliation per frame.
    const rotRef = React.useRef({
        lambda: interaction.rotateZ,
        phi: interaction.rotateY,
        gamma: interaction.rotateX,
    });
    
    // Lerping variables for smooth auto-centering on active select
    const targetRotRef = React.useRef<({ lambda: number; phi: number } | null)>(null);

    const dragRef = React.useRef({
        active: false,
        startX: 0,
        startY: 0,
        startLambda: 0,
        startPhi: 0,
    });
    // Track active pointers for pinch-to-zoom
    const activePointersRef = React.useRef<Map<number, { x: number; y: number }>>(new Map());
    const pinchRef = React.useRef<{ startDist: number; startZoom: number } | null>(null);
    const lastMouseRef = React.useRef<{ x: number; y: number } | null>(null);
    const userInteractedRef = React.useRef<number>(0); // timestamp of last drag end

    /* SSR guard */
    React.useEffect(() => {
        setIsClient(true);
    }, []);

    /* Native Wheel Zoom Listener */
    React.useEffect(() => {
        const el = svgRef.current;
        if (!el) return;
        const handleWheel = (e: WheelEvent) => {
            e.preventDefault();
            setZoom((prev) => {
                const sensitivity = prev * 0.0012;
                const next = prev - e.deltaY * sensitivity;
                return Math.max(1.0, Math.min(35.0, next));
            });
        };
        el.addEventListener("wheel", handleWheel, { passive: false });
        return () => {
            el.removeEventListener("wheel", handleWheel);
        };
    }, [isClient]);

    /* Set target coordinates when activeMarkerLabel changes */
    React.useEffect(() => {
        if (!isClient) return;
        if (activeMarkerLabel) {
            const m = markers.find(x => x.label === activeMarkerLabel);
            if (m) {
                // Centering equations: target lambda = lng, target phi = lat
                targetRotRef.current = {
                    lambda: m.longitude,
                    phi: m.latitude
                };
                userInteractedRef.current = performance.now(); // temporary pause auto-spin
            }
        } else {
            targetRotRef.current = null;
        }
    }, [activeMarkerLabel, markers, isClient]);

    /* Sync rotation to props when not dragging and no active animation target */
    React.useEffect(() => {
        if (!dragRef.current.active && !targetRotRef.current) {
            rotRef.current.lambda = interaction.rotateZ;
            rotRef.current.phi = interaction.rotateY;
            rotRef.current.gamma = interaction.rotateX;
        }
    }, [interaction.rotateX, interaction.rotateY, interaction.rotateZ]);

    /* Resize observer */
    React.useEffect(() => {
        if (!isClient) return;
        const el = containerRef.current;
        if (!el) return;
        const ro = new ResizeObserver((e) => {
            const r = e[0]?.contentRect;
            if (r && r.width > 0 && r.height > 0) {
                React.startTransition(() => {
                    setDims({ w: r.width, h: r.height });
                });
            }
        });
        ro.observe(el);
        return () => ro.disconnect();
    }, [isClient]);

    /* Load topojson map data */
    React.useEffect(() => {
        if (!isClient) return;
        let dead = false;
        fetch(DATA_URL)
            .then((r) => {
                if (!r.ok) throw new Error("Network error");
                return r.json();
            })
            .then((t) => {
                if (!dead) {
                    React.startTransition(() => {
                        setFeats(extractFeatures(t));
                    });
                }
            })
            .catch(() => {
                if (!dead) {
                    React.startTransition(() => {
                        setErr(true);
                    });
                }
            });
        return () => {
            dead = true;
        };
    }, [isClient]);

    // Hooks must run unconditionally above. The loader check is moved to the bottom.

    /* Geometry */
    const { w: W, h: H } = dims;
    const pad = layout.padding;
    const innerW = Math.max(0, W - pad * 2);
    const innerH = Math.max(0, H - pad * 2);
    const baseR = Math.max(20, Math.min(innerW, innerH) / 2 - 12);
    const R = baseR * zoom;
    const cx = W / 2;
    const cy = H / 2;

    /* Build country index */
    const countryIndex: CountryEntry[] = React.useMemo(() => {
        if (!feats) return [];
        const out: CountryEntry[] = [];
        const seenIds = new Set<string>();

        for (const f of feats) {
            let pad3 = String(f.id ?? "").trim();
            if (!pad3 || pad3 === "undefined" || pad3 === "null") {
                pad3 = "UNK";
            } else {
                pad3 = pad3.padStart(3, "0");
            }
            
            const e = CD[pad3];
            const a3 = e ? e[0] : pad3;
            if (a3 === "ATA") continue; // Skip Antarctica
            
            // Ensure unique ID inside the index to prevent duplicate keys and ref overwriting!
            let uniqueId = a3;
            let counter = 1;
            while (seenIds.has(uniqueId)) {
                uniqueId = `${a3}-${counter}`;
                counter++;
            }
            seenIds.add(uniqueId);

            const nm = e ? e[1] : a3;
            
            const rings: number[][][] = [];
            let minLng = Infinity,
                maxLng = -Infinity,
                minLat = Infinity,
                maxLat = -Infinity;
            const visit = (ring: number[][]) => {
                rings.push(ring);
                for (const p of ring) {
                    if (p[0] < minLng) minLng = p[0];
                    if (p[0] > maxLng) maxLng = p[0];
                    if (p[1] < minLat) minLat = p[1];
                    if (p[1] > maxLat) maxLat = p[1];
                }
            };
            if (f.type === "Polygon") {
                for (const r of f.coords) visit(r);
            } else if (f.type === "MultiPolygon") {
                for (const poly of f.coords) for (const r of poly) visit(r);
            }
            out.push({
                id: uniqueId,
                name: nm,
                type: f.type,
                coords: f.coords,
                rings,
                bbox: { minLng, maxLng, minLat, maxLat },
            });
        }
        return out;
    }, [feats]);

    /* Country config map */
    const cfgMap = React.useMemo(() => {
        const m = new Map<string, CountryItem>();
        countries.forEach((c) => m.set(c.code, c));
        return m;
    }, [countries]);

    /* Stars */
    const stars = React.useMemo(() => {
        if (!interaction.showStars) return [];
        const rnd = mulberry32(0x5e6d_a17c);
        const N = 65;
        const out: { x: number; y: number; r: number; o: number }[] = [];
        for (let i = 0; i < N; i++) {
            const x = rnd() * W;
            const y = rnd() * H;
            const dx = x - cx,
                dy = y - cy;
            if (dx * dx + dy * dy < (R + 15) * (R + 15)) continue;
            out.push({
                x,
                y,
                r: 0.3 + rnd() * 0.9,
                o: 0.15 + rnd() * 0.5,
            });
        }
        return out;
    }, [W, H, cx, cy, R, interaction.showStars]);

    /* Animation loop */
    React.useEffect(() => {
        if (!isClient || countryIndex.length === 0) return;
        if (W <= 0 || H <= 0 || R <= 0) return;

        let raf = 0;
        let lastTime = typeof performance !== "undefined" ? performance.now() : 0;
        const idleMs = 3500; // time after drag or active selection to resume auto-rotate
        let hoverFrameCount = 0; // throttle hover hit-test to every 3 frames

        const step = (now: number) => {
            const dt = Math.min(0.05, (now - lastTime) / 1000);
            lastTime = now;

            const sinceUser = now - userInteractedRef.current;

            // Handle Target Lerp Centering on Active Marker Select
            if (targetRotRef.current && !dragRef.current.active) {
                const target = targetRotRef.current;
                const dLambda = target.lambda - rotRef.current.lambda;
                const dPhi = target.phi - rotRef.current.phi;
                
                // Direct interpolations
                rotRef.current.lambda += dLambda * 0.08;
                rotRef.current.phi += dPhi * 0.08;

                // Stop active lerp when extremely close
                if (Math.abs(dLambda) < 0.05 && Math.abs(dPhi) < 0.05) {
                    targetRotRef.current = null;
                }
            } else if (
                interaction.autoRotate &&
                !dragRef.current.active &&
                sinceUser > idleMs
            ) {
                rotRef.current.lambda += interaction.autoRotateSpeed * dt;
            }

            const { lambda, phi, gamma } = rotRef.current;

            // Update country paths
            for (const c of countryIndex) {
                const d = buildSphericalPath(
                    c.type,
                    c.coords,
                    lambda,
                    phi,
                    gamma,
                    R,
                    cx,
                    cy
                );
                const p = pathRefs.current.get(c.id);
                if (p) p.setAttribute("d", d);
                const g = ghostPathRefs.current.get(c.id);
                if (g) g.setAttribute("d", d);
            }

            // Update grid
            if (grid.show && gridPathRef.current) {
                gridPathRef.current.setAttribute(
                    "d",
                    buildGraticule(lambda, phi, gamma, R, cx, cy)
                );
            }

            // Update markers
            for (let i = 0; i < markers.length; i++) {
                const m = markers[i];
                const el = markerRefs.current.get(i);
                if (!el) continue;
                const p = project(
                    m.longitude,
                    m.latitude,
                    lambda,
                    phi,
                    gamma,
                    R,
                    cx,
                    cy
                );
                if (p.v) {
                    const fade = clamp(p.rx * 3.5, 0, 1);
                    el.style.opacity = String(fade);
                    el.style.display = "";
                    el.setAttribute(
                        "transform",
                        "translate(" +
                            p.sx.toFixed(1) +
                            "," +
                            p.sy.toFixed(1) +
                            ")"
                    );
                } else {
                    el.style.opacity = "0";
                    el.style.display = "none";
                }
            }

            // Evaluate hover hit-test — throttled to every 3 frames and skipped during drag
            hoverFrameCount++;
            if (lastMouseRef.current && !dragRef.current.active && hoverFrameCount >= 3) {
                hoverFrameCount = 0;
                const m = lastMouseRef.current;
                const ll = unproject(m.x, m.y, lambda, phi, gamma, R, cx, cy);
                if (ll) {
                    const c = findCountryAt(ll.lng, ll.lat, countryIndex);
                    if (c) {
                        if (!hC || hC.code !== c.id) {
                            React.startTransition(() => {
                                setHC({
                                    screenX: m.x,
                                    screenY: m.y,
                                    name: c.name,
                                    code: c.id,
                                });
                            });
                        } else if (hC.screenX !== m.x || hC.screenY !== m.y) {
                            React.startTransition(() => {
                                setHC({ ...hC, screenX: m.x, screenY: m.y });
                            });
                        }
                    } else if (hC) {
                        React.startTransition(() => {
                            setHC(null);
                        });
                    }
                } else if (hC) {
                    React.startTransition(() => {
                        setHC(null);
                    });
                }
            } else if (dragRef.current.active && hC) {
                // Clear tooltip immediately on drag start
                React.startTransition(() => setHC(null));
            }

            raf = requestAnimationFrame(step);
        };

        raf = requestAnimationFrame(step);
        return () => cancelAnimationFrame(raf);
    }, [
        isClient,
        countryIndex,
        markers,
        R,
        cx,
        cy,
        W,
        H,
        grid.show,
        interaction.autoRotate,
        interaction.autoRotateSpeed,
    ]);

    /* Sync hover highlight colors to standard elements */
    React.useEffect(() => {
        for (const c of countryIndex) {
            const el = pathRefs.current.get(c.id);
            if (!el) continue;
            const cc = cfgMap.get(c.id);
            const enabled = cc ? cc.enabled : true;
            
            // Default highlight Slovakia (SVK) to gold as well for localization
            const isHov = hC?.code === c.id;
            const isSVK = c.id === "SVK";

            let fill = mapStyle.landFill;
            if (isHov) {
                fill = mapStyle.hoverColor;
            } else if (isSVK) {
                fill = "rgba(212, 175, 55, 0.35)"; // Slovakia highlighted subtly
            } else if (!enabled && cc) {
                fill = mapStyle.disabledColor;
            }

            el.setAttribute("fill", fill);
        }
    }, [
        countryIndex,
        cfgMap,
        hC,
        mapStyle.hoverColor,
        mapStyle.disabledColor,
        mapStyle.landFill,
    ]);

    /* Pointer handlers */
    const localMouse = (e: React.PointerEvent) => {
        const r = containerRef.current?.getBoundingClientRect();
        if (!r) return { x: 0, y: 0 };
        return { x: e.clientX - r.left, y: e.clientY - r.top };
    };

    const getPinchDist = () => {
        const pts = Array.from(activePointersRef.current.values());
        if (pts.length < 2) return null;
        const dx = pts[0].x - pts[1].x;
        const dy = pts[0].y - pts[1].y;
        return Math.sqrt(dx * dx + dy * dy);
    };

    const onPointerDown = (e: React.PointerEvent<SVGSVGElement>) => {
        if (!interaction.enableDrag) return;

        const m = localMouse(e);
        activePointersRef.current.set(e.pointerId, m);

        try { (e.currentTarget as any).setPointerCapture(e.pointerId); } catch {}

        // Start pinch if 2 pointers active
        if (activePointersRef.current.size === 2) {
            const dist = getPinchDist();
            if (dist !== null) {
                pinchRef.current = { startDist: dist, startZoom: zoom };
            }
            // Cancel single-finger drag so pinch takes over
            dragRef.current.active = false;
            return;
        }

        // Single pointer — drag (skip if on marker)
        const target = e.target as HTMLElement;
        if (target.closest("g")?.style.cursor === "pointer") return;

        const dx = m.x - cx, dy = m.y - cy;
        if (dx * dx + dy * dy > (R + 8) * (R + 8)) return;
        dragRef.current = {
            active: true,
            startX: m.x,
            startY: m.y,
            startLambda: rotRef.current.lambda,
            startPhi: rotRef.current.phi,
        };
        React.startTransition(() => { setHC(null); setHM(null); });
    };

    const onPointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
        const m = localMouse(e);
        activePointersRef.current.set(e.pointerId, m);
        lastMouseRef.current = m;

        // Pinch-to-zoom — two fingers
        if (activePointersRef.current.size >= 2 && pinchRef.current) {
            const dist = getPinchDist();
            if (dist !== null) {
                const ratio = dist / pinchRef.current.startDist;
                const next = clamp(pinchRef.current.startZoom * ratio, 1.0, 35.0);
                setZoom(next);
                userInteractedRef.current = performance.now();
            }
            return; // don't pan while pinching
        }

        // Single-finger drag
        if (dragRef.current.active) {
            const sens = interaction.dragSensitivity / zoom;
            const dx = m.x - dragRef.current.startX;
            const dy = m.y - dragRef.current.startY;
            rotRef.current.lambda = dragRef.current.startLambda - dx * sens;
            rotRef.current.phi = clamp(
                dragRef.current.startPhi + dy * sens,
                -85,
                85
            );
        }
    };

    const onPointerUp = (e: React.PointerEvent<SVGSVGElement>) => {
        activePointersRef.current.delete(e.pointerId);
        try { (e.currentTarget as any).releasePointerCapture(e.pointerId); } catch {}

        // End pinch when fewer than 2 pointers remain
        if (activePointersRef.current.size < 2) {
            if (pinchRef.current) {
                pinchRef.current = null;
                userInteractedRef.current = performance.now();
            }
        }

        if (dragRef.current.active) {
            dragRef.current.active = false;
            userInteractedRef.current = performance.now();
        }
    };

    const onPointerLeave = () => {
        lastMouseRef.current = null;
        if (!dragRef.current.active) {
            React.startTransition(() => { setHC(null); setHM(null); });
        }
    };

    /* Marker hover handlers */
    const handleMarkerEnter = (i: number, e: React.MouseEvent<SVGGElement>) => {
        const m = markers[i];
        const r = containerRef.current?.getBoundingClientRect();
        if (!r) return;
        React.startTransition(() => {
            setHM({
                screenX: e.clientX - r.left,
                screenY: e.clientY - r.top,
                label: m.label,
                description: m.description,
            });
        });
    };
    const handleMarkerMove = (i: number, e: React.MouseEvent<SVGGElement>) => {
        const m = markers[i];
        const r = containerRef.current?.getBoundingClientRect();
        if (!r) return;
        React.startTransition(() => {
            setHM({
                screenX: e.clientX - r.left,
                screenY: e.clientY - r.top,
                label: m.label,
                description: m.description,
            });
        });
    };
    const handleMarkerLeave = () => {
        React.startTransition(() => {
            setHM(null);
        });
    };

    /* Styles and details */
    const { oceanColor, landStroke, strokeWidth } = mapStyle;
    const { show: showGrid, color: gridCol, opacity: gridOp } = grid;
    const { cornerRadius, showBorder, borderColor: bCol } = layout;
    const {
        show: showTooltip,
        background: ttBg,
        textColor: ttCol,
        borderColor: ttBord,
    } = tooltip;
    const { glowColor, glowIntensity, enableDrag } = interaction;

    const loading = !feats && !err;
    // Stable ID — never regenerate during re-renders
    const uidRef = React.useRef("globe-" + Math.random().toString(36).slice(2, 6));
    const uid = uidRef.current;
    const fL = "l-" + uid;
    const gO = "o-" + uid;
    const gShade = "s-" + uid;
    const gAtm = "a-" + uid;
    const clipDisc = "c-" + uid;

    // Render static loader prior to dynamic mount
    if (!isClient) {
        return (
            <div
                ref={containerRef}
                style={{
                    width: "100%",
                    height: "100%",
                    minHeight: 380,
                    position: "relative",
                    boxSizing: "border-box",
                    borderRadius: layout.cornerRadius,
                    padding: layout.padding,
                    border: layout.showBorder ? "1px solid " + layout.borderColor : "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "transparent",
                    color: "rgba(216,221,217,0.3)",
                    fontSize: 11,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase" as const,
                }}
            >
                Načítavam tanečnú mapu...
            </div>
        );
    }

    return (
        <div
            ref={containerRef}
            style={{
                width: "100%",
                height: "100%",
                position: "relative",
                overflow: "hidden",
                boxSizing: "border-box",
                borderRadius: cornerRadius,
                padding: pad,
                background: "transparent",
                border: showBorder ? "1px solid " + bCol : "none",
                fontFamily:
                    '"SF Mono", ui-monospace, SFMono-Regular, "Cascadia Mono", Menlo, Monaco, Consolas, monospace',
                color: "#d8ddd9",
                touchAction: "none",
                userSelect: "none",
                WebkitUserSelect: "none",
                willChange: "transform",
            }}
        >
            <style>
                {`@keyframes mm-pulse{0%,100%{transform:scale(1);opacity:.5}50%{transform:scale(1.75);opacity:.02}}
                  .mm-pulse{animation:mm-pulse 2.2s cubic-bezier(0.2, 0.8, 0.2, 1) infinite;transform-box:fill-box;transform-origin:center;pointer-events:none}`}
            </style>

            {loading && (
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "rgba(216,221,217,0.4)",
                        fontSize: 11,
                        letterSpacing: "0.12em",
                        textTransform: "uppercase" as const,
                    }}
                >
                    Načítavam tanečnú mapu...
                </div>
            )}
            {err && (
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "column" as const,
                        gap: 6,
                        color: "#ff6b6b",
                        fontSize: 11,
                    }}
                >
                    <span>Nepodarilo sa načítať mapu</span>
                    <span style={{ fontSize: 9, opacity: 0.6 }}>
                        Skontrolujte internetové pripojenie
                    </span>
                </div>
            )}

            <svg
                ref={svgRef}
                width={W}
                height={H}
                viewBox={"0 0 " + W + " " + H}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
                onPointerCancel={onPointerUp}
                onPointerLeave={onPointerLeave}
                style={{
                    display: "block",
                    width: "100%",
                    height: "100%",
                    cursor: enableDrag
                        ? dragRef.current.active
                            ? "grabbing"
                            : "grab"
                        : "default",
                    willChange: "transform",
                    transform: "translateZ(0)",
                }}
            >
                <defs>
                    <filter
                        id={fL}
                        x="-40%"
                        y="-40%"
                        width="180%"
                        height="180%"
                    >
                        <feGaussianBlur stdDeviation="3.5" result="b" />
                        <feColorMatrix
                            in="b"
                            type="matrix"
                            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.18 0"
                        />
                    </filter>

                    {/* High-end spatial ambient shading */}
                    <radialGradient id={gShade} cx="35%" cy="30%" r="75%">
                        <stop offset="0%" stopColor={rgba("#ffffff", 0.1)} />
                        <stop offset="60%" stopColor={rgba("#ffffff", 0.0)} />
                        <stop offset="85%" stopColor={rgba("#000000", 0.35)} />
                        <stop offset="100%" stopColor={rgba("#000000", 0.65)} />
                    </radialGradient>

                    {/* Atmospherical golden glow */}
                    <radialGradient id={gAtm} cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor={rgba(glowColor, 0)} />
                        <stop
                            offset={((R / Math.max(R + 50, 1)) * 100).toFixed(1) + "%"}
                            stopColor={rgba(glowColor, 0)}
                        />
                        <stop
                            offset={(((R + 5) / Math.max(R + 50, 1)) * 100).toFixed(1) + "%"}
                            stopColor={rgba(glowColor, 0.38 * glowIntensity)}
                        />
                        <stop offset="100%" stopColor={rgba(glowColor, 0)} />
                    </radialGradient>

                    {/* Muted deep ocean tone mapping */}
                    <linearGradient id={gO} x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor={rgba("#0d0f12", 0.3)} />
                        <stop offset="50%" stopColor={rgba("#050505", 0.05)} />
                        <stop offset="100%" stopColor={rgba("#010203", 0.45)} />
                    </linearGradient>

                    {/* Sphere mask clipping */}
                    <clipPath id={clipDisc}>
                        <circle cx={cx} cy={cy} r={R} />
                    </clipPath>
                </defs>

                {/* Stars Background */}
                {interaction.showStars &&
                    stars.map((s, i) => (
                        <circle
                            key={"s" + i}
                            cx={s.x.toFixed(1)}
                            cy={s.y.toFixed(1)}
                            r={s.r.toFixed(2)}
                            fill={rgba("#ffffff", s.o)}
                        />
                    ))}

                {/* Atmospheric Glow Aura */}
                <circle
                    cx={cx}
                    cy={cy}
                    r={R + 50}
                    fill={"url(#" + gAtm + ")"}
                    pointerEvents="none"
                />

                {/* Base Ocean Sphere */}
                <circle cx={cx} cy={cy} r={R} fill={oceanColor} />
                <circle cx={cx} cy={cy} r={R} fill={"url(#" + gO + ")"} />

                {/* Masked Terrain Overlay */}
                <g clipPath={"url(#" + clipDisc + ")"}>
                    {/* Atmospheric land shadows */}
                    <g opacity={0.06} filter={"url(#" + fL + ")"}>
                        {countryIndex.map((c) => (
                            <path
                                key={"g" + c.id}
                                ref={(el) => {
                                    if (el) ghostPathRefs.current.set(c.id, el);
                                    else ghostPathRefs.current.delete(c.id);
                                }}
                                fill={mapStyle.landFill}
                                stroke="none"
                                pointerEvents="none"
                            />
                        ))}
                    </g>

                    {/* Graticule Grid */}
                    {showGrid && (
                        <path
                            ref={gridPathRef}
                            fill="none"
                            stroke={gridCol}
                            strokeWidth={0.5}
                            strokeOpacity={gridOp}
                            vectorEffect="non-scaling-stroke"
                            pointerEvents="none"
                        />
                    )}

                    {/* Actual Interactive Landmass Polygons */}
                    {countryIndex.map((c) => {
                        return (
                            <path
                                key={c.id}
                                ref={(el) => {
                                    if (el) pathRefs.current.set(c.id, el);
                                    else pathRefs.current.delete(c.id);
                                }}
                                className="mm-c"
                                stroke={landStroke}
                                strokeWidth={strokeWidth}
                                vectorEffect="non-scaling-stroke"
                                style={{ cursor: "default" }}
                            />
                        );
                    })}
                </g>

                {/* Spatial sphere shade overlay */}
                <circle
                    cx={cx}
                    cy={cy}
                    r={R}
                    fill={"url(#" + gShade + ")"}
                    pointerEvents="none"
                />

                {/* Elegant crisp limb edge outline */}
                <circle
                    cx={cx}
                    cy={cy}
                    r={R}
                    fill="none"
                    stroke={rgba(glowColor, 0.3 * glowIntensity)}
                    strokeWidth={1}
                    pointerEvents="none"
                />

                {/* SVG Active City Markers */}
                {markers.map((m, i) => {
                    const isSelected = activeMarkerLabel === m.label;
                    const sz = isSelected ? 7.5 : 4.5;
                    const col = isSelected ? "#ffffff" : m.color;

                    return (
                        <g
                            key={i}
                            ref={(el) => {
                                if (el) markerRefs.current.set(i, el);
                                else markerRefs.current.delete(i);
                            }}
                            onMouseEnter={(e) => handleMarkerEnter(i, e)}
                            onMouseMove={(e) => handleMarkerMove(i, e)}
                            onMouseLeave={handleMarkerLeave}
                            onClick={() => onMarkerSelect?.(m.label)}
                            style={{ cursor: "pointer", transition: "opacity 0.2s" }}
                        >
                            {/* Glowing gold/white expanding radar circle */}
                            <circle cx={0} cy={0} r={sz * (isSelected ? 3.0 : 2.0)} fill={rgba(col, isSelected ? 0.5 : 0.3)} className="mm-pulse" />
                            {/* Central solid dot */}
                            <circle cx={0} cy={0} r={sz} fill={col} stroke="#050505" strokeWidth={1.5} />
                        </g>
                    );
                })}
            </svg>

            {/* Custom Interactive Tooltip Overlays */}
            {showTooltip && hM && (
                <div
                    style={{
                        position: "absolute",
                        left: hM.screenX + 16,
                        top: hM.screenY - 24,
                        transform: "translateY(-50%)",
                        background: ttBg,
                        border: "1px solid " + ttBord,
                        color: ttCol,
                        padding: "8px 12px",
                        borderRadius: "12px",
                        fontSize: "11px",
                        pointerEvents: "none",
                        zIndex: 100,
                        backdropFilter: "blur(8px)",
                        WebkitBackdropFilter: "blur(8px)",
                        boxShadow: "0 10px 25px -5px rgba(0,0,0,0.7), 0 0 10px rgba(212,175,55,0.1)",
                    }}
                >
                    <div style={{ fontWeight: "bold", color: "#d4af37", display: "flex", alignItems: "center", gap: "6px" }}>
                        <span style={{ display: "inline-block", width: "6px", height: "6px", borderRadius: "50%", background: "#ffffff" }} />
                        {hM.label}
                    </div>
                    {hM.description && (
                        <div style={{ opacity: 0.75, fontSize: "10px", marginTop: "3px", lineHeight: "1.4", fontFamily: "sans-serif" }}>
                            {hM.description}
                        </div>
                    )}
                </div>
            )}

            {showTooltip && hC && !hM && (
                <div
                    style={{
                        position: "absolute",
                        left: hC.screenX + 16,
                        top: hC.screenY - 12,
                        transform: "translateY(-50%)",
                        background: ttBg,
                        border: "1px solid " + ttBord,
                        color: ttCol,
                        padding: "6px 10px",
                        borderRadius: "10px",
                        fontSize: "11px",
                        pointerEvents: "none",
                        zIndex: 90,
                        backdropFilter: "blur(6px)",
                        WebkitBackdropFilter: "blur(6px)",
                        boxShadow: "0 8px 20px rgba(0,0,0,0.6)",
                    }}
                >
                    <div style={{ fontWeight: "bold", letterSpacing: "0.05em" }}>{hC.name}</div>
                </div>
            )}

            {/* Elegant Golden Zoom Controls */}
            <div
                className="absolute right-4 bottom-8 md:bottom-6 flex flex-col gap-1.5 z-[110]"
            >
                <button
                    onClick={() => setZoom((prev) => Math.max(1.0, Math.min(35.0, prev + Math.max(0.35, prev * 0.18))))}
                    className="active:scale-90 transition-transform duration-75 cursor-pointer"
                    style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "8px",
                        background: "rgba(5, 5, 5, 0.85)",
                        border: "1px solid rgba(212, 175, 55, 0.4)",
                        color: "#d4af37",
                        fontSize: "18px",
                        fontWeight: "bold",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backdropFilter: "blur(4px)",
                        WebkitBackdropFilter: "blur(4px)",
                        transition: "border-color 0.15s, background-color 0.15s",
                        outline: "none",
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = "#d4af37";
                        e.currentTarget.style.background = "rgba(212, 175, 55, 0.15)";
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = "rgba(212, 175, 55, 0.4)";
                        e.currentTarget.style.background = "rgba(5, 5, 5, 0.85)";
                    }}
                >
                    +
                </button>
                <button
                    onClick={() => setZoom((prev) => Math.max(1.0, Math.min(35.0, prev - Math.max(0.35, prev * 0.18))))}
                    className="active:scale-90 transition-transform duration-75 cursor-pointer"
                    style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "8px",
                        background: "rgba(5, 5, 5, 0.85)",
                        border: "1px solid rgba(212, 175, 55, 0.4)",
                        color: "#d4af37",
                        fontSize: "20px",
                        fontWeight: "bold",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backdropFilter: "blur(4px)",
                        WebkitBackdropFilter: "blur(4px)",
                        transition: "border-color 0.15s, background-color 0.15s",
                        outline: "none",
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = "#d4af37";
                        e.currentTarget.style.background = "rgba(212, 175, 55, 0.15)";
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = "rgba(212, 175, 55, 0.4)";
                        e.currentTarget.style.background = "rgba(5, 5, 5, 0.85)";
                    }}
                >
                    −
                </button>
            </div>
        </div>
    );
}
