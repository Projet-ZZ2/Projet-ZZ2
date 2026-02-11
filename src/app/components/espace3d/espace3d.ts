import { Component, ElementRef, OnInit, OnDestroy, ViewChild, Inject, PLATFORM_ID, NgZone, Renderer2, ChangeDetectorRef } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { playBackgroundMusic } from '../../model/audio-helper';

@Component({
  selector: 'app-espace3d',
  imports: [],
  templateUrl: './espace3d.html',
  styleUrl: './espace3d.css',
})
export class Espace3d implements OnInit, OnDestroy {
  @ViewChild('unityCanvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;
  
  unityInstance: any = null;
  private buildUrl = 'assets/unity/espace3d';
  isLoading = true;
  loadingPercentage = 0;
  
  private config = {
    dataUrl: `${this.buildUrl}/export.data`,
    frameworkUrl: `${this.buildUrl}/export.framework.js`,
    codeUrl: `${this.buildUrl}/export.wasm`,
    streamingAssetsUrl: 'StreamingAssets',
    companyName: 'DefaultCompany',
    productName: 'UnityGame',
    productVersion: '1.0',
    cacheControl: function () {
      return "no-store";
    },
  };

  private unlisten?: () => void;

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private ngZone: NgZone, private renderer: Renderer2, private router: Router, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const loaderScriptSrc = `${this.buildUrl}/export.loader.js`;
      
      this.loadScript(loaderScriptSrc)
        .then(() => {
          this.initializeUnity();
        })
        .catch((err) => {
          console.error("Could not load Unity loader script:", err);
        });

      this.unlisten = this.renderer.listen(window, 'UnityToAngular', (event: any) => {
      
      // 2. The data is inside event.detail (as defined in the .jslib)
      const dataString = event.detail;
      console.log('Received from Unity:', dataString);

      // 3. Process the data
      this.handleUnityMessage(dataString);
    });
    }
  }

  handleUnityMessage(str: string) {
    try {

      // 4. IMPORTANT: Run inside NgZone to update the UI
      this.ngZone.run(() => {
        if (str == 'SwitchToComputer') {
          playBackgroundMusic('main theme.mp3');
          this.router.navigate(['/desktop']);
        }
      });
    } catch (e) {
      console.error('Failed to parse JSON from Unity:', e);
    }
  }

  private loadScript(url: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!isPlatformBrowser(this.platformId)) {
        resolve(); 
        return;
      }

      if (document.querySelector(`script[src="${url}"]`)) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = url;
      script.onload = () => resolve();
      script.onerror = () => reject();
      document.body.appendChild(script);
    });
  }

  private initializeUnity() {
    if (isPlatformBrowser(this.platformId)) {
      createUnityInstance(this.canvasRef.nativeElement, this.config, (progress) => {
        //console.log(`Unity Loading: ${100 * progress}%`);
        this.ngZone.run(() => {
          this.loadingPercentage = Math.round(progress * 100);
          this.cdr.detectChanges();
      });
      console.log(this.loadingPercentage);
      })
      .then((instance) => {
        this.unityInstance = instance;
        this.ngZone.run(() => {
          this.isLoading = false;
          this.cdr.detectChanges();
        });
      })
      .catch((message) => {
        alert(message);
      });
    }
  }

  ngOnDestroy() {
    if (this.unityInstance) {
      this.unityInstance.Quit().catch(() => console.log("Unity quit"));
    }
    if (this.unlisten) {
      this.unlisten();
    }
  }
}
