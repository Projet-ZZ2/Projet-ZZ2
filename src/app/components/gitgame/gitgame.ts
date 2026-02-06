import { Component, OnInit, OnDestroy, Renderer2, Inject, PLATFORM_ID } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Computer } from '../computer/computer';

@Component({
  selector: 'app-gitgame',
  imports: [Computer],
  templateUrl: './gitgame.html',
  styleUrl: './gitgame.css',
})

export class Gitgame implements OnInit, OnDestroy {
  private scriptElement: HTMLScriptElement | null = null;

  constructor(
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
    (window as any).gmCallback_Script_OnInit = function() {
        return {
            base_url: "assets/gamemaker/html5game"
        };
    };

    this.loadGame();
  }
}

  loadGame() {
      const script = this.renderer.createElement('script');
      
      script.src = 'assets/gamemaker/html5game/index.js'; 
      script.type = 'text/javascript';

      script.onload = () => {
        console.log('JS Runner loaded, initializing GMS2...');
        
        // 3. Manually call the Init function
        if ((window as any).GameMaker_Init) {
          (window as any).GameMaker_Init();
        } else {
          console.error("Could not find GameMaker_Init. Check the filename in assets.");
        }
      };

      script.onerror = (err: any) => console.error("Script load error:", err);

      this.renderer.appendChild(this.document.body, script);
    }

  ngOnDestroy(): void {
    if (this.scriptElement) {
      this.renderer.removeChild(this.document.body, this.scriptElement);
    }
  }
}