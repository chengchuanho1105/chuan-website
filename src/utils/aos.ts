// src/utils/aos.ts
import AOS from 'aos'
import 'aos/dist/aos.css'

export function setupAOS() {
  AOS.init({ duration: 800, once: false, offset: 50 })
}
