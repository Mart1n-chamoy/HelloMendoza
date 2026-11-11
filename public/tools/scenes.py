"""Genera ilustraciones de placeholder (SVG) en la paleta de Hello Mendoza.
Uso: python3 tools/scenes.py  -> escribe SVGs en tools/out/
Luego tools/render.mjs las convierte a WebP.
Reemplazá los .webp finales por fotos reales con el mismo nombre cuando las tengas.
"""
import math, os, random

OUT = os.path.join(os.path.dirname(__file__), "out")
os.makedirs(OUT, exist_ok=True)

CREAM = "#FAF5EE"


def ridge(seed, W, base, amp, rough=0.55, levels=7):
    """Midpoint displacement ridge line -> list of (x,y)."""
    rnd = random.Random(seed)
    pts = [base + rnd.uniform(-amp, amp) * 0.4, base + rnd.uniform(-amp, amp) * 0.4]
    disp = amp
    for _ in range(levels):
        new = []
        for i in range(len(pts) - 1):
            new.append(pts[i])
            new.append((pts[i] + pts[i + 1]) / 2 + rnd.uniform(-disp, disp))
        new.append(pts[-1])
        pts = new
        disp *= rough
    n = len(pts) - 1
    return [(W * i / n, y) for i, y in enumerate(pts)]


def poly(points):
    return " ".join(f"{x:.1f},{y:.1f}" for x, y in points)


def mountain(seed, W, H, base, amp, fill, snow=None, snow_depth=40, rough=0.46):
    r = ridge(seed, W, base, amp, rough)
    shape = r + [(W, H), (0, H)]
    out = f'<polygon points="{poly(shape)}" fill="{fill}"/>'
    if snow:
        thr = min(y for _, y in r) + amp * 0.75
        rnd = random.Random(seed + 7)
        lower = [(x, y + snow_depth * (0.5 + rnd.random())) for x, y in r]
        sp = r + list(reversed(lower))
        cid = f"sn{seed}"
        out += (f'<clipPath id="{cid}"><rect x="0" y="0" width="{W}" height="{thr:.0f}"/></clipPath>'
                f'<polygon points="{poly(sp)}" fill="{snow}" clip-path="url(#{cid})" opacity=".92"/>')
    return out


def grain(W, H, op=0.10):
    return (f'<filter id="grain"><feTurbulence type="fractalNoise" baseFrequency=".85" numOctaves="2" stitchTiles="stitch"/>'
            f'<feColorMatrix values="0 0 0 0 0.14  0 0 0 0 0.1  0 0 0 0 0.11  0 0 0 1.2 -0.35"/></filter>'
            f'<rect width="{W}" height="{H}" filter="url(#grain)" opacity="{op}"/>')


def svg(W, H, body):
    return f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}">{body}</svg>'


def sky(W, H, stops, sun=None, horizon=0.6):
    s = "".join(f'<stop offset="{o}" stop-color="{c}"/>' for o, c in stops)
    out = f'<defs><linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">{s}</linearGradient>'
    if sun:
        sx, sy, sr, sc = sun
        out += (f'<radialGradient id="sun" cx="{sx}" cy="{sy}" r="{sr}" gradientUnits="userSpaceOnUse">'
                f'<stop offset="0" stop-color="{sc}" stop-opacity="1"/><stop offset=".08" stop-color="{sc}" stop-opacity=".95"/>'
                f'<stop offset=".35" stop-color="{sc}" stop-opacity=".35"/><stop offset="1" stop-color="{sc}" stop-opacity="0"/></radialGradient>')
    out += "</defs>"
    out += f'<rect width="{W}" height="{H}" fill="url(#sky)"/>'
    if sun:
        out += f'<rect width="{W}" height="{H}" fill="url(#sun)"/>'
    return out


