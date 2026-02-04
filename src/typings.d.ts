declare function createUnityInstance(
  canvas: HTMLElement,
  config: any,
  onProgress: (progress: number) => void
): Promise<any>;