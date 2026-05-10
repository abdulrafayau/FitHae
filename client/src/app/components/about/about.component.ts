import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-screen bg-white">
      <!-- About Hero -->
      <section class="py-20 bg-slate-900 text-white text-center px-6">
        <h1 class="text-5xl md:text-7xl font-black mb-6">Our Story</h1>
        <p class="text-xl text-white/60 max-w-2xl mx-auto italic">"Bringing transparency and premium standards to the hospitality industry of Pakistan."</p>
      </section>

      <!-- Mission -->
      <section class="max-w-4xl mx-auto py-24 px-6 text-center">
        <h2 class="text-4xl font-bold text-slate-900 mb-8">Ab Har Hotel Hoga FitHae!</h2>
        <p class="text-lg text-slate-600 leading-relaxed italic mb-12">
          FitHae was born out of a simple need: finding reliable, verified, and high-quality hotel reviews for travelers visiting Islamabad and Rawalpindi. 
          We believe that every stay should be premium, every review should be honest, and every user should feel empowered.
        </p>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="p-8 bg-slate-50 rounded-[2rem]">
            <h4 class="text-3xl font-black text-primary mb-2">100%</h4>
            <p class="text-xs font-bold text-slate-400 uppercase tracking-widest">Verified Reviews</p>
          </div>
          <div class="p-8 bg-slate-50 rounded-[2rem]">
            <h4 class="text-3xl font-black text-primary mb-2">50+</h4>
            <p class="text-xs font-bold text-slate-400 uppercase tracking-widest">Premium Hotels</p>
          </div>
          <div class="p-8 bg-slate-50 rounded-[2rem]">
            <h4 class="text-3xl font-black text-primary mb-2">24/7</h4>
            <p class="text-xs font-bold text-slate-400 uppercase tracking-widest">Local Support</p>
          </div>
        </div>
      </section>

      <!-- Founders Section -->
      <section class="bg-slate-50 py-24 px-6">
        <div class="max-w-7xl mx-auto">
          <h2 class="text-4xl font-bold text-slate-900 mb-16 text-center">Meet the Visionaries</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
            
            <!-- Founder 1 -->
            <div class="group bg-white rounded-[2.5rem] p-10 text-center shadow-xl hover:shadow-2xl transition-all border border-slate-100">
              <div class="w-32 h-32 rounded-full overflow-hidden mx-auto mb-6 border-4 border-primary/10 group-hover:scale-110 transition-transform">
                <img src="https://ui-avatars.com/api/?name=Abdul+Rafay&background=0F172A&color=fff&size=128" alt="Abdul Rafay">
              </div>
              <h3 class="text-2xl font-bold text-slate-900">Abdul Rafay</h3>
              <p class="text-primary font-bold text-sm mb-4 italic">Lead Architect & Visionary</p>
              <p class="text-slate-500 text-sm leading-relaxed">Dedicated to building scalable systems that redefine how we interact with local businesses.</p>
            </div>

            <!-- Founder 2 -->
            <div class="group bg-white rounded-[2.5rem] p-10 text-center shadow-xl hover:shadow-2xl transition-all border border-slate-100">
              <div class="w-32 h-32 rounded-full overflow-hidden mx-auto mb-6 border-4 border-primary/10 group-hover:scale-110 transition-transform">
                <img src="https://ui-avatars.com/api/?name=Sinan+M+Shoaib&background=0F172A&color=fff&size=128" alt="Sinan M Shoaib">
              </div>
              <h3 class="text-2xl font-bold text-slate-900">Sinan M Shoaib</h3>
              <p class="text-primary font-bold text-sm mb-4 italic">UI/UX Strategist</p>
              <p class="text-slate-500 text-sm leading-relaxed">Crafting immersive digital experiences that blend aesthetics with absolute functionality.</p>
            </div>

            <!-- Founder 3 -->
            <div class="group bg-white rounded-[2.5rem] p-10 text-center shadow-xl hover:shadow-2xl transition-all border border-slate-100">
              <div class="w-32 h-32 rounded-full overflow-hidden mx-auto mb-6 border-4 border-primary/10 group-hover:scale-110 transition-transform">
                <img src="https://ui-avatars.com/api/?name=Abdul+Sattar&background=0F172A&color=fff&size=128" alt="Abdul Sattar">
              </div>
              <h3 class="text-2xl font-bold text-slate-900">Abdul Sattar</h3>
              <p class="text-primary font-bold text-sm mb-4 italic">Backend Engineer</p>
              <p class="text-slate-500 text-sm leading-relaxed">Ensuring data integrity and robust security for our growing community of reviewers.</p>
            </div>

          </div>
        </div>
      </section>

      <!-- Contact Footer -->
      <section class="py-20 text-center bg-white border-t border-slate-100">
        <h2 class="text-3xl font-bold text-slate-900 mb-6">Want to partner with us?</h2>
        <p class="text-slate-500 mb-8 italic">Contact us at <span class="text-primary font-bold">partners&#64;fithae.pk</span></p>
        <div class="flex justify-center gap-4">
          <button class="w-12 h-12 rounded-full bg-slate-900 text-white flex items-center justify-center hover:bg-primary transition-all">
            <span class="material-symbols-outlined">share</span>
          </button>
          <button class="w-12 h-12 rounded-full bg-slate-900 text-white flex items-center justify-center hover:bg-primary transition-all">
            <span class="material-symbols-outlined">call</span>
          </button>
        </div>
      </section>
    </div>
  `
})
export class AboutComponent {}