def vineyard(W, H, hy, vx, rows, dark, light, haze, seed=3):
    """Perspective vine rows below horizon hy converging to vx."""
    rnd = random.Random(seed)
    out = f'<defs><linearGradient id="grd" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="{light}"/><stop offset="1" stop-color="{dark}"/></linearGradient>'
    out += f'<linearGradient id="hz" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="{haze}" stop-opacity=".85"/><stop offset=".35" stop-color="{haze}" stop-opacity="0"/></linearGradient></defs>'
    out += f'<rect x="0" y="{hy}" width="{W}" height="{H-hy}" fill="url(#grd)"/>'
    spread = W * 3.2
    for i in range(rows):
        t0 = i / rows
        t1 = (i + 0.48) / rows
        x0 = vx - spread / 2 + spread * t0
        x1 = vx - spread / 2 + spread * t1
        out += f'<polygon points="{vx:.1f},{hy:.1f} {vx+1.5:.1f},{hy:.1f} {x1:.1f},{H+40} {x0:.1f},{H+40}" fill="{dark}" opacity=".9"/>'
    # leaf texture along nearest rows
    for _ in range(int(W * 0.35)):
        y = hy + (H - hy) * (rnd.random() ** 0.6)
        depth = (y - hy) / (H - hy)
        i = rnd.randrange(rows)
        t = (i + 0.24) / rows
        xb = vx - spread / 2 + spread * t
        x = vx + (xb - vx) * depth + rnd.uniform(-1, 1) * 22 * depth
        if -50 < x < W + 50:
            r = 2 + 9 * depth * rnd.random()
            out += f'<circle cx="{x:.1f}" cy="{y - r*0.6:.1f}" r="{r:.1f}" fill="{dark}" opacity=".85"/>'
    out += f'<rect x="0" y="{hy}" width="{W}" height="{H-hy}" fill="url(#hz)"/>'
    return out


def glass(cx, rim_y, w, wine, gid, tilt=0, level=0.55, rim_light="#FFE9C2"):
    """Tulip wine glass; wine = colour or None."""
    h = w * 1.05
    l, r = cx - w / 2, cx + w / 2
    by = rim_y + h
    bowl = (f"M{l:.1f},{rim_y:.1f} C{l - w*0.08:.1f},{rim_y + h*0.55:.1f} {cx - w*0.36:.1f},{by:.1f} {cx:.1f},{by:.1f} "
            f"C{cx + w*0.36:.1f},{by:.1f} {r + w*0.08:.1f},{rim_y + h*0.55:.1f} {r:.1f},{rim_y:.1f} Z")
    stem_h = w * 1.0
    sw = w * 0.05
    foot_w = w * 0.62
    out = f'<g transform="rotate({tilt} {cx} {by + stem_h})">'
    out += f'<defs><clipPath id="b{gid}"><path d="{bowl}"/></clipPath>'
    if wine:
        out += (f'<linearGradient id="w{gid}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="{wine[0]}"/>'
                f'<stop offset="1" stop-color="{wine[1]}"/></linearGradient>')
    out += "</defs>"
    out += f'<path d="{bowl}" fill="#FFFFFF" fill-opacity=".07"/>'
    if wine:
        wl = rim_y + h * (1 - level)
        out += f'<g clip-path="url(#b{gid})"><rect x="{l - 20}" y="{wl:.1f}" width="{w + 40}" height="{h}" fill="url(#w{gid})"/>'
        out += f'<ellipse cx="{cx}" cy="{wl:.1f}" rx="{w*0.47:.1f}" ry="{w*0.05:.1f}" fill="{wine[2]}" opacity=".9"/>'
        out += f'<ellipse cx="{cx - w*0.18:.1f}" cy="{wl + h*0.25:.1f}" rx="{w*0.07:.1f}" ry="{h*0.16:.1f}" fill="#FFFFFF" opacity=".22"/></g>'
    out += f'<path d="{bowl}" fill="none" stroke="{rim_light}" stroke-opacity=".75" stroke-width="{max(1.5, w*0.012):.1f}"/>'
    out += f'<ellipse cx="{cx}" cy="{rim_y}" rx="{w/2:.1f}" ry="{w*0.045:.1f}" fill="none" stroke="{rim_light}" stroke-opacity=".8" stroke-width="{max(1.2, w*0.01):.1f}"/>'
    out += f'<path d="M{cx - w*0.33:.1f},{rim_y + h*0.12:.1f} Q{cx - w*0.42:.1f},{rim_y + h*0.45:.1f} {cx - w*0.24:.1f},{rim_y + h*0.78:.1f}" stroke="#FFFFFF" stroke-opacity=".55" stroke-width="{w*0.025:.1f}" fill="none" stroke-linecap="round"/>'
    out += f'<rect x="{cx - sw/2:.1f}" y="{by - 2:.1f}" width="{sw:.1f}" height="{stem_h:.1f}" fill="{rim_light}" fill-opacity=".55"/>'
    out += f'<ellipse cx="{cx}" cy="{by + stem_h:.1f}" rx="{foot_w/2:.1f}" ry="{w*0.06:.1f}" fill="{rim_light}" fill-opacity=".45"/>'
    out += "</g>"
    return out


