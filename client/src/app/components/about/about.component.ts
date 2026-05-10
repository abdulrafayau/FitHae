import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  template: `
    <main class="pt-xxl min-h-screen">
      <!-- Hero -->
      <section class="relative py-xxl overflow-hidden bg-surface">
        <div class="max-w-container-max mx-auto px-lg grid lg:grid-cols-12 gap-xl items-center">
          <div class="lg:col-span-7 z-10">
            <span class="font-label-caps text-label-caps text-fithae-pink mb-md block font-bold tracking-widest uppercase">THE FIT VERDICT</span>
            <h1 class="font-display-lg text-display-lg mb-lg text-on-surface text-5xl">Redefining Hospitality Through <span class="text-fithae-pink italic">Authenticity.</span></h1>
            <p class="font-body-lg text-body-lg text-on-surface-variant max-w-2xl leading-relaxed">
              FitHae was born out of a simple necessity: the need for truth in Pakistan's hotel industry. We provide a curated, editorial-grade review platform that separates excellence from marketing noise.
            </p>
          </div>
          <div class="lg:col-span-5 relative">
            <div class="aspect-square rounded-2xl overflow-hidden shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500 border-8 border-white">
              <img class="w-full h-full object-cover" src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=800" alt="About">
            </div>
          </div>
        </div>
      </section>

      <!-- Founders -->
      <section class="py-xxl bg-surface-container-low">
        <div class="max-w-container-max mx-auto px-lg">
          <div class="text-center mb-xxl">
            <h2 class="font-display-lg text-display-lg mb-md text-4xl font-bold">Meet the Founders</h2>
            <p class="font-body-lg text-body-lg text-on-surface-variant max-w-xl mx-auto">The visionaries behind FitHae, committed to elevating the hospitality standards across Islamabad & Rawalpindi.</p>
          </div>
          
          <div class="grid md:grid-cols-3 gap-lg p-8">
            <!-- Founder 1 -->
            <div class="group relative overflow-hidden rounded-2xl bg-surface-container-lowest shadow-sm hover:shadow-xl transition-all duration-300">
              <div class="aspect-[4/5] overflow-hidden">
                <img class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                     src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600" alt="Abdul Rafay">
              </div>
              <div class="p-lg">
                <h4 class="font-headline-md text-headline-md mb-xs text-xl font-bold">Abdul Rafay</h4>
                <p class="font-label-caps text-label-caps text-fithae-pink mb-md text-xs font-bold uppercase">CO-FOUNDER & CEO</p>
              </div>
            </div>

            <!-- Founder 2 -->
            <div class="group relative overflow-hidden rounded-2xl bg-surface-container-lowest shadow-sm hover:shadow-xl transition-all duration-300 md:mt-12">
              <div class="aspect-[4/5] overflow-hidden">
                <img class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                     src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600" alt="Sinan M Shoaib">
              </div>
              <div class="p-lg">
                <h4 class="font-headline-md text-headline-md mb-xs text-xl font-bold">Sinan M Shoaib</h4>
                <p class="font-label-caps text-label-caps text-fithae-pink mb-md text-xs font-bold uppercase">CO-FOUNDER & CTO</p>
              </div>
            </div>

            <!-- Founder 3 -->
            <div class="group relative overflow-hidden rounded-2xl bg-surface-container-lowest shadow-sm hover:shadow-xl transition-all duration-300">
              <div class="aspect-[4/5] overflow-hidden">
                <img class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                     src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=600" alt="Abdul Sattar">
              </div>
              <div class="p-lg">
                <h4 class="font-headline-md text-headline-md mb-xs text-xl font-bold">Abdul Sattar</h4>
                <p class="font-label-caps text-label-caps text-fithae-pink mb-md text-xs font-bold uppercase">CO-FOUNDER & COO</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Mission -->
      <section class="max-w-container-max mx-auto px-lg my-xxl">
        <div class="bg-primary-container text-white rounded-3xl p-16 relative overflow-hidden shadow-2xl">
          <div class="absolute top-0 right-0 w-1/2 h-full opacity-10">
            <span class="material-symbols-outlined text-[300px] absolute -right-20 -top-20">verified</span>
          </div>
          <div class="relative z-10 md:w-2/3">
            <div class="bg-fithae-yellow text-on-surface px-4 py-1 rounded-full inline-block font-label-caps mb-8 text-xs font-bold uppercase tracking-widest">Our Vision</div>
            <h2 class="font-display-lg text-display-lg mb-8 text-4xl">A definitive rating for every stay.</h2>
            <p class="font-body-lg text-body-lg opacity-80 mb-12 text-lg">Join the thousands of travelers who trust FitHae for honest, reliable, and premium hotel insights across Pakistan.</p>
            <button class="bg-fithae-pink text-white px-10 py-4 rounded-xl font-label-bold hover:brightness-110 transition-all shadow-lg font-bold">Explore Destinations</button>
          </div>
        </div>
      </section>
    </main>
  `
})
export class AboutComponent {}
