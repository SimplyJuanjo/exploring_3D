# IDEA.md - Inspiraciones y Diseño Creativo

## Visión del Proyecto

**Un RPG VR voxel/pixel art** con un sistema de magia hard inspirado en Mistborn, diseñado desde cero para multijugador y modding nativo, capturando la esencia comunitaria de Minecraft en un mundo de "Nacidos de la Bruma"-like.

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

### 2️⃣ **Mistborn** - Sistema de Magia Dura Alomántica

**El Sistema de 16 Metales (Alomancia):**

#### 🔷 **Metales Físicos** (Ya tenemos prototipo!)
- **Hierro** 🧲 = Tirar metales hacia ti (Pull) → **YA casi IMPLEMENTADO** (telekinesis)
- **Acero** 🔩 = Empujar metales (Push) → **YA casi IMPLEMENTADO** (telekinesis)
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
- **Mistborn vs Misting vs Otros** → Jugadores pueden usar todos o solo 1-2 metales

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
- Posibles metales/mecánicas únicos y otras razas o clases con sus propias mecánicas y combinaciones no presentadas en Mistborn

**Créditos permitidos:**
- ✅ "Inspired by Brandon Sanderson's Mistborn series"
- ✅ Mencionar influencia en marketing
- ❌ NO usar términos exactos en nombres de features/items del juego



---

### 3️⃣ **Minecraft** - Multijugador Nativo + Modding

**Por qué Minecraft es el rey:**
- El mejor mundo infinito procedural jamás creado
- El lienzo donde todas las generaciones pueden crear
- Multijugador **desde el día 1** (no "added later")
- API de modding robusta (Forge, Fabric)
- Comunidad masiva de creadores
- Longevidad por mods (15+ años y contando)

**Qué implementaremos:**

#### � **Multijugador Nativo desde v0.0.1**
- ✅ Ya implementado: Sincronización de jugadores con Socket.io (basica, muy mejorable)
- ✅ Ya implementado: Sincronización de objetos (basica, muy mejorable)
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
- **Open-source estratégico** (Ver estrategia de licenciamiento abajo)
- **Community-first** (Discord, GitHub, feedback loops)

### 📜 **Estrategia de Licenciamiento**

**Fase 1 - Prototipo (ACTUAL):**
- **MIT License** - Máxima adopción y feedback
- Prioridad: Validar mecánicas y obtener contribuciones
- Legal cambiar licencia más adelante

**Fase 2 - Pre-Alpha (Si logramos loop jugable en ~1 mes):**
- **MPL 2.0** (Mozilla Public License)
- Protege el engine core (cambios deben compartirse)
- Permite mods propietarios (modders pueden monetizar)
- Balance entre protección y flexibilidad

**Estructura planificada:**
```
src/core/      → MPL 2.0 (motor protegido)
mods/          → Modders eligen licencia
assets/        → CC-BY-SA o propietaria
```

**Decisión final:** MPL 2.0 si tenemos gameplay atractivo, MIT si seguimos experimentando.

---

## 🎮 Mecánicas Core Planeadas

### ⛏️ **Exploración y Construcción**
- Mundo voxel infinito procedural (estilo CubeWorld/Minecraft)
- Minado y construcción de bloques (pero que tengan un coste grande, que sea algo menos barato que en Minecraft)
- Crafting de herramientas, metales, objetos, equipo y más
- Dungeons procedurales con loot (viales de metales)

### 🧙 **Sistema de Magia (Alomancia)**
- Coleccionar y refinar metales
- Consumir metales para habilidades
- Líneas alománticas visuales en VR
- Combate basado en física (Push/Pull)

### 📚 **Sistema de Combate y Loop de Juego**
- Sistema de combate basado en física que puede tener otras habilidades dependiendo de las razas y clases
- Inspiración fuerte en los juegos incrementales como "The Binding of Isaac" o "Stardew Valley", pero con una adaptación al mundo multijugador (esto va a ser dificil)

### 🤝 **Multijugador**
- PvE cooperativo (dungeons, bosses)
- PvP opcional (arenas, duelos alománticos)
- Trading de metales y items
- Gremios y clanes para potenciar tanto el PvP como el PvE

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
- Cenizas cayendo del cielo (shader opcional)
- Brumas nocturnas densas
- Colores apagados de día, vibrantes de noche (inversión Scadrial)

---

## Roadmap de Features

### ✅ **Ya Implementado (v0.0.1)**
- Mundo procedural infinito (chunks)
- Multijugador básico (avatares, sincronización)
- Telekinesis VR (prototipo Acero/Hierro)
- HTTPS + WebXR para Quest VR
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