RED = ("#5B0F1F", "#9C2737", "#B5404D")
ROSE = ("#C9566A", "#E59A9E", "#F0B8B6")
WHITE = ("#D9B95A", "#F1DE97", "#F6E8B8")


# ---------- scenes ----------

def scene_valley(W, H, variant="sunset", with_glass=False, glass_pos=0.72, seed=11):
    hy = H * 0.62
    if variant == "sunset":
        sk = [(0, "#3E1F2B"), (.35, "#8A434E"), (.62, "#D98A5E"), (.8, "#F2C27A"), (1, "#F7DDA8")]
        sun = (W * 0.32, hy - H * 0.03, max(W, H) * 0.55, "#FFE2A6")
        m = ["#E9B9A0", "#B9707A", "#6A2E3A"]
        snow = "#FBE7D2"
        vd, vl, hz = "#2A1419", "#5C2F2E", "#E8A57A"
    elif variant == "golden":
        sk = [(0, "#C7D7E0"), (.5, "#EAD9BC"), (1, "#F6E3B9")]
        sun = (W * 0.8, H * 0.1, max(W, H) * 0.6, "#FFF1CF")
        m = ["#C9C3C9", "#9C8C98", "#6E5A63"]
        snow = "#FFFFFF"
        vd, vl, hz = "#3B3A1E", "#9C8350", "#F4E3C0"
    else:  # dusk (Valle de Uco)
        sk = [(0, "#2C2A3E"), (.5, "#7E5C74"), (.85, "#E2A37F"), (1, "#F0C493")]
        sun = (W * 0.6, hy, max(W, H) * 0.5, "#F7C98E")
        m = ["#B9A3B4", "#7C6077", "#3E2E3E"]
        snow = "#F6E9EE"
        vd, vl, hz = "#1E1620", "#4A3540", "#C98E7B"
    b = sky(W, H, sk, sun)
    b += mountain(seed, W, H, hy - H * 0.27, H * 0.22, m[0], snow, H * 0.06)
    b += mountain(seed + 1, W, H, hy - H * 0.13, H * 0.09, m[1], None)
    b += mountain(seed + 2, W, H, hy - H * 0.04, H * 0.035, m[2], None, rough=0.5)
    b += vineyard(W, H, hy, W * 0.42, 26, vd, vl, hz, seed)
    if with_glass:
        gw = min(W, H) * 0.24
        b += glass(W * glass_pos, H * 0.42, gw, RED, "hero", tilt=-4, rim_light="#FFE2B0")
    b += grain(W, H)
    return svg(W, H, b)


