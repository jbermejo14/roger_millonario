# 🏆 ¿Quién Quiere Ser Millonario? - Edición 2 Equipos

Juego web interactivo estilo concurso de televisión para jugar entre 2 equipos por turnos alternos, con presentador, comodines oficiales, recompra y soporte para jugar desde PC y desde iPhone (iOS).

---

## 🚀 Cómo Iniciar el Juego

Abre una terminal en esta carpeta (`d:\PC-19-05-2026\Antigravity\millonario_game`) y ejecuta:

```bash
node server.mjs
```
*(O también con `npm start`)*

¡Y listo! No requiere instalar ninguna librería adicional (`node_modules`), arranca en menos de 1 segundo.

### 🌐 Dónde Jugar:
- **En tu ordenador (PC):** Abre [http://localhost:3000](http://localhost:3000)
- **En el iPhone de tu novia:** Con ambos dispositivos conectados a la misma red Wi-Fi, abre Safari y ve a:
  `http://192.168.1.70:3000`
  *(O simplemente pulsa el botón **"Móvil"** en la pantalla del PC y escanea el código QR con la cámara del iPhone).*

---

## 🎯 Reglas y Mecánicas del Juego

1. **2 Equipos y Turnos Alternos:**
   - Ronda 1: Equipo 1
   - Ronda 2: Equipo 2
   - Ronda 3: Equipo 1... y así sucesivamente a lo largo de las 15 rondas.
2. **Anuncio Previo de la Temática:**
   - Antes de revelar la pregunta y sus 4 opciones, la pantalla anuncia en grande la categoría (ej: *⚽ Deportes*, *🎬 Cine y Series*, *🔬 Ciencia*, *🏛️ Historia*...).
   - El equipo activo elige a su representante para esa temática.
   - Cuando el representante esté listo, se pulsa el botón y arrancan los **30 segundos**.
3. **Escala de Premios y Seguros:**
   - 15 preguntas con premios progresivos desde 100 € hasta **1.000.000 €**.
   - Dos redes de seguridad (Seguros):
     - **1º Seguro:** 1.000 € (Ronda 5).
     - **2º Seguro:** 32.000 € (Ronda 10).
   - Si fallan una pregunta, el dinero del equipo cae automáticamente al último seguro alcanzado.
4. **Los 4 Comodines:**
   - 📞 **Llamada:** Llamar a alguien del grupo (pausa el tiempo de la pregunta y abre un reloj de 30 segundos de llamada).
   - 🌓 **50/50:** Elimina 2 respuestas incorrectas.
   - 👥 **Público:** Hablar con tu grupo durante 30 segundos.
   - 🎙️ **El Presentador:** Pedir consejo directo al anfitrión (tú).
5. **Recompra de Comodines:**
   - Si un equipo ya ha gastado un comodín, puede volver a activarlo pagando el **50% de su dinero acumulado** actual.
6. **Panel Secreto del Presentador:**
   - Pulsa el botón **"Presentador"** para ver discretamente la respuesta correcta, consultar pistas, pausar/añadir tiempo (+15s) o validar respuestas de viva voz.
