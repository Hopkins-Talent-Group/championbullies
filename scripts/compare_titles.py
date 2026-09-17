"""
Compare CDJ old (plan) vs CDJ (implementation) title layout:
rows 13-14 (titles) plus row 15 value, per column — matching EXACTLY
the helper you already use in globalsmile \_vba_extract.
"""
import os, re

HERE = os.path.dirname(os.path.abspath(__file__))
# Point at a v7.8-equivalent xlsm if you have one; fall back to a helper
# inside this repo. Adjust to your actual source of truth.
OUT = os.path.join(HERE, "_vba_extract", "v78_unzip")
if not os.path.isdir(OUT):
    raise SystemExit(f"missing {OUT} — drop an unpacked xlsm here first")

def read_xml(p):
    with open(p, encoding="utf-8", errors="replace") as f:
        return f.read()

wb = read_xml(os.path.join(OUT, "xl", "workbook.xml"))
rels = read_xml(os.path.join(OUT, "xl", "_rels", "workbook.xml.rels"))
ss = read_xml(os.path.join(OUT, "xl", "sharedStrings.xml"))
rid_to_target = dict(re.findall(r'Id="(rId\d+)"[^>]*Target="([^"]+)"', rels))
sheets = dict(re.findall(r'<sheet name="([^"]+)"[^>]*r:id="(rId\d+)"', wb))
shared = ["".join(re.findall(r"<t[^>]*>(.*?)</t>", s, re.S)) or "" for s in re.findall(r"<si>(.*?)</si>", ss, re.S)]
cell_re = re.compile(r'<c r="([A-Z]+)(\d+)"([^>]*?)(/>|>(.*?)</c>)', re.S)

def load_sheet(name):
    target = rid_to_target[sheets[name]]
    xml = read_xml(os.path.join(OUT, "xl", target.replace("/", os.sep)))
    grid = {}
    for m in cell_re.finditer(xml):
        col, rown, attrs, _, inner = m.groups()
        t = re.search(r' t="(\w+)"', attrs)
        ta = t.group(1) if t else None
        f = re.search(r"<f>(.*?)</f>", inner or "", re.S)
        v = re.search(r"<v>(.*?)</v>", inner or "", re.S)
        raw = v.group(1) if v else ""
        if raw == "" and ta != "str":
            continue
        val = shared[int(raw)] if ta == "s" else raw
        grid[(int(rown), col)] = (f.group(1)[:70] if f else "", val[:70])
    return grid

def col_order():
    out = []
    for a in "ABCDEFGHIJKLMNOPQRSTUVWXYZ":
        out.append(a)
        for b in "ABCDEFGHIJKLMNOPQRSTUVWXYZ":
            out.append(a + b)
    return out

print("=" * 106)
print("TITLE LAYOUT — CDJ old (PLAN) vs CDJ (IMPLEMENTATION)")
print("Rows 13-14 = header titles; row 15 = sample value for reference.")
print("=" * 106)
for name in ["CDJ old", "CDJ"]:
    g = load_sheet(name)
    print("\n##### {}".format(name))
    print("{:<4} {:<26} {:<22} {:<52} formula?".format("Col", "r13 title (top)", "r14 title (sub)", "r15 sample"))
    for c in col_order():
        h13, v13 = g.get((13, c), ("", ""))
        h14, v14 = g.get((14, c), ("", ""))
        v15, f15 = g.get((15, c), ("", ""))
        if not (h13 or h14 or v15):
            continue
        print("{:<4} {:<26} {:<22} {:<52} {}".format(c, h13[:25], h14[:21], v15[:51], f15[:40]))
