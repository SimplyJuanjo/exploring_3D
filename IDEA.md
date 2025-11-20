# IDEA.md - Inspiraciones y Diseño Creativo

## Visión del Proyecto

**Un RPG VR voxel/pixel art** con un sistema de magia hard inspirado en Mistborn, diseñado desde cero para multijugador y modding nativo, capturando la esencia comunitaria de Minecraft en un mundo de Nacidos de la Bruma.

---

## 💡 Pilares de Inspiración

### 1️⃣ **CubeWorld** - Estética Voxel/Pixel Art

**Por qué nos inspiró:**
- Mundo voxel procedural hermoso y colorido
- Estilo visual único (low-poly, cel-shading)
- Sensación de exploración y aventura
- Generación procedural de biomas y dungeons

**Lecciones del fracaso de CubeWorld:**
- ❌ Evitar desarrollo solitario sin feedback
- ❌ No desaparecer durante años sin actualizaciones
- ❌ No lanzar sin features core completas
- ✅ Desarrollo iterativo con community engagement
- ✅ Early Access transparente

**Aplicación a nuestro proyecto:**
- Estética voxel/pixel art en VR (chunks procedurales ya implementados)
- Mundo colorido y legible en headset
- Sistema de generación procedural de biomas
- Dungeons y estructuras generadas
- Animaciones fluidas tipo CubeWorld

---

### 2️⃣ **Mistborn** - Sistema de Magia Alomántica

**El Sistema de 16 Metales (Alomancia):**

#### 🔷 **Metales Físicos** (Ya tenemos prototipo!)
- **Hierro** 🧲 = Tirar metales hacia ti (Pull) → **YA IMPLEMENTADO** (telekinesis)
- **Acero** 🔩 = Empujar metales (Push) → **YA IMPLEMENTADO** (telekinesis)
- **Estaño** 👁️ = Mejora sentidos → *FOV aumentado, mejor visión nocturna, audio 3D mejorado*
- **Peltre** 💪 = Mejora física → *Velocidad, salto, resistencia*

#### 🧠 **Metales Mentales**
- **Zinc** 🔥 = Inflama emociones → *Aggro en mobs, NPCs hostiles*
- **Latón** ❄️ = Calma emociones → *Pacifica mobs, NPCs amigables*
- **Cobre** 🛡️ = Nube de cobre → *Invisibilidad a otros alomantes*
- **Bronce** 📡 = Detecta Alomancia → *Ver líneas alománticas de otros jugadores*

#### ⏱️ **Metales Temporales**
- **Cadmio** ⏱️ = Burbuja de tiempo lento → *Slow-mo zona en VR*
- **Bendalloy** ⚡ = Burbuja de tiempo rápido → *Speed-up zona*
- **Oro** 🔮 = Ver pasado alternativo → *Mecánica de puzzles/lore*
- **Electrum** 🌟 = Ver futuro inmediato → *Dodge prediction*

#### ✨ **Metales de Mejora**
- **Aluminio** 🗑️ = Vacía tus reservas → *Reset estratégico*
- **Duraluminio** 💥 = Superpoder momentáneo → *Flare = gastar todo para 1 acción épica*
- **Cromo** ❌ = Vacía reservas enemigas → *PvP counter*
- **Nicrosil** ⚗️ = Potencia aliados → *Support role en multiplayer*

**Mecánicas Core:**
- **Consumir metales** (recurso finito) → Limitaciones de Sanderson
- **Combustión** (quemar metales) → Sistema de recursos visible
- **Líneas azules** (Acero/Hierro) → Visualización en VR de metales cercanos
- **Combinaciones** → Quemar múltiples metales simultáneamente
- **Mistborn vs Misting** → Jugadores pueden usar todos o solo 1-2 metales

**Aplicación VR:**
- Gestos con controladores para quemar metales
- Líneas alománticas visualizadas en 3D (como Spider-Man)
- Físicas de empuje/tirón usando controllers
- Sensación de volar con Acero/Hierro (Ironman style)
- UI de reservas de metales en muñeca VR

#### ⚖️ **Nota Legal: Inspiración vs Copia**

> **IMPORTANTE**: Mistborn y sus términos son propiedad intelectual de Brandon Sanderson / Dragonsteel Entertainment.

**Lo que podemos usar (mecánicas abstractas):**
- ✅ Sistema de poderes basados en consumir recursos (metales)
- ✅ Mecánica Push/Pull de objetos
- ✅ Sistema de elementos con categorías
- ✅ Limitaciones basadas en recursos físicos

**Lo que debemos renombrar antes de release:**
- ❌ "Alomancia", "Mistborn", "Misting", "Scadrial"
- ❌ Nombres de personajes (Kelsier, Vin, etc.)
- ❌ Eventos específicos de los libros
- ❌ Terminología única ("quemar", "Coinshot", "Lurcher")

**Estrategia de renombrado (Fase Pre-Alpha):**
```
Alomancia      → Metalurgia / Fusión Metálica / Catálisis
Mistborn       → Fundidor / Catalizador Maestro
Misting        → Especialista / Catalizador
Quemar metales → Consumir / Fusionar / Catalizar
Coinshot       → Proyector / Empujador
Lurcher        → Atractor / Magnetista
```

**Nuestra diferenciación:**
- Estética voxel/pixel art única
- Lore y mundo completamente original
- VR como plataforma principal
- Sistema de modding que permite variantes
- Posibles metales/mecánicas únicos no en Mistborn

**Créditos permitidos:**
- ✅ "Inspired by Brandon Sanderson's Mistborn series"
- ✅ Mencionar influencia en marketing
- ❌ NO usar términos exactos en nombres de features/items del juego