def scene_cellar(W, H, seed=4):
    rnd = random.Random(seed)
    cx, cy = W * 0.5, H * 0.46
    b = (f'<defs><radialGradient id="lamp" cx="{cx}" cy="{cy}" r="{W*0.7}" gradientUnits="userSpaceOnUse">'
         f'<stop offset="0" stop-color="#F2B66B"/><stop offset=".25" stop-color="#9A4F3A"/><stop offset=".7" stop-color="#3A1A1F"/>'
         f'<stop offset="1" stop-color="#1C0D10"/></radialGradient></defs><rect width="{W}" height="{H}" fill="url(#lamp)"/>')
    # receding arches
    for i in range(9, 0, -1):
        s = 0.12 + i * 0.11
        aw, ah = W * 0.62 * s, H * 0.95 * s
        x0, y0 = cx - aw / 2, cy - ah * 0.55
        col = f"rgba(30,12,15,{0.25 + 0.07 * i:.2f})"
        b += (f'<path d="M{x0:.1f},{y0 + ah:.1f} L{x0:.1f},{y0 + aw/2:.1f} A{aw/2:.1f},{aw/2:.1f} 0 0 1 {x0 + aw:.1f},{y0 + aw/2:.1f} '
              f'L{x0 + aw:.1f},{y0 + ah:.1f}" fill="none" stroke="{col}" stroke-width="{6 + i*5}"/>')
    # floor
    b += f'<polygon points="0,{H} {cx - W*0.05:.0f},{cy + H*0.08:.0f} {cx + W*0.05:.0f},{cy + H*0.08:.0f} {W},{H}" fill="#2A1316" opacity=".55"/>'
    # barrel stacks both sides
    for side in (-1, 1):
        for depth in range(7, -1, -1):
            s = 0.25 + depth * 0.12
            r = H * 0.075 * s
            bx = cx + side * (W * 0.07 + W * 0.055 * depth * 1.25 * s)
            for row in range(2):
                by = cy + H * 0.1 * s + row * r * 2.05 - r * 0.2 + depth * H * 0.012
                b += f'<circle cx="{bx:.1f}" cy="{by:.1f}" r="{r:.1f}" fill="#7A4630"/>'
                b += f'<circle cx="{bx:.1f}" cy="{by:.1f}" r="{r*0.86:.1f}" fill="none" stroke="#4A2619" stroke-width="{r*0.06:.1f}"/>'
                h = r * 0.22
                a = math.sqrt(r * r - h * h)
                b += (f'<path d="M{bx - a:.1f},{by - h:.1f} L{bx + a:.1f},{by - h:.1f} A{r:.1f},{r:.1f} 0 0 1 {bx + a:.1f},{by + h:.1f} '
                      f'L{bx - a:.1f},{by + h:.1f} A{r:.1f},{r:.1f} 0 0 1 {bx - a:.1f},{by - h:.1f} Z" fill="#8A434E"/>')
                b += f'<circle cx="{bx:.1f}" cy="{by:.1f}" r="{r:.1f}" fill="none" stroke="#2B1410" stroke-width="{r*0.1:.1f}"/>'
                b += f'<circle cx="{bx:.1f}" cy="{by:.1f}" r="{r*0.12:.1f}" fill="#2B1410"/>'
    b += f'<rect width="{W}" height="{H}" fill="#1C0D10" opacity=".08"/>'
    b += grain(W, H, .12)
    return svg(W, H, b)


def bokeh(W, H, seed, cols, n=26):
    rnd = random.Random(seed)
    out = '<defs><filter id="blur"><feGaussianBlur stdDeviation="18"/></filter></defs><g filter="url(#blur)">'
    for _ in range(n):
        out += (f'<circle cx="{rnd.uniform(0, W):.0f}" cy="{rnd.uniform(0, H*0.65):.0f}" r="{rnd.uniform(W*0.02, W*0.08):.0f}" '
                f'fill="{rnd.choice(cols)}" opacity="{rnd.uniform(.25, .7):.2f}"/>')
    return out + "</g>"


