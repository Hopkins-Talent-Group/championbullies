# Graph Report - championbullies  (2026-09-16)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 529 nodes · 1267 edges · 20 communities (10 shown, 10 thin omitted)
- Extraction: 83% EXTRACTED · 17% INFERRED · 0% AMBIGUOUS · INFERRED: 220 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `85b00fc8`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- swiper.min.js
- jquery.min.js
- frontend-modules.min.js
- CarouselHandlerBase
- frontend.min.js
- Frontend
- _default
- ScreenViewTracking
- WpDashboardTracking
- eael-8.js
- ArgsObject
- ActionControlTracking
- smush-lazy-load.min.js
- elementorHelloThemeHandler
- NavigationTracking
- _default
- general.min.js

## God Nodes (most connected - your core abstractions)
1. `l()` - 39 edges
2. `o()` - 35 edges
3. `_default` - 32 edges
4. `Frontend` - 30 edges
5. `v()` - 28 edges
6. `WpDashboardTracking` - 26 edges
7. `CarouselHandlerBase` - 25 edges
8. `d()` - 25 edges
9. `r()` - 22 edges
10. `dispatchEvent()` - 21 edges

## Surprising Connections (you probably didn't know these)
- `kt()` --indirect_call--> `D()`  [INFERRED]
  wp-includes/js/jquery/jquery.min.js → wp-content/uploads/essential-addons-elementor/eael-8.js
- `Tt()` --indirect_call--> `D()`  [INFERRED]
  wp-includes/js/jquery/jquery.min.js → wp-content/uploads/essential-addons-elementor/eael-8.js
- `Ut()` --indirect_call--> `D()`  [INFERRED]
  wp-includes/js/jquery/jquery.min.js → wp-content/uploads/essential-addons-elementor/eael-8.js
- `I()` --indirect_call--> `L()`  [INFERRED]
  wp-content/plugins/elementor/assets/lib/swiper/v8/swiper.min.js → wp-includes/js/jquery/jquery.min.js
- `I()` --indirect_call--> `z()`  [INFERRED]
  wp-content/plugins/elementor/assets/lib/swiper/v8/swiper.min.js → wp-includes/js/jquery/jquery.min.js

## Import Cycles
- None detected.

## Communities (20 total, 10 thin omitted)

### Community 0 - "swiper.min.js"
Cohesion: 0.09
Nodes (47): a(), addEventListener(), B(), blur(), C(), p(), u(), cancelAnimationFrame() (+39 more)

### Community 1 - "jquery.min.js"
Cohesion: 0.07
Nodes (52): a(), c(), e(), i(), r(), u(), A(), Ae() (+44 more)

### Community 2 - "frontend-modules.min.js"
Cohesion: 0.06
Nodes (31): addEditorListeners(), applyCssVariables(), __construct(), dispatchEvent(), formatSection(), get(), getEditorListeners(), getEditSettings() (+23 more)

### Community 3 - "CarouselHandlerBase"
Cohesion: 0.08
Nodes (8): CarouselHandlerBase, getCurrentDeviceSetting(), getElementSettings(), getID(), initElements(), onInit(), StretchedElement, SwiperHandlerBase

### Community 4 - "frontend.min.js"
Cohesion: 0.06
Nodes (12): adjustConfig(), AssetsLoader, BaseLoader, Breakpoints, constructor(), createSwiperInstance(), Events, getControlValue() (+4 more)

### Community 7 - "ScreenViewTracking"
Cohesion: 0.12
Nodes (7): addEventListenerTracked(), addObserver(), destroy(), ensureOwnArrays(), PluginActions, ScreenViewTracking, TopBarTracking

### Community 9 - "eael-8.js"
Cohesion: 0.22
Nodes (16): a(), D(), e(), i(), h(), n(), O(), R() (+8 more)

### Community 10 - "ArgsObject"
Cohesion: 0.19
Nodes (3): ArgsObject, ForceMethodImplementation, InstanceType

### Community 12 - "smush-lazy-load.min.js"
Cohesion: 0.31
Nodes (8): a(), d(), f(), o(), r(), s(), u(), v()

### Community 16 - "general.min.js"
Cohesion: 0.53
Nodes (4): g(), m(), v(), y()

## Knowledge Gaps
- **10 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `o()` connect `swiper.min.js` to `jquery.min.js`, `frontend-modules.min.js`, `frontend.min.js`, `ScreenViewTracking`, `eael-8.js`, `NavigationTracking`?**
  _High betweenness centrality (0.131) - this node is a cross-community bridge._
- **Why does `_default` connect `_default` to `frontend.min.js`?**
  _High betweenness centrality (0.106) - this node is a cross-community bridge._
- **Why does `L()` connect `jquery.min.js` to `swiper.min.js`, `frontend.min.js`?**
  _High betweenness centrality (0.102) - this node is a cross-community bridge._
- **Are the 19 inferred relationships involving `l()` (e.g. with `frontend.min.js` and `frontend-modules.min.js`) actually correct?**
  _`l()` has 19 INFERRED edges - model-reasoned connections that need verification._
- **Are the 22 inferred relationships involving `o()` (e.g. with `frontend.min.js` and `frontend-modules.min.js`) actually correct?**
  _`o()` has 22 INFERRED edges - model-reasoned connections that need verification._
- **Are the 2 inferred relationships involving `v()` (e.g. with `l()` and `t()`) actually correct?**
  _`v()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **Should `swiper.min.js` be split into smaller, more focused modules?**
  _Cohesion score 0.09093646492020475 - nodes in this community are weakly interconnected._