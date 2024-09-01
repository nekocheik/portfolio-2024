interface IntersectOptions {
  observerOptions?: IntersectionObserverInit;
  true?: string[] | { [prop: string]: any };
  false?: string[] | { [prop: string]: any };
  onChange?: (isIntersecting: boolean, el: HTMLElement, options: IntersectOptions) => void;
  disposeWhen?: boolean;
  delay?: number;
}

class Intersect {
  private interSectionObserver!: IntersectionObserver;
  private el!: HTMLElement;
  private options!: IntersectOptions;
  private callback!: (isIntersecting: boolean, el: HTMLElement, options: IntersectOptions) => void;
  private timeoutId?: number;

  constructor(private vm: any) {}

  public bind(el: HTMLElement, binding: any) {
    const observerOptions: IntersectionObserverInit = { ...binding.value.observerOptions };
    this.interSectionObserver = new IntersectionObserver(
      this.onIntersectChange.bind(this),
      observerOptions
    );
    this.interSectionObserver.observe(el);

    this.el = el;
    this.options = {
      true: binding.value.true,
      false: binding.value.false,
      disposeWhen: binding.value.disposeWhen,
      delay: binding.value.delay || 0,
    };
    this.callback = binding.value.onChange;
  }

  public unbind(el: HTMLElement) {
    if (this.interSectionObserver) {
      this.interSectionObserver.unobserve(el);
    }
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }

  private onIntersectChange(entries: IntersectionObserverEntry[]) {
    const entry = entries[0];
    if (!entry) return;

    const isIntersecting = entry.isIntersecting;

    if (this.options.delay) {
      if (this.timeoutId) {
        clearTimeout(this.timeoutId);
      }
      this.timeoutId = window.setTimeout(() => {
        this.applyChanges(isIntersecting);
      }, this.options.delay);
    } else {
      this.applyChanges(isIntersecting);
    }

    if (this.callback) {
      this.callback(isIntersecting, this.el, this.options);
    }

    if (this.options.disposeWhen !== undefined) {
      const shouldDispose = isIntersecting === this.options.disposeWhen;
      if (shouldDispose) this.unbind(this.el);
    }
  }

  private applyChanges(isIntersecting: boolean) {
    if (isIntersecting) {
      if (this.options.true) this.addStyleOptions(this.options.true);
      if (this.options.false) this.removeStyleOptions(this.options.false);
    } else {
      if (this.options.true) this.removeStyleOptions(this.options.true);
      if (this.options.false) this.addStyleOptions(this.options.false);
    }
  }

  private addStyleOptions(options: string[] | { [prop: string]: any }) {
    if (Array.isArray(options)) {
      this.el.classList.add(...options);
    } else {
      for (const prop in options) {
        this.el.style[prop as any] = options[prop];
      }
    }
  }

  private removeStyleOptions(options: string[] | { [prop: string]: any }) {
    if (Array.isArray(options)) {
      this.el.classList.remove(...options);
    } else {
      for (const prop in options) {
        this.el.style.removeProperty(prop);
      }
    }
  }
}

const intersectMap = new WeakMap<HTMLElement, Intersect>();

const intersectDirective: any = {
  mounted(el, binding, vnode) {
    const intersect = new Intersect(vnode);
    intersect.bind(el, binding);
    intersectMap.set(el, intersect);
  },
  unmounted(el) {
    const intersect = intersectMap.get(el);
    if (intersect) {
      intersect.unbind(el);
      intersectMap.delete(el);
    }
  }
};

export default intersectDirective;