def scene_tasting(W, H, seed=8):
    b = sky(W, H, [(0, "#6A2E3A"), (.5, "#B8735A"), (1, "#E9C08C")])
    b += bokeh(W, H, seed, ["#FFE3A8", "#F6C27A", "#FFF4DA", "#E39A6A"])
    ty = H * 0.68
    b += (f'<defs><linearGradient id="tb" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6B3B2A"/>'
          f'<stop offset="1" stop-color="#2E1712"/></linearGradient></defs>'
          f'<rect x="0" y="{ty}" width="{W}" height="{H - ty}" fill="url(#tb)"/>'
          f'<rect x="0" y="{ty}" width="{W}" height="3" fill="#E8B57E" opacity=".5"/>')
    gw = min(W, H) * 0.2
    for i, (wine, x) in enumerate([(WHITE, .3), (ROSE, .5), (RED, .7)]):
        rim = ty - gw * 2.05 - gw * 0.06
        g = glass(W * x, rim, gw, wine, f"t{i}", level=0.42)
        b += g
        b += f'<g transform="translate(0 {2*ty:.1f}) scale(1 -1)" opacity=".18">{glass(W * x, rim, gw, wine, f"r{i}", level=0.42)}</g>'
    b += grain(W, H)
    return svg(W, H, b)


def scene_olives(W, H, seed=21):
    hy = H * 0.55
    b = sky(W, H, [(0, "#B9CBD3"), (.6, "#E8DCC4"), (1, "#F2E4C6")], (W * 0.2, H * 0.15, W * 0.5, "#FFF4D8"))
    b += mountain(seed, W, H, hy - H * 0.2, H * 0.12, "#B3AEB8", "#FFFFFF", H * 0.04)
    b += mountain(seed + 1, W, H, hy - H * 0.06, H * 0.05, "#8E8890")
    b += f'<rect x="0" y="{hy}" width="{W}" height="{H-hy}" fill="#B49A6A"/>'
    rnd = random.Random(seed)
    vx = W * 0.55
    for row in range(14, -1, -1):
        d = (row + 1) / 15
        y = hy + (H - hy) * (1 - d) ** 1.7 + 6
        s = (1 - d) * 1.3 + 0.08
        for k in range(-7, 8):
            x = vx + k * W * 0.16 * s * 1.6 + rnd.uniform(-8, 8) * s
            if -100 < x < W + 100:
                r = W * 0.035 * s
                b += f'<rect x="{x - r*0.08:.1f}" y="{y - r*0.6:.1f}" width="{r*0.16:.1f}" height="{r*0.8:.1f}" fill="#4A3527"/>'
                for _ in range(5):
                    b += (f'<ellipse cx="{x + rnd.uniform(-r*0.6, r*0.6):.1f}" cy="{y - r*1.1 + rnd.uniform(-r*0.4, r*0.3):.1f}" '
                          f'rx="{r*rnd.uniform(.5,.8):.1f}" ry="{r*rnd.uniform(.4,.6):.1f}" fill="{rnd.choice(["#6F7A55", "#8C9670", "#5C6646", "#A3A887"])}"/>')
    b += grain(W, H)
    return svg(W, H, b)