---

### 3️⃣ **Minecraft** - Multijugador Nativo + Modding

**Por qué Minecraft es el rey:**
- Multijugador **desde el día 1** (no "added later")
- API de modding robusta (Forge, Fabric)
- Comunidad masiva de creadores
- Longevidad por mods (15+ años y contando)

**Qué implementaremos:**

#### � **Multijugador Nativo desde v0.0.1**
- ✅ Ya implementado: Sincronización de jugadores con Socket.io
- ✅ Ya implementado: Sincronización de objetos
- 🔄 Siguiente: Sincronización de inventario
- 🔄 Siguiente: Chat de voz espacial (VR)
- 🔄 Siguiente: Servers dedicados
- 🔄 Siguiente: Whitelist/Blacklist
- 🔄 Siguiente: Permisos y roles

#### 🔧 **Soporte de Mods Nativo**
- Sistema de plugins en JavaScript/TypeScript (fácil de crear)
- API documentada para:
  - Nuevos bloques voxel
  - Nuevos items y metales
  - Nuevas mecánicas alománticas custom
  - Nuevos biomas y estructuras
  - Modificar generación procedural
- Marketplace comunitario de mods
- Hot-reload de mods sin reiniciar servidor

**Filosofía de diseño:**
- **Moddable desde el core** (no "añadido después")
- **Open-source friendly** (MIT License)
- **Community-first** (Discord, GitHub, feedback loops)

---

## 🎮 Mecánicas Core Planeadas

### ⛏️ **Exploración y Construcción**
- Mundo voxel infinito procedural (estilo CubeWorld/Minecraft)
- Minado y construcción de bloques
- Crafting de herramientas y metales
- Dungeons procedurales con loot (viales de metales)

### 🧙 **Sistema de Magia (Alomancia)**
- Coleccionar y refinar metales
- Consumir metales para habilidades
- Líneas alománticas visuales en VR
- Combate basado en física (Push/Pull)

### 🤝 **Multijugador**
- PvE cooperativo (dungeons, bosses)
- PvP opcional (arenas, duelos alománticos)
- Trading de metales y items
- Gremios y clanes

### 🛠️ **Modding**
- API de JavaScript accesible
- Workshop de Steam (futuro)
- Mods de servidor y cliente

---

## 🎨 Dirección de Arte

**Estilo Visual:**
- Voxel art estilo CubeWorld (low-poly, colorido)
- Cel-shading para estética única
- Paleta de colores vibrante pero cohesiva
- Líneas alománticas azules/metálicas brillantes
- Partículas de "mist" (bruma) en el ambiente

**Atmósfera:**
- Mundo post-Final Empire (Mistborn Era 1)
- Cenizas cayendo del cielo (shader)
- Brumas nocturnas densas
- Colores apagados de día, vibrantes de noche (inversión Scadrial)

---

## � Roadmap de Features

### ✅ **Ya Implementado (v0.0.1)**
- Mundo procedural infinito (chunks)
- Multijugador básico (avatares, sincronización)
- Telekinesis VR (prototipo Acero/Hierro)
- HTTPS + WebXR para Quest Pro
- Debug remoto

### 🔄 **Siguiente Milestone (v0.1.0 - "Mistborn Prototype")**
- [ ] Sistema de metales completo (al menos 4 básicos)
- [ ] UI de reservas de metales
- [ ] Voxel art básico (reemplazar textura plana)
- [ ] Inventario con metales
- [ ] Líneas alománticas visuales
- [ ] Físicas mejoradas (vuelo con Acero/Hierro)

### 🔮 **Futuro (v0.2.0+)**
- [ ] Sistema de crafting
- [ ] Biomas procedurales variados
- [ ] Dungeons y estructuras
- [ ] NPCs y mobs
- [ ] Sistema de modding API v1
- [ ] Servidor dedicado standalone

---

## 🔗 Referencias

### CubeWorld
- [Website original](https://picroma.com/)
- [Análisis del fracaso](https://www.youtube.com/watch?v=example)
- Inspiración visual: [r/CubeWorld](https://reddit.com/r/CubeWorld)

### Mistborn (Brandon Sanderson)
- [Coppermind Wiki - Allomancy](https://coppermind.net/wiki/Allomancy)
- [17th Shard Forums](https://www.17thshard.com/)
- Tabla de metales: [Ars Arcanum](https://coppermind.net/wiki/Allomantic_metals)

### Minecraft
- [Minecraft Modding API](https://fabricmc.net/)
- [Minecraft Multiplayer Architecture](https://minecraft.fandom.com/wiki/Server)

---

## 💭 Ideas Sueltas (Sin Categorizar)

- **Modo historia:** Seguir eventos post-Final Empire
- **NPCs históricas:** Vin, Kelsier, etc. (modo easter egg)
- **Clases:** Mistborn (todos los metales) vs Misting (1 metal) vs Feruchemy (future?)
- **Economía:** Trading de viales de metales
- **Cosmere expansion:** ¿Otros sistemas de magia? (Surgebinding, Hemalurgy)
- **VR locomotion:** Modo teleport + modo smooth (actual) + modo Acero/Hierro flight
- **Weather system:** Cenizas, brumas, clima dinámico
- **Day/night cycle:** Inversión Scadrial (peligro de día, seguridad de noche)

---

**Última actualización:** 2025-11-20  
**Versión de IDEA:** 1.0  
**Estado del proyecto:** Prototipo técnico → Pivote a inspiración Mistborn/CubeWorld