- **Modo historia:** Aunque pueda tener algun easter egg con referencias a Mistborn, Minecraft, etc., el objetivo es que sea un mundo completamente original y que la historia sea parte del loop incremental
- **Clases:** Mistborn (todos los metales) vs Misting (1 metal) vs Feruchemy (future?) vs Razas/Clases únicas con sus pros y contras
- **Economía:** Trading de viales de metales y más
- **Cosmere expansion:** ¿Otros sistemas de magia? (Surgebinding, Hemalurgy, otros? lo dejamos a los modders?)
- **VR locomotion:** Modo smooth (actual) + modo Acero/Hierro flight combinado
- **Weather system:** Cenizas, brumas, clima dinámico
- **Day/night cycle:** Inversión Scadrial (peligro de día, seguridad de noche) pero solo presente el algunos biomas (o lugares, definir esto mejor a futuro)
- **Biomas: TBD (es un gran melón)** 

---

## Break things, fail fast, learn fast, iterate fast, repeat.

Conceptualmente, esto es un playground de ideas para explorar el desarrollo creativo y técnico posible en un mundo de magia dura VR.

---

## 🤔 Debate Técnico: Three.js/WebXR vs Motores de Juegos

### ✅ **Ventajas de Three.js + WebXR (Estado Actual)**

