<template>
  <picture class="lazy__picture">
    <ZLoading v-if="(!intersected && intersection) || loading" variant="ellipsis" class="lazy__loading" />
    <template v-else>
      <source v-if="intersection" :srcset="imageSizes.large.url" :media="`(min-width: ${breakpoints.MD}px)`" />
      <source v-if="intersection" :srcset="imageSizes.medium.url" :media="`(min-width: ${breakpoints.SM}px)`" />
      <source v-if="intersection" :srcset="imageSizes.small.url" :media="`(min-width: ${breakpoints.XS}px)`" />
      <a v-if="url" :href="url">
        <img ref="currentImg" :class="{ lazy__img: true, 'lazy__img-contain': contain }" :alt="alt" :src="srcImage" />
      </a>
      <img
        v-else
        ref="currentImg"
        :class="{ lazy__img: true, 'lazy__img-contain': contain }"
        :alt="alt"
        :src="srcImage" />
      <slot name="cover" />
    </template>
  </picture>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator';
import { BREAKPOINTS } from '~/constants/breakpoints';
import { TImageSize } from '~/models';
@Component
export default class ImgLazyComponent extends Vue {
  @Prop({ default: null, type: String }) readonly url!: string;
  @Prop({ type: Object }) readonly sizes!: TImageSize;
  @Prop({ default: false }) readonly responsive!: boolean;
  @Prop({ default: 1 }) readonly dpr!: number;
  @Prop({ required: true, type: String }) readonly src!: string;
  @Prop({ default: true, type: Boolean }) readonly intersection!: boolean;
  @Prop({ default: false, type: Boolean }) readonly contain!: boolean;
  @Prop({ type: String }) readonly alt!: string;

  observer!: IntersectionObserver;
  intersected: boolean = false;
  loading: boolean = true;

  public mounted() {
    if (this.intersection && 'IntersectionObserver' in window) {
      this.createObserver();
    } else {
      this.loading = false;
      this.intersected = true;
    }
  }

  public get breakpoints() {
    return BREAKPOINTS;
  }

  public get srcImage() {
    if (!this.intersection) return this.src;
    return this.intersected ? this.imageSizes.small.url : '';
  }

  public get imageSizes() {
    const cover = 'center';
    const dpr = this.dpr;
    const XS = this.sizes?.XS || { width: BREAKPOINTS.XS };
    const SM = this.sizes?.SM || { width: BREAKPOINTS.SM };
    const MD = this.sizes?.MD || { width: BREAKPOINTS.MD };
    return {
      large: {
        size: MD,
        url: this._imageBuilder(this.src)
          .params({
            cover,
            dpr,
            ...MD
          })
          .url()
      },
      medium: {
        size: SM,
        url: this._imageBuilder(this.src)
          .params({
            cover,
            dpr,
            ...SM
          })
          .url()
      },
      small: {
        size: XS,
        url: this._imageBuilder(this.src)
          .params({
            cover,
            dpr,
            ...XS
          })
          .url()
      }
    };
  }

  private forceLoad() {
    this.intersected = true;
    this.loading = true;
    const img = new Image();

    img.onload = () => {
      this.loading = false;
    };

    img.src = this.bestSizeImage();
  }

  private bestSizeImage() {
    if (window.outerWidth > BREAKPOINTS.MD) return this.imageSizes.large.url;
    if (window.outerWidth > BREAKPOINTS.SM) return this.imageSizes.medium.url;
    if (window.outerWidth < BREAKPOINTS.XS) return this.imageSizes.small.url;
    return '';
  }

  private createObserver() {
    this.observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (!entry.isIntersecting) return false;
      this.intersected = true;
      if (this.loading) this.forceLoad();
    });

    this.observer.observe(this.$el);
  }
}
</script>
<style lang="scss">
.lazy__picture {
  display: flex;
  justify-content: center;
  align-items: center;
}

.lazy__loading {
  width: fit-content;
  min-width: 30%;
  text-align: center;
}

.lazy__img {
  object-fit: cover;
  width: 100%;
  height: 100%;
}

.lazy__img-contain {
  object-fit: contain;
}

.lazy__loading > svg {
  max-width: none;
}
</style>