def scene_lake(W, H, seed=31):
    hy = H * 0.56
    b = sky(W, H, [(0, "#9FB8C6"), (.6, "#E7D2B6"), (1, "#F3D8A8")], (W * 0.7, hy - H * 0.1, W * 0.5, "#FFEBC7"))
    mt = mountain(seed, W, H, hy - H * 0.3, H * 0.15, "#A08B93", "#FFFFFF", H * 0.05)
    mt += mountain(seed + 1, W, H, hy - H * 0.14, H * 0.08, "#7B6670")
    mt += mountain(seed + 2, W, H, hy - H * 0.04, H * 0.03, "#5A4A50")
    b += f'<defs><clipPath id="up"><rect width="{W}" height="{hy}"/></clipPath><clipPath id="dn"><rect y="{hy}" width="{W}" height="{H-hy}"/></clipPath></defs>'
    b += f'<g clip-path="url(#up)">{mt}</g>'
    b += f'<rect x="0" y="{hy}" width="{W}" height="{H-hy}" fill="#4F7F86"/>'
    b += f'<g clip-path="url(#dn)"><g transform="translate(0 {2*hy:.1f}) scale(1 -1)" opacity=".35">{mt}</g></g>'
    rnd = random.Random(seed)
    for _ in range(60):
        y = rnd.uniform(hy + 4, H)
        w = rnd.uniform(20, 160) * (y - hy) / (H - hy) + 10
        b += f'<rect x="{rnd.uniform(0, W):.0f}" y="{y:.0f}" width="{w:.0f}" height="2" fill="#F6E7CF" opacity=".35"/>'
    b += f'<path d="M0,{H} L0,{H*0.86} C{W*0.25},{H*0.82} {W*0.4},{H*0.92} {W*0.62},{H} Z" fill="#6E5A3E"/>'
    b += grain(W, H)
    return svg(W, H, b)


def scene_facade(W, H, seed=41):
    b = sky(W, H, [(0, "#C6D3D9"), (1, "#F4E5C8")], (W * 0.85, H * 0.1, W * 0.6, "#FFF3D6"))
    gy = H * 0.78
    wy = H * 0.34
    b += f'<rect x="{W*0.08}" y="{wy}" width="{W*0.84}" height="{gy-wy}" fill="#E7D3B4"/>'
    b += f'<rect x="{W*0.06}" y="{wy - H*0.03}" width="{W*0.88}" height="{H*0.035}" fill="#8A434E"/>'
    # tower
    b += f'<rect x="{W*0.44}" y="{wy - H*0.2}" width="{W*0.12}" height="{H*0.2}" fill="#E0C9A6"/>'
    b += f'<polygon points="{W*0.43},{wy - H*0.2} {W*0.5},{wy - H*0.28} {W*0.57},{wy - H*0.2}" fill="#8A434E"/>'
    b += f'<path d="M{W*0.475},{wy - H*0.04} L{W*0.475},{wy - H*0.13} A{W*0.025},{W*0.025} 0 0 1 {W*0.525},{wy - H*0.13} L{W*0.525},{wy - H*0.04} Z" fill="#4A2A2A"/>'
    n = 7
    for i in range(n):
        aw = W * 0.084
        x = W * 0.12 + i * (W * 0.76 - aw) / (n - 1)
        top = wy + H * 0.12
        b += (f'<path d="M{x:.1f},{gy:.1f} L{x:.1f},{top + aw/2:.1f} A{aw/2:.1f},{aw/2:.1f} 0 0 1 {x+aw:.1f},{top + aw/2:.1f} L{x+aw:.1f},{gy:.1f} Z" fill="#5A3330"/>'
              f'<path d="M{x:.1f},{gy:.1f} L{x:.1f},{top + aw/2:.1f} A{aw/2:.1f},{aw/2:.1f} 0 0 1 {x+aw:.1f},{top + aw/2:.1f} L{x+aw:.1f},{gy:.1f}" fill="none" stroke="#CDB28C" stroke-width="6"/>')
    b += f'<rect x="0" y="{gy}" width="{W}" height="{H-gy}" fill="#B89B6E"/>'
    rnd = random.Random(seed)
    for i in range(40):
        x = rnd.uniform(0, W)
        r = rnd.uniform(14, 34)
        b += f'<circle cx="{x:.0f}" cy="{gy + rnd.uniform(-6, 24):.0f}" r="{r:.0f}" fill="{rnd.choice(["#4E5A35", "#5E6B3E", "#3F4A2B"])}"/>'
    b += grain(W, H)
    return svg(W, H, b)