#### 1. **Alineado con tu Stack Actual**
- ✅ **JavaScript nativo**: Ya dominas JS/webdev
- ✅ **Sin curva de aprendizaje brutal**: No necesitas aprender Unity (C#) o Godot (GDScript)
- ✅ **Iteración rápida**: Hot-reload con Vite, debugging familiar con DevTools
- ✅ **Web-first**: Publishing es literalmente `npm run build` + subir a hosting

#### 2. **Multiplayer Nativo y Simple**
- ✅ **Socket.io ya funciona**: Sincronización básica ya implementada
- ✅ **No necesitas Photon/Mirror/Netcode**: Networking en JS es mucho más simple
- ✅ **WebRTC disponible**: Si necesitas P2P más adelante
- ✅ **Serverless posible**: Puedes usar servicios como Vercel + Socket.io serverless

#### 3. **Modding Extremadamente Accesible**
- ✅ **JavaScript es universal**: Cualquier dev web puede moddear tu juego
- ✅ **No compilación**: Mods son archivos `.js` que se cargan dinámicamente
- ✅ **Hot-reload de mods**: Los modders ven cambios al instante
- ✅ **Comunidad masiva**: Hay millones de devs JS vs cientos de miles de Unity devs

#### 4. **Cross-Platform Real**
- ✅ **Funciona en Quest sin compilar**: WebXR es nativo en navegador Quest
- ✅ **Desktop/Mobile gratis**: Mismo código funciona en PC, móvil, VR
- ✅ **No App Store approval**: No necesitas pasar por Meta Store review
- ✅ **Updates instantáneos**: Deploy nuevo código y todos lo ven sin descargar

#### 5. **Open-Source y Control Total**
- ✅ **Sin licensing fees**: Unity cobra por instalaciones, Unreal toma royalties
- ✅ **Sin vendor lock-in**: Tu código es tuyo 100%
- ✅ **Inspeccionar todo**: Puedes ver el código de Three.js si algo falla

---

### ❌ **Desventajas CRÍTICAS de Three.js/WebXR**

#### 1. **Performance es MUCHO Peor**
- ❌ **JavaScript es lento**: ~10x más lento que C++ (Unity/Unreal)
- ❌ **No multi-threading real**: Web Workers son complejos y limitados
- ❌ **Garbage Collection stutters**: Pausas impredecibles
- ❌ **Límites de memoria**: Navegadores tienen límites estrictos
- ❌ **Mobile VR sufre**: Quest 2/3 tienen CPU/GPU limitados

**Impacto en tu juego:**
- ⚠️ Mundo voxel procedural **va a ser lento** con chunks grandes
- ⚠️ Sistema de partículas (cenizas, bruma) **muy limitado**
- ⚠️ Físicas complejas (Acero/Hierro con muchos objetos) **lag garantizado**
- ⚠️ 100+ enemigos en pantalla = **imposible**

#### 2. **Falta de Herramientas Profesionales**
- ❌ **No hay editor visual**: Todo es código (vs Unity Scene Editor)
- ❌ **No hay asset pipeline**: Importar modelos 3D es manual y doloroso
- ❌ **No hay animation system**: Tendrías que programarlo desde cero
- ❌ **No hay particle system avanzado**: Three.js solo tiene básicos
- ❌ **No hay terrain editor**: Generación procedural es 100% código
- ❌ **No hay lighting baking**: Todo es real-time (costoso)

**Impacto en desarrollo:**
- 🕐 **10x más tiempo** para features que en Unity son drag-and-drop
- 😰 **Solo tú puedes trabajar**: No hay forma de que un artista 3D te ayude sin programar
- 🐛 **Debugging visual es horrible**: No puedes "ver" la escena como en Unity

#### 3. **Ecosistema de Assets Inexistente**
- ❌ **Unity Asset Store**: Miles de assets (terrenos, personajes, VFX, audio)
- ❌ **Godot Asset Library**: Cientos de assets gratis
- ❌ **Three.js**: Prácticamente nada específico para juegos

**Impacto:**
- 💸 Tienes que **crear TODO desde cero** o contratar artistas
- ⏳ Features que tomarían 1 día en Unity toman 1 semana

#### 4. **VR es Ciudadano de Segunda Clase**
- ❌ **WebXR es experimental**: Browsers cambian la API constantemente
- ❌ **Performance en Quest es marginal**: Los juegos nativos (Unity) son 5-10x más rápidos
- ❌ **Tracking issues**: WebXR tiene bugs que los motores nativos no tienen
- ❌ **Haptics limitados**: No puedes hacer vibración compleja como juegos AAA
- ❌ **Foveated rendering**: No disponible (Unity/Unreal sí lo tienen)

#### 5. **Escalabilidad Limitada**
- ❌ **No hay ECS (Entity Component System)**: Escalar a 1000+ entidades es imposible
- ❌ **No hay scene graph optimization**: Three.js no escala a mundos masivos
- ❌ **No hay occlusion culling automático**: Tendrías que programarlo tú
- ❌ **No hay LOD system**: Optimización manual de draw calls

---

### 🎮 **Alternativas: Motores de Juegos Reales**

#### **Opción A: Unity + C#**

**Pros:**
- ✅ **Editor visual profesional**: Scene editing, terrain tools, particle systems
- ✅ **VR nativo**: Meta XR SDK oficial, performance optimizado
- ✅ **Asset Store masivo**: Comprar terrenos, personajes, efectos
- ✅ **Tutoriales infinitos**: YouTube tiene 10,000+ tutoriales de Unity
- ✅ **Comunidad gigante**: Stack Overflow, foros, Discord
- ✅ **Networking maduro**: Netcode for GameObjects, Mirror, Photon
- ✅ **C# es fácil**: Si sabes Python/JS, C# es similar

**Contras:**
- ❌ **Curva de aprendizaje**: 1-2 meses para ser productivo
- ❌ **Licensing fees**: $2000/año si ganas >$200k (pero eres indie, gratis)
- ❌ **Vendor lock-in**: Tu juego depende de Unity
- ❌ **Build times**: Compilar para Quest toma minutos
- ❌ **Modding más complejo**: C# compilado vs JS interpretado

**Recomendación:**
🟢 **MEJOR opción si quieres hacer un juego REAL a largo plazo**

---

#### **Opción B: Godot 4 + GDScript**

**Pros:**
- ✅ **100% open-source y gratis**: MIT License, cero fees
- ✅ **GDScript es como Python**: Fácil de aprender para ti
- ✅ **VR support decente**: OpenXR plugin
- ✅ **Editor visual**: Similar a Unity pero más simple
- ✅ **Performance buena**: Motor en C++, mejor que JavaScript
- ✅ **Modding nativo**: GDScript es interpretado como JS

**Contras:**
- ❌ **Ecosistema pequeño**: Menos assets que Unity
- ❌ **VR no tan maduro**: Meta XR SDK no oficial
- ❌ **Menos tutoriales**: Comunidad más pequeña
- ❌ **Networking inmaduro**: MultiplayerAPI es básico

**Recomendación:**
🟡 **Buena opción si priorizas open-source + sintaxis Python-like**

---

#### **Opción C: Unreal Engine + Blueprints**

**Pros:**
- ✅ **Gráficos AAA**: El mejor motor visual
- ✅ **Blueprints (visual scripting)**: No necesitas programar todo
- ✅ **VR clase mundial**: Meta Horizon Worlds está hecho en Unreal
- ✅ **Networking robusto**: Replication system maduro

**Contras:**
- ❌ **ENORME**: 100GB+ de instalación
- ❌ **Overkill**: Demasiado complejo para un indie
- ❌ **Curva de aprendizaje brutal**: 3-6 meses para ser productivo
- ❌ **C++ si quieres customizar**: Mucho más difícil que C#

**Recomendación:**
🔴 **NO recomendado para tu primer juego**

---

### 🎯 **Mi Recomendación Honesta**

Considerando que:
1. Es tu **primer juego serio**
2. Quieres **multiplayer + modding nativo**
3. Tienes **experiencia en JS/Python**, poca en otros lenguajes
4. Objetivo es **VR voxel con físicas complejas** (Mistborn)

#### **Estrategia Recomendada:**

### **Fase 1: Continuar con Three.js (AHORA - 1-2 meses)**

**Por qué:**
- Ya tienes momentum técnico
- Puedes validar mecánicas core rápido
- Aprendes VR sin la complejidad de Unity

**Objetivo:**
- [ ] Implementar 4 metales básicos (Acero, Hierro, Estaño, Peltre)
- [ ] Sistema de inventario simple
- [ ] Voxel art básico (chunks coloreados)
- [ ] Líneas alománticas visuales
- [ ] **Probar performance en Quest**: ¿Cuántos objetos puedes tener antes de lag?

**Criterio de decisión:**
Si puedes tener >50 objetos metálicos con push/pull fluido a 72fps en Quest → Continuar
Si lag con <20 objetos → **Pivotear a Unity**

---

### **Fase 2: Pivote a Unity (Si Three.js no escala)**

**Cuándo pivotear:**
- ❌ Performance en Quest es inaceptable (<60fps constante)
- ❌ Te cuesta >1 semana implementar features básicas
- ❌ Sientes que estás "peleando con el motor"

**Plan de migración:**
1. **Aprende Unity básico** (1 mes con tutoriales)
   - [Brackeys YouTube](https://www.youtube.com/c/Brackeys) → Tutoriales legendarios
   - [Unity VR Tutorial](https://learn.unity.com/tutorial/vr-best-practices)
2. **Re-implementa prototipo** en Unity (2-3 semanas)
   - Ya sabes qué funciona/no funciona de Three.js
   - Tienes diseño claro (IDEA.md como biblia)
3. **Networking con Mirror** (1 semana)
   - Open-source, similar a Socket.io conceptualmente
4. **Modding con Lua/C# hot-reload** (investigar)

---

### **Fase 3: Continuar con Three.js (Solo si...)**

**Condiciones para quedarte:**
- ✅ Performance aceptable (60fps con features core)
- ✅ Disfrutas el desarrollo web
- ✅ Tu scope se reduce: Menos enemigos, menos partículas, mundo más pequeño
- ✅ Priorizas accessibility (browser > app store)

**Compromiso de diseño:**
- Mundo voxel **más pequeño** (chunks 10x10 en vez de infinito)
- **Menos de 30-50 objetos físicos** simultáneos
- **Estilo artístico simple** (low-poly, flat colors)
- **Sin físicas complejas** tipo Havok/PhysX

---

## 📊 **Tabla Comparativa: Three.js vs Unity**

| Criterio | Three.js | Unity |
|----------|----------|-------|
| **Curva de aprendizaje** | Baja (ya sabes JS) | Media (1-2 meses) |
| **Performance VR** | 3/10 ⚠️ | 9/10 ✅ |
| **Herramientas visuales** | 1/10 ❌ | 10/10 ✅ |
| **Multiplayer** | 8/10 ✅ | 7/10 🟡 |
| **Modding** | 10/10 ✅ | 6/10 🟡 |
| **Ecosistema de assets** | 2/10 ❌ | 10/10 ✅ |
| **Publishing** | 10/10 ✅ | 5/10 🟡 |
| **Open-source** | 10/10 ✅ | 4/10 ❌ |
| **Mobile VR (Quest)** | 4/10 ⚠️ | 9/10 ✅ |
| **Voxel rendering** | 5/10 🟡 | 8/10 ✅ |
| **Físicas complejas** | 3/10 ❌ | 9/10 ✅ |
| **Time-to-market (prototype)** | 10/10 ✅ | 6/10 🟡 |
| **Scalability** | 3/10 ❌ | 9/10 ✅ |

---

## 🚦 **Conclusión: ¿Qué hacer HOY?**

### **Mi consejo:**

1. **Continúa con Three.js por 4-6 semanas más**
2. **Implementa el MVP de Mistborn:**
   - Acero/Hierro (push/pull) funcional
   - 20-30 monedas/objetos metálicos en escena
   - UI de reservas de metales
   - Test en Quest: ¿60fps estable?
3. **Decide basado en datos reales:**
   - Si funciona smooth → Ajusta scope y continúa
   - Si lag constantemente → Migra a Unity antes de invertir más tiempo

**Ventaja de este approach:**
- No pierdes el tiempo aprendiendo Unity si Three.js funciona
- Si tienes que migrar, ya tienes diseño validado
- "Fail fast" = máximo 6 semanas antes de pivotar

---

¿Quieres que profundicemos en algún aspecto específico? ¿O te ayudo a diseñar el MVP de las próximas 4 semanas para probar el límite de Three.js?



**Última actualización:** 2025-11-21  
**Versión de IDEA:** 1.0  
**Estado del proyecto:** Prototipo técnico → Pivote a inspiración Mistborn/CubeWorld
