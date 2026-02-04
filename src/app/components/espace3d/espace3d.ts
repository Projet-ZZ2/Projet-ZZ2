import { Component, ElementRef, OnInit, OnDestroy, ViewChild, Inject, PLATFORM_ID, NgZone, Renderer2 } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

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
  
  private config = {
    dataUrl: `${this.buildUrl}/export.data`,
    frameworkUrl: `${this.buildUrl}/export.framework.js`,
    codeUrl: `${this.buildUrl}/export.wasm`,
    streamingAssetsUrl: 'StreamingAssets',
    companyName: 'DefaultCompany',
    productName: 'UnityGame',
    productVersion: '1.0',
  };

  private unlisten?: () => void;

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private ngZone: NgZone, private renderer: Renderer2, private router: Router) {}

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
          this.router.navigate(['/computer']);
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
        console.log(`Unity Loading: ${100 * progress}%`);
      })
      .then((instance) => {
        this.unityInstance = instance;
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