def scene_toast(W, H, seed=51):
    b = sky(W, H, [(0, "#4A1F2A"), (.55, "#8A434E"), (1, "#D89A6A")])
    b += bokeh(W, H, seed, ["#FFD99A", "#F7B76A", "#FFF0CF", "#E78A6A"], 34)
    gw = min(W, H) * 0.26
    b += glass(W * 0.27, H * 0.2, gw, RED, "a", tilt=12, level=0.5)
    b += glass(W * 0.73, H * 0.2, gw, RED, "b", tilt=-12, level=0.5)
    sx, sy = W * 0.5, H * 0.21
    for a in range(0, 360, 30):
        L = gw * (0.18 if a % 60 else 0.3)
        b += (f'<line x1="{sx + math.cos(math.radians(a))*gw*0.06:.1f}" y1="{sy + math.sin(math.radians(a))*gw*0.06:.1f}" '
              f'x2="{sx + math.cos(math.radians(a))*L:.1f}" y2="{sy + math.sin(math.radians(a))*L:.1f}" stroke="#FFE7B0" stroke-width="3" stroke-linecap="round" opacity=".85"/>')
    b += grain(W, H)
    return svg(W, H, b)


def scene_lunch(W, H, seed=61):
    b = f'<rect width="{W}" height="{H}" fill="#5C3A2A"/>'
    rnd = random.Random(seed)
    for i in range(12):
        b += f'<rect x="0" y="{i*H/12:.0f}" width="{W}" height="{H/12 - 3:.0f}" fill="{rnd.choice(["#6B4430", "#644029", "#704833"])}"/>'
    # linen
    b += f'<rect x="{W*0.1}" y="{H*0.08}" width="{W*0.8}" height="{H*0.84}" rx="8" fill="{CREAM}"/>'
    # plates
    for (x, y, r) in [(.34, .52, .2), (.68, .5, .17)]:
        b += f'<circle cx="{W*x}" cy="{H*y}" r="{H*r}" fill="#FFFFFF" stroke="#E6DCCD" stroke-width="6"/>'
        b += f'<circle cx="{W*x}" cy="{H*y}" r="{H*r*0.62}" fill="#F3ECE1"/>'
        for _ in range(9):
            b += f'<circle cx="{W*x + rnd.uniform(-1,1)*H*r*0.4:.0f}" cy="{H*y + rnd.uniform(-1,1)*H*r*0.35:.0f}" r="{rnd.uniform(8,22):.0f}" fill="{rnd.choice(["#7A3B2A", "#9C5A34", "#5E6B3E", "#C98B4B", "#8A434E"])}"/>'
    # glasses from above (circles)
    for x, y in [(.52, .2), (.6, .22)]:
        b += f'<circle cx="{W*x}" cy="{H*y}" r="{H*0.07}" fill="#7C1E2E" opacity=".9"/><circle cx="{W*x}" cy="{H*y}" r="{H*0.085}" fill="none" stroke="#D8CFC2" stroke-width="4"/>'
    b += f'<rect x="{W*0.13}" y="{H*0.3}" width="{W*0.012}" height="{H*0.45}" rx="4" fill="#B9AFA3"/><rect x="{W*0.85}" y="{H*0.3}" width="{W*0.012}" height="{H*0.45}" rx="4" fill="#B9AFA3"/>'
    b += grain(W, H, .08)
    return svg(W, H, b)


def scene_portrait_placeholder(W, H, seed=71):
    """Placeholder neutro para fotos de guías: silueta de busto."""
    b = sky(W, H, [(0, "#EFE4D6"), (1, "#E2D2BF")])
    cx = W / 2
    b += f'<circle cx="{cx}" cy="{H*0.4}" r="{W*0.17}" fill="#C9B29A"/>'
    b += f'<path d="M{cx - W*0.36},{H} C{cx - W*0.34},{H*0.66} {cx + W*0.34},{H*0.66} {cx + W*0.36},{H} Z" fill="#C9B29A"/>'
    b += grain(W, H, .06)
    return svg(W, H, b)


SCENES = {
    # hero (landscape + portrait)
    "hero-desktop": (2400, 1350, lambda W, H: scene_valley(W, H, "sunset", True, 0.72)),
    "hero-mobile": (1080, 1700, lambda W, H: scene_valley(W, H, "sunset", True, 0.66)),
    # tours
    "tour-lujan-1": (1600, 1067, lambda W, H: scene_valley(W, H, "golden", seed=12)),
    "tour-lujan-2": (1600, 1067, lambda W, H: scene_cellar(W, H, 5)),
    "tour-lujan-3": (1600, 1067, lambda W, H: scene_lunch(W, H, 62)),
    "tour-maipu-1": (1600, 1067, lambda W, H: scene_facade(W, H, 42)),
    "tour-maipu-2": (1600, 1067, lambda W, H: scene_olives(W, H, 22)),
    "tour-maipu-3": (1600, 1067, lambda W, H: scene_tasting(W, H, 9)),
    "tour-uco-1": (1600, 1067, lambda W, H: scene_valley(W, H, "dusk", seed=13)),
    "tour-uco-2": (1600, 1067, lambda W, H: scene_tasting(W, H, 10)),
    "tour-uco-3": (1600, 1067, lambda W, H: scene_lunch(W, H, 63)),
    "tour-potrerillos-1": (1600, 1067, lambda W, H: scene_lake(W, H, 32)),
    "tour-potrerillos-2": (1600, 1067, lambda W, H: scene_lake(W, H, 35)),
    "tour-potrerillos-3": (1600, 1067, lambda W, H: scene_valley(W, H, "golden", seed=14)),
    "tour-salentein-1": (1600, 1067, lambda W, H: scene_valley(W, H, "dusk", seed=15)),
    "tour-salentein-2": (1600, 1067, lambda W, H: scene_cellar(W, H, 6)),
    "tour-salentein-3": (1600, 1067, lambda W, H: scene_tasting(W, H, 11)),
    "tour-toneles-1": (1600, 1067, lambda W, H: scene_cellar(W, H, 7)),
    "tour-toneles-2": (1600, 1067, lambda W, H: scene_facade(W, H, 43)),
    "tour-toneles-3": (1600, 1067, lambda W, H: scene_lunch(W, H, 64)),
    # medida / galería / equipo
    "custom-tour": (1600, 1067, lambda W, H: scene_valley(W, H, "sunset", False, seed=16)),
    "gallery-1": (1200, 1500, lambda W, H: scene_toast(W, H, 52)),
    "gallery-2": (1200, 800, lambda W, H: scene_tasting(W, H, 12)),
    "gallery-3": (1200, 800, lambda W, H: scene_valley(W, H, "golden", seed=17)),
    "gallery-4": (1200, 1500, lambda W, H: scene_cellar(W, H, 8)),
    "gallery-5": (1200, 800, lambda W, H: scene_toast(W, H, 53)),
    "gallery-6": (1200, 800, lambda W, H: scene_lunch(W, H, 65)),
    "guide-1": (800, 1000, lambda W, H: scene_portrait_placeholder(W, H)),
    "guide-2": (800, 1000, lambda W, H: scene_portrait_placeholder(W, H)),
    "guide-3": (800, 1000, lambda W, H: scene_portrait_placeholder(W, H)),
    "og-image": (1200, 630, lambda W, H: scene_valley(W, H, "sunset", True, 0.75, seed=11)),
}

if __name__ == "__main__":
    for name, (W, H, fn) in SCENES.items():
        with open(os.path.join(OUT, name + ".svg"), "w") as f:
            f.write(fn(W, H))
    print("ok", len(SCENES))